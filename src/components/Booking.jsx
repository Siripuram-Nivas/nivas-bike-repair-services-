import { useEffect, useId, useRef, useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Info,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { business, services } from '../config/business';
import { useBooking } from '../context/useBooking';
import { useLanguage } from '../context/useLanguage';
import { bookingUrl, normaliseIndianMobile } from '../lib/whatsapp';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

const emptyForm = {
  name: '',
  phone: '',
  brand: '',
  model: '',
  service: '',
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
  hintId,
  children,
}) {
  const { t } = useLanguage();
  const errorId = `${id}-error`;

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
          {required ? null : t('booking_optional')}
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
        <p id={errorId} className="field-error">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function Booking() {
  const { t } = useLanguage();
  const { request, clearRequest } = useBooking();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [lastUrl, setLastUrl] = useState('');

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const serviceRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const fieldRefs = {
    name: nameRef,
    phone: phoneRef,
    brand: brandRef,
    model: modelRef,
    service: serviceRef,
    date: dateRef,
    time: timeRef,
  };

  const minDate = todayISO();
  const hintId = useId();
  // The latest "Book this service" request wins over a manual choice; when the
  // visitor edits the select we clear the context request so the form follows
  // their input instead.
  const serviceId = request?.id || form.service || '';
  const prefilled = Boolean(request?.id);

  useEffect(() => {
    if (!request?.id) return undefined;

    const focusTimer = window.setTimeout(() => {
      serviceRef.current?.focus({ preventScroll: true });
    }, 450);

    return () => window.clearTimeout(focusTimer);
  }, [request]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setStatus('idle');
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  function validate(values) {
    const next = {};

    if (!values.name.trim()) next.name = t('err_name');
    if (!normaliseIndianMobile(values.phone)) next.phone = t('err_phone');
    if (!values.brand.trim()) next.brand = t('err_brand');
    if (!values.model.trim()) next.model = t('err_model');
    if (!serviceId) next.service = t('err_service');

    if (!values.date) {
      next.date = t('err_date');
    } else if (values.date < minDate) {
      next.date = t('err_date_past');
    }

    if (!values.time) next.time = t('err_time');

    return next;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }

    const selectedService = services.find((item) => item.id === serviceId);
    const url = bookingUrl({
      name: form.name,
      phone: form.phone,
      brand: form.brand,
      model: form.model,
      service: selectedService ? t(selectedService.nameKey) : form.service,
      date: form.date,
      time: form.time,
      problem: form.problem,
    });

    setLastUrl(url);
    setStatus('sent');

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="book" className="section-y scroll-mt-24 bg-ink text-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrowKey="booking_eyebrow"
              titleKey="booking_title"
              subtitleKey="booking_subtitle"
              dark
            />

            <Reveal delay={0.08} className="mt-8 space-y-3">
              <a
                href={business.phone.telHref}
                className="flex items-center gap-3 rounded-[8px] border border-white/12 bg-graphite px-4 py-3.5 transition-colors hover:border-accent/60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-accent text-ink">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/45">
                    {t('contact_call')}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-white">
                    {business.phone.display}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-3 rounded-[8px] border border-white/12 bg-graphite px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-white/15 text-accent-light">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.625rem] font-bold uppercase tracking-[0.16em] text-white/45">
                    {t('contact_hours_label')}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] font-medium text-white/85">
                    {t('contact_hours')}
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-[8px] border border-white/12 bg-graphite px-4 py-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-white/15 text-accent-light">
                  <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                </span>
                <p className="text-[0.75rem] leading-relaxed text-white/55">
                  {t('booking_privacy')}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="rounded-[10px] bg-white p-5 text-ink shadow-[0_40px_80px_-50px_rgba(0,0,0,0.9)] sm:p-7">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
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
                        onChange={updateField('name')}
                        placeholder={t('booking_name_ph')}
                        autoComplete="name"
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

                  <Field
                    id="booking-phone"
                    label={t('booking_phone')}
                    required
                    error={errors.phone}
                    hint={t('booking_phone_hint')}
                    hintId={`${hintId}-phone`}
                  >
                    {(props) => (
                      <input
                        {...props}
                        ref={phoneRef}
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={updateField('phone')}
                        placeholder={t('booking_phone_ph')}
                        autoComplete="tel"
                        inputMode="tel"
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

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
                        onChange={updateField('brand')}
                        placeholder={t('booking_brand_ph')}
                        autoComplete="off"
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

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
                        onChange={updateField('model')}
                        placeholder={t('booking_model_ph')}
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      id="booking-service"
                      label={t('booking_service')}
                      required
                      error={serviceId ? undefined : errors.service}
                    >
                      {(props) => (
                        <select
                          {...props}
                          ref={serviceRef}
                          name="service"
                          value={serviceId}
                          onChange={(event) => {
                            updateField('service')(event);
                            clearRequest();
                          }}
                          className="field-input"
                          required
                        >
                          <option value="">{t('booking_service_ph')}</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {t(service.nameKey)}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    {prefilled ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[0.6875rem] text-accent-dark">
                        <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
                        {t('booking_selected')}
                      </p>
                    ) : null}
                  </div>

                  <Field
                    id="booking-date"
                    label={t('booking_date')}
                    required
                    error={errors.date}
                  >
                    {(props) => (
                      <input
                        {...props}
                        ref={dateRef}
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={updateField('date')}
                        min={minDate}
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

                  <Field
                    id="booking-time"
                    label={t('booking_time')}
                    required
                    error={errors.time}
                    hint={t('booking_time_hint')}
                    hintId={`${hintId}-time`}
                  >
                    {(props) => (
                      <input
                        {...props}
                        ref={timeRef}
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={updateField('time')}
                        className="field-input"
                        required
                      />
                    )}
                  </Field>

                  <div className="sm:col-span-2">
                    <Field
                      id="booking-problem"
                      label={t('booking_problem')}
                    >
                      {(props) => (
                        <textarea
                          {...props}
                          name="problem"
                          rows={3}
                          value={form.problem}
                          onChange={updateField('problem')}
                          placeholder={t('booking_problem_ph')}
                          className="field-input resize-y"
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="mt-5 border-t border-line pt-5">
                  <button type="submit" className="btn btn-primary w-full">
                    <Send aria-hidden="true" className="h-[18px] w-[18px]" />
                    {t('booking_submit')}
                  </button>

                  <p className="mt-3 flex items-start gap-2 text-[0.75rem] leading-relaxed text-muted">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                    />
                    {t('booking_disclaimer')}
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

                  <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-[0.75rem] text-muted">
                    <CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />
                    {t('booking_call_instead')}
                    <a
                      href={business.phone.telHref}
                      className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-2"
                    >
                      {business.phone.display}
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
