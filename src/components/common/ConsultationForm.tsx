import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, CheckCircle2, ChevronDown, Loader2, Phone } from 'lucide-react';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { asset } from '../../lib/asset';

interface ConsultationFormProps {
  onSuccess?: () => void;
  defaultMessage?: string;
  compact?: boolean;
  source?: string;
}

const ACCESS_KEY = '91d64116-902d-4f85-aeb5-97172e7d6508';

const topics = [
  'Организация похорон',
  'Кремация',
  'Памятник и благоустройство',
  'Пособие и документы',
  'Другое / пока не знаю',
];

/** Приводит ввод к виду +7 (999) 123-45-67 */
const formatPhone = (raw: string) => {
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = '+7';
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ')';
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
};

export const ConsultationForm = ({
  onSuccess,
  defaultMessage = '',
  compact = false,
  source = 'Сайт',
}: ConsultationFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState(defaultMessage);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [topicOpen, setTopicOpen] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!topicOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (topicRef.current && !topicRef.current.contains(event.target as Node)) {
        setTopicOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setTopicOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [topicOpen]);

  useEffect(() => {
    if (status === 'error' && errorRef.current) {
      errorRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [status]);

  const moveTopic = (step: number) => {
    const index = topics.indexOf(topic);
    const next = (index + step + topics.length) % topics.length;
    setTopic(topics[next]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) {
      setStatus('error');
      setErrorMessage('Укажите телефон полностью — по нему перезвоним.');
      phoneRef.current?.focus();
      return;
    }

    if (!consent) {
      setStatus('error');
      setErrorMessage('Нужно согласие на обработку персональных данных.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Служебные поля — попадут в письмо вместе с заявкой
    formData.set('subject', `Заявка: ${topic}${name.trim() ? ` — ${name.trim()}` : ''}`);
    formData.set('from_name', 'Сайт «Содействие»');
    formData.set('source', source);
    formData.set('page', `${window.location.pathname}${window.location.hash}`);
    formData.set('referrer', document.referrer || 'прямой заход');
    formData.set(
      'sent_at',
      new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })
    );

    if (email.trim()) {
      formData.set('replyto', email.trim());
    }

    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const value = params.get(key);
      if (value) formData.set(key, value);
    });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    const post = async (url: string) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        signal: controller.signal,
      });
      const data = await response.json().catch(() => null);
      return { response, data };
    };

    try {
      // Сначала свой сервер: он пересылает заявку в Web3Forms со своей стороны.
      // Так форма работает даже там, где сторонние домены режет провайдер,
      // блокировщик или антивирус.
      let result: {
        response: Response;
        data: { success?: boolean; message?: string } | null;
      } | null = null;

      try {
        result = await post(asset('/api/lead'));
        // 404/405 — сайт лежит на статичном хостинге без прокси,
        // 5xx — прокси есть, но не смог достучаться до Web3Forms.
        // В обоих случаях пробуем отправить напрямую из браузера.
        if (result.response.status === 404 || result.response.status === 405 || result.response.status >= 500) {
          result = null;
        }
      } catch {
        result = null;
      }

      if (!result) {
        result = await post('https://api.web3forms.com/submit');
      }

      const { response, data } = result;

      if (response.ok && data?.success) {
        setSubmittedPhone(phone);
        setStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setTopic(topics[0]);
        setTopicOpen(false);
        setMessage('');
        setConsent(false);
        if (onSuccess) {
          setTimeout(onSuccess, 4000);
        }
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message || 'Не удалось отправить заявку. Позвоните нам — примем по телефону.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Не удалось отправить заявку. Проверьте соединение или позвоните: +7 (951) 776-77-47.'
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === 'success') {
    return (
      <div className="py-6 sm:py-8" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-paper" />
        <h4 className="mt-3 text-[18px] font-bold text-paper">Заявка принята</h4>
        <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-mute">
          Перезвоним{submittedPhone ? ` на ${submittedPhone}` : ''} в течение 15 минут.
          Если вопрос срочный, звоните сами:{' '}
          <a href="tel:+79517767747" className="text-paper underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
            +7 (951) 776-77-47
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="action action--sm mt-5 inline-flex"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
      {/* Web3Forms Access Key */}
      <input type="hidden" name="access_key" value={ACCESS_KEY} />

      {/* Botcheck Spam Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      {/* Subject and From (запасной вариант, если JS отключён) */}
      <input type="hidden" name="subject" value="Новая заявка с сайта службы «Содействие»" />
      <input type="hidden" name="from_name" value="Сайт «Содействие»" />

      <div className="mb-5">
        <span className="eyebrow block">Обратная связь</span>
        <h3 className="mt-1 text-[20px] font-bold text-paper sm:text-[22px]">
          Оставить заявку координатору
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-dim">
          Оставьте телефон — перезвоним в течение 15 минут и подскажем порядок действий.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="form-name" className="block text-[12px] font-medium text-mute">
              Ваше имя <span className="text-dim">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="field mt-1"
            />
          </div>

          <div>
            <label htmlFor="form-phone" className="block text-[12px] font-medium text-mute">
              Телефон <span className="text-dim">*</span>
            </label>
            <input
              ref={phoneRef}
              id="form-phone"
              type="tel"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              maxLength={18}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              placeholder="+7 (___) ___-__-__"
              className="field mt-1"
            />
          </div>
        </div>

        {/* Topic */}
        <div>
          <span id="form-topic-label" className="block text-[12px] font-medium text-mute">
            Тема обращения
          </span>
          <div className="relative" ref={topicRef}>
            <input type="hidden" name="topic" value={topic} />
            <button
              type="button"
              id="form-topic"
              aria-haspopup="listbox"
              aria-expanded={topicOpen}
              aria-labelledby="form-topic-label"
              onClick={() => setTopicOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setTopicOpen(true);
                  moveTopic(1);
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  setTopicOpen(true);
                  moveTopic(-1);
                } else if (event.key === 'Escape') {
                  setTopicOpen(false);
                }
              }}
              className="field mt-1 flex w-full cursor-pointer items-center justify-between gap-4 pr-0 text-left"
            >
              <span>{topic}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-dim transition-transform duration-200 ${
                  topicOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {topicOpen && (
              <ul
                role="listbox"
                aria-labelledby="form-topic-label"
                className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto bg-[#16191e] py-1 shadow-[0_18px_44px_rgba(0,0,0,0.65)]"
              >
                {topics.map((item) => (
                  <li key={item} role="option" aria-selected={item === topic}>
                    <button
                      type="button"
                      onClick={() => {
                        setTopic(item);
                        setTopicOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                        item === topic
                          ? 'bg-white/[0.06] text-paper'
                          : 'text-mute hover:bg-white/[0.04] hover:text-paper'
                      }`}
                    >
                      {item}
                      {item === topic && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="form-message" className="block text-[12px] font-medium text-mute">
            Что случилось или что требуется{' '}
            <span className="text-dim">(необязательно)</span>
          </label>
          <textarea
            id="form-message"
            name="message"
            rows={compact ? 3 : 4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Город, кладбище, дата — если уже знаете"
            className="field field--area mt-1"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor="form-email" className="block text-[12px] font-medium text-mute">
            Электронная почта <span className="text-dim">(необязательно)</span>
          </label>
          <input
            id="form-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Если удобнее ответить письмом"
            className="field mt-1"
          />
        </div>
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[11.5px] leading-relaxed text-dim">
        <input
          type="checkbox"
          name="consent"
          value="Да"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer accent-[#edeef0]"
        />
        <span>
          Согласен на обработку персональных данных в соответствии с{' '}
          <a
            href={asset('/privacy.html')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute underline decoration-line underline-offset-2 transition-colors hover:text-paper"
          >
            политикой конфиденциальности
          </a>
        </span>
      </label>

      {status === 'error' && (
        <div
          ref={errorRef}
          className="mt-4 border-l-2 border-paper/40 py-1 pl-3 text-[12.5px] text-mute"
          aria-live="polite"
        >
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="action action--lg disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <EnvelopeIcon className="h-4 w-4" />
              Отправить заявку
            </>
          )}
        </button>

        <a
          href="tel:+79517767747"
          className="inline-flex items-center gap-2 text-[11.5px] text-dim transition-colors hover:text-paper"
        >
          <Phone className="h-3.5 w-3.5" />
          Или позвонить: +7 (951) 776-77-47
        </a>
      </div>
    </form>
  );
};
