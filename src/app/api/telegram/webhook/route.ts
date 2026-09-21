import { NextResponse } from 'next/server';
import { saveLead } from '@/lib/leadsStore';

// Next.js API route for Telegram Webhook
export async function POST(req: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ ok: true, message: 'Bot token not set' });
  }

  try {
    const update = await req.json();

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();
      const username = update.message.from?.username || '';
      const firstName = update.message.from?.first_name || '';

      if (text.startsWith('/start')) {
        const welcomeText = 
          `⚖️ *V. I. LEVIN — International Legal Solutions*\n` +
          `_Ваши права — без границ._\n\n` +
          `Здравствуйте, ${firstName || 'доверитель'}. Вы обратились в закрытую международную юридическую практику.\n\n` +
          `Опишите кратко вашу ситуацию, юрисдикцию и желаемый результат — специалист проанализирует правовые перспективы и определит оптимальный формат взаимодействия.\n\n` +
          `⚠️ *Безопасность:* Пожалуйста, никогда не отправляйте пароли, номера банковских карт и персональные коды доступа.`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: welcomeText,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: '🇺🇸 Иммиграция США / Green Card', callback_data: 'cat_usa' }],
                [{ text: '🌍 Международные вопросы и бизнес', callback_data: 'cat_biz' }],
                [{ text: '⚖️ Суд / Споры / Защита интересов', callback_data: 'cat_court' }],
                [{ text: '❓ Другая правовая ситуация', callback_data: 'cat_other' }]
              ]
            }
          })
        });
      } else {
        // Record as an incoming inquiry
        const newLead = saveLead({
          source: 'Telegram Bot Direct',
          serviceCategory: 'Telegram Inquiry',
          jurisdiction: 'Не определена',
          description: text,
          urgency: 'Плановая консультация',
          format: 'Telegram разбор',
          contact: {
            telegramUsername: username,
            name: firstName,
          }
        });

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: `✅ Ваше обращение принято (ID: \`${newLead.id}\`).\n\nСпециалист изучит правовые аспекты вопроса и свяжется с вами в течение рабочего дня.`,
            parse_mode: 'Markdown'
          })
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
