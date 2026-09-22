'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Shield, CheckCircle2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const BOT_TOKEN = '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
const ADMIN_CHAT_ID = '7794422014';
const LAWYER_CHAT_ID = '1275663257';

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Консультация',
}) => {
  const { currentLang } = useLanguage();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact.trim()) {
      setError(
        currentLang === 'en'
          ? 'Please provide your phone number or Telegram @username'
          : 'Пожалуйста, укажите телефон или Telegram @username для связи'
      );
      return;
    }

    setIsSubmitting(true);

    const timeStr = new Date().toLocaleString('ru-RU');

    const msg = [
      `⚖️ <b>НОВАЯ ЗАЯВКА С САЙТА VILEVIN.COM</b>`,
      `━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Имя:</b> ${escapeHtml(name || 'Не указано')}`,
      `📱 <b>Контакт:</b> ${escapeHtml(contact)}`,
      question ? `📝 <b>Вопрос:</b> <i>${escapeHtml(question)}</i>` : '',
      defaultService && defaultService !== 'Консультация' ? `📁 <b>Услуга:</b> ${escapeHtml(defaultService)}` : '',
      `🌐 <b>Язык сайта:</b> ${currentLang.toUpperCase()}`,
      `⏱ <b>Время:</b> ${timeStr}`,
      `━━━━━━━━━━━━━━━━━━`,
      `🔒 <i>Заявка передана юристу практики.</i>`,
    ].filter(Boolean).join('\n');

    try {
      const sendToTelegram = async (chatId: string) => {
        try {
          return await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: msg,
              parse_mode: 'HTML',
            }),
          });
        } catch {
          return null;
        }
      };

      // Send to both admin and lawyer concurrently
      await Promise.allSettled([
        sendToTelegram(ADMIN_CHAT_ID),
        sendToTelegram(LAWYER_CHAT_ID),
      ]);

      // Save to localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('vilevin_leads') || '[]');
        existing.push({
          id: 'lead_' + Date.now(),
          name,
          contact,
          question,
          service: defaultService,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('vilevin_leads', JSON.stringify(existing));
      } catch {}

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#090D14] border border-[#232F42] rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* Compact Success State */
          <div className="py-5 text-center space-y-3">
            <div className="w-12 h-12 bg-gold-500/15 text-gold-400 rounded-full flex items-center justify-center mx-auto border border-gold-500/40">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white font-bold">
                {currentLang === 'en' ? 'Request Received' : 'Заявка принята'}
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                {currentLang === 'en'
                  ? 'We will contact you within 15 minutes.'
                  : 'Свяжемся с вами в течение 15 минут.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gradient-to-r from-[#E5C37A] to-[#C9A45B] text-[#070A0F] font-bold text-xs rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                {currentLang === 'en' ? 'Close' : 'Закрыть'}
              </button>
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#101724] border border-[#23334A] text-gold-300 hover:text-white text-xs rounded-full transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare size={13} /> Telegram
              </a>
            </div>
          </div>
        ) : (
          /* Compact Form */
          <>
            <div className="mb-4 pr-6">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-1">
                <Shield size={12} />
                <span>{currentLang === 'en' ? 'Confidential Legal Review' : 'Конфиденциально'}</span>
              </div>
              <h2 className="text-xl font-serif text-white font-bold">
                {currentLang === 'en' ? 'Request Consultation' : 'Запись на консультацию'}
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {currentLang === 'en'
                  ? 'Leave your details — an attorney will get in touch.'
                  : 'Оставьте контакты — юрист свяжется с вами.'}
              </p>
            </div>

            {error && (
              <div className="mb-3 p-2.5 bg-red-950/60 border border-red-500/40 rounded-lg text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  {currentLang === 'en' ? 'Your Name' : 'Ваше имя'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentLang === 'en' ? 'Alexander' : 'Иван'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0E1522] border border-[#223044] text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  {currentLang === 'en' ? 'Phone or Telegram' : 'Телефон или Telegram'} <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="+7 (999) 000-00-00 или @username"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-[#0E1522] border border-[#223044] text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  {currentLang === 'en' ? 'Brief Situation / Question' : 'Суть вопроса (кратко)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={
                    currentLang === 'en'
                      ? 'Describe your question or situation...'
                      : 'Кратко опишите задачу или вопрос...'
                  }
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-[#0E1522] border border-[#223044] text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 resize-none transition-colors"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#E5C37A] via-[#C9A45B] to-[#99742B] text-[#070A0F] font-bold text-xs rounded-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>
                    {isSubmitting
                      ? currentLang === 'en'
                        ? 'Sending...'
                        : 'Отправка...'
                      : currentLang === 'en'
                      ? 'Submit Request'
                      : 'Отправить заявку'}
                  </span>
                </button>

                <a
                  href="https://t.me/VILEVIN_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0E1522] hover:bg-[#152033] text-gold-300 border border-[#23334A] text-xs rounded-lg transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Telegram</span>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
