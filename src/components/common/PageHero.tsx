import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { Picture } from './Picture';
import type { ImageName } from '../../data/images.generated';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: ImageName;
  imageAlt?: string;
  /** Tailwind object-position value, e.g. "object-[60%_35%]" */
  position?: string;
  children?: ReactNode;
}

export const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  position = 'object-center',
  children,
}: PageHeroProps) => {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Picture
          name={image}
          alt={imageAlt}
          priority
          sizes="100vw"
          className={`h-full w-full object-cover grayscale ${position}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#101215_0%,rgba(16,18,21,0.92)_34%,rgba(16,18,21,0.5)_66%,rgba(16,18,21,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,21,0.45)_0%,rgba(16,18,21,0.05)_45%,#101215_100%)]" />
      </div>

      <div className="wrap relative z-10 py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="flex items-center gap-3 text-[11.5px] uppercase tracking-[0.2em] text-mute">
            <span className="h-px w-8 bg-paper/40" />
            {eyebrow}
          </div>
          <h1 className="display mt-5 max-w-[880px] text-[clamp(30px,4.2vw,60px)] leading-[1.16] text-paper focus:outline-none">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-[600px] text-[15px] leading-relaxed text-mute sm:text-[16px]">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
};
