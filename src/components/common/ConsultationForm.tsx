import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, ChevronDown, Loader2, Phone } from 'lucide-react';
import { EnvelopeIcon } from '../icons/EnvelopeIcon';
import { asset } from '../../lib/asset';
import { formatPhone, phoneDigits } from '../../lib/phone';
import { trackGoal } from '../../lib/analytics';
import { siteConfig } from '../../data/site';

interface ConsultationFormProps {
  onSuccess?: () => void;
  defaultMessage?: string;
  compact?: boolean;
  source?: string;
  titleId?: string;
}

const ACCESS_KEY = '91d64116-902d-4f85-aeb5-97172e7d6508';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

const topics = [
  'Организация похорон',
  'Кремация',
  'Памятник и благоустройство',
  'Пособие и документы',
  'Другое / пока не знаю',
];

export const ConsultationForm = ({
  onSuccess,
  defaultMessage = '',
  compact = false,
  source = 'Сайт',
  titleId,
}: ConsultationFormProps) => {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    topic: `${uid}-topic`,
    message: `${uid}-message`,
    email: `${uid}-email`,
    consent: `${uid}-consent`,
    error: `${uid}-error`,
  };
  const resolvedTitleId = titleId ?? `${uid}-title`;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState(defaultMessage);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedPhone, setSubmittedPhone] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const hasPhoneError = status === 'error' && phoneDigits(phone).length !== 11;

  useEffect(() => {
    if (status === 'error' && errorRef.current) {
      errorRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [status]);

  useEffect(() => {
    if (status === 'success') {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    if (phoneDigits(phone).length !== 11) {
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

    const formData = new FormData(event.currentTarget);
    formData.set('subject', `Заявка: ${topic}${name.trim() ? ` — ${name.trim()}` : ''}`);
    formData.set('from_name', 'Сайт «Содействие»');
    formData.set('source', source);
    formData.set('page', `${window.location.pathname}${window.location.hash}`);
    formData.set('referrer', document.referrer || 'прямой заход');
    formData.set(
      'sent_at',
      new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }),
    );
    if (email.trim()) formData.set('replyto', email.trim());

    const params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const value = params.get(key);
      if (value) formData.set(key, value);
    });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (response.ok && data?.success) {
        setSubmittedPhone(phone);
        setStatus('success');
        setName('');
        setPhone('');
        setEmail('');
        setTopic(topics[0]);
        setMessage('');
        setConsent(false);
        trackGoal('lead_form_success', { source, topic });
        if (onSuccess) window.setTimeout(onSuccess, 4000);
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message ||
            `Не удалось отправить заявку. Позвоните нам — примем по телефону: ${siteConfig.phone}.`,
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        `Не удалось отправить заявку. Проверьте соединение или позвоните: ${siteConfig.phone}.`,
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === 'success') {
    return (
      <div className="py-6 sm:py-8" aria-live="polite">
        <CheckCircle2 className="h-10 w-10 text-paper" />
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 text-[18px] font-bold text-paper outline-none"
        >
          Заявка принята
        </h2>
        <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-mute">
          Перезвоним{submittedPhone ? ` на ${submittedPhone}` : ''} в течение 15 минут.
          Если вопрос срочный, звоните сами:{' '}
          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="text-paper underline decoration-paper/40 underline-offset-2 hover:decoration-paper"
          >
            {siteConfig.phone}
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
    <form action={WEB3FORMS_URL} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value={ACCESS_KEY} />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
      <input
        type="hidden"
        name="subject"
        value="Новая заявка с сайта службы «Содействие»"
      />
      <input type="hidden" name="from_name" value="Сайт «Содействие»" />

      <div role="status" aria-live="polite" className="sr-only">
        {status === 'error' ? errorMessage : ''}
      </div>

      <div className="mb-5">
        <span className="eyebrow block">Обратная связь</span>
        <h2 id={resolvedTitleId} className="mt-1 text-[20px] font-bold text-paper sm:text-[22px]">
          Оставить заявку координатору
        </h2>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-dim">
          Оставьте телефон — перезвоним в течение 15 минут и подскажем порядок действий.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={ids.name} className="block text-[13px] font-medium text-mute">
              Ваше имя <span className="text-dim">*</span>
            </label>
            <input
              id={ids.name}
              type="text"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Как к вам обращаться"
              className="field mt-1"
            />
          </div>

          <div>
            <label htmlFor={ids.phone} className="block text-[13px] font-medium text-mute">
              Телефон <span className="text-dim">*</span>
            </label>
            <input
              ref={phoneRef}
              id={ids.phone}
              type="tel"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              maxLength={18}
              value={phone}
              onChange={(event) => {
                setPhone(formatPhone(event.target.value));
                if (status === 'error') {
                  setStatus('idle');
                  setErrorMessage('');
                }
              }}
              aria-invalid={hasPhoneError}
              aria-describedby={hasPhoneError ? ids.error : undefined}
              placeholder="+7 (___) ___-__-__"
              className={`field mt-1 ${hasPhoneError ? 'border-red-500/80' : ''}`}
            />
          </div>
        </div>

        <div>
          <label htmlFor={ids.topic} className="block text-[13px] font-medium text-mute">
            Тема обращения
          </label>
          <div className="relative mt-1">
            <select
              id={ids.topic}
              name="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="field cursor-pointer appearance-none bg-transparent pr-8 text-[16px]"
            >
              {topics.map((item) => (
                <option key={item} value={item} className="bg-surface text-paper">
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-dim"
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <label htmlFor={ids.message} className="block text-[13px] font-medium text-mute">
            Что случилось или что требуется{' '}
            <span className="text-dim">(необязательно)</span>
          </label>
          <textarea
            id={ids.message}
            name="message"
            rows={compact ? 3 : 4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Город, кладбище, дата — если уже знаете"
            className="field field--area mt-1"
          />
        </div>

        <div>
          <label htmlFor={ids.email} className="block text-[13px] font-medium text-mute">
            Электронная почта <span className="text-dim">(необязательно)</span>
          </label>
          <input
            id={ids.email}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Если удобнее ответить письмом"
            className="field mt-1"
          />
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <div className="flex min-h-[44px] min-w-[44px] items-center justify-center">
          <input
            type="checkbox"
            id={ids.consent}
            name="consent"
            value="Да"
            required
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (status === 'error') {
                setStatus('idle');
                setErrorMessage('');
              }
            }}
            className="h-5 w-5 shrink-0 cursor-pointer accent-[#edeef0]"
          />
        </div>
        <label
          htmlFor={ids.consent}
          className="flex min-h-[44px] cursor-pointer items-center text-[12.5px] leading-relaxed text-dim"
        >
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
      </div>

      {status === 'error' && (
        <div
          id={ids.error}
          ref={errorRef}
          className="mt-4 border-l-2 border-paper/40 py-1 pl-3 text-[13px] text-mute"
        >
          {errorMessage}
        </div>
      )}

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
          href={`tel:${siteConfig.phoneHref}`}
          className="inline-flex items-center gap-2 text-[12.5px] text-dim transition-colors hover:text-paper"
        >
          <Phone className="h-3.5 w-3.5" />
          Или позвонить: {siteConfig.phone}
        </a>
      </div>
    </form>
  );
};
