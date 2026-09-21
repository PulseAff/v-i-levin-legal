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

console.log('🚀 Запуск Telegram-бота V. I. LEVIN (@VILEVIN_bot)...');
console.log(`👑 Admin Chat ID: ${ADMIN_CHAT_ID}`);
console.log(`👨‍⚖️ Lawyer Chat ID: ${LAWYER_CHAT_ID}`);

const userSessions = new Map();
const leadsCache = new Map();

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
    welcome: '⚖️ <b>V. I. LEVIN — Международная юридическая практика</b>\n\nДобро пожаловать в защищенный шлюз первичной правовой оценки.\n\n🔒 Все переданные сведения охраняются адвокатской тайной (Attorney-Client Privilege) и режимом строгой конфиденциальности.\n\nШаг 1 из 5: Выберите <b>направление вашего вопроса</b>:',
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
    contactPrompt: 'Шаг 5 из 5: Укажите ваше <b>имя</b> и удобный способ связи (номер телефона или email):',
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
    contactPrompt: 'Step 5 of 5: Please provide your <b>name</b> and contact preferences (phone or email):',
    finish: '✅ <b>Your inquiry has been securely registered!</b>\n\nOur legal team is conducting an initial assessment and will contact you promptly.',
  },
  uk: {
    welcome: '⚖️ <b>V. I. LEVIN — Міжнародна юридична практика</b>\n\nЛаскаво просимо до захищеного шлюзу попередньої правової оцінки.\n\n🔒 Усі відомості захищені режимом адвокатської таємниці та суворої конфіденційності.\n\nКрок 1 із 5: Оберіть <b>напрямок питання</b>:',
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
    contactPrompt: 'Крок 5 із 5: Вкажіть ваше <b>ім’я</b> та зручний спосіб зв’язку:',
    finish: '✅ <b>Ваше звернення зареєстровано!</b>\n\nНаші юристи проводять первинний аналіз і зв’яжуться з вами найближчим часом.',
  },
};

I18N.es = I18N.en;
I18N.it = I18N.en;
I18N.fr = I18N.en;

async function notifyAdminLead(lead) {
  leadsCache.set(lead.id, lead);

  // Save to leads.json
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const all = Array.from(leadsCache.values());
  fs.writeFileSync(dataFilePath, JSON.stringify(all, null, 2), 'utf8');

  if (!ADMIN_CHAT_ID) return;

  const adminMsg = [
    `⚖️ <b>НОВАЯ ЗАЯВКА ИЗ СИСТЕМЫ</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>ID Заявки:</b> <code>${escapeHtml(lead.id)}</code>`,
    `📅 <b>Время:</b> ${new Date(lead.createdAt).toLocaleString('ru-RU')}`,
    `🌐 <b>Язык:</b> <code>${escapeHtml(lead.lang || 'ru').toUpperCase()}</code>`,
    ``,
    `📁 <b>Направление:</b> ${escapeHtml(lead.serviceCategory)}`,
    `🌍 <b>Юрисдикция:</b> ${escapeHtml(lead.jurisdiction)}`,
    `⚡ <b>Срочность:</b> ${escapeHtml(lead.urgency)}`,
    ``,
    `📝 <b>Суть ситуации:</b>`,
    `<i>${escapeHtml(lead.description)}</i>`,
    ``,
    `👤 <b>Контакты доверителя:</b>`,
    `• Имя: ${escapeHtml(lead.contact?.name || 'Не указано')}`,
    `• Telegram: ${lead.contact?.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername) : 'Не указан'}`,
    `• Телефон / Email: ${escapeHtml(lead.contact?.info || lead.contact?.phone || lead.contact?.email || 'Не указан')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <b>Действия администратора:</b>`
  ].filter(Boolean).join('\n');

  await sendMessage(ADMIN_CHAT_ID, adminMsg, {
    inline_keyboard: [
      [
        { text: '👨‍⚖️ Переслать юристу (1275663257)', callback_data: `admin:forward:${lead.id}` },
        { text: '💳 Инвойс USDT', callback_data: `admin:cryptomus:${lead.id}` }
      ]
    ]
  });
}

