import { asset } from '../../lib/asset';
import { Reveal } from '../common/Reveal';

/**
 * Реальные объекты 2026 года. Снимки сделаны на месте после сдачи работ,
 * поэтому это не сток, а фактический вид участка.
 */
const works = [
  {
    image: asset('/images/works/works-family-stela.webp'),
    alt: 'Семейный памятник на два портрета на мощёном участке',
    title: 'Семейная стела на два портрета',
    meta: 'Габбро-диабаз · плитка и цветник',
  },
  {
    image: asset('/images/works/works-black-stele.webp'),
    alt: 'Чёрная гранитная стела с портретом и гравировкой',
    title: 'Стела с портретом',
    meta: 'Габбро-диабаз · круговая полировка',
  },
  {
    image: asset('/images/works/works-portrait-stele.webp'),
    alt: 'Вертикальная стела с портретом и наклонной плитой',
    title: 'Вертикальная стела с ложем',
    meta: 'Габбро-диабаз · бетонное основание',
  },
  {
    image: asset('/images/works/works-autumn-granite.webp'),
    alt: 'Два гранитных памятника на участке с гравийной засыпкой',
    title: 'Комплекс из двух стел',
    meta: 'Габбро-диабаз · гравийная засыпка',
  },
  {
    image: asset('/images/works/works-polished-plot.webp'),
    alt: 'Полированная гранитная плита с отражением неба',
    title: 'Полированная плита с уклоном',
    meta: 'Габбро-диабаз · мощение участка',
  },
  {
    image: asset('/images/works/works-black-complex.webp'),
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
          <p className="max-w-[40ch] text-[12.5px] leading-relaxed text-dim">
            Собственные объекты: изготовление, монтаж и благоустройство участка.
            Фотографии сделаны после сдачи работ, без ретуши.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((item, index) => (
            <Reveal key={item.image} delay={index * 0.05} y={16} blur={7}>
              <figure className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.015] group-hover:grayscale-[0.82]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <span className="text-[13px] font-semibold text-paper">{item.title}</span>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-dim text-right">
                    {item.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <p className="max-w-[62ch] text-[11.5px] leading-relaxed text-dim">
            Цвет камня и рисунок гравировки подбираются индивидуально — на фотографиях
            конкретные заказы, а не каталог. Точный вид вашего памятника согласовываем
            на 3D-макете до начала работ.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
