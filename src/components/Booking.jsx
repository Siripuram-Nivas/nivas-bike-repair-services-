import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Droplets,
  Info,
  Link2,
  MessageCircle,
  Pencil,
  Phone,
  Send,
  Settings,
  ShieldCheck,
  Wrench,
  Zap,
} from 'lucide-react';
import { business, services } from '../config/business';
import { useBooking } from '../context/useBooking';
import { useLanguage } from '../context/useLanguage';
import {
  formatDateLabel,
  formatTimeLabel,
  timeSlots,
  todayISO,
} from '../lib/datetime';
import {
  bookingUrl,
  formatIndianPhone,
  normaliseIndianMobile,
} from '../lib/whatsapp';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

const TOTAL_STEPS = 6;

const SERVICE_ICONS = {
  settings: Settings,
  engine: Zap,
  oil: Droplets,
  brake: AlertCircle,
  wrench: Wrench,
  chain: Link2,
};

const STEP_KEYS = [
  { titleKey: 'booking_step1_title', descKey: 'booking_step1_desc' },
  { titleKey: 'booking_step2_title', descKey: 'booking_step2_desc' },
  { titleKey: 'booking_step3_title', descKey: 'booking_step3_desc' },
  { titleKey: 'booking_step4_title', descKey: 'booking_step4_desc' },
  { titleKey: 'booking_step5_title', descKey: 'booking_step5_desc' },
  { titleKey: 'booking_step6_title', descKey: 'booking_step6_desc' },
];

const FIELD_STEP = {
  service: 0,
  brand: 1,
  model: 1,
  name: 2,
  phone: 2,
  date: 3,
  time: 3,
};

const emptyForm = {
  service: '',
  brand: '',
  model: '',
  name: '',
  phone: '',
  date: '',
  time: '',
  problem: '',
};

