import { Mail, Phone } from 'lucide-react';
import { WhatsAppIcon, TelegramIcon } from '../icons/MessengerIcons';
import { ContactsMap } from '../common/ContactsMap';
import { Reveal } from '../common/Reveal';
import { PageHero } from '../common/PageHero';
import { cemeteriesData } from '../../data/content';
import { ConsultationForm } from '../common/ConsultationForm';
import { asset } from '../../lib/asset';

const branches = [
  {
    district: 'Металлургический район',
    name: 'Выставочный зал и приём заказов',
    address: 'ул. 50-летия ВЛКСМ, 22, 1 этаж',
    hours: 'Ежедневно с 10:00 до 17:00',
    landmark: 'Остановка «Киноцентр Импульс»',
  },
];

export const ContactsSection = () => {
  return (
    <>
      <PageHero
        eyebrow="06 — Контакты"
        title="Диспетчерская и приём заказов в Челябинске"
        description="Диспетчерская принимает заявки ежедневно. Поможем с организацией похорон и благоустройством на кладбищах Челябинска и области."
        image={asset('/images/chelyabinsk.webp')}
        imageAlt="Панорама Челябинска"
        position="object-[50%_45%]"
      />

      <section id="contacts" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
        <div className="mt-0 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Phones, Branches & Messengers */}
          <Reveal className="lg:col-span-5">
            <span className="eyebrow">Телефон</span>
            <a
              href="tel:+79517767747"
              className="mt-3 block text-[clamp(26px,3vw,36px)] font-bold leading-none tracking-tight text-paper transition-colors hover:text-white"
            >
              +7 (951) 776-77-47
            </a>
            <p className="mt-2 text-[12.5px] text-dim">
              Диспетчер отвечает сразу, без ожидания и автоответчика. WhatsApp и Telegram — на этот же номер.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/79517767747"
                target="_blank"
                rel="noopener noreferrer"
                className="action action--sm inline-flex"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="https://t.me/+79517767747"
                target="_blank"
                rel="noopener noreferrer"
                className="action action--sm action--muted inline-flex"
              >
                <TelegramIcon className="h-4 w-4" />
                Telegram
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2.5 text-[12.5px] text-dim">
              <Mail className="h-4 w-4" />
              <span>Почта: sizareva91@gmail.com</span>
            </div>

            {/* Branches List */}
            <div className="mt-10 border-t border-line pt-6">
              <span className="eyebrow block">Пункты приёма</span>
              {branches.map((branch) => (
                <div key={branch.address} className="mt-4 border-b border-line pb-4 last:border-b-0">
                  <h3 className="text-[14.5px] font-semibold text-paper">{branch.name}</h3>
                  <p className="mt-1 text-[13.5px] text-mute">{branch.address}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-[12px] text-dim">
                    <span>{branch.hours}</span>
                    <span>{branch.landmark}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Web3Forms Consultation Form */}
          <Reveal className="lg:col-span-7 lg:border-l lg:border-line lg:pl-12" delay={0.1}>
            <ConsultationForm source="Страница контактов" />
          </Reveal>
        </div>

        {/* Cemetery Search Section */}
        <Reveal className="mt-16 border-t border-line pt-10">
          <div className="grid grid-cols-1 gap-x-14 gap-y-5 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Поиск захоронений</span>
              <h3 className="mt-2 max-w-[24ch] text-[20px] font-semibold leading-snug text-paper">
                Не можете найти место захоронения?
              </h3>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-[620px] text-[13.5px] leading-relaxed text-mute">
                Подскажем расположение участка и могилы, поможем связаться с администрацией
                кладбища. Работаем со всеми городскими и пригородными кладбищами.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] leading-relaxed text-mute">
                {cemeteriesData.map((cemetery, index) => (
                  <span key={cemetery} className="flex items-center gap-3">
                    {index > 0 ? <span className="text-line">·</span> : null}
                    {cemetery}
                  </span>
                ))}
              </div>
              <a
                href="tel:+79517767747"
                className="mt-5 inline-flex items-center gap-2 border-b border-line pb-1 text-[13px] font-semibold text-paper transition-colors hover:border-paper"
              >
                <Phone className="h-4 w-4" />
                Уточнить по телефону
              </a>
            </div>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal className="mt-12" y={18} blur={8}>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <span className="eyebrow">Пункт приёма на карте</span>
            <a
              href="https://www.openstreetmap.org/#map=12/55.1579/61.4297"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line pb-0.5 text-[12px] text-mute transition-colors hover:border-paper hover:text-paper"
            >
              Открыть карту в новой вкладке
            </a>
          </div>
          <div className="h-[320px] w-full overflow-hidden border-t border-line sm:h-[400px]">
            <ContactsMap />
          </div>
        </Reveal>
      </div>
      </section>
    </>
  );
};