async function forwardLeadToLawyer(leadId) {
  const lead = leadsCache.get(leadId);
  if (!lead) {
    await sendMessage(ADMIN_CHAT_ID, `⚠️ Заявка <code>${leadId}</code> не найдена в кэше.`);
    return;
  }

  const lawyerMsg = [
    `⚖️ <b>V. I. LEVIN | ПОРУЧЕНИЕ ПО НОВОМУ КЕЙСУ</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `Руководитель практики перенаправил вам новое обращение доверителя:`,
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
    `• Имя: ${escapeHtml(lead.contact?.name || 'Не указано')}`,
    `• Telegram: ${lead.contact?.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername) : 'Не указан'}`,
    `• Контакт: ${escapeHtml(lead.contact?.info || lead.contact?.phone || lead.contact?.email || 'Не указан')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <i>Режим Attorney-Client Privilege. Пожалуйста, проведите аудит ситуации и подготовьте проект правовой позиции.</i>`
  ].filter(Boolean).join('\n');

  try {
    const res = await sendMessage(LAWYER_CHAT_ID, lawyerMsg);
    if (res.ok) {
      await sendMessage(ADMIN_CHAT_ID, `✅ <b>Дело #${leadId} успешно перенаправлено юристу!</b>\n\n• Получатель ID: <code>${LAWYER_CHAT_ID}</code>\n• Статус: Доставлено`);
    } else {
      await sendMessage(ADMIN_CHAT_ID, `⚠️ <b>Не удалось доставить юристу (ID ${LAWYER_CHAT_ID}):</b>\n<code>${JSON.stringify(res)}</code>\n\n<i>Примечание: юрист должен хотя бы раз нажать /start в боте @VILEVIN_bot для получения сообщений.</i>`);
    }
  } catch (err) {
    await sendMessage(ADMIN_CHAT_ID, `❌ Ошибка отправки: ${err.message}`);
  }
}

async function handleUpdate(update) {
  // 1. Callbacks
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId = cb.message.chat.id;
    const data = cb.data;
    let session = userSessions.get(chatId) || { lang: 'ru', step: 'lang' };
    const t = I18N[session.lang] || I18N.ru;

    // Language selection
    if (data.startsWith('lang:')) {
      const chosenLang = data.replace('lang:', '');
      session.lang = chosenLang;
      session.step = 'category';
      userSessions.set(chatId, session);

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

    // Admin action: Cryptomus invoice
    if (data.startsWith('admin:cryptomus:')) {
      const leadId = data.replace('admin:cryptomus:', '');
      await sendMessage(chatId, `💳 <b>Инвойс USDT (Cryptomus) для дела #${leadId}</b>\n\n• Платежная система: Cryptomus Gateway\n• Валюта: USDT (сеть TRC-20, ERC-20, Polygon)\n• Назначение: Индивидуальный правовой аудит и юридические услуги V. I. LEVIN\n\nДля выставления счета клиенту отправьте ссылку из мерчант-кабинета или используйте команду:\n<code>/invoice 500</code> (где 500 — сумма в USDT)`);
      return;
    }

    // Category
    if (data.startsWith('cat:')) {
      session.serviceCategory = data.replace('cat:', '');
      session.step = 'jurisdiction';
      userSessions.set(chatId, session);

      await sendMessage(chatId, t.jurTitle, {
        inline_keyboard: t.jurs
      });
      return;
    }

    // Jurisdiction
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

    // Urgency
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
    let session = userSessions.get(chatId) || { lang: 'ru', step: 'lang' };
    const t = I18N[session.lang] || I18N.ru;

    // Admin commands
    if (String(chatId) === String(ADMIN_CHAT_ID)) {
      if (text.startsWith('/forward') || text.startsWith('/assign')) {
        const parts = text.split(' ');
        const leadId = parts[1] || '';
        if (leadId) {
          await forwardLeadToLawyer(leadId);
          return;
        }
      }
      if (text.startsWith('/invoice')) {
        const amount = text.split(' ')[1] || '500';
        await sendMessage(chatId, `💳 <b>Инвойс Cryptomus сформирован:</b>\n\n• Сумма к оплате: <code>${amount} USDT</code>\n• Сети: TRC20 / ERC20 / Polygon\n• Статус: Ожидает оплаты\n• Фискальный статус: Закрывающие акты и договор формируются автоматически.`);
        return;
      }
    }

    // User /start
    if (text.startsWith('/start')) {
      session = {
        lang: 'ru',
        step: 'lang',
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

    // Step: contact
    if (session.step === 'contact') {
      session.contact.info = text;
      session.id = 'LEAD-' + Date.now().toString().slice(-6);
      session.createdAt = new Date().toISOString();

      await sendMessage(chatId, t.finish);
      await notifyAdminLead(session);

      userSessions.delete(chatId);
      return;
    }

    // Fallback
    await sendMessage(chatId, 'Для начала работы или смены языка отправьте /start');
  }
}

// Long Polling
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
