import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, MessageSquare, Star } from 'lucide-react';
import { ConsultationModal } from '../common/ConsultationModal';
import { asset } from '../../lib/asset';

interface HeroSectionProps {
  initialIntro?: boolean;
}

export const HeroSection = ({ initialIntro = false }: HeroSectionProps) => {
  const reduce = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const baseDelay = initialIntro ? 3.05 : 0;

  const enter = (delay: number) => ({
    initial: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 18, filter: 'blur(10px)' },
    animate: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: {
      duration: 0.65,
      delay: reduce ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <>
      <section
        id="top"
        className="relative isolate flex min-h-[calc(100svh-80px)] w-full flex-col justify-between overflow-hidden sm:min-h-[calc(100svh-88px)]"
      >
        {/* Photographic backdrop */}
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <img
            src={asset('/images/cemetery-alley.webp')}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-[55%_62%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#101215_0%,rgba(16,18,21,0.95)_34%,rgba(16,18,21,0.62)_62%,rgba(16,18,21,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,21,0.86)_0%,rgba(16,18,21,0.12)_32%,rgba(16,18,21,0.28)_72%,#101215_100%)]" />
        </div>

        <div className="wrap flex flex-1 flex-col justify-between">
          <div className="my-auto max-w-[1000px] py-14 sm:py-16 lg:py-20">
            <motion.div
              {...enter(baseDelay + 0.05)}
              className="flex items-center gap-3 text-[10.5px] uppercase tracking-[0.22em] text-mute sm:text-[11.5px]"
            >
              <span className="h-px w-10 bg-paper/40" />
              Городская ритуальная служба · Челябинск
            </motion.div>

            <h1 className="church mt-7 text-[clamp(32px,8vw,120px)] uppercase leading-[1.02] tracking-[0.035em] text-paper">
              {['Организация похорон', 'и благоустройство', 'мест захоронений'].map(
                (line, index) => (
                  <motion.span
                    key={line}
                    className={`block ${index === 1 ? 'text-dim' : ''}`}
                    initial={
                      reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(14px)' }
                    }
                    animate={
                      reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }
                    transition={{
                      duration: 0.75,
                      delay: reduce ? 0 : baseDelay + 0.12 + index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                ),
              )}
            </h1>

            <motion.p
              {...enter(baseDelay + 0.35)}
              className="mt-7 max-w-[620px] text-[16px] leading-[1.7] text-mute sm:text-[18px]"
            >
              Берём на себя все заботы в скорбный час: транспортировку, документы,
              организацию прощания и благоустройство захоронений на кладбищах Челябинска.
            </motion.p>

            <motion.div
              {...enter(baseDelay + 0.45)}
              className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-9"
            >
              <a href="tel:+79517767747" className="action action--lg">
                <Phone className="h-4 w-4" />
                +7 (951) 776-77-47
              </a>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="action action--muted"
                >
                  <MessageSquare className="h-4 w-4" />
                  Оставить заявку онлайн
                </button>
              </div>
            </motion.div>
          </div>

          <motion.dl
            {...enter(baseDelay + 0.55)}
            className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 bg-ink/35 py-6 backdrop-blur-[2px] sm:gap-8 lg:grid-cols-4 lg:py-7"
          >
            <div>
              <dt className="text-[15px] font-bold text-paper sm:text-[17px]">
                Фиксированная смета
              </dt>
              <dd className="mt-1.5 text-[12.5px] leading-snug text-dim">
                Сумма закрепляется в договоре
              </dd>
            </div>
            <div>
              <dt className="text-[15px] font-bold text-paper sm:text-[17px]">Пособие СФР</dt>
              <dd className="mt-1.5 text-[12.5px] leading-snug text-dim">
                Поможем оформить компенсацию
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-[15px] font-bold text-paper sm:text-[17px]">
                <Star className="h-3.5 w-3.5 fill-current" />
                5.0 2ГИС · 4.9 Яндекс
              </dt>
              <dd className="mt-1.5 text-[12.5px] leading-snug text-dim">
                75+ проверенных отзывов семей
              </dd>
            </div>
          </motion.dl>
        </div>
      </section>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
