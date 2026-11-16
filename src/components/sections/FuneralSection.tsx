import { ArrowRight, Check, Phone } from 'lucide-react';
import { PageHero } from '../common/PageHero';
import { Picture } from '../common/Picture';
import { Link } from '../common/Link';
import { Reveal } from '../common/Reveal';
import { ConsultationForm } from '../common/ConsultationForm';
import {
  funeralIncludes,
  funeralSteps,
  funeralTeam,
  funeralWorks,
} from '../../data/content';
import { siteConfig } from '../../data/site';

export const FuneralSection = () => {
  return (
    <>
      <PageHero
        eyebrow="02 — Похороны"
        title="Организация похорон в Челябинске и по всей России"
        description="Берём на себя документы, транспорт, прощание и погребение. Помогаем семьям в Челябинске и организуем перевозку в любой регион России."
        image="team-1"
        imageAlt="Выездная бригада службы «Содействие» у транспорта"
        position="object-[50%_38%]"
      >
        <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <a href={`tel:${siteConfig.phoneHref}`} className="action action--lg">
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <a href="#funeral-form" className="action action--muted">
            Оставить заявку
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </PageHero>

      <section id="funerals" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow">Стоимость</span>
              <h2 className="mt-3 text-[clamp(26px,3.2vw,42px)] font-bold leading-tight tracking-tight text-paper">
                Похороны под ключ — от{' '}
                <span className="whitespace-nowrap">{siteConfig.priceFrom} ₽</span>
              </h2>
              <p className="prose-muted mt-5 max-w-[58ch]">
                В стоимость входят организация процесса, документы, транспорт и базовые
                атрибуты. Итоговая сумма зависит от региона, кладбища и выбранного пакета —
                фиксируем её в договоре до начала работ.
              </p>
              <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <a href={`tel:${siteConfig.phoneHref}`} className="action">
                  <Phone className="h-4 w-4" />
                  Позвонить в диспетчерскую
                </a>
                <a href="#funeral-form" className="action action--muted">
                  Рассчитать стоимость
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-5 text-[12.5px] leading-relaxed text-dim">
                Работаем по всей России: организуем перевозку и погребение в другом регионе.
              </p>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <div className="border-t border-line pt-6">
                <span className="eyebrow">Что входит</span>
                <ul className="mt-5 space-y-3.5">
                  {funeralIncludes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-mute">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-paper" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <Reveal>
              <span className="eyebrow">Порядок работы</span>
              <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
                Как проходит организация
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {funeralSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.05} y={14} blur={5}>
                  <div className="border-t border-line pt-4">
                    <span className="text-[11px] tabular-nums tracking-[0.14em] text-dim">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-[15.5px] font-semibold text-paper">{step.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-mute">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <Reveal>
              <span className="eyebrow">Команда</span>
              <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
                Наша похоронная команда
              </h2>
              <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-mute">
                Штатные агенты и выездная бригада. Не передаём заявки «на подряд» —
                семью сопровождает один координатор от первого звонка до погребения.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {funeralTeam.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06} y={16} blur={6}>
                  <figure className="group">
                    <div className="relative aspect-[4/3] overflow-hidden bg-raise">
                      <Picture
                        name={item.image}
                        alt={item.alt}
                        sizes="(min-width: 640px) 45vw, 92vw"
                        className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-line pt-3">
                      <h3 className="text-[15px] font-semibold text-paper">{item.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-mute">{item.text}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <Reveal>
              <span className="eyebrow">Наши работы</span>
              <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
                Примеры работ
              </h2>
              <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-mute">
                Реальные объекты: оформление места захоронения, венки и прощание.
                Имена и портреты на фотографиях скрыты по этическим соображениям.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {funeralWorks.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} y={16} blur={6}>
                  <figure className="group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-raise">
                      <Picture
                        name={item.image}
                        alt={item.alt}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                        className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-[1.015]"
                      />
                    </div>
                    <figcaption className="mt-3 border-b border-line pb-3">
                      <h3 className="text-[13.5px] font-semibold text-paper">{item.title}</h3>
                      <p className="mt-0.5 text-[12.5px] text-dim">{item.text}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-16 scroll-mt-24 border-t border-line pt-10" id="funeral-form">
            <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow">Заявка</span>
                <h2 className="mt-3 text-[clamp(22px,2.6vw,32px)] font-bold leading-snug tracking-tight text-paper">
                  Расскажите ситуацию — подскажем, что делать
                </h2>
                <p className="prose-muted mt-4">
                  Консультация бесплатна. Если вопрос срочный, звоните напрямую —
                  диспетчер ответит и подскажет порядок действий.
                </p>
                <a href={`tel:${siteConfig.phoneHref}`} className="action action--lg mt-7 inline-flex">
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <Link page="contacts" className="action action--sm action--muted">
                    Контакты и адрес
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link page="monuments" className="action action--sm action--muted">
                    Памятники и цены
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-12">
                <ConsultationForm
                  source="Страница похорон"
                  defaultMessage="Нужна организация похорон"
                  titleId="funeral-form-title"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};
