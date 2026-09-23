'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Shield, CheckCircle2, MessageSquare } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Иммиграция и Green Card США',
}) => {
  const [formData, setFormData] = useState({
    serviceCategory: defaultService,
    jurisdiction: 'США',
    description: '',
    urgency: 'В течение недели' as 'Сегодня' | 'В течение недели' | 'Плановая консультация',
    format: 'Персональная консультация',
    name: '',
    telegramUsername: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, serviceCategory: defaultService }));
    }
  }, [defaultService, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Ensure at least Telegram or Email/Phone is provided
    if (!formData.telegramUsername.trim() && !formData.email.trim() && !formData.phone.trim()) {
      setError('Пожалуйста, укажите контакт для обратной связи: ваш Telegram, Email или телефон.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Website Modal Form',
          serviceCategory: formData.serviceCategory,
          jurisdiction: formData.jurisdiction,
          description: formData.description,
          urgency: formData.urgency,
          format: formData.format,
          contact: {
            name: formData.name,
            telegramUsername: formData.telegramUsername,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setError(data.error || 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
      }
    } catch (err) {
      setError('Ошибка соединения. Пожалуйста, воспользуйтесь прямым Telegram-ботом.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-gold-500/30 rounded-xl shadow-2xl p-6 lg:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 transition-colors"
          aria-label="Закрыть"
        >
          <X size={22} />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold-500/40">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif text-white font-semibold">Ваше обращение принято</h3>
            <p className="text-gray-300 max-w-md mx-auto text-sm leading-relaxed">
              Информация передана ведущему специалисту практики. Мы изучим обстоятельства ситуации и свяжемся с вами в указанные сроки.
            </p>
            <div className="pt-6">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 font-semibold text-sm rounded hover:from-gold-500 hover:to-gold-400 transition-all shadow-gold-sm"
              >
                Вернуться на сайт
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-500 tracking-wider uppercase mb-1">
                <Shield size={14} /> Конфиденциальный разбор ситуации
              </div>
              <h2 className="text-2xl font-serif text-white font-bold">
                Получить консультацию
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Опишите задачу — мы определим, есть ли правовое решение и какой путь наиболее рационален.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/50 rounded text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Направление вопроса</label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  >
                    <option value="Иммиграция и Green Card США">🇺🇸 Иммиграция США / Green Card</option>
                    <option value="Бизнес и международные сделки">💼 Бизнес и корпоративное право</option>
                    <option value="Представительство в спорах">⚖️ Представительство в спорах</option>
                    <option value="Семейное и наследственное право">👨‍👩‍👧 Семейное и наследственное право</option>
                    <option value="Международные контракты">📄 Международные контракты</option>
                    <option value="Индивидуальный аудит">🔍 Персональный правовой аудит</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Страна / Юрисдикция</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: США, Германия, ОАЭ"
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Описание ситуации <span className="text-gold-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Кратко опишите хронологию, цели и существующие сложности..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Срочность</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  >
                    <option value="В течение недели">🟠 В течение недели</option>
                    <option value="Сегодня">🔴 Срочно (в течение 24 часов)</option>
                    <option value="Плановая консультация">🟢 Плановая консультация</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Ваше имя</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Telegram Username (@username)</label>
                  <input
                    type="text"
                    placeholder="@ivan_law"
                    value={formData.telegramUsername}
                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email или телефон</label>
                  <input
                    type="text"
                    placeholder="mail@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-navy-950 border border-surface-border text-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600"
                  />
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-normal">
                🔒 Данные защищены адвокатской тайной. Не передавайте в форме пароли и номера карт.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-navy-950 font-semibold text-xs rounded hover:brightness-110 transition-all shadow-gold-sm flex items-center justify-center gap-2"
                >
                  <Send size={14} /> {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <a
                  href="https://t.me/V_I_Levin_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-navy-850 hover:bg-navy-800 text-gold-300 border border-gold-500/30 text-xs rounded transition-colors"
                >
                  <MessageSquare size={14} /> Открыть в Telegram
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
