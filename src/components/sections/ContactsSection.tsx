import { Mail, Phone } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from '../icons/MessengerIcons';
import { Reveal } from '../common/Reveal';
import { PageHero } from '../common/PageHero';
import { YandexMap } from '../common/YandexMap';
import { cemeteriesData } from '../../data/content';
import { ConsultationForm } from '../common/ConsultationForm';
import { siteConfig } from '../../data/site';

const branches = [
  {
    district: 'Металлургический район',
    name: 'Выставочный зал и приём заказов',
    address: `${siteConfig.address}, 1 этаж`,
    hours: siteConfig.hours,
    landmark: 'Остановка «Киноцентр Импульс»',
  },
];

export const ContactsSection = () => {
  const mapLink = `https://yandex.ru/maps/?ll=${siteConfig.geo.lng}%2C${siteConfig.geo.lat}&z=17&pt=${siteConfig.geo.lng},${siteConfig.geo.lat}`;

  return (
    <>
      <PageHero
        eyebrow="05 — Контакты"
        title="Диспетчерская и приём заказов в Челябинске"
        description="Диспетчерская принимает заявки ежедневно. Поможем с организацией похорон и благоустройством на кладбищах Челябинска и области. Работаем по всей России."
        image="chelyabinsk"
        imageAlt="Панорама Челябинска"
        position="object-[50%_45%]"
      />

      <section id="contacts" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12 lg:items-start">
            <Reveal className="lg:col-span-5">
              <h2 className="text-[clamp(22px,2.6vw,32px)] font-bold tracking-tight text-paper">
                Телефон и приём заказов
              </h2>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="mt-4 block text-[clamp(26px,3vw,36px)] font-bold leading-none tracking-tight text-paper transition-colors hover:text-white"
              >
                {siteConfig.phone}
              </a>
              <p className="mt-3 text-[13.5px] leading-relaxed text-dim">
                Диспетчер отвечает сразу, без ожидания и автоответчика. WhatsApp и Telegram — на этот же номер.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action action--sm inline-flex"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action action--sm action--muted inline-flex"
                >
                  <TelegramIcon className="h-4 w-4" />
                  Telegram
                </a>
              </div>

              <div className="mt-6 flex items-center gap-2.5 text-[13px] text-dim">
                <Mail className="h-4 w-4" />
                <span>Почта:</span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="mt-10 border-t border-line pt-6">
                <h2 className="eyebrow block">Пункты приёма</h2>
                {branches.map((branch) => (
                  <div key={branch.address} className="mt-4 border-b border-line pb-4 last:border-b-0">
                    <h3 className="text-[14.5px] font-semibold text-paper">{branch.name}</h3>
                    <p className="mt-1 text-[13.5px] text-mute">{branch.address}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4 text-[12.5px] text-dim">
                      <span>{branch.hours}</span>
                      <span>{branch.landmark}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7 lg:border-l lg:border-line lg:pl-12" delay={0.1}>
              <ConsultationForm source="Страница контактов" />
            </Reveal>
          </div>

          <Reveal className="mt-16 border-t border-line pt-10">
            <div className="grid grid-cols-1 gap-x-14 gap-y-5 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow">Поиск захоронений</span>
                <h2 className="mt-2 max-w-[24ch] text-[20px] font-semibold leading-snug text-paper">
                  Не можете найти место захоронения?
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-[620px] text-[13.5px] leading-relaxed text-mute">
                  Подскажем расположение участка и могилы, поможем связаться с администрацией
                  кладбища. Работаем со всеми городскими и пригородными кладбищами.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-relaxed text-mute">
                  {cemeteriesData.map((cemetery, index) => (
                    <span key={cemetery} className="flex items-center gap-3">
                      {index > 0 ? <span className="text-line">·</span> : null}
                      {cemetery}
                    </span>
                  ))}
                </div>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="mt-5 inline-flex items-center gap-2 border-b border-line pb-1 text-[13.5px] font-semibold text-paper transition-colors hover:border-paper"
                >
                  <Phone className="h-4 w-4" />
                  Уточнить по телефону
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12" y={18} blur={8}>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="eyebrow">Пункт приёма на карте</h2>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-line pb-0.5 text-[12.5px] text-mute transition-colors hover:border-paper hover:text-paper"
              >
                Открыть в Яндекс.Картах
              </a>
            </div>
            <div className="h-[320px] w-full overflow-hidden border-t border-line sm:h-[400px]">
              <YandexMap />
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-dim">
              {siteConfig.addressFull}. {siteConfig.hours}. Выставочный зал и приём заказов на первом этаже.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};
