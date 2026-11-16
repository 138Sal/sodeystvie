import { Picture } from '../common/Picture';
import { Reveal } from '../common/Reveal';
import type { ImageName } from '../../data/images.generated';

/**
 * Реальные объекты 2026 года. Снимки сделаны на месте после сдачи работ,
 * поэтому это не сток, а фактический вид участка.
 */
const works: { image: ImageName; alt: string; title: string; meta: string }[] = [
  {
    image: 'works-family-stela',
    alt: 'Семейный памятник на два портрета на мощёном участке',
    title: 'Семейная стела на два портрета',
    meta: 'Габбро-диабаз · плитка и цветник',
  },
  {
    image: 'works-black-stele',
    alt: 'Чёрная гранитная стела с портретом и гравировкой',
    title: 'Стела с портретом',
    meta: 'Габбро-диабаз · круговая полировка',
  },
  {
    image: 'works-portrait-stele',
    alt: 'Вертикальная стела с портретом и наклонной плитой',
    title: 'Вертикальная стела с ложем',
    meta: 'Габбро-диабаз · бетонное основание',
  },
  {
    image: 'works-autumn-granite',
    alt: 'Два гранитных памятника на участке с гравийной засыпкой',
    title: 'Комплекс из двух стел',
    meta: 'Габбро-диабаз · гравийная засыпка',
  },
  {
    image: 'works-polished-plot',
    alt: 'Полированная гранитная плита с отражением неба',
    title: 'Полированная плита с уклоном',
    meta: 'Габбро-диабаз · мощение участка',
  },
  {
    image: 'works-black-complex',
    alt: 'Гранитный мемориал с цветником и оградой',
    title: 'Мемориал с цветником',
    meta: 'Габбро-диабаз · кованая ограда',
  },
];

export const WorksGallery = () => {
  return (
    <section className="border-t border-line py-14 sm:py-16 lg:py-20">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="eyebrow">Наши работы</span>
            <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
              Установлено в 2026 году
            </h2>
          </div>
          <p className="max-w-[40ch] text-[13px] leading-relaxed text-dim">
            Собственные объекты: изготовление, монтаж и благоустройство участка.
            Фотографии сделаны после сдачи работ, без ретуши.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((item, index) => (
            <Reveal key={item.image} delay={index * 0.05} y={16} blur={7}>
              <figure className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                  <Picture
                    name={item.image}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.015] group-hover:grayscale-[0.82]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <span className="text-[13.5px] font-semibold text-paper">{item.title}</span>
                  <span className="text-right text-[11.5px] uppercase tracking-[0.1em] text-dim">
                    {item.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="max-w-[62ch] text-[12.5px] leading-relaxed text-dim">
            Цвет камня и рисунок гравировки подбираются индивидуально — на фотографиях
            конкретные заказы, а не каталог. Точный вид вашего памятника согласовываем
            на 3D-макете до начала работ.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