function Field({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}) {
  const { t } = useLanguage();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        <span>
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-1 text-accent-dark">
              *
            </span>
          ) : null}
        </span>
        <span className="text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted">
          {required ? t('booking_required') : t('booking_optional')}
        </span>
      </label>

      {children({
        id,
        'aria-invalid': error ? 'true' : undefined,
        'aria-describedby':
          [hint ? hintId : null, error ? errorId : null]
            .filter(Boolean)
            .join(' ') || undefined,
      })}

      {hint ? (
        <p id={hintId} className="field-hint mt-1.5">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="field-error" role="alert">
          <AlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Booking() {
  const { t } = useLanguage();
  const { request, clearRequest } = useBooking();
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle');
  const [lastUrl, setLastUrl] = useState('');

  const headingRef = useRef(null);
  const mountedRef = useRef(false);
  const serviceFirstRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const minDate = todayISO();
  const currentStep = STEP_KEYS[step];
  const prefilled = Boolean(request?.id);
  const selectedService = services.find((item) => item.id === form.service);
  const selectedServiceLabel = selectedService
    ? t(selectedService.nameKey)
    : '';
  const isSunday =
    Boolean(form.date) &&
    new Date(`${form.date}T00:00:00`).getDay() === 0;

  const fieldRefs = {
    brand: brandRef,
    model: modelRef,
    name: nameRef,
    phone: phoneRef,
    date: dateRef,
    time: timeRef,
  };

  // Prefill the service chosen from the services section.
  useEffect(() => {
    if (!request?.id) return undefined;

    const applyTimer = window.setTimeout(() => {
      setForm((current) => ({ ...current, service: request.id }));
      setStep(0);
      setErrors({});
      setStatus('idle');
    }, 0);

    const focusTimer = window.setTimeout(() => {
      headingRef.current?.focus({ preventScroll: true });
    }, 380);

    return () => {
      window.clearTimeout(applyTimer);
      window.clearTimeout(focusTimer);
    };
  }, [request]);

  // Move focus and the viewport to the new step without losing context.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    document.getElementById('booking-form-card')?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus('idle');
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const appendProblem = (text) => {
    setForm((current) => ({
      ...current,
      problem: current.problem.trim()
        ? `${current.problem.trim()}, ${text}`
        : text,
    }));
    setStatus('idle');
  };

  function validateStep(index, values) {
    const next = {};

    if (index === 0 && !values.service) {
      next.service = t('err_service');
    }

    if (index === 1) {
      if (!values.brand.trim()) next.brand = t('err_brand');
      if (!values.model.trim()) next.model = t('err_model');
    }

    if (index === 2) {
      if (!values.name.trim()) next.name = t('err_name');
      if (!normaliseIndianMobile(values.phone)) next.phone = t('err_phone');
    }

    if (index === 3) {
      if (!values.date) {
        next.date = t('err_date');
      } else if (values.date < minDate) {
        next.date = t('err_date_past');
      }

      if (!values.time) next.time = t('err_time');
    }

    return next;
  }

  function focusField(field) {
    if (field === 'service') {
      serviceFirstRef.current?.focus();
      return;
    }

    fieldRefs[field]?.current?.focus();
  }

  function jumpToStep(target) {
    setErrors({});
    setStep(target);
  }

  function handleNext() {
    const stepErrors = validateStep(step, form);
    setErrors(stepErrors);

    const firstError = Object.keys(stepErrors)[0];
    if (firstError) {
      focusField(firstError);
      return;
    }

    setStep((current) => Math.min(TOTAL_STEPS - 1, current + 1));
  }

  function handleBack() {
    setErrors({});
    setStep((current) => Math.max(0, current - 1));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const allErrors = [0, 1, 2, 3, 4, 5].reduce(
      (accumulator, index) => ({
        ...accumulator,
        ...validateStep(index, form),
      }),
      {},
    );

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const firstField = Object.keys(allErrors).sort(
        (a, b) => FIELD_STEP[a] - FIELD_STEP[b],
      )[0];
      setStep(FIELD_STEP[firstField]);
      window.setTimeout(() => focusField(firstField), 120);
      return;
    }

    const url = bookingUrl({
      name: form.name,
      phone: form.phone,
      brand: form.brand,
      model: form.model,
      service: selectedServiceLabel || form.service,
      date: form.date,
      time: form.time,
      problem: form.problem,
    });

    setLastUrl(url);
    setStatus('sent');
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const summaryRows = [
    {
      labelKey: 'booking_summary_service',
      value: selectedServiceLabel,
      targetStep: 0,
    },
    {
      labelKey: 'booking_summary_bike',
      value: `${form.brand} ${form.model}`.trim(),
      targetStep: 1,
    },
    {
      labelKey: 'booking_summary_contact',
      value: form.name.trim()
        ? `${form.name.trim()} · ${formatIndianPhone(form.phone)}`
        : '',
      targetStep: 2,
    },
    {
      labelKey: 'booking_summary_time',
      value:
        form.date && form.time
          ? `${formatDateLabel(form.date)} · ${formatTimeLabel(form.time)}`
          : '',
      targetStep: 3,
    },
    {
      labelKey: 'booking_summary_problem',
      value: form.problem.trim(),
      targetStep: 4,
    },
  ];

  return (
    <section id="book" className="section-y scroll-mt-24 bg-ink text-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrowKey="booking_eyebrow"
              titleKey="booking_title"
              subtitleKey="booking_subtitle"
              dark
            />

            <Reveal delay={0.06} className="mt-7">
              <div className="inline-flex items-center gap-2 rounded-[3px] border border-accent/30 bg-accent/10 px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-accent-light">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" />
                {t('booking_no_payment')}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <div className="rounded-[5px] border border-white/12 bg-graphite p-5">
                <h3 className="font-display text-[1rem] font-bold text-white">
                  {t('booking_next_title')}
                </h3>
                <ol className="mt-4 space-y-3.5">
                  {['booking_next_1', 'booking_next_2', 'booking_next_3'].map(
                    (key, index) => (
                      <li key={key} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[0.625rem] font-semibold text-accent-light"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[0.8125rem] leading-relaxed text-white/60">
                          {t(key)}
                        </p>
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-4">
              <div className="flex items-start gap-3 rounded-[5px] border border-white/10 px-4 py-3.5">
                <Info
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                />
                <p className="text-[0.75rem] leading-relaxed text-white/55">
                  {t('booking_privacy')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18} className="mt-4">
              <a
                href={business.phone.telHref}
                className="flex items-center gap-3 rounded-[5px] border border-white/12 bg-graphite px-4 py-3.5 transition-colors hover:border-accent/60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-accent text-ink">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-white/55">
                    {t('contact_call')}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-white">
                    {business.phone.display}
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div
              id="booking-form-card"
              className="scroll-mt-28 rounded-[6px] bg-white p-5 text-ink shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {t('booking_step')} {step + 1} {t('booking_of')} {TOTAL_STEPS}
                </p>
                <p className="text-[0.75rem] font-semibold text-accent-dark">
                  {t(currentStep.titleKey)}
                </p>
              </div>

              <ol
                aria-label={t('booking_progress_label')}
                className="mt-3 grid grid-cols-6 gap-1.5"
              >
                {STEP_KEYS.map((item, index) => {
                  const complete = index < step;
                  const current = index === step;
                  return (
                    <li
                      key={item.titleKey}
                      aria-current={current ? 'step' : undefined}
                      className={`h-1.5 rounded-full transition-colors ${
                        complete || current ? 'bg-accent' : 'bg-line'
                      }`}
                    >
                      <span className="sr-only">
                        {t('booking_step')} {index + 1}: {t(item.titleKey)}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <p className="sr-only" aria-live="polite">
                {t('booking_step')} {step + 1} {t('booking_of')} {TOTAL_STEPS}:{' '}
                {t(currentStep.titleKey)}
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6">
                <h3
                  ref={headingRef}
                  tabIndex={-1}
                  className="display-title text-[1.75rem] outline-none sm:text-[2rem]"
                >
                  {t(currentStep.titleKey)}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  {t(currentStep.descKey)}
                </p>

                {Object.keys(errors).length > 0 ? (
                  <p
                    role="alert"
                    className="mt-4 flex items-start gap-2 border-l-2 border-[#b42318] bg-[#fff8f7] px-3 py-2.5 text-[0.75rem] font-medium leading-relaxed text-[#b42318]"
                  >
                    <AlertCircle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />
                    {t('booking_step_requires')}
                  </p>
                ) : null}

                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5"
                >
                  {step === 0 ? (
                    <div>
                      <div
                        role="radiogroup"
                        aria-label={t('booking_service')}
                        aria-describedby={
                          errors.service ? 'booking-service-error' : undefined
                        }
                        className="grid gap-2 sm:grid-cols-2"
                      >
                        {services.map((service, index) => {
                          const Icon = SERVICE_ICONS[service.icon] || Wrench;
                          const checked = form.service === service.id;

                          return (
                            <label
                              key={service.id}
                              className={`relative flex cursor-pointer items-start gap-3 rounded-[4px] border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-accent/50 ${
                                checked
                                  ? 'border-accent bg-accent/10'
                                  : 'border-line bg-white hover:border-ink/30'
                              }`}
                            >
                              <input
                                ref={index === 0 ? serviceFirstRef : null}
                                id={`booking-service-${index}`}
                                type="radio"
                                name="service"
                                value={service.id}
                                checked={checked}
                                onChange={() => {
                                  setField('service', service.id);
                                  if (request?.id) clearRequest();
                                }}
                                aria-invalid={
                                  errors.service ? 'true' : undefined
                                }
                                className="sr-only"
                              />

                              <span
                                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] ${
                                  checked
                                    ? 'bg-accent text-ink'
                                    : 'border border-line text-accent-dark'
                                }`}
                              >
                                <Icon aria-hidden="true" className="h-4 w-4" />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block font-display text-[0.9rem] font-bold leading-snug text-ink">
                                  {t(service.nameKey)}
                                </span>
                                <span className="mt-0.5 block text-[0.6875rem] leading-relaxed text-muted">
                                  {t('price_estimate')}
                                </span>
                              </span>

                              <span
                                aria-hidden="true"
                                className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                                  checked
                                    ? 'border-accent bg-accent text-ink'
                                    : 'border-line'
                                }`}
                              >
                                {checked ? <Check className="h-3 w-3" /> : null}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {errors.service ? (
                        <p
                          id="booking-service-error"
                          className="field-error"
                          role="alert"
                        >
                          <AlertCircle
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          />
                          {errors.service}
                        </p>
                      ) : null}

                      {prefilled ? (
                        <p className="mt-2 flex items-start gap-1.5 text-[0.6875rem] leading-relaxed text-accent-dark">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          />
                          {t('booking_selected')}
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="space-y-5">
                      <Field
                        id="booking-brand"
                        label={t('booking_brand')}
                        required
                        error={errors.brand}
                      >
                        {(props) => (
                          <input
                            {...props}
                            ref={brandRef}
                            type="text"
                            name="brand"
                            value={form.brand}
                            onChange={(event) =>
                              setField('brand', event.target.value)
                            }
                            placeholder={t('booking_brand_ph')}
                            autoComplete="off"
                            className="field-input"
                          />
                        )}
                      </Field>

                      <div>
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted">
                          {t('booking_brand_quick')}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {business.brands.map((brand) => (
                            <button
                              key={brand}
                              type="button"
                              onClick={() => setField('brand', brand)}
                              aria-pressed={form.brand === brand}
                              className={`min-h-8 rounded-[3px] border px-2.5 text-[0.75rem] font-semibold transition-colors ${
                                form.brand === brand
                                  ? 'border-accent bg-accent/10 text-accent-dark'
                                  : 'border-line text-graphite hover:border-ink'
                              }`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Field
                        id="booking-model"
                        label={t('booking_model')}
                        required
                        error={errors.model}
                      >
                        {(props) => (
                          <input
                            {...props}
                            ref={modelRef}
                            type="text"
                            name="model"
                            value={form.model}
                            onChange={(event) =>
                              setField('model', event.target.value)
                            }
                            placeholder={t('booking_model_ph')}
                            autoComplete="off"
                            className="field-input"
                          />
                        )}
                      </Field>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-5">
                      <Field
                        id="booking-name"
                        label={t('booking_name')}
                        required
                        error={errors.name}
                      >
                        {(props) => (
                          <input
                            {...props}
                            ref={nameRef}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(event) =>
                              setField('name', event.target.value)
                            }
                            placeholder={t('booking_name_ph')}
                            autoComplete="name"
                            className="field-input"
                          />
                        )}
                      </Field>

                      <Field
                        id="booking-phone"
                        label={t('booking_phone')}
                        required
                        error={errors.phone}
                        hint={t('booking_phone_hint')}
                      >
                        {(props) => (
                          <input
                            {...props}
                            ref={phoneRef}
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={(event) =>
                              setField('phone', event.target.value)
                            }
                            placeholder={t('booking_phone_ph')}
                            autoComplete="tel"
                            inputMode="tel"
                            className="field-input"
                          />
                        )}
                      </Field>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-5">
                      <Field
                        id="booking-date"
                        label={t('booking_date')}
                        required
                        error={errors.date}
                        hint={t('booking_date_hint')}
                      >
                        {(props) => (
                          <input
                            {...props}
                            ref={dateRef}
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={(event) =>
                              setField('date', event.target.value)
                            }
                            min={minDate}
                            className="field-input"
                          />
                        )}
                      </Field>

                      {isSunday ? (
                        <p className="flex items-start gap-2 border-l-2 border-accent bg-accent/10 px-3 py-2.5 text-[0.75rem] leading-relaxed text-graphite">
                          <Info
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                          />
                          {t('booking_sunday_note')}
                        </p>
                      ) : null}

                      <fieldset
                        aria-describedby={
                          [
                            'booking-time-hint',
                            errors.time ? 'booking-time-error' : null,
                          ]
                            .filter(Boolean)
                            .join(' ')
                        }
                      >
                        <legend className="field-label">
                          <span>
                            {t('booking_time')}
                            <span
                              aria-hidden="true"
                              className="ml-1 text-accent-dark"
                            >
                              *
                            </span>
                          </span>
                        </legend>
                        <p
                          id="booking-time-hint"
                          className="field-hint mb-3"
                        >
                          {t('booking_time_hint')}
                        </p>

                        <div className="space-y-4">
                          {['morning', 'afternoon', 'evening'].map(
                            (period) => (
                              <div key={period}>
                                <p className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                  {t(`booking_time_${period}`)}
                                </p>
                                <div
                                  role="radiogroup"
                                  aria-label={t(`booking_time_${period}`)}
                                  className="grid grid-cols-3 gap-1.5 sm:grid-cols-4"
                                >
                                  {timeSlots
                                    .filter(
                                      (slot) => slot.period === period,
                                    )
                                    .map((slot, index) => {
                                      const checked =
                                        form.time === slot.value;

                                      return (
                                        <label
                                          key={slot.value}
                                          className={`flex min-h-9 cursor-pointer items-center justify-center rounded-[3px] border px-1.5 text-center text-[0.75rem] font-semibold transition-colors focus-within:ring-2 focus-within:ring-accent/50 ${
                                            checked
                                              ? 'border-accent bg-accent text-ink'
                                              : 'border-line text-graphite hover:border-ink/40'
                                          }`}
                                        >
                                          <input
                                            ref={
                                              period === 'morning' &&
                                              index === 0
                                                ? timeRef
                                                : null
                                            }
                                            type="radio"
                                            name="time"
                                            value={slot.value}
                                            checked={checked}
                                            onChange={() =>
                                              setField('time', slot.value)
                                            }
                                            aria-invalid={
                                              errors.time
                                                ? 'true'
                                                : undefined
                                            }
                                            className="sr-only"
                                          />
                                          {slot.label}
                                        </label>
                                      );
                                    })}
                                </div>
                              </div>
                            ),
                          )}
                        </div>

                        {errors.time ? (
                          <p
                            id="booking-time-error"
                            className="field-error"
                            role="alert"
                          >
                            <AlertCircle
                              aria-hidden="true"
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                            />
                            {errors.time}
                          </p>
                        ) : null}
                      </fieldset>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div>
                      <Field
                        id="booking-problem"
                        label={t('booking_problem')}
                      >
                        {(props) => (
                          <textarea
                            {...props}
                            name="problem"
                            rows={5}
                            value={form.problem}
                            onChange={(event) =>
                              setField('problem', event.target.value)
                            }
                            placeholder={t('booking_problem_ph')}
                            className="field-input resize-y"
                          />
                        )}
                      </Field>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {[
                          'booking_chip_noise',
                          'booking_chip_brakes',
                          'booking_chip_start',
                          'booking_chip_oil',
                        ].map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => appendProblem(t(key))}
                            className="min-h-8 rounded-full border border-line px-3 text-[0.75rem] font-medium text-graphite transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent-dark"
                          >
                            + {t(key)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div>
                      <ul className="divide-y divide-line border-y border-line">
                        {summaryRows.map((row) => {
                          const value =
                            row.value || t('booking_summary_not_provided');

                          return (
                            <li
                              key={row.labelKey}
                              className="flex items-start justify-between gap-4 py-3.5"
                            >
                              <div className="min-w-0">
                                <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-muted">
                                  {t(row.labelKey)}
                                </p>
                                <p className="mt-1 whitespace-pre-line text-[0.875rem] font-medium leading-relaxed text-ink">
                                  {value}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => jumpToStep(row.targetStep)}
                                className="inline-flex min-h-8 shrink-0 items-center gap-1 text-[0.75rem] font-semibold text-accent-dark transition-colors hover:text-ink"
                              >
                                <Pencil
                                  aria-hidden="true"
                                  className="h-3 w-3"
                                />
                                {t('booking_edit')}
                                <span className="sr-only">
                                  : {t(row.labelKey)}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mt-4 rounded-[4px] border border-line bg-cream p-4">
                        <p className="flex items-start gap-2 text-[0.8125rem] font-semibold leading-relaxed text-ink">
                          <MessageCircle
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                          />
                          {t('booking_summary_whatsapp')}{' '}
                          {business.whatsapp.display}
                        </p>
                        <p className="mt-2 text-[0.75rem] leading-relaxed text-muted">
                          {t('booking_disclaimer')}
                        </p>
                      </div>

                      <p className="mt-3 flex items-start gap-2 border-l-2 border-accent bg-accent/10 px-3 py-2.5 text-[0.75rem] font-medium leading-relaxed text-graphite">
                        <Clock
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                        />
                        {t('booking_summary_not_confirmed')}
                      </p>

                      <div aria-live="polite" aria-atomic="true">
                        {status === 'sent' ? (
                          <div className="mt-4 border-l-2 border-accent bg-cream p-3.5">
                            <p className="flex items-start gap-2 text-[0.8125rem] font-medium leading-relaxed text-ink">
                              <CheckCircle2
                                aria-hidden="true"
                                className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                              />
                              {t('booking_success')}
                            </p>
                            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 pl-6 text-[0.75rem] text-muted">
                              <span>{t('booking_blocked')}</span>
                              <a
                                href={lastUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-accent-dark underline decoration-accent underline-offset-2"
                              >
                                {t('booking_open_manual')}
                              </a>
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </motion.div>

                <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-outline-dark w-full !min-h-11 !text-[0.8125rem] sm:w-auto"
                    >
                      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                      {t('booking_back')}
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}

                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    {step === 4 ? (
                      <button
                        type="button"
                        onClick={() => jumpToStep(5)}
                        className="min-h-10 text-[0.8125rem] font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink"
                      >
                        {t('booking_skip')}
                      </button>
                    ) : null}

                    {step < TOTAL_STEPS - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn btn-dark w-full !min-h-11 !text-[0.8125rem] sm:w-auto"
                      >
                        {t('booking_next')}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary w-full !min-h-11 !text-[0.8125rem] sm:w-auto"
                      >
                        <Send aria-hidden="true" className="h-4 w-4" />
                        {t('booking_submit')}
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.6875rem] text-muted">
                  <CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />
                  {t('booking_call_instead')}
                  <a
                    href={business.phone.telHref}
                    className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-2"
                  >
                    {business.phone.display}
                  </a>
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
