/**
 * Standalone Telegram Qualification & Operations Bot for V. I. LEVIN
 * Features:
 * - 6 Languages for incoming clients (/start with language choice: RU, EN, UK, ES, IT, FR)
 * - 5-step confidential legal qualification
 * - Direct push to Admin Chat (7794422014)
 * - 1-Click Admin Forwarding directly to Lawyer Chat ID (1275663257)
 * - 1-Click Cryptomus USDT Invoice generation
 * 
 * Run via: npm run bot:polling
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env.local if present
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      if (k && v.length) process.env[k.trim()] = v.join('=').trim();
    }
  });
}

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || '7794422014';
const LAWYER_CHAT_ID = process.env.TELEGRAM_LAWYER_CHAT_ID || '1275663257';
const DEFAULT_USDT_WALLET = process.env.USDT_TRC20_WALLET || 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const CRYPTOBOT_API_TOKEN = process.env.CRYPTOBOT_API_TOKEN || '';

console.log('🚀 Запуск Telegram-бота V. I. LEVIN (@VILEVIN_bot)...');
console.log(`👑 Admin Chat ID: ${ADMIN_CHAT_ID}`);
console.log(`👨‍⚖️ Lawyer Chat ID: ${LAWYER_CHAT_ID}`);
console.log(`💳 USDT TRC-20 Wallet: ${DEFAULT_USDT_WALLET}`);
console.log(`💎 CryptoBot API: ${CRYPTOBOT_API_TOKEN ? 'Подключен (Crypto Pay API)' : 'Не указан (Резервный режим)'}`);

const userSessions = new Map();
const leadsCache = new Map();
const msgToLeadMap = new Map(); // messageId -> leadId
const activeReplySessions = new Map(); // chatId -> { leadId, clientChatId, role }
const activePayInputSessions = new Map(); // chatId -> { leadId, clientChatId }

// Load persistent leads
const dataFilePath = path.join(__dirname, '..', 'data', 'leads.json');
try {
  if (fs.existsSync(dataFilePath)) {
    const arr = JSON.parse(fs.readFileSync(dataFilePath, 'utf8') || '[]');
    arr.forEach((l) => leadsCache.set(l.id, l));
  }
} catch (e) {
  console.log('No prior leads cache.');
}

function saveLeadsToDisk() {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const all = Array.from(leadsCache.values());
    fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving leads:', err.message);
  }
}

const counterFilePath = path.join(__dirname, '..', 'data', 'lead_counter.json');

function getNextLeadId() {
  let seq = 100;
  try {
    if (fs.existsSync(counterFilePath)) {
      const data = JSON.parse(fs.readFileSync(counterFilePath, 'utf8') || '{}');
      if (typeof data.seq === 'number' && data.seq >= 100) {
        seq = data.seq;
      }
    }
  } catch (e) {}

  const leadId = 'LEAD-' + String(seq).padStart(6, '0');

  try {
    const dir = path.dirname(counterFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(counterFilePath, JSON.stringify({ seq: seq + 1 }, null, 2), 'utf8');
  } catch (e) {}

  return leadId;
}

// Persistent Bot Users storage (users who clicked /start or interacted)
const usersFilePath = path.join(__dirname, '..', 'data', 'bot_users.json');
const botUsers = new Map();

try {
  if (fs.existsSync(usersFilePath)) {
    const list = JSON.parse(fs.readFileSync(usersFilePath, 'utf8') || '[]');
    list.forEach((u) => botUsers.set(String(u.id), u));
  }
} catch (e) {
  console.log('No prior bot_users cache.');
}

function saveBotUser(chatId, fromUser, extra = {}) {
  const strId = String(chatId);
  const now = new Date().toISOString();
  const existing = botUsers.get(strId) || {
    id: strId,
    firstSeen: now,
  };

  const updated = {
    ...existing,
    username: fromUser?.username ? `@${fromUser.username}` : (existing.username || ''),
    firstName: fromUser?.first_name || existing.firstName || '',
    lastName: fromUser?.last_name || existing.lastName || '',
    lastSeen: now,
    ...extra,
  };

  botUsers.set(strId, updated);
  try {
    const dir = path.dirname(usersFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(usersFilePath, JSON.stringify(Array.from(botUsers.values()), null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving bot users:', err.message);
  }
  return updated;
}

function escapeHtml(text = '') {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function apiRequest(method, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${BOT_TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ ok: false, error: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function sendMessage(chatId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
  };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  return apiRequest('sendMessage', payload);
}

const I18N = {
  ru: {
    welcome: '⚖️ <b>V. I. LEVIN — Международная юридическая практика</b>\n\nДобро пожаловать в защищенный шлюз первичной правовой оценки.\n\n🔒 Все переданные сведения охраняются режимом строгой конфиденциальности (Attorney-Client Privilege).\n\nШаг 1 из 5: Выберите <b>направление вашего вопроса</b>:',
    cats: [
      [{ text: '🇺🇸 Иммиграция США & Green Card', callback_data: 'cat:Иммиграция США / Green Card' }],
      [{ text: '🌍 Международные контракты & Структурирование', callback_data: 'cat:Международные контракты' }],
      [{ text: '⚖️ Арбитраж & Судебные споры', callback_data: 'cat:Арбитраж и суды' }],
      [{ text: '💼 Корпоративное право & Защита активов', callback_data: 'cat:Корпоративное право' }],
      [{ text: '❓ Другой юридический вопрос', callback_data: 'cat:Другое' }],
    ],
    jurTitle: 'Шаг 2 из 5: Укажите <b>ключевую юрисдикцию</b>:',
    jurs: [
      [{ text: '🇺🇸 США', callback_data: 'jur:США' }, { text: '🇪🇺 ЕС / Германия', callback_data: 'jur:ЕС' }],
      [{ text: '🇦🇪 ОАЭ (DIFC)', callback_data: 'jur:ОАЭ' }, { text: '🇬🇧 Великобритания', callback_data: 'jur:Великобритания' }],
      [{ text: '🇨🇾 Кипр', callback_data: 'jur:Кипр' }, { text: '🇬🇪 Грузия', callback_data: 'jur:Грузия' }],
      [{ text: '🌍 Другая (ввести текстом)', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Шаг 3 из 5: <b>Кратко опишите суть ситуации</b> (факты, текущий этап, цели):\n\n<i>⚠️ Не передавайте пароли и данные банковских карт.</i>',
    urgTitle: 'Шаг 4 из 5: Выберите <b>срочность задачи</b>:',
    urgs: [
      [{ text: '🔥 Срочно (1-2 дня)', callback_data: 'urg:Срочно (1-2 дня)' }],
      [{ text: '⚡ В течение недели', callback_data: 'urg:В течение недели' }],
      [{ text: '📅 Плановый разбор', callback_data: 'urg:Плановый разбор' }],
    ],
    contactPrompt: 'Шаг 5 из 5: Укажите ваш <b>Telegram, WhatsApp или Email</b> для связи:',
    finish: '✅ <b>Ваше обращение принято и зарегистрировано!</b>\n\nНаши юристы проводят первичный правовой аудит ситуации и свяжутся с вами в ближайшее время.',
  },
  en: {
    welcome: '⚖️ <b>V. I. LEVIN — International Legal Practice</b>\n\nWelcome to our secure preliminary evaluation gateway.\n\n🔒 All communications are strictly protected by Attorney-Client Privilege and standard NDA.\n\nStep 1 of 5: Select the <b>practice area</b> of your inquiry:',
    cats: [
      [{ text: '🇺🇸 US Immigration & Green Card', callback_data: 'cat:US Immigration & Green Card' }],
      [{ text: '🌍 International Contracts & Structuring', callback_data: 'cat:International Contracts' }],
      [{ text: '⚖️ Arbitration & Cross-Border Disputes', callback_data: 'cat:Arbitration & Disputes' }],
      [{ text: '💼 Corporate Law & Asset Protection', callback_data: 'cat:Corporate & Asset Protection' }],
      [{ text: '❓ Other Legal Inquiries', callback_data: 'cat:Other' }],
    ],
    jurTitle: 'Step 2 of 5: Specify the <b>primary jurisdiction</b>:',
    jurs: [
      [{ text: '🇺🇸 United States', callback_data: 'jur:USA' }, { text: '🇪🇺 EU / Germany', callback_data: 'jur:EU' }],
      [{ text: '🇦🇪 UAE (DIFC)', callback_data: 'jur:UAE' }, { text: '🇬🇧 United Kingdom', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Cyprus', callback_data: 'jur:CY' }, { text: '🇬🇪 Georgia', callback_data: 'jur:GE' }],
      [{ text: '🌍 Other Jurisdiction', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Step 3 of 5: <b>Briefly describe your situation</b> (key facts, procedural stage, objectives):\n\n<i>⚠️ Do not share passwords or payment credentials.</i>',
    urgTitle: 'Step 4 of 5: Select <b>urgency level</b>:',
    urgs: [
      [{ text: '🔥 Immediate (1-2 days)', callback_data: 'urg:Immediate' }],
      [{ text: '⚡ Within a week', callback_data: 'urg:Within a week' }],
      [{ text: '📅 Planned consultation', callback_data: 'urg:Planned' }],
    ],
    contactPrompt: 'Step 5 of 5: Please provide your <b>Telegram, WhatsApp, or Email</b> for contact:',
    finish: '✅ <b>Your inquiry has been securely registered!</b>\n\nOur legal team is conducting an initial assessment and will contact you promptly.',
  },
  uk: {
    welcome: '⚖️ <b>V. I. LEVIN — Міжнародна юридична практика</b>\n\nЛаскаво просимо до захищеного шлюзу попередньої правової оцінки.\n\n🔒 Усі відомості захищені режимом суворої конфіденційності (Attorney-Client Privilege).\n\nКрок 1 із 5: Оберіть <b>напрямок питання</b>:',
    cats: [
      [{ text: '🇺🇸 Імміграція до США & Green Card', callback_data: 'cat:Імміграція США' }],
      [{ text: '🌍 Міжнародні контракти & Структурування', callback_data: 'cat:Міжнародні контракти' }],
      [{ text: '⚖️ Арбітраж & Судові спори', callback_data: 'cat:Арбітраж' }],
      [{ text: '💼 Корпоративне право & Захист активів', callback_data: 'cat:Корпоративне право' }],
      [{ text: '❓ Інше юридичне питання', callback_data: 'cat:Інше' }],
    ],
    jurTitle: 'Крок 2 із 5: Вкажіть <b>юрисдикцію</b>:',
    jurs: [
      [{ text: '🇺🇸 США', callback_data: 'jur:США' }, { text: '🇪🇺 ЄС / Німеччина', callback_data: 'jur:ЄС' }],
      [{ text: '🇦🇪 ОАЕ (DIFC)', callback_data: 'jur:ОАЕ' }, { text: '🇬🇧 Велика Британія', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Кіпр', callback_data: 'jur:Кіпр' }, { text: '🇬🇪 Грузія', callback_data: 'jur:Грузія' }],
      [{ text: '🌍 Інша країна', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Крок 3 із 5: <b>Коротко опишіть суть ситуації</b>:\n\n<i>⚠️ Не передавайте конфіденційні паролі або платіжні реквізити.</i>',
    urgTitle: 'Крок 4 із 5: Оберіть <b>терміновість</b>:',
    urgs: [
      [{ text: '🔥 Терміново (1-2 дні)', callback_data: 'urg:Терміново' }],
      [{ text: '⚡ Протягом тижня', callback_data: 'urg:Протягом тижня' }],
      [{ text: '📅 Плановий аудит', callback_data: 'urg:Плановий' }],
    ],
    contactPrompt: 'Крок 5 із 5: Вкажіть ваш <b>Telegram, WhatsApp або Email</b> для зв’язку:',
    finish: '✅ <b>Ваше звернення зареєстровано!</b>\n\nНаші юристи проводять первинний аналіз і зв’яжуться з вами найближчим часом.',
  },

  es: {
    welcome: '⚖️ <b>V. I. LEVIN — Práctica Jurídica Internacional</b>\n\nBienvenido a nuestra pasarela segura de evaluación legal preliminar.\n\n🔒 Todas las comunicaciones están protegidas por el secreto profesional (Attorney-Client Privilege) y confidencialidad.\n\nPaso 1 de 5: Seleccione el <b>área de práctica</b> de su consulta:',
    cats: [
      [{ text: '🇺🇸 Inmigración a EE.UU. & Green Card', callback_data: 'cat:Inmigración a EE.UU.' }],
      [{ text: '🌍 Contratos Internacionales & Estructuración', callback_data: 'cat:Contratos Internacionales' }],
      [{ text: '⚖️ Arbitraje & Litigios Transfronterizos', callback_data: 'cat:Arbitraje y Litigios' }],
      [{ text: '💼 Derecho Corporativo & Protección Patrimonial', callback_data: 'cat:Derecho Corporativo' }],
      [{ text: '❓ Otra Consulta Jurídica', callback_data: 'cat:Otra Consulta' }],
    ],
    jurTitle: 'Paso 2 de 5: Indique la <b>jurisdicción principal</b>:',
    jurs: [
      [{ text: '🇺🇸 Estados Unidos', callback_data: 'jur:EE.UU.' }, { text: '🇪🇺 UE / Alemania', callback_data: 'jur:UE' }],
      [{ text: '🇦🇪 EAU (DIFC)', callback_data: 'jur:EAU' }, { text: '🇬🇧 Reino Unido', callback_data: 'jur:Reino Unido' }],
      [{ text: '🇨🇾 Chipre', callback_data: 'jur:Chipre' }, { text: '🇬🇪 Georgia', callback_data: 'jur:Georgia' }],
      [{ text: '🌍 Otra jurisdicción', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Paso 3 de 5: <b>Describa brevemente su situación</b> (hechos clave, fase actual, objetivos):\n\n<i>⚠️ No comparta contraseñas ni datos bancarios.</i>',
    urgTitle: 'Paso 4 de 5: Seleccione el <b>nivel de urgencia</b>:',
    urgs: [
      [{ text: '🔥 Urgente (1-2 días)', callback_data: 'urg:Urgente' }],
      [{ text: '⚡ En el plazo de una semana', callback_data: 'urg:Una semana' }],
      [{ text: '📅 Consulta programada', callback_data: 'urg:Programada' }],
    ],
    contactPrompt: 'Paso 5 de 5: Indique su <b>Telegram, WhatsApp o Email</b> de contacto:',
    finish: '✅ <b>¡Su solicitud ha sido registrada con éxito!</b>\n\nNuestro equipo jurídico está realizando la evaluación preliminar y se pondrá en contacto con usted a la brevedad.',
  },
  it: {
    welcome: '⚖️ <b>V. I. LEVIN — Pratica Legale Internazionale</b>\n\nBenvenuti nel gateway sicuro di valutazione legale preliminare.\n\n🔒 Tutte le comunicazioni sono protette dal segreto professionale (Attorney-Client Privilege) e da accordi di riservatezza.\n\nPasso 1 di 5: Selezioni il <b>settore di attività</b> della Sua richiesta:',
    cats: [
      [{ text: '🇺🇸 Immigrazione USA & Green Card', callback_data: 'cat:Immigrazione USA' }],
      [{ text: '🌍 Contratti Internazionali & Strutturazione', callback_data: 'cat:Contratti Internazionali' }],
      [{ text: '⚖️ Arbitrato & Contenziosi Transfrontalieri', callback_data: 'cat:Arbitrato e Contenziosi' }],
      [{ text: '💼 Diritto Societario & Tutela Patrimoniale', callback_data: 'cat:Diritto Societario' }],
      [{ text: '❓ Altro Quesito Legale', callback_data: 'cat:Altro' }],
    ],
    jurTitle: 'Passo 2 di 5: Indichi la <b>giurisdizione principale</b>:',
    jurs: [
      [{ text: '🇺🇸 Stati Uniti', callback_data: 'jur:USA' }, { text: '🇪🇺 UE / Germania', callback_data: 'jur:UE' }],
      [{ text: '🇦🇪 EAU (DIFC)', callback_data: 'jur:EAU' }, { text: '🇬🇧 Regno Unito', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Cipro', callback_data: 'jur:Cipro' }, { text: '🇬🇪 Georgia', callback_data: 'jur:Georgia' }],
      [{ text: '🌍 Altra giurisdizione', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Passo 3 di 5: <b>Descriva brevemente la Sua situazione</b> (fatti salienti, fase attuale, obiettivi):\n\n<i>⚠️ Non condivida password né dati di pagamento.</i>',
    urgTitle: 'Passo 4 di 5: Selezioni il <b>livello di urgenza</b>:',
    urgs: [
      [{ text: '🔥 Urgente (1-2 giorni)', callback_data: 'urg:Urgente' }],
      [{ text: '⚡ Entro una settimana', callback_data: 'urg:Una settimana' }],
      [{ text: '📅 Consulenza programmata', callback_data: 'urg:Programmata' }],
    ],
    contactPrompt: 'Passo 5 di 5: Indichi il Suo contatto <b>Telegram, WhatsApp o Email</b>:',
    finish: '✅ <b>La Sua richiesta è stata registrata con successo!</b>\n\nIl nostro team legale sta esaminando il caso e La ricontatterà al più presto.',
  },
  fr: {
    welcome: '⚖️ <b>V. I. LEVIN — Pratique Juridique Internationale</b>\n\nBienvenue sur notre portail sécurisé d’évaluation juridique préliminaire.\n\n🔒 Toutes les communications sont strictement protégées par le secret professionnel (Attorney-Client Privilege) et la confidentialité.\n\nÉtape 1 sur 5 : Sélectionnez le <b>domaine juridique</b> de votre demande :',
    cats: [
      [{ text: '🇺🇸 Immigration USA & Green Card', callback_data: 'cat:Immigration USA' }],
      [{ text: '🌍 Contrats Internationaux & Structuration', callback_data: 'cat:Contrats Internationaux' }],
      [{ text: '⚖️ Arbitrage & Contentieux Transfrontaliers', callback_data: 'cat:Arbitrage' }],
      [{ text: '💼 Droit des Sociétés & Protection d’Actifs', callback_data: 'cat:Droit des Sociétés' }],
      [{ text: '❓ Autre Question Juridique', callback_data: 'cat:Autre' }],
    ],
    jurTitle: 'Étape 2 sur 5 : Précisez la <b>juridiction principale</b> :',
    jurs: [
      [{ text: '🇺🇸 États-Unis', callback_data: 'jur:USA' }, { text: '🇪🇺 UE / Allemagne', callback_data: 'jur:UE' }],
      [{ text: '🇦🇪 ÉAU (DIFC)', callback_data: 'jur:ÉAU' }, { text: '🇬🇧 Royaume-Uni', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Chypre', callback_data: 'jur:Chypre' }, { text: '🇬🇪 Géorgie', callback_data: 'jur:Géorgie' }],
      [{ text: '🌍 Autre juridiction', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Étape 3 sur 5 : <b>Décrivez brièvement votre situation</b> (faits essentiels, phase actuelle, objectifs) :\n\n<i>⚠️ Ne transmettez ni mots de passe ni coordonnées bancaires.</i>',
    urgTitle: 'Étape 4 sur 5 : Choisissez le <b>degré d’urgence</b> :',
    urgs: [
      [{ text: '🔥 Urgent (1-2 jours)', callback_data: 'urg:Urgent' }],
      [{ text: '⚡ D’ici une semaine', callback_data: 'urg:Une semaine' }],
      [{ text: '📅 Consultation planifiée', callback_data: 'urg:Planifiée' }],
    ],
    contactPrompt: 'Étape 5 sur 5 : Indiquez votre <b>Telegram, WhatsApp ou Email</b> de contact :',
    finish: '✅ <b>Votre demande a été enregistrée avec succès !</b>\n\nNotre équipe juridique effectue l’analyse préliminaire et prendra contact avec vous dans les meilleurs délais.',
  },
};

async function notifyAdminLead(lead) {
  leadsCache.set(lead.id, lead);
  saveLeadsToDisk();

  if (!ADMIN_CHAT_ID) return;

  const leadNum = String(lead.id || '').replace(/^LEAD-?/i, '');

  const adminMsg = [
    `⚖️ <b>V. I. LEVIN | НОВАЯ ЗАЯВКА</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `Новое обращение доверителя:`,
    ``,
    `🆔 <b>ID Заявки:</b> <code>${escapeHtml(lead.id)}</code>`,
    `📅 <b>Время:</b> ${new Date(lead.createdAt).toLocaleString('ru-RU')}`,
    `🌐 <b>Язык доверителя:</b> <code>${escapeHtml(lead.lang || 'ru').toUpperCase()}</code>`,
    ``,
    `📁 <b>Направление:</b> ${escapeHtml(lead.serviceCategory)}`,
    `🌍 <b>Юрисдикция:</b> ${escapeHtml(lead.jurisdiction)}`,
    `⚡ <b>Срочность:</b> ${escapeHtml(lead.urgency)}`,
    ``,
    `📝 <b>Суть ситуации:</b>`,
    `<i>${escapeHtml(lead.description)}</i>`,
    ``,
    `👤 <b>Контакты доверителя:</b>`,
    `• Telegram: ${lead.contact?.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername) : 'Не указан'}`,
    `• Телефон / WhatsApp / Email: ${escapeHtml(lead.contact?.info || 'Не указан')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <i>Заявка поступила руководителю практики. Выберите действие:</i>`
  ].filter((line) => typeof line === 'string').join('\n');

  const res = await sendMessage(ADMIN_CHAT_ID, adminMsg, {
    inline_keyboard: [
      [
        { text: '👨‍⚖️ Направить юристу', callback_data: `admin:forward:${lead.id}` },
        { text: '💬 Ответить клиенту', callback_data: `admin:reply:${lead.id}` }
      ],
      [
        { text: '💳 Выставить счет (CryptoBot / USDT)', callback_data: `admin:pay:${lead.id}` }
      ]
    ]
  });

  if (res.ok && res.result?.message_id) {
    msgToLeadMap.set(String(res.result.message_id), lead.id);
  }
}

async function forwardLeadToLawyer(leadId) {
  const lead = leadsCache.get(leadId);
  if (!lead) {
    await sendMessage(ADMIN_CHAT_ID, `⚠️ Заявка <code>${leadId}</code> не найдена в кэше.`);
    return;
  }

  lead.status = 'assigned';
  lead.assignedTo = LAWYER_CHAT_ID;
  saveLeadsToDisk();

  const lawyerMsg = [
    `⚖️ <b>V. I. LEVIN | НОВАЯ ЗАЯВКА</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `Вам перенаправлено новое обращение доверителя:`,
    ``,
    `🆔 <b>ID Дела:</b> <code>${escapeHtml(lead.id)}</code>`,
    `📅 <b>Дата поступления:</b> ${new Date(lead.createdAt).toLocaleString('ru-RU')}`,
    `📁 <b>Специализация:</b> ${escapeHtml(lead.serviceCategory)}`,
    `🌍 <b>Юрисдикция:</b> ${escapeHtml(lead.jurisdiction)}`,
    `⚡ <b>Срочность:</b> ${escapeHtml(lead.urgency)}`,
    ``,
    `📝 <b>Фабула дела / Ситуация:</b>`,
    `<i>${escapeHtml(lead.description)}</i>`,
    ``,
    `👤 <b>Данные доверителя:</b>`,
    `• Telegram: ${lead.contact?.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername) : 'Не указан'}`,
    `• Контакт (WhatsApp/Email): ${escapeHtml(lead.contact?.info || 'Не указан')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <i>Подтвердите готовность взять кейс в работу или отклоните:</i>`
  ].filter((line) => typeof line === 'string').join('\n');

  try {
    const res = await sendMessage(LAWYER_CHAT_ID, lawyerMsg, {
      inline_keyboard: [
        [
          { text: '✅ Берусь за дело', callback_data: `lawyer:accept:${lead.id}` },
          { text: '❌ Отклонить кейс', callback_data: `lawyer:reject:${lead.id}` }
        ],
        [
          { text: '💬 Ответить клиенту', callback_data: `lawyer:reply:${lead.id}` }
        ]
      ]
    });

    if (res.ok) {
      if (res.result?.message_id) {
        msgToLeadMap.set(String(res.result.message_id), lead.id);
      }
      await sendMessage(ADMIN_CHAT_ID, `✅ <b>Дело #${leadId} успешно направлено юристу!</b>\n\n• Получатель ID: <code>${LAWYER_CHAT_ID}</code>\n• Статус: Ожидает подтверждения (Берусь / Отклоняю)`);
    } else {
      await sendMessage(ADMIN_CHAT_ID, `⚠️ <b>Не удалось доставить юристу (ID ${LAWYER_CHAT_ID}):</b>\n<code>${JSON.stringify(res)}</code>\n\n<i>Примечание: юрист должен хотя бы раз нажать /start в боте @VILEVIN_bot для получения сообщений.</i>`);
    }
  } catch (err) {
    await sendMessage(ADMIN_CHAT_ID, `❌ Ошибка отправки: ${err.message}`);
  }
}

async function handleLawyerAccept(leadId) {
  const lead = leadsCache.get(leadId);
  if (!lead) return;

  lead.status = 'accepted';
  lead.acceptedAt = new Date().toISOString();
  saveLeadsToDisk();

  await sendMessage(LAWYER_CHAT_ID, `✅ <b>Вы подтвердили взятие дела #${lead.id} в работу!</b>\n\nВы можете вести диалог с клиентом через кнопку «Ответить клиенту» или отвечая на карточку дела.`);
  
  await sendMessage(ADMIN_CHAT_ID, [
    `✅ <b>ОТЧЕТ: ЮРИСТ ВЗЯЛ КЕЙС В РАБОТУ</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `• Кейс: <code>#${lead.id}</code>`,
    `• Юрист ID: <code>${LAWYER_CHAT_ID}</code>`,
    `• Специализация: ${lead.serviceCategory}`,
    `• Клиент: ${lead.contact?.telegramUsername ? '@' + lead.contact.telegramUsername : lead.contact?.info || 'Анонимно'}`,
    `• Статус: <b>В производстве</b>`
  ].join('\n'));
}

async function handleLawyerReject(leadId) {
  const lead = leadsCache.get(leadId);
  if (!lead) return;

  lead.status = 'rejected';
  lead.rejectedAt = new Date().toISOString();
  saveLeadsToDisk();

  await sendMessage(LAWYER_CHAT_ID, `❌ <b>Вы отклонили кейс #${lead.id}.</b> Руководитель уведомлен.`);
  
  await sendMessage(ADMIN_CHAT_ID, [
    `⚠️ <b>ВНИМАНИЕ: ЮРИСТ ОТКЛОНИЛ КЕЙС!</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `• Кейс: <code>#${lead.id}</code>`,
    `• Юрист ID: <code>${LAWYER_CHAT_ID}</code>`,
    `• Направление: ${lead.serviceCategory}`,
    `• Описание: <i>${escapeHtml(lead.description)}</i>`,
    ``,
    `Вы можете ответить клиенту самостоятельно или переназначить дело.`
  ].join('\n'), {
    inline_keyboard: [
      [
        { text: '💬 Ответить клиенту лично', callback_data: `admin:reply:${lead.id}` },
        { text: '💳 Выставить счет', callback_data: `admin:pay:${lead.id}` }
      ]
    ]
  });
}

async function createCryptoBotInvoice(amount, asset = 'USDT', description = 'Legal services') {
  if (!CRYPTOBOT_API_TOKEN) return null;
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      asset: asset,
      amount: String(amount),
      description: description,
      paid_btn_name: 'callback',
      paid_btn_url: 'https://t.me/VILEVIN_bot'
    });

    const options = {
      hostname: 'pay.crypt.bot',
      port: 443,
      path: '/api/createInvoice',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Crypto-Pay-API-Token': CRYPTOBOT_API_TOKEN,
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.ok && json.result) {
            resolve(json.result);
          } else {
            console.error('CryptoBot API response:', body);
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.error('CryptoBot request failed:', err.message);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function sendPaymentInvoiceToClient(leadId, amount, initiatorChatId) {
  const lead = leadsCache.get(leadId);
  if (!lead || !lead.chatId) {
    await sendMessage(initiatorChatId, `⚠️ Не удалось отправить счет: клиентский чат не найден для дела #${leadId}.`);
    return;
  }

  let cryptoBotUrl = 'https://t.me/CryptoBot?start=invoice';
  let isOfficialInvoice = false;

  if (CRYPTOBOT_API_TOKEN) {
    const inv = await createCryptoBotInvoice(amount, 'USDT', `Оплата юридических услуг V. I. LEVIN по делу #${lead.id}`);
    if (inv && inv.pay_url) {
      cryptoBotUrl = inv.pay_url;
      isOfficialInvoice = true;
    }
  }

  const invoiceMsg = [
    `💳 <b>СЧЕТ НА ОПЛАТУ ЮРИДИЧЕСКИХ УСЛУГ V. I. LEVIN</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `• <b>Номер дела:</b> <code>#${escapeHtml(lead.id)}</code>`,
    `• <b>Назначение:</b> Правовой аудит и юридический анализ кейса`,
    `• <b>Сумма к оплате:</b> <b>${amount} USDT</b>`,
    ``,
    `💎 <b>Способ 1: Оплата через Telegram @CryptoBot</b>`,
    isOfficialInvoice
      ? `Официальный счет сформирован. Нажмите кнопку ниже для моментальной оплаты в 1 клик через @CryptoBot:`
      : `Быстрая оплата в 1 клик через официального бота Telegram без комиссии сети:`,
    `👉 <a href="${cryptoBotUrl}">Оплатить через @CryptoBot</a>`,
    ``,
    `🏦 <b>Способ 2: Прямой перевод USDT (TRC-20)</b>`,
    `Сеть: <b>TRON (TRC-20)</b>`,
    `Адрес кошелька (нажмите для копирования):`,
    `<code>${DEFAULT_USDT_WALLET}</code>`,
    ``,
    `<i>⚠️ Важно: перевод отправляйте строго в сети TRON (TRC-20). После совершения перевода нажмите кнопку ниже или отправьте хеш транзакции (TXID) в этот чат.</i>`
  ].join('\n');

  const clientRes = await sendMessage(lead.chatId, invoiceMsg, {
    inline_keyboard: [
      [
        { text: `🚀 Оплатить ${amount} USDT в @CryptoBot`, url: cryptoBotUrl }
      ],
      [
        { text: '✅ Я оплатил (подтвердить)', callback_data: `client:paid:${lead.id}` }
      ]
    ]
  });

  if (clientRes.ok) {
    await sendMessage(initiatorChatId, `✅ <b>Счет на ${amount} USDT успешно выставлен клиенту по делу #${lead.id}!</b>\n\n${isOfficialInvoice ? '💎 <i>Сгенерирован персональный инвойс Crypto Pay API</i>\n' : ''}Клиент получил реквизиты кошелька и ссылку на @CryptoBot.`);
  } else {
    await sendMessage(initiatorChatId, `⚠️ Ошибка отправки счета клиенту: ${JSON.stringify(clientRes)}`);
  }
}

async function handleUpdate(update) {
  // 1. Callbacks
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId = cb.message.chat.id;
    const data = cb.data;
    saveBotUser(chatId, cb.from);
    let session = userSessions.get(chatId) || { lang: 'ru', step: 'lang' };
    const t = I18N[session.lang] || I18N.ru;

    // Language selection
    if (data.startsWith('lang:')) {
      const chosenLang = data.replace('lang:', '');
      session.lang = chosenLang;
      session.step = 'category';
      userSessions.set(chatId, session);
      saveBotUser(chatId, cb.from, { lang: chosenLang });

      const localizedT = I18N[chosenLang] || I18N.ru;
      await sendMessage(chatId, localizedT.welcome, {
        inline_keyboard: localizedT.cats
      });
      return;
    }

    // Admin action: Forward to Lawyer
    if (data.startsWith('admin:forward:')) {
      const leadId = data.replace('admin:forward:', '');
      await forwardLeadToLawyer(leadId);
      return;
    }

    // Lawyer action: Accept case
    if (data.startsWith('lawyer:accept:')) {
      const leadId = data.replace('lawyer:accept:', '');
      await handleLawyerAccept(leadId);
      return;
    }

    // Lawyer action: Reject case
    if (data.startsWith('lawyer:reject:')) {
      const leadId = data.replace('lawyer:reject:', '');
      await handleLawyerReject(leadId);
      return;
    }

    // Reply to client prompt
    if (data.startsWith('admin:reply:') || data.startsWith('lawyer:reply:')) {
      const isLawyer = data.startsWith('lawyer:reply:');
      const leadId = data.replace(isLawyer ? 'lawyer:reply:' : 'admin:reply:', '');
      const lead = leadsCache.get(leadId);
      if (!lead || !lead.chatId) {
        await sendMessage(chatId, `⚠️ Клиентский чат не найден для дела #${leadId}.`);
        return;
      }
      activeReplySessions.set(chatId, { leadId, clientChatId: lead.chatId, role: isLawyer ? 'lawyer' : 'admin' });
      await sendMessage(chatId, `✍️ <b>Режим прямого ответа клиенту по делу #${leadId}:</b>\n\nНапишите текст ответа следующим сообщением (или отправьте /cancel для отмены). Он будет доставлен клиенту от имени юридической практики V. I. LEVIN.`);
      return;
    }

    // Invoicing options prompt (Admin ONLY)
    if (data.startsWith('admin:pay:')) {
      if (String(chatId) !== String(ADMIN_CHAT_ID)) {
        await sendMessage(chatId, '⛔ <b>Доступ ограничен.</b> Выставлять счета на оплату имеет право исключительно руководитель практики.');
        return;
      }
      const leadId = data.replace('admin:pay:', '');
      await sendMessage(chatId, `💳 <b>Выставление счета для дела #${leadId}:</b>\n\nВыберите фиксированную сумму или введите команду <code>/invoice ${leadId} СУММА</code>:`, {
        inline_keyboard: [
          [
            { text: '100 USDT', callback_data: `sendpay:${leadId}:100` },
            { text: '300 USDT', callback_data: `sendpay:${leadId}:300` },
            { text: '500 USDT', callback_data: `sendpay:${leadId}:500` }
          ],
          [
            { text: '1,000 USDT', callback_data: `sendpay:${leadId}:1000` },
            { text: '2,500 USDT', callback_data: `sendpay:${leadId}:2500` },
            { text: '5,000 USDT', callback_data: `sendpay:${leadId}:5000` }
          ],
          [
            { text: '✏️ Ввести другую сумму', callback_data: `custompay:${leadId}` }
          ]
        ]
      });
      return;
    }

    // Send preset payment invoice (Admin ONLY)
    if (data.startsWith('sendpay:')) {
      if (String(chatId) !== String(ADMIN_CHAT_ID)) {
        await sendMessage(chatId, '⛔ <b>Доступ ограничен.</b> Выставлять счета на оплату имеет право исключительно руководитель практики.');
        return;
      }
      const parts = data.split(':');
      const leadId = parts[1];
      const amount = parts[2];
      await sendPaymentInvoiceToClient(leadId, amount, chatId);
      return;
    }

    // Custom pay prompt (Admin ONLY)
    if (data.startsWith('custompay:')) {
      if (String(chatId) !== String(ADMIN_CHAT_ID)) {
        await sendMessage(chatId, '⛔ <b>Доступ ограничен.</b> Выставлять счета на оплату имеет право исключительно руководитель практики.');
        return;
      }
      const leadId = data.replace('custompay:', '');
      const lead = leadsCache.get(leadId);
      activePayInputSessions.set(chatId, { leadId, clientChatId: lead?.chatId });
      await sendMessage(chatId, `💵 <b>Введите сумму в USDT (только число, например 750):</b>`);
      return;
    }

    // Client clicked: I paid
    if (data.startsWith('client:paid:')) {
      const leadId = data.replace('client:paid:', '');
      await sendMessage(chatId, `✅ <b>Спасибо! Уведомление об оплате передано финансовому отделу.</b>\n\nДля ускорения проверки отправьте хеш транзакции (TXID) или скриншот квитанции в этот чат.`);
      
      const paidNotification = `🔔 <b>КЛИЕНТ СООБЩИЛ ОБ ОПЛАТЕ ПО ДЕЛУ #${leadId}!</b>\n\nПроверьте поступление USDT (TRC-20) на кошелек или в @CryptoBot.`;
      if (ADMIN_CHAT_ID) await sendMessage(ADMIN_CHAT_ID, paidNotification);
      if (LAWYER_CHAT_ID) await sendMessage(LAWYER_CHAT_ID, paidNotification);
      return;
    }

    // Category selection
    if (data.startsWith('cat:')) {
      session.serviceCategory = data.replace('cat:', '');
      session.step = 'jurisdiction';
      userSessions.set(chatId, session);

      await sendMessage(chatId, t.jurTitle, {
        inline_keyboard: t.jurs
      });
      return;
    }

    // Jurisdiction selection
    if (data.startsWith('jur:')) {
      const jur = data.replace('jur:', '');
      if (jur === 'custom') {
        session.step = 'awaiting_custom_jur';
        userSessions.set(chatId, session);
        await sendMessage(chatId, 'Укажите страну / юрисдикцию текстом:');
        return;
      }
      session.jurisdiction = jur;
      session.step = 'description';
      userSessions.set(chatId, session);

      await sendMessage(chatId, t.descPrompt);
      return;
    }

    // Urgency selection
    if (data.startsWith('urg:')) {
      session.urgency = data.replace('urg:', '');
      session.step = 'contact';
      userSessions.set(chatId, session);

      await sendMessage(chatId, t.contactPrompt);
      return;
    }
  }

  // 2. Text Messages
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text.trim();
    const fromUser = update.message.from;
    saveBotUser(chatId, fromUser);
    const isStaff = String(chatId) === String(ADMIN_CHAT_ID) || String(chatId) === String(LAWYER_CHAT_ID);

    // Cancel active input mode
    if (text === '/cancel') {
      activeReplySessions.delete(chatId);
      activePayInputSessions.delete(chatId);
      await sendMessage(chatId, '❌ Текущее действие отменено.');
      return;
    }

    // Custom pay input
    if (activePayInputSessions.has(chatId)) {
      const paySession = activePayInputSessions.get(chatId);
      activePayInputSessions.delete(chatId);
      const cleanAmount = text.replace(/[^0-9.]/g, '');
      if (cleanAmount && !isNaN(cleanAmount)) {
        await sendPaymentInvoiceToClient(paySession.leadId, cleanAmount, chatId);
        return;
      } else {
        await sendMessage(chatId, '⚠️ Некорректная сумма. Пожалуйста, используйте число (например, 750).');
        return;
      }
    }

    // Active reply session (admin or lawyer answering client)
    if (activeReplySessions.has(chatId)) {
      const replyData = activeReplySessions.get(chatId);
      activeReplySessions.delete(chatId);

      const clientMsg = `⚖️ <b>Сообщение от юридической практики V. I. LEVIN:</b>\n\n${escapeHtml(text)}`;
      const res = await sendMessage(replyData.clientChatId, clientMsg);
      if (res.ok) {
        await sendMessage(chatId, `✅ <b>Сообщение успешно доставлено клиенту по делу #${replyData.leadId}!</b>`);
      } else {
        await sendMessage(chatId, `⚠️ Не удалось доставить сообщение клиенту: ${JSON.stringify(res)}`);
      }
      return;
    }

    // Native Telegram Swipe-to-Reply from Admin or Lawyer
    if (isStaff && update.message.reply_to_message) {
      const replyToId = String(update.message.reply_to_message.message_id);
      const leadId = msgToLeadMap.get(replyToId);
      if (leadId) {
        const lead = leadsCache.get(leadId);
        if (lead && lead.chatId) {
          const clientMsg = `⚖️ <b>Сообщение от юридической практики V. I. LEVIN:</b>\n\n${escapeHtml(text)}`;
          const res = await sendMessage(lead.chatId, clientMsg);
          if (res.ok) {
            await sendMessage(chatId, `✅ <b>Ваш ответ отправлен клиенту по делу #${leadId}!</b>`);
            return;
          }
        }
      }
    }

    // Staff commands
    if (isStaff) {
      if (text === '/users' || text === '/stats') {
        const allUsers = Array.from(botUsers.values());
        const allLeads = Array.from(leadsCache.values());
        const report = [
          `📊 <b>БАЗА ПОЛЬЗОВАТЕЛЕЙ И СТАТИСТИКА:</b>`,
          `━━━━━━━━━━━━━━━━━━`,
          `👥 <b>Всего пользователей в базе:</b> ${allUsers.length}`,
          `📁 <b>Всего заявок в системе:</b> ${allLeads.length}`,
          ``,
          `<b>Последние доверители (нажали /start):</b>`,
          ...allUsers.slice(-10).reverse().map((u, i) => 
            `${i+1}. ${escapeHtml(u.firstName || '')} ${escapeHtml(u.lastName || '')} (${u.username || 'нет username'}) — ID: <code>${u.id}</code> [${new Date(u.lastSeen).toLocaleDateString('ru-RU')}]`
          )
        ].join('\n');
        await sendMessage(chatId, report);
        return;
      }
      if (text.startsWith('/invoice')) {
        if (String(chatId) !== String(ADMIN_CHAT_ID)) {
          await sendMessage(chatId, '⛔ <b>Доступ ограничен.</b> Выставлять счета на оплату имеет право исключительно руководитель практики.');
          return;
        }
        const parts = text.split(' ');
        const leadId = parts[1] || '';
        const amount = parts[2] || '500';
        if (leadId) {
          await sendPaymentInvoiceToClient(leadId, amount, chatId);
          return;
        } else {
          await sendMessage(chatId, 'Используйте: <code>/invoice ID_КЕЙСА СУММА</code> (например: <code>/invoice LEAD-123456 750</code>)');
          return;
        }
      }
      if (text.startsWith('/forward') || text.startsWith('/assign')) {
        const parts = text.split(' ');
        const leadId = parts[1] || '';
        if (leadId) {
          await forwardLeadToLawyer(leadId);
          return;
        }
      }
    }

    let session = userSessions.get(chatId) || { lang: 'ru', step: 'lang' };
    const t = I18N[session.lang] || I18N.ru;

    // User /start
    if (text.startsWith('/start')) {
      saveBotUser(chatId, fromUser, { started: true });
      session = {
        lang: 'ru',
        step: 'lang',
        chatId: chatId,
        contact: {
          telegramUsername: fromUser.username || '',
          name: [fromUser.first_name, fromUser.last_name].filter(Boolean).join(' ')
        }
      };
      userSessions.set(chatId, session);

      await sendMessage(chatId, `⚖️ <b>V. I. LEVIN | International Legal Practice</b>\n\nПожалуйста, выберите язык обслуживания / Please choose your language:`, {
        inline_keyboard: [
          [{ text: '🇷🇺 Русский', callback_data: 'lang:ru' }, { text: '🇬🇧 English', callback_data: 'lang:en' }],
          [{ text: '🇺🇦 Українська', callback_data: 'lang:uk' }, { text: '🇪🇸 Español', callback_data: 'lang:es' }],
          [{ text: '🇮🇹 Italiano', callback_data: 'lang:it' }, { text: '🇫🇷 Français', callback_data: 'lang:fr' }],
        ]
      });
      return;
    }

    // Step: awaiting custom jurisdiction
    if (session.step === 'awaiting_custom_jur') {
      session.jurisdiction = text;
      session.step = 'description';
      userSessions.set(chatId, session);
      await sendMessage(chatId, t.descPrompt);
      return;
    }

    // Step: description
    if (session.step === 'description') {
      session.description = text;
      session.step = 'urgency';
      userSessions.set(chatId, session);

      await sendMessage(chatId, t.urgTitle, {
        inline_keyboard: t.urgs
      });
      return;
    }

    // Step: contact (Step 5)
    if (session.step === 'contact') {
      if (!session.contact) session.contact = {};
      if (!session.contact.telegramUsername && fromUser?.username) {
        session.contact.telegramUsername = fromUser.username;
      }
      session.contact.info = text;
      session.id = getNextLeadId();
      session.createdAt = new Date().toISOString();
      session.chatId = chatId;
      session.status = 'new';
      saveBotUser(chatId, fromUser, { hasLead: true, lastLeadId: session.id });

      await sendMessage(chatId, t.finish);
      await notifyAdminLead(session);

      userSessions.delete(chatId);
      return;
    }

    // Client wrote a regular message (feedback or continuation)
    let clientLead = null;
    for (const lead of leadsCache.values()) {
      if (String(lead.chatId) === String(chatId)) {
        clientLead = lead;
        break;
      }
    }

    if (clientLead) {
      const incomingNote = [
        `💬 <b>Входящее сообщение от клиента по делу #${clientLead.id}</b>`,
        `━━━━━━━━━━━━━━━━━━`,
        `От: ${escapeHtml(fromUser.first_name)} (@${fromUser.username || 'нет username'})`,
        `Текст: <i>${escapeHtml(text)}</i>`,
        ``,
        `<i>Вы можете ответить клиенту прямо сейчас: используйте кнопку «Ответить» или Swipe-to-Reply в Telegram.</i>`
      ].join('\n');

      if (ADMIN_CHAT_ID) {
        const res = await sendMessage(ADMIN_CHAT_ID, incomingNote, {
          inline_keyboard: [
            [
              { text: '💬 Ответить клиенту', callback_data: `admin:reply:${clientLead.id}` },
              { text: '💳 Выставить счет', callback_data: `admin:pay:${clientLead.id}` }
            ]
          ]
        });
        if (res.ok && res.result?.message_id) {
          msgToLeadMap.set(String(res.result.message_id), clientLead.id);
        }
      }

      if (clientLead.assignedTo && String(clientLead.assignedTo) === String(LAWYER_CHAT_ID)) {
        const res = await sendMessage(LAWYER_CHAT_ID, incomingNote, {
          inline_keyboard: [
            [
              { text: '💬 Ответить клиенту', callback_data: `lawyer:reply:${clientLead.id}` },
              { text: '💳 Выставить счет', callback_data: `lawyer:pay:${clientLead.id}` }
            ]
          ]
        });
        if (res.ok && res.result?.message_id) {
          msgToLeadMap.set(String(res.result.message_id), clientLead.id);
        }
      }
      return;
    }

    // Fallback
    await sendMessage(chatId, 'Для начала работы или нового обращения отправьте команду /start');
  }
}

// Long Polling loop
let lastUpdateId = 0;
async function pollUpdates() {
  try {
    const res = await apiRequest('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 25,
    });

    if (res.ok && Array.isArray(res.result)) {
      for (const update of res.result) {
        lastUpdateId = update.update_id;
        try {
          await handleUpdate(update);
        } catch (err) {
          console.error('Update handling error:', err);
        }
      }
    }
  } catch (e) {
    await new Promise((r) => setTimeout(r, 2500));
  }

  setImmediate(pollUpdates);
}

pollUpdates();
