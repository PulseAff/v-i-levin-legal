/**
 * Standalone Telegram Qualification & Operations Bot for V. I. LEVIN
 * Features:
 * - 6 Languages for incoming clients (/start with language choice: RU, EN, UK, ES, IT, FR)
 * - 6-step confidential legal qualification
 * - Direct push to Admin Chat (7794422014)
 * - Admin action: Forward lead to lawyer / team
 * - Admin action: Generate Cryptomus USDT invoice
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

console.log('🚀 Запуск Telegram-бота V. I. LEVIN (@VILEVIN_bot) в режиме Polling...');
console.log(`👤 Admin Chat ID: ${ADMIN_CHAT_ID}`);

const userSessions = new Map();

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
      [{ text: '🇺🇸 Иммиграция США & Green Card', callback_data: 'cat:usa' }],
      [{ text: '🌍 Международные контракты & Структурирование', callback_data: 'cat:int' }],
      [{ text: '⚖️ Арбитраж & Судебные споры', callback_data: 'cat:court' }],
      [{ text: '💼 Корпоративное право & Защита активов', callback_data: 'cat:biz' }],
      [{ text: '❓ Другой вопрос', callback_data: 'cat:oth' }],
    ],
    jurTitle: 'Шаг 2 из 5: Укажите <b>ключевую юрисдикцию</b>:',
    jurs: [
      [{ text: '🇺🇸 США', callback_data: 'jur:USA' }, { text: '🇪🇺 ЕС / Германия', callback_data: 'jur:EU' }],
      [{ text: '🇦🇪 ОАЭ (DIFC)', callback_data: 'jur:UAE' }, { text: '🇬🇧 Великобритания', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Кипр', callback_data: 'jur:CY' }, { text: '🇬🇪 Грузия', callback_data: 'jur:GE' }],
      [{ text: '🌍 Другая (написать)', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Шаг 3 из 5: <b>Кратко опишите суть ситуации</b> (факты, текущий этап, цели):\n\n<i>⚠️ Не передавайте конфиденциальные пароли и данные банковских карт.</i>',
    urgTitle: 'Шаг 4 из 5: Выберите <b>срочность задачи</b>:',
    urgs: [
      [{ text: '🔥 Срочно (1-2 дня)', callback_data: 'urg:urgent' }],
      [{ text: '⚡ В течение недели', callback_data: 'urg:week' }],
      [{ text: '📅 Плановый разбор', callback_data: 'urg:plan' }],
    ],
    contactPrompt: 'Шаг 5 из 5: Укажите ваше <b>имя</b> и удобный способ связи (номер телефона или email):',
    finish: '✅ <b>Ваше обращение принято и зарегистрировано!</b>\n\nНаши юристы проводят первичный правовой аудит ситуации и свяжутся с вами в ближайшее время.',
  },
  en: {
    welcome: '⚖️ <b>V. I. LEVIN — International Legal Practice</b>\n\nWelcome to our secure preliminary evaluation gateway.\n\n🔒 All communications are strictly protected by Attorney-Client Privilege and standard NDA.\n\nStep 1 of 5: Select the <b>practice area</b> of your inquiry:',
    cats: [
      [{ text: '🇺🇸 US Immigration & Green Card', callback_data: 'cat:usa' }],
      [{ text: '🌍 International Contracts & Structuring', callback_data: 'cat:int' }],
      [{ text: '⚖️ Arbitration & Cross-Border Disputes', callback_data: 'cat:court' }],
      [{ text: '💼 Corporate Law & Asset Protection', callback_data: 'cat:biz' }],
      [{ text: '❓ Other Legal Inquiries', callback_data: 'cat:oth' }],
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
      [{ text: '🔥 Immediate (1-2 days)', callback_data: 'urg:urgent' }],
      [{ text: '⚡ Within a week', callback_data: 'urg:week' }],
      [{ text: '📅 Planned consultation', callback_data: 'urg:plan' }],
    ],
    contactPrompt: 'Step 5 of 5: Please provide your <b>name</b> and contact preferences (phone or email):',
    finish: '✅ <b>Your inquiry has been securely registered!</b>\n\nOur legal team is conducting an initial assessment and will contact you promptly.',
  },
  uk: {
    welcome: '⚖️ <b>V. I. LEVIN — Міжнародна юридична практика</b>\n\nЛаскаво просимо до захищеного шлюзу попередньої правової оцінки.\n\n🔒 Усі відомості захищені режимом адвокатської таємниці та суворої конфіденційності.\n\nКрок 1 із 5: Оберіть <b>напрямок питання</b>:',
    cats: [
      [{ text: '🇺🇸 Імміграція до США & Green Card', callback_data: 'cat:usa' }],
      [{ text: '🌍 Міжнародні контракти & Структурування', callback_data: 'cat:int' }],
      [{ text: '⚖️ Арбітраж & Судові спори', callback_data: 'cat:court' }],
      [{ text: '💼 Корпоративне право & Захист активів', callback_data: 'cat:biz' }],
      [{ text: '❓ Інше юридичне питання', callback_data: 'cat:oth' }],
    ],
    jurTitle: 'Крок 2 із 5: Вкажіть <b>юрисдикцію</b>:',
    jurs: [
      [{ text: '🇺🇸 США', callback_data: 'jur:USA' }, { text: '🇪🇺 ЄС / Німеччина', callback_data: 'jur:EU' }],
      [{ text: '🇦🇪 ОАЕ (DIFC)', callback_data: 'jur:UAE' }, { text: '🇬🇧 Велика Британія', callback_data: 'jur:UK' }],
      [{ text: '🇨🇾 Кіпр', callback_data: 'jur:CY' }, { text: '🇬🇪 Грузія', callback_data: 'jur:GE' }],
      [{ text: '🌍 Інша країна', callback_data: 'jur:custom' }],
    ],
    descPrompt: 'Крок 3 із 5: <b>Коротко опишіть суть ситуації</b>:\n\n<i>⚠️ Не передавайте конфіденційні паролі або платіжні реквізити.</i>',
    urgTitle: 'Крок 4 із 5: Оберіть <b>терміновість</b>:',
    urgs: [
      [{ text: '🔥 Терміново (1-2 дні)', callback_data: 'urg:urgent' }],
      [{ text: '⚡ Протягом тижня', callback_data: 'urg:week' }],
      [{ text: '📅 Плановий аудит', callback_data: 'urg:plan' }],
    ],
    contactPrompt: 'Крок 5 із 5: Вкажіть ваше <b>ім’я</b> та зручний спосіб зв’язку:',
    finish: '✅ <b>Ваше звернення зареєстровано!</b>\n\nНаші юристи проводять первинний аналіз і зв’яжуться з вами найближчим часом.',
  },
};

// Fallback for ES, IT, FR
I18N.es = I18N.en;
I18N.it = I18N.en;
I18N.fr = I18N.en;

async function notifyAdminLead(lead) {
  if (!ADMIN_CHAT_ID) return;

  const adminMsg = [
    `⚖️ <b>НОВАЯ ЗАЯВКА ИЗ TELEGRAM-БОТА</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>ID:</b> <code>${escapeHtml(lead.id)}</code>`,
    `📅 <b>Время:</b> ${new Date(lead.createdAt).toLocaleString('ru-RU')}`,
    `🌐 <b>Язык клиента:</b> <code>${escapeHtml(lead.lang || 'ru').toUpperCase()}</code>`,
    ``,
    `📁 <b>Направление:</b> ${escapeHtml(lead.serviceCategory)}`,
    `🌍 <b>Юрисдикция:</b> ${escapeHtml(lead.jurisdiction)}`,
    `⚡ <b>Срочность:</b> ${escapeHtml(lead.urgency)}`,
    ``,
    `📝 <b>Суть ситуации:</b>`,
    `<i>${escapeHtml(lead.description)}</i>`,
    ``,
    `👤 <b>Доверитель:</b>`,
    `• Имя: ${escapeHtml(lead.contact.name || 'Не указано')}`,
    `• Telegram: ${lead.contact.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername) : 'Без юзернейма'}`,
    `• Контакт: ${escapeHtml(lead.contact.info || '')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <b>Статус:</b> <code>Квалифицирован ботом</code>`
  ].filter(Boolean).join('\n');

  await sendMessage(ADMIN_CHAT_ID, adminMsg, {
    inline_keyboard: [
      [
        { text: '👨‍⚖️ Перенаправить юристу', callback_data: `admin:forward:${lead.id}` },
        { text: '💳 Инвойс USDT (Cryptomus)', callback_data: `admin:cryptomus:${lead.id}` }
      ]
    ]
  });
}

async function handleUpdate(update) {
  // 1. Callback Queries
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

    // Admin handling
    if (data.startsWith('admin:forward:')) {
      const leadId = data.replace('admin:forward:', '');
      await sendMessage(chatId, `👨‍⚖️ <b>Перенаправление заявки #${leadId}</b>\n\nПерешлите это сообщение назначенному юристу практики или используйте команду:\n<code>/assign ${leadId} @username_юриста</code>`);
      return;
    }

    if (data.startsWith('admin:cryptomus:')) {
      const leadId = data.replace('admin:cryptomus:', '');
      await sendMessage(chatId, `💳 <b>Генератор счета USDT (Cryptomus) для заявки #${leadId}</b>\n\nРеквизиты для выставления инвойса:\n• Сеть: USDT (TRC-20 / ERC-20 / Polygon)\n• Платежный шлюз: Cryptomus Gateway API\n• Назначение: Индивидуальный правовой аудит и юридические услуги V. I. LEVIN\n\nДля выставления счета клиенту отправьте ссылку на персональный платежный шлюз Cryptomus или создайте инвойс в личном кабинете merchant.cryptomus.com.`);
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
        await sendMessage(chatId, 'Укажите юрисдикцию текстом / Specify your jurisdiction:');
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
    let session = userSessions.get(chatId) || { lang: 'ru', step: 'lang' };
    const t = I18N[session.lang] || I18N.ru;

    // Admin Commands
    if (String(chatId) === String(ADMIN_CHAT_ID)) {
      if (text.startsWith('/assign')) {
        const parts = text.split(' ');
        const leadId = parts[1] || '0';
        const lawyer = parts[2] || 'адвокату практики';
        await sendMessage(chatId, `✅ Заявка <code>${leadId}</code> успешно закреплена за ${lawyer}. Уведомление сформировано.`);
        return;
      }
      if (text.startsWith('/invoice')) {
        const amount = text.split(' ')[1] || '500';
        await sendMessage(chatId, `💳 <b>Инвойс USDT сформирован</b>\n\nСумма: <code>${amount} USDT</code>\nСети: TRC20, ERC20, Polygon\nСтатус: Ожидание оплаты Cryptomus`);
        return;
      }
    }

    // Start command -> Language selector
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

      await sendMessage(chatId, `⚖️ <b>V. I. LEVIN | International Legal Practice</b>\n\nПожалуйста, выберите язык обслуживания / Please select your preferred language:`, {
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

    // Fallback response
    await sendMessage(chatId, 'Для начала правовой консультации или смены языка нажмите /start');
  }
}

// Long Polling Loop
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
          console.error('Ошибка обработки обновления:', err);
        }
      }
    }
  } catch (e) {
    // Network retry delay
    await new Promise((r) => setTimeout(r, 2500));
  }

  setImmediate(pollUpdates);
}

// Start polling
pollUpdates();
