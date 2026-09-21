import { NextResponse } from 'next/server';
import { saveLead, getAllLeads } from '@/lib/leadsStore';
import { sendTelegramNotification } from '@/lib/telegramNotifier';

export async function GET() {
  const leads = getAllLeads();
  return NextResponse.json({ success: true, count: leads.length, leads });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validation
    if (!body.description || !body.serviceCategory) {
      return NextResponse.json(
        { success: false, error: 'Пожалуйста, укажите категорию вопроса и описание ситуации.' },
        { status: 400 }
      );
    }

    const saved = saveLead({
      source: body.source || 'Website Form',
      referrerPage: body.referrerPage || '/',
      utm: body.utm,
      serviceCategory: body.serviceCategory,
      jurisdiction: body.jurisdiction || 'Не указана',
      description: body.description,
      urgency: body.urgency || 'Плановая консультация',
      format: body.format || 'Консультация',
      contact: {
        telegramUsername: body.contact?.telegramUsername,
        name: body.contact?.name,
        email: body.contact?.email,
        phone: body.contact?.phone,
      },
    });

    // Notify telegram
    await sendTelegramNotification(saved);

    return NextResponse.json({ success: true, leadId: saved.id });
  } catch (err: any) {
    console.error('Error handling lead POST:', err);
    return NextResponse.json({ success: false, error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
