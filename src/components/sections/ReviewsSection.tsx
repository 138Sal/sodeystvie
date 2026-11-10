import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Star } from 'lucide-react';
import { platformsData, reviewsData } from '../../data/content';
import { Reveal } from '../common/Reveal';
import { PageHero } from '../common/PageHero';
import { asset } from '../../lib/asset';

type PlatformFilter = 'all' | 'yandex' | '2gis';

const stats = [
  {
    value: '5.0 / 5',
    label: 'Рейтинг в 2ГИС',
    description: '41 подтверждённая оценка жителей Челябинска.',
  },
  {
    value: '4.9 / 5',
    label: 'Рейтинг на Яндекс.Картах',
    description: '37 проверенных оценок реальных семей.',
  },
];

export const ReviewsSection = () => {
  const [filter, setFilter] = useState<PlatformFilter>('all');

  const filtered = reviewsData.filter((r) => {
    if (filter === 'yandex') return r.source === 'Яндекс.Карты';
    if (filter === '2gis') return r.source === '2ГИС';
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="05 — Отзывы"
        title="Отзывы о службе"
        description="Реальные отзывы жителей Челябинска на независимых площадках. Публикуем без исправлений — всё откровенно и открыто."
        image={asset('/images/flowers.webp')}
        imageAlt="Белые хризантемы"
        position="object-[50%_45%]"
      />

      <section id="reviews" className="py-14 sm:py-16 lg:py-20">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5 border-b border-line pb-6">
              {/* 2GIS rating summary */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[32px] font-bold text-paper sm:text-[36px]">
                    {platformsData.twoGis.rating}
                  </span>
                  <span className="text-[14px] text-dim">/ 5,0</span>
                </div>
                <div className="flex items-center gap-1 text-paper">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current text-paper" />
                  ))}
                </div>
                <a
                  href={platformsData.twoGis.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[12px] text-dim hover:text-paper"
                >
                  2ГИС ({platformsData.twoGis.reviewsCount} оценка)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Yandex rating summary */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[32px] font-bold text-paper sm:text-[36px]">
                    {platformsData.yandex.rating}
                  </span>
                  <span className="text-[14px] text-dim">/ 5,0</span>
                </div>
                <div className="flex items-center gap-1 text-paper">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current text-paper" />
                  ))}
                </div>
                <a
                  href={platformsData.yandex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[12px] text-dim hover:text-paper"
                >
                  Яндекс.Карты ({platformsData.yandex.reviewsCount} оценок)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-mute">
              Реальные отзывы жителей Челябинска на независимых площадках. Публикуем без
              исправлений — всё откровенно и открыто.
            </p>
          </Reveal>

        {/* Clean Filter Tabs + Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 border-b border-line pb-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`relative pb-1.5 text-[13px] font-semibold transition-colors ${
                filter === 'all'
                  ? 'text-paper after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-paper'
                  : 'text-dim hover:text-paper'
              }`}
            >
              Все отзывы ({reviewsData.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('yandex')}
              className={`relative pb-1.5 text-[13px] font-semibold transition-colors ${
                filter === 'yandex'
                  ? 'text-paper after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-paper'
                  : 'text-dim hover:text-paper'
              }`}
            >
              Яндекс.Карты (4.9 ★)
            </button>
            <button
              type="button"
              onClick={() => setFilter('2gis')}
              className={`relative pb-1.5 text-[13px] font-semibold transition-colors ${
                filter === '2gis'
                  ? 'text-paper after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-paper'
                  : 'text-dim hover:text-paper'
              }`}
            >
              2ГИС (5.0 ★)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={platformsData.yandex.url}
              target="_blank"
              rel="noopener noreferrer"
              className="action action--sm action--muted"
            >
              Написать в Яндекс
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={platformsData.twoGis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="action action--sm"
            >
              Написать в 2ГИС
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-2">
          {filtered.map((review, index) => (
            <Reveal key={`${review.source}-${review.name}-${index}`} delay={(index % 2) * 0.08} y={16} blur={7}>
              <figure className="flex h-full flex-col border-t border-line pt-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[15px] font-bold text-paper">{review.name}</span>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11.5px] text-dim">
                      <span className="text-mute">{review.badge}</span>
                      <span>·</span>
                      <span>{review.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-dim">
                      {review.source}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-bold text-paper">
                      <Star className="h-3 w-3 fill-current text-paper" />
                      <span>{review.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Body */}
                <blockquote className="mt-4 flex-1 text-[13.5px] leading-relaxed text-mute">
                  «{review.text}»
                </blockquote>

                {/* Footer link to official platform review */}
                <figcaption className="mt-5 flex items-center justify-between border-t border-line-soft pt-3 text-[11.5px] text-dim">
                  <span>Проверено модерацией платформы</span>
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-dim transition-colors hover:text-paper"
                  >
                    Открыть на {review.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 border-t border-line pt-12">
          <Reveal>
            <span className="eyebrow">Принципы службы</span>
            <h2 className="mt-3 text-[24px] font-bold text-paper">
              Почему нам доверяют в скорбный час
            </h2>
          </Reveal>

          <dl className="mt-8 grid grid-cols-1 border-t border-line sm:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06} y={16} blur={7}>
                <div className="border-b border-line py-6 sm:px-6 sm:odd:border-r sm:odd:pl-0 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                  <dt className="text-[28px] font-bold leading-none tracking-tight text-paper">
                    {stat.value}
                  </dt>
                  <dd className="mt-2.5 text-[13.5px] font-semibold text-mute">{stat.label}</dd>
                  <dd className="mt-1 text-[12.5px] leading-relaxed text-dim">
                    {stat.description}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
      </section>
    </>
  );
};
