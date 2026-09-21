export async function sendTelegramNotification(lead: any): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('[TelegramNotifier] No bot token or chat ID configured, skipping push notification.');
    return false;
  }

  const escapeHtml = (str: string = '') =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const message = [
    `⚖️ <b>НОВОЕ ОБРАЩЕНИЕ: V. I. LEVIN</b>`,
    `━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>ID Заявки:</b> <code>${escapeHtml(lead.id)}</code>`,
    `📅 <b>Дата:</b> ${new Date(lead.createdAt).toLocaleString('ru-RU')}`,
    `🌐 <b>Источник:</b> ${escapeHtml(lead.source || 'Веб-сайт')}`,
    lead.referrerPage ? `📄 <b>Страница:</b> ${escapeHtml(lead.referrerPage)}` : '',
    ``,
    `📁 <b>Направление:</b> ${escapeHtml(lead.serviceCategory)}`,
    `🌍 <b>Юрисдикция:</b> ${escapeHtml(lead.jurisdiction)}`,
    `⚡ <b>Срочность:</b> ${escapeHtml(lead.urgency)}`,
    `🤝 <b>Формат:</b> ${escapeHtml(lead.format)}`,
    ``,
    `📝 <b>Описание ситуации:</b>`,
    `<i>${escapeHtml(lead.description)}</i>`,
    ``,
    `👤 <b>Контакты:</b>`,
    `• Имя: ${escapeHtml(lead.contact?.name || 'Не указано')}`,
    `• Telegram: ${lead.contact?.telegramUsername ? '@' + escapeHtml(lead.contact.telegramUsername.replace('@', '')) : 'Не указан'}`,
    `• Email: ${escapeHtml(lead.contact?.email || 'Не указан')}`,
    `• Телефон: ${escapeHtml(lead.contact?.phone || 'Не указан')}`,
    `━━━━━━━━━━━━━━━━━━`,
    `🔒 <b>Статус:</b> <code>New (Квалификация)</code>`
  ].filter(Boolean).join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '👨‍⚖️ Назначить юристу', callback_data: `assign:${lead.id}` },
              { text: '💳 Счет USDT (Cryptomus)', callback_data: `invoice:${lead.id}` }
            ]
          ]
        }
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error('[TelegramNotifier] Error sending notification:', err);
    return false;
  }
}
