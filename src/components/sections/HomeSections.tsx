import { ArrowRight, Phone } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { Reveal } from '../common/Reveal';
import { asset } from '../../lib/asset';

/* ------------------------------------------------------------------ */
/*  Editorial intro with a photographic strip                          */
/* ------------------------------------------------------------------ */

const strip = [
  {
    src: asset('/images/orthodox-graves.webp'),
    alt: 'Православные кресты на кладбище',
    caption: 'Работаем на всех кладбищах Челябинска и области',
    position: 'object-center',
  },
  {
    src: asset('/images/fence-granite.webp'),
    alt: 'Гранитный столб с кованой цепью',
    caption: 'Собственная гранитная мастерская и бригада монтажников',
    position: 'object-center',
  },
  {
    src: asset('/images/candles.webp'),
    alt: 'Церковные свечи',
    caption: 'Тихая церемония прощания без лишней суеты',
    position: 'object-center',
  },
];

export const HomeIntro = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">Городская ритуальная служба</span>
            <p className="mt-6 text-[clamp(22px,2.5vw,36px)] leading-[1.32] text-paper">
              Полный цикл — от первого звонка до установки гранитного памятника.
              Без посредников, наценок и заказов, переданных «на подряд».
            </p>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="prose-muted">
              Штатные агенты, собственный автопарк и гранитная мастерская. Поэтому смета
              не меняется по дороге, а сроки установки не зависят от сторонних бригад.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-7">
              <div>
                <dt className="text-[28px] font-bold leading-none text-paper">1998</dt>
                <dd className="mt-2 text-[12.5px] leading-snug text-dim">
                  год основания службы
                </dd>
              </div>
              <div>
                <dt className="text-[28px] font-bold leading-none text-paper">7</dt>
                <dd className="mt-2 text-[12.5px] leading-snug text-dim">
                  кладбищ в постоянной работе
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {strip.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.07} y={18} blur={8}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-raise">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy" decoding="async"
                    className={`h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03] ${item.position}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
                <figcaption className="mt-4 max-w-[30ch] text-[13px] leading-relaxed text-dim">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Three directions — image-led tiles                                 */
/* ------------------------------------------------------------------ */

const directions = [
  {
    page: 'contacts' as const,
    index: '01',
    title: 'Организация похорон',
    text: 'Транспортировка, документы, прощание и погребение под ключ.',
    image: asset('/images/flowers.webp'),
    position: 'object-center',
  },
  {
    page: 'monuments' as const,
    index: '02',
    title: 'Памятники и мемориалы',
    text: 'Гранитные стелы, кресты, цветники и реставрация.',
    image: asset('/images/monument-cross.webp'),
    position: 'object-center',
  },
  {
    page: 'care' as const,
    index: '03',
    title: 'Благоустройство захоронений',
    text: 'Ограды, плитка, отсыпка и содержание участка.',
    image: asset('/images/fence-granite.webp'),
    position: 'object-center',
  },
];

export const HomeDirections = () => {
  const { navigate } = useRouter();

  return (
    <section className="border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Направления</span>
            <h2 className="mt-4 text-[clamp(24px,3vw,38px)] font-bold tracking-tight text-paper">
              Чем мы можем помочь
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {directions.map((item, index) => (
            <Reveal key={item.page} delay={index * 0.06} y={18} blur={8}>
              <button
                type="button"
                onClick={() => navigate(item.page)}
                className="group relative block h-[360px] w-full overflow-hidden text-left sm:h-[420px]"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy" decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04] ${item.position}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,21,0.15)_0%,rgba(16,18,21,0.35)_45%,rgba(16,18,21,0.95)_100%)]" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="text-[11px] tabular-nums tracking-[0.16em] text-paper/70">
                    {item.index}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-paper/70 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-[20px] font-bold leading-snug text-paper sm:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-mute">
                    {item.text}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Monument preview                                                   */
/* ------------------------------------------------------------------ */

const monumentPreview = [
  {
    image: asset('/images/monument-family.webp'),
    alt: 'Семейный гранитный памятник',
    title: 'Семейные стелы',
    price: 'от 38 000 ₽',
    position: 'object-center',
  },
  {
    image: asset('/images/monument-premium.webp'),
    alt: 'Гранитная ваза и элементы мемориала',
    title: 'Премиум-мемориалы',
    price: 'от 87 000 ₽',
    position: 'object-center',
  },
  {
    image: asset('/images/crosses-cluster.webp'),
    alt: 'Православные кресты на кладбище',
    title: 'С крестом',
    price: 'от 19 500 ₽',
    position: 'object-center',
  },
];

export const HomeMonuments = () => {
  const { navigate } = useRouter();

  return (
    <section className="border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-x-14 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <span className="eyebrow">Памятники</span>
            <h2 className="mt-4 text-[clamp(24px,3vw,38px)] font-bold tracking-tight text-paper">
              Карельский габбро-диабаз и уфалейский мрамор
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="prose-muted">
              Изготавливаем стелы на собственном производстве: круговая полировка,
              бесплатный 3D-макет, доставка и монтаж на всех кладбищах города.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {monumentPreview.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} y={18} blur={8}>
              <button
                type="button"
                onClick={() => navigate('monuments')}
                className="group block w-full text-left"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy" decoding="async"
                    className={`h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04] ${item.position}`}
                  />
                </div>
                <div className="mt-4 border-t border-line pt-3">
                  <h3 className="text-[15px] font-semibold text-paper">{item.title}</h3>
                  <span className="mt-0.5 block text-[13px] text-mute">{item.price}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <button
            type="button"
            onClick={() => navigate('monuments')}
            className="action group"
          >
            Смотреть каталог и цены
            <ArrowRight className="h-4 w-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-paper" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Closing CTA                                                        */
/* ------------------------------------------------------------------ */

export const HomeCta = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      {/* Мягкий градиент-разделитель сверху — не жёсткая полоска */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-12">
          <div className="relative min-h-[260px] lg:col-span-5">
            <img
              src={asset('/images/alley-fog.webp')}
              alt="Тихая аллея в тумане"
              loading="lazy" decoding="async"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/40" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-14">
            <span className="eyebrow">Связаться со службой</span>
            <h2 className="mt-4 text-[clamp(24px,3vw,36px)] font-bold leading-tight tracking-tight text-paper">
              Позвоните — диспетчер ответит сразу
            </h2>
            <p className="mt-4 max-w-[52ch] text-[14px] leading-relaxed text-mute">
              Консультация бесплатная и ни к чему не обязывает. Если вы не знаете,
              что делать в первые часы, мы подскажем порядок действий по телефону.
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <a href="tel:+79517767747" className="action action--lg">
                <Phone className="h-4 w-4" />
                +7 (951) 776-77-47
              </a>
              <button type="button" onClick={() => navigate('contacts')} className="action action--muted">
                Контакты и филиалы
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-5 text-[11.5px] uppercase tracking-[0.16em] text-dim">
              Без выходных
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
