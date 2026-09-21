import React from 'react';
import { Globe2, ShieldCheck, Scale, Award } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const metrics = [
    {
      icon: Award,
      value: '10+ лет',
      label: 'Опыта в праве',
      sub: 'Глубокая экспертиза в сложных трансграничных делах',
    },
    {
      icon: Globe2,
      value: '50+ стран',
      label: 'География практики',
      sub: 'Юрисдикционный охват в США, ЕС, ОАЭ и СНГ',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Конфиденциальность',
      sub: 'Осознанная модель приватности без раскрытия лиц',
    },
    {
      icon: Scale,
      value: 'Стратегия',
      label: 'Индивидуальный путь',
      sub: 'Оценка вероятности успеха до заключения соглашения',
    },
  ];

  return (
    <section className="bg-navy-900 border-b border-surface-border py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start space-x-3.5 group">
                <div className="p-2.5 rounded bg-navy-850 border border-gold-500/20 text-gold-400 group-hover:border-gold-500/40 transition-colors">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-serif text-white font-bold tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-semibold text-gold-500/90 uppercase tracking-wider mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1 leading-tight hidden sm:block">
                    {item.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
