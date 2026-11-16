import { siteConfig } from '../../data/site';

export const YandexMap = () => {
  const { lat, lng } = siteConfig.geo;
  const point = `${lng},${lat}`;
  const src = `https://yandex.ru/map-widget/v1/?ll=${encodeURIComponent(point)}&z=16&pt=${point},pm2rdm`;

  return (
    <div className="relative h-full w-full bg-raise">
      <iframe
        src={src}
        title="Карта: выставочный зал «Содействие», Челябинск, ул. 50-летия ВЛКСМ, 22"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
      />
    </div>
  );
};
