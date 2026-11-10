import { Phone } from 'lucide-react';
import { monumentCareData } from '../../data/content';
import { Reveal } from '../common/Reveal';
import { PageHero } from '../common/PageHero';
import { asset } from '../../lib/asset';

export const MonumentCareSection = () => {
  return (
    <>
      <PageHero
        eyebrow="01 — Благоустройство"
        title="Благоустройство захоронений и монтаж памятников"
        description="Проводим строительные, гранитные и реставрационные работы на всех кладбищах Челябинска: Успенском, Митрофановском, Градском, Преображенском, Фатеевском и Новосинеглазовском."
        image={asset('/images/alley-fog.webp')}
        imageAlt="Тихая аллея кладбища в тумане"
        position="object-[50%_45%]"
      />

      <section id="monument-care" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden bg-raise">
                <img
                  src={asset('/images/fence-granite.webp')}
                  alt="Гранитный столб с кованой цепью на участке"
                  loading="lazy" decoding="async"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="mt-3 flex flex-wrap justify-between gap-2 text-[11.5px] text-dim">
                <span>Ограждение участка: гранит и антикоррозийная ковка</span>
                <span>Фото: пример выполненной работы</span>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.1}>
              <span className="eyebrow">Порядок работ</span>
              <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold leading-snug tracking-tight text-paper">
                Смета фиксируется до начала работ
              </h2>
              <p className="prose-muted mt-4">
                Выезд мастера для замера — бесплатно. Оценим состояние грунта и перепады
                высот, подберём материал и составим точную смету. Все этапы — в договоре.
              </p>
              <div className="mt-6 border-l border-line pl-5">
                <p className="text-[13px] leading-relaxed text-mute">
                  <span className="font-semibold text-paper">Гарантия 3 года</span> на
                  устойчивость стел и монтаж. Работаем с 1998 года на всех кладбищах
                  города и пригорода.
                </p>
              </div>
              <a href="tel:+79517767747" className="action mt-7 inline-flex">
                <Phone className="h-4 w-4" />
                Заказать замер
              </a>
            </Reveal>
          </div>

          <div className="mt-12 border-t border-line">
            {monumentCareData.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.045} y={16} blur={8}>
                <div className="grid grid-cols-1 items-start gap-x-8 gap-y-3 border-b border-line py-6 md:grid-cols-12">
                  <div className="flex gap-4 md:col-span-4">
                    <span className="mt-0.5 text-[11px] tabular-nums text-dim">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[15.5px] font-semibold leading-snug text-paper">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-mute md:col-span-5">
                    {item.description}
                  </p>
                  <div className="md:col-span-3 md:text-right">
                    <div className="text-[14px] font-semibold text-paper">{item.price}</div>
                    <div className="mt-0.5 text-[12px] text-dim">{item.duration}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Reveal y={16} blur={7}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden bg-raise">
                  <img
                    src={asset('/images/monument-premium.webp')}
                    alt="Гранитная ваза и декоративные элементы мемориала"
                    loading="lazy" decoding="async"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
                <figcaption className="mt-3 text-[12.5px] text-dim">
                  Декоративные элементы: вазы, лампады, гранитные цветники
                </figcaption>
              </figure>
            </Reveal>
            <Reveal y={16} blur={7} delay={0.08}>
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden bg-raise">
                  <img
                    src={asset('/images/monument-family.webp')}
                    alt="Семейный гранитный памятник"
                    loading="lazy" decoding="async"
                    className="h-full w-full object-cover object-[50%_35%] grayscale"
                  />
                </div>
                <figcaption className="mt-3 text-[12.5px] text-dim">
                  Семейные стелы: единый ансамбль, общий цветник и подставка
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};
