import { ArrowRight, Phone } from 'lucide-react';
import { Link } from '../common/Link';
import { Picture } from '../common/Picture';
import { Reveal } from '../common/Reveal';
import { siteConfig } from '../../data/site';
import type { ImageName } from '../../data/images.generated';

const strip: { image: ImageName; alt: string; caption: string; position: string }[] = [
  {
    image: 'orthodox-graves',
    alt: 'Православные кресты на кладбище',
    caption: 'Работаем на всех кладбищах Челябинска и области',
    position: 'object-center',
  },
  {
    image: 'fence-granite',
    alt: 'Гранитный столб с кованой цепью',
    caption: 'Собственная гранитная мастерская и бригада монтажников',
    position: 'object-center',
  },
  {
    image: 'candles',
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
              Без посредников и наценок, в Челябинске и по всей России.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="prose-muted">
              Штатные агенты, собственный автопарк и гранитная мастерская. Поэтому смета
              не меняется по дороге, а сроки установки не зависят от сторонних бригад.
            </p>

            <dl className="mt-8 border-t border-line pt-7">
              <div>
                <dt className="text-[24px] font-bold leading-none text-paper">Россия</dt>
                <dd className="mt-2 text-[13px] leading-snug text-dim">
                  работаем по всей России
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {strip.map((item, index) => (
            <Reveal key={item.image} delay={index * 0.07} y={18} blur={8}>
              <figure className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-raise">
                  <Picture
                    name={item.image}
                    alt={item.alt}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className={`h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.03] ${item.position}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
                <figcaption className="mt-4 max-w-[30ch] text-[13.5px] leading-relaxed text-dim">
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

const directions: {
  page: 'funerals' | 'monuments' | 'care';
  index: string;
  title: string;
  text: string;
  image: ImageName;
  position: string;
}[] = [
  {
    page: 'funerals',
    index: '01',
    title: 'Организация похорон',
    text: 'Транспортировка, документы, прощание и погребение — в Челябинске и по России.',
    image: 'flowers',
    position: 'object-center',
  },
  {
    page: 'monuments',
    index: '02',
    title: 'Памятники и мемориалы',
    text: 'Гранитные стелы, кресты, цветники и реставрация.',
    image: 'monument-cross',
    position: 'object-center',
  },
  {
    page: 'care',
    index: '03',
    title: 'Благоустройство захоронений',
    text: 'Ограды, плитка, отсыпка и содержание участка.',
    image: 'fence-granite',
    position: 'object-center',
  },
];

export const HomeDirections = () => {
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
              <Link
                page={item.page}
                className="group relative block h-[360px] w-full overflow-hidden text-left sm:h-[420px]"
              >
                <Picture
                  name={item.image}
                  alt=""
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  className={`absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04] ${item.position}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,21,0.15)_0%,rgba(16,18,21,0.35)_45%,rgba(16,18,21,0.95)_100%)]" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="text-[11.5px] tabular-nums tracking-[0.16em] text-paper/70">
                    {item.index}
                  </span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-paper/70 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-[20px] font-bold leading-snug text-paper sm:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-[13.5px] leading-relaxed text-mute">
                    {item.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const monumentPreview: { image: ImageName; alt: string; title: string; price: string }[] = [
  {
    image: 'monument-family',
    alt: 'Семейный гранитный памятник',
    title: 'Семейные стелы',
    price: 'от 38 000 ₽',
  },
  {
    image: 'monument-premium',
    alt: 'Гранитная ваза и элементы мемориала',
    title: 'Премиум-мемориалы',
    price: 'от 87 000 ₽',
  },
  {
    image: 'crosses-cluster',
    alt: 'Православные кресты на кладбище',
    title: 'С крестом',
    price: 'от 19 500 ₽',
  },
];

export const HomeMonuments = () => {
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
              <Link page="monuments" className="group block w-full text-left">
                <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                  <Picture
                    name={item.image}
                    alt={item.alt}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 border-t border-line pt-3">
                  <h3 className="text-[15px] font-semibold text-paper">{item.title}</h3>
                  <span className="mt-0.5 block text-[13.5px] text-mute">{item.price}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link page="monuments" className="action group">
            Смотреть каталог и цены
            <ArrowRight className="h-4 w-4 text-dim transition-transform group-hover:translate-x-1 group-hover:text-paper" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export const HomeCta = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <div className="grid grid-cols-1 items-stretch gap-0 lg:grid-cols-12">
          <div className="relative min-h-[260px] lg:col-span-5">
            <Picture
              name="alley-fog"
              alt="Тихая аллея в тумане"
              sizes="(min-width: 1024px) 40vw, 92vw"
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
              <a href={`tel:${siteConfig.phoneHref}`} className="action action--lg">
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <Link page="contacts" className="action action--muted">
                Контакты и адрес
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-5 text-[12px] uppercase tracking-[0.16em] text-dim">
              Без выходных · Челябинск и вся Россия
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
