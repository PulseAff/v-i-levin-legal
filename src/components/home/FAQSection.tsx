'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { currentLang } = useLanguage();

  const faqDataByLang: Record<string, { q: string; a: string }[]> = {
    ru: [
      {
        q: 'Как проходит первичная консультация и правовой аудит ситуации?',
        a: 'Сотрудничество начинается с заполнения формы на сайте или обращения в наш защищенный Telegram-бот (@VILEVIN_bot). Мы проводим предварительный правовой скрининг ваших обстоятельств, документов и рисков. В рамках закрытой частной практики все переданные сведения строго охраняются режимом профессиональной тайны (Attorney-Client Privilege). После аудита вы получаете честную правовую оценку перспектив и пошаговую стратегию дальнейших действий.',
      },
      {
        q: 'Даете ли вы 100% гарантию одобрения Green Card или визы?',
        a: 'Юрист, который обещает «100% гарантию» в США или ЕС, нарушает правила профессиональной этики и вводит клиента в заблуждение: окончательное решение всегда принимает государственный офицер USCIS или консул. Наш подход — глубокий предварительный аудит рисков. Если мы видим, что кейс не проходит по критериям, мы прямо говорим об этом и разрабатываем план усиления доказательств.',
      },
      {
        q: 'В каких юрисдикциях вы можете представлять интересы в суде?',
        a: 'В зависимости от юрисдикции и характера спора: в ряде стран мы ведем дела напрямую через правовые механизмы досудебного урегулирования и международного арбитража; в процессах, требующих специальной локальной адвокатской лицензии (Bar Association, Rechtsanwaltskammer и др.), мы привлекаем аккредитованных локальных партнеров, полностью сохраняя процессуальное руководство стратегией за V. I. Levin.',
      },
      {
        q: 'Что делать, если получен отказ (RFE / 221(g) / NOID) по петиции в США?',
        a: 'Критически важно не отвечать эмоционально и не отправлять непроверенные документы повторно. Необходимо провести аудит текста отказа или RFE, выявить истинные сомнения офицера USCIS и подготовить исчерпывающий доказательный меморандум со ссылками на прецедентное право (Matter of Dhanasar, Matter of Chawathe и др.) в строго установленный срок.',
      },
      {
        q: 'Как устроена оплата услуг?',
        a: 'Оплата производится исключительно в криптовалюте USDT (сеть TRC-20).',
      },
    ],
    en: [
      {
        q: 'How does the initial consultation and legal risk assessment work?',
        a: 'Cooperation begins with submitting an inquiry on our website or via our secure Telegram bot (@VILEVIN_bot). We conduct a preliminary legal review of your circumstances, evidentiary files, and risks. Under our private practice standards, all disclosures are strictly protected by Attorney-Client Privilege. You receive an honest merit appraisal and a step-by-step roadmap.',
      },
      {
        q: 'Do you offer a 100% guarantee for Green Card or visa approvals?',
        a: 'Any lawyer promising a "100% guarantee" in the US or EU violates professional ethics rules and misleads the client: the final decision rests solely with the USCIS adjudicator or consular officer. Our standard is rigorous pre-filing vetting. If a case lacks merit, we explain it transparently and formulate an evidence strengthening plan.',
      },
      {
        q: 'In which jurisdictions can you represent clients in court?',
        a: 'Depending on the jurisdiction and venue: we handle cross-border disputes directly through international arbitration and mediation; in court proceedings requiring specific state admission (Bar Association, Rechtsanwaltskammer), we retain local licensed co-counsels while maintaining lead strategic direction.',
      },
      {
        q: 'What should be done if a Request for Evidence (RFE / 221(g) / NOID) is issued?',
        a: 'It is vital not to react impulsively or resubmit unverified paperwork. We conduct an analytical audit of the notice, isolate the officer’s exact skepticism, and draft an authoritative rebuttal brief supported by binding precedent decisions (Matter of Dhanasar, Matter of Chawathe) within USCIS deadlines.',
      },
      {
        q: 'How is payment processed?',
        a: 'Payments are accepted exclusively in USDT cryptocurrency (TRC-20 network).',
      },
    ],
    uk: [
      {
        q: 'Як проходить первинна консультація та правовий аудит ситуації?',
        a: 'Співпраця розпочинається із заповнення форми на сайті або звернення до нашого захищеного Telegram-бота (@VILEVIN_bot). Ми проводимо попередній аналіз обставин, доказів та ризиків. Вся інформація захищена режимом професійної таємниці (Attorney-Client Privilege). Ви отримуєте об’єктивну оцінку перспектив і покрокову дорожню карту.',
      },
      {
        q: 'Чи даєте ви 100% гарантію схвалення Green Card або візи?',
        a: 'Обіцянка 100% гарантії в США чи ЄС порушує норми професійної етики: остаточний вердикт виносить лише офіцер USCIS або консул. Наш принцип — детальний попередній аудит ризиків. Якщо справа має слабкі місця, ми відкрито про це говоримо та розробляємо план підсилення доказової бази.',
      },
      {
        q: 'В яких юрисдикціях можливе представництво в суді?',
        a: 'У спорах комерційного характеру та арбітражі ми працюємо напряму; у судових засіданнях, що вимагають спеціальної локальної ліцензії, залучаємо перевірених партнерів, зберігаючи повний стратегічний контроль за V. I. Levin.',
      },
      {
        q: 'Що робити при отриманні відмови або запиту RFE / NOID у США?',
        a: 'Головне — не надсилати документи без фахового аналізу. Необхідно провести построчний аудит претензій офіцера USCIS та підготувати юридично вивірений меморандум із прецедентною практикою у встановлені строки.',
      },
      {
        q: 'Як здійснюється оплата послуг?',
        a: 'Оплата здійснюється виключно в криптовалюті USDT (мережа TRC-20).',
      },
    ],
    es: [
      {
        q: '¿Cómo se realiza la consulta inicial y la auditoría jurídica?',
        a: 'La colaboración comienza enviando una solicitud en la web o a través de nuestro bot de Telegram seguro (@VILEVIN_bot). Realizamos una evaluación preliminar de sus documentos y riesgos bajo estricto secreto profesional (Attorney-Client Privilege).',
      },
      {
        q: '¿Ofrecen una garantía del 100% para Green Card o visados?',
        a: 'Prometer un 100% de garantía en EE. UU. viola las normas deontológicas: la decisión final corresponde al oficial consular o de USCIS. Nuestro compromiso es una auditoría previa rigurosa para identificar y subsanar cualquier debilidad del expediente.',
      },
      {
        q: '¿En qué jurisdicciones pueden representar ante los tribunales?',
        a: 'Intervenimos directamente en arbitrajes internacionales y resolución extrajudicial; ante tribunales estatales que requieren colegiación local, coordinamos la estrategia junto a abogados locales homologados.',
      },
      {
        q: '¿Qué hacer si recibe una notificación de RFE o NOID de USCIS?',
        a: 'Es crucial responder dentro del plazo con un memorando legal exhaustivo basado en precedentes jurisprudenciales, refutando punto por punto las dudas del oficial examinador.',
      },
      {
        q: '¿Cómo se procesan los pagos?',
        a: 'El pago se realiza exclusivamente en la criptomoneda USDT (red TRC-20).',
      },
    ],
    it: [
      {
        q: 'Come si svolge la consulenza preliminare e l’analisi legale del caso?',
        a: 'Il mandato inizia con la compilazione della richiesta online o tramite il bot protetto Telegram (@VILEVIN_bot). Effettuiamo un esame accurato dei documenti e dei rischi legali coperto da segreto professionale (Attorney-Client Privilege).',
      },
      {
        q: 'Fornite una garanzia del 100% per il rilascio della Green Card?',
        a: 'Nessun avvocato può promettere legalmente il 100% di approvazione: la decisione finale spetta all’autorità federale USCIS o al console. Il nostro metodo si fonda sulla verifica preventiva approfondita e sul rafforzamento probatorio.',
      },
      {
        q: 'In quali giurisdizioni operate per il contenzioso?',
        a: 'Gestiamo arbitrati internazionali e mediazioni transfrontaliere; nei procedimenti giudiziari locali coordiniamo l’intera strategia in partnership con colleghi abilitati presso il foro competente.',
      },
      {
        q: 'Cosa fare in caso di richiesta di chiarimenti (RFE / NOID) da USCIS?',
        a: 'Occorre analizzare puntualmente le contestazioni dell’ufficiale ed elaborare un memoriale giuridico supportato da decisioni pilota entro la scadenza perentoria.',
      },
      {
        q: 'Quali sono le modalità di pagamento?',
        a: 'Il pagamento viene effettuato esclusivamente nella criptovaluta USDT (rete TRC-20).',
      },
    ],
    fr: [
      {
        q: 'Comment se déroule la consultation initiale et l’audit juridique ?',
        a: 'L’analyse débute par l’envoi de votre demande en ligne ou via notre bot Telegram sécurisé (@VILEVIN_bot). Nous procédons à un examen préalable rigoureux de votre dossier, couvert par le secret professionnel (Attorney-Client Privilege).',
      },
      {
        q: 'Garantissez-vous à 100% l’obtention de la Green Card ou du visa ?',
        a: 'Promettre 100% de succès aux États-Unis est contraire à la déontologie : la décision appartient exclusivement aux officiers de l’USCIS ou aux autorités consulaires. Notre valeur réside dans un audit préventif sans complaisance pour maximiser vos chances.',
      },
      {
        q: 'Dans quelles juridictions intervenez-vous en justice ?',
        a: 'Nous intervenons directement en arbitrage international et négociation transfrontalière ; devant les tribunaux étatiques, nous dirigeons la stratégie aux côtés d’avocats partenaires inscrits aux barreaux locaux.',
      },
      {
        q: 'Que faire en cas de demande de preuves additionnelles (RFE / NOID) ?',
        a: 'Il est impératif d’analyser méticuleusement les doutes soulevés par l’USCIS et de soumettre un mémoire argumenté appuyé sur la jurisprudence fédérale dans le délai imparti.',
      },
      {
        q: 'Quels sont les modes de règlement ?',
        a: 'Le règlement s’effectue exclusivement en cryptomonnaie USDT (réseau TRC-20).',
      },
    ],
  };

  const headerLabels = {
    ru: { badge: 'ПРОЗРАЧНОСТЬ & СТАНДАРТЫ', title: 'Часто задаваемые вопросы', sub: 'Ответы на ключевые вопросы о формате сотрудничества, юрисдикциях и расчетах.' },
    en: { badge: 'STANDARDS & TRANSPARENCY', title: 'Frequently Asked Questions', sub: 'Direct answers regarding engagement protocols, jurisdictions, and settlements.' },
    uk: { badge: 'ПРОЗОРІСТЬ ТА СТАНДАРТИ', title: 'Часті запитання', sub: 'Відповіді на ключові питання щодо формату роботи, юрисдикцій та розрахунків.' },
    es: { badge: 'TRANSPARENCIA Y RIGOR', title: 'Preguntas frecuentes', sub: 'Respuestas sobre metodología, jurisdicciones y modalidades de pago.' },
    it: { badge: 'TRASPARENZA E STANDARDS', title: 'Domande frequenti', sub: 'Dettagli su modalità operative, giurisdizioni e pagamenti.' },
    fr: { badge: 'TRANSPARENCE & STANDARDS', title: 'Questions fréquentes', sub: 'Réponses claires sur le cadre d’intervention, les juridictions et les règlements.' },
  };

  const h = headerLabels[currentLang] || headerLabels.ru;
  const list = faqDataByLang[currentLang] || faqDataByLang.ru;

  return (
    <section className="py-20 bg-[#06090F] border-b border-[#1A2230]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#101725] border border-gold-500/30 text-[10px] font-mono text-gold-400 uppercase tracking-widest mb-2">
            <HelpCircle size={12} />
            {h.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
            {h.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-light">
            {h.sub}
          </p>
        </div>

        <div className="space-y-3">
          {list.map((f, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-md bg-[#0A0F19] border border-[#182337] overflow-hidden transition-all duration-200 ease-out"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:text-gold-300 transition-colors"
                >
                  <span className="text-sm sm:text-base font-serif font-semibold pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`text-gold-400 shrink-0 transition-transform duration-200 ease-out ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed font-light border-t border-[#141C2B] bg-[#070B13]">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
