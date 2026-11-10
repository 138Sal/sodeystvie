import { ArrowUpRight, Phone } from 'lucide-react';
import { monumentsData } from '../../data/content';
import { Reveal } from '../common/Reveal';
import { PageHero } from '../common/PageHero';
import { asset } from '../../lib/asset';

const examples = [
  {
    image: asset('/images/monument-family.webp'),
    alt: 'Семейный памятник на два портрета',
    caption: 'Семейная стела, габбро-диабаз',
    position: 'object-[50%_35%]',
  },
  {
    image: asset('/images/monument-premium.webp'),
    alt: 'Гранитная ваза в составе мемориала',
    caption: 'Элементы премиум-мемориала',
    position: 'object-center',
  },
  {
    image: asset('/images/fence-granite.webp'),
    alt: 'Гранитный столб с кованой цепью',
    caption: 'Ограждение участка, гранит и ковка',
    position: 'object-center',
  },
];

export const MonumentCatalogSection = () => {
  return (
    <>
      <PageHero
        eyebrow="03 — Памятники"
        title="Изготовление памятников из гранита и мрамора"
        description="Работаем с натуральным камнем: карельским габбро-диабазом первой категории и уфалейским мрамором. Круговая полировка пяти сторон, доставка и монтаж по всем кладбищам Челябинска и области."
        image={asset('/images/monument-cross.webp')}
        imageAlt="Гранитный памятник с крестом на кладбище"
        position="object-[55%_45%]"
      />

      <section id="monuments" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
            {/* Sticky photographic reference */}
            <Reveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[4/5] overflow-hidden bg-raise">
                  <img
                    src={asset('/images/monument-premium.webp')}
                    alt="Гранитный мемориал крупным планом"
                    loading="lazy" decoding="async"
                    className="h-full w-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 text-[10.5px] uppercase tracking-[0.16em] text-paper/80">
                    Карельский габбро-диабаз
                  </span>
                </div>

                <div className="mt-5 border-l border-line pl-5">
                  <p className="text-[13px] leading-relaxed text-mute">
                    Бесплатный 3D-макет с портретом и гравировкой до начала работ.
                    Показываем образцы камня и согласовываем каждую деталь.
                  </p>
                  <a
                    href="tel:+79517767747"
                    className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-paper"
                  >
                    <Phone className="h-4 w-4 text-dim" />
                    Обсудить проект
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Price list */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-baseline justify-between gap-4 border-b border-paper/30 pb-4">
                  <span className="eyebrow">Каталог и цены</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-dim">
                    Стела + тумба + цветник
                  </span>
                </div>
              </Reveal>

              {monumentsData.map((item, index) => (
                <Reveal key={item.category} delay={index * 0.04} y={14} blur={6}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 border-b border-line py-6 sm:grid-cols-12">
                    <div className="sm:col-span-8">
                      <h3 className="text-[17px] font-semibold leading-snug text-paper">
                        {item.category}
                      </h3>
                      <div className="mt-1.5 text-[12px] uppercase tracking-[0.08em] text-dim">
                        {item.material} · {item.size}
                      </div>
                      <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-mute">
                        {item.description}
                      </p>
                    </div>

                    <div className="sm:col-span-4 sm:text-right">
                      <div className="flex items-baseline gap-1.5 sm:justify-end">
                        <span className="text-[13px] text-dim">от</span>
                        <span className="text-[24px] font-bold leading-none tracking-tight text-paper">
                          {item.price.replace('от ', '')}
                        </span>
                        <span className="text-[14px] text-dim">₽</span>
                      </div>
                      <a
                        href="tel:+79517767747"
                        className="action action--sm mt-4 inline-flex sm:ml-auto"
                      >
                        Заказать
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal className="mt-6">
                <p className="text-[11.5px] leading-relaxed text-dim">
                  Цены указаны за базовую комплектацию. Итоговая стоимость зависит от
                  размеров участка, грунта и выбранной гравировки — фиксируется в договоре.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="border-t border-line py-14 sm:py-16">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Примеры работ</span>
              <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
                Как это выглядит на участке
              </h2>
            </div>
            <p className="max-w-[38ch] text-[12.5px] leading-relaxed text-dim">
              Фотографии элементов мемориалов и благоустройства. Точный вид
              согласовываем на 3D-макете.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {examples.map((item, index) => (
              <Reveal key={item.image} delay={index * 0.06} y={16} blur={7}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy" decoding="async"
                      className={`h-full w-full object-cover grayscale ${item.position}`}
                    />
                  </div>
                  <figcaption className="mt-3 text-[12.5px] text-dim">{item.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
