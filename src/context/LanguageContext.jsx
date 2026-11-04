import { useEffect, useState } from 'react';
import { LanguageContext } from './useLanguage';

/**
 * English / Telugu copy for every section of the site.
 * Keys are intentionally flat so `t('key')` stays simple and predictable.
 */
const content = {
  en: {
    // Global / navigation
    skip_link: 'Skip to content',
    new_tab: 'Opens in a new tab',
    nav_aria: 'Primary navigation',
    mobile_nav_aria: 'Mobile navigation',
    nav_home: 'Home',
    nav_services: 'Services',
    nav_why: 'Why us',
    nav_gallery: 'Gallery',
    nav_process: 'Process',
    nav_feedback: 'Feedback',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',
    nav_book: 'Book a service',
    nav_menu: 'Menu',
    nav_close: 'Close menu',
    mobile_actions: 'Quick contact actions',
    lang_toggle: 'తెలుగు',
    lang_toggle_aria: 'Switch language to Telugu',
    lang_current: 'English',
    lang_label: 'Language',

    // Hero
    hero_eyebrow: 'Motorcycle workshop · Sundaragiri',
    hero_title: 'Reliable bike repair,',
    hero_title_accent: 'right here in Sundaragiri.',
    hero_desc:
      'General servicing, engine repair and straight answers from a local workshop that knows your bike.',
    hero_cta: 'Book a service',
    hero_cta_secondary: 'Call the workshop',
    hero_note:
      'Your appointment is confirmed once the workshop replies on WhatsApp.',
    hero_image_alt:
      'Mechanic working on a motorcycle by lamplight in a workshop',
    hero_hours_label: 'Workshop hours',
    hero_hours_value: 'Mon – Sat · 8 AM – 7 PM',
    hero_sunday: 'Sunday by appointment',
    hero_location_label: 'Find the workshop',
    hero_location_value: 'Sundaragiri, Telangana',
    hero_scroll: 'Scroll to explore',
    hero_card_label: 'Local workshop',
    hero_card_meta: 'Sundaragiri · Telangana',
    trust1_title: 'Local workshop',
    trust1_desc: 'Based in Sundaragiri, Telangana',
    trust2_title: 'Talk to the mechanic',
    trust2_desc: 'No call centre in between',
    trust3_title: 'Easy WhatsApp booking',
    trust3_desc: 'Send your request in a few steps',

    // Services
    services_eyebrow: 'What we do',
    services_title: 'Everything your bike needs, in one place.',
    services_subtitle:
      'From a routine service to a difficult engine fault — we explain the work clearly before we start.',
    services_book: 'Book this service',
    services_book_aria: 'Book this service:',
    services_estimate_note:
      'Every estimate is confirmed after inspection.',
    services_help_title: 'Not sure what your bike needs?',
    services_help_desc:
      'Describe the symptom and we will tell you what to check first.',
    services_help_cta: 'Ask on WhatsApp',
    services_note:
      'Parts are quoted separately and replaced only with your approval.',
    svc1_title: 'General bike servicing',
    svc1_desc:
      'A full inspection and comprehensive service to keep your motorcycle running smoothly.',
    svc2_title: 'Engine repair and tuning',
    svc2_desc:
      'Diagnosis, repair and tuning for engine problems, rough running and loss of power.',
    svc3_title: 'Engine oil replacement',
    svc3_desc:
      'Engine oil drained and replaced with the grade suited to your bike.',
    svc4_title: 'Brake and clutch repair',
    svc4_desc:
      'Inspection, adjustment and repair of brakes and clutch for safer riding.',
    svc5_title: 'General maintenance',
    svc5_desc:
      'Routine checks, adjustments and preventive care to catch small issues early.',
    svc6_title: 'Chain cleaning and lubrication',
    svc6_desc:
      'Chain cleaned, lubricated and adjusted for smoother power delivery and less wear.',
    price_estimate: 'Contact for estimate',
    price_after_inspection: 'Confirmed after inspection',
    pricing_from: 'Starting from',

    // Why choose us
    why_eyebrow: 'Why choose us',
    why_title: 'A workshop you can talk to.',
    why_subtitle:
      'No sales pressure and no mystery charges — just careful work and a mechanic who answers your questions.',
    why1_title: 'Personal attention',
    why1_desc:
      'The person who inspects your bike is the person who repairs it.',
    why2_title: 'Clear communication',
    why2_desc:
      'We explain the fault in plain language before touching the engine.',
    why3_title: 'Estimates you approve',
    why3_desc:
      'You hear the likely cost first. Work begins only after you agree.',
    why4_title: 'Careful workmanship',
    why4_desc: 'Every repair is checked before the bike is handed back.',
    why5_title: 'Convenient local service',
    why5_desc:
      'Easy to reach in Sundaragiri, with WhatsApp booking and direct contact.',
    why6_title: 'Direct follow-up',
    why6_desc:
      'If something does not feel right after a repair, call the workshop directly.',
    why_image_alt:
      'Mechanic carefully repairing a motorcycle in a workshop',
    why_badge_title: 'Straight answers',
    why_badge_text:
      'Ask what your bike needs and what it will cost before any work starts.',
    why_note: 'Work starts only after you approve the estimate.',

    // Gallery
    gallery_eyebrow: 'Inside the workshop',
    gallery_title: 'Careful work, up close.',
    gallery_subtitle:
      'A look at the kind of repair and maintenance work we handle.',
    gallery_note:
      'Representative workshop photography. Ask us for photos of your bike during service.',
    gallery1_title: 'Engine and clutch work',
    gallery1_alt:
      'Mechanic cleaning engine and clutch components beside a motorcycle',
    gallery2_title: 'Engine internals',
    gallery2_alt:
      'Close-up of motorcycle engine internals and timing chain',
    gallery3_title: 'Chain and sprocket',
    gallery3_alt:
      'Motorcycle wheel and sprocket with tools on the ground',
    gallery4_title: 'Classic bike servicing',
    gallery4_alt: 'Mechanic servicing a classic motorcycle',
    gallery5_title: 'Electrical and bodywork',
    gallery5_alt:
      'Mechanic checking electrical parts on a motorcycle',
    gallery6_title: 'Local workshop',
    gallery6_alt: 'Local mechanic repairing a motorcycle',
    gallery_open: 'View photo',
    gallery_close: 'Close gallery',
    gallery_prev: 'Previous photo',
    gallery_next: 'Next photo',
    gallery_view_label: 'Open photo:',

    // Process
    process_eyebrow: 'How it works',
    process_title: 'Four steps to a better ride.',
    process_subtitle:
      'No account and no prepayment. Send your request, get a confirmation, then bring your bike in.',
    process_step: 'Step',
    step1_title: 'Choose your service',
    step1_desc: 'Pick the service closest to what your bike needs.',
    step2_title: 'Send your request',
    step2_desc:
      'Share your bike details and preferred time on WhatsApp.',
    step3_title: 'Get confirmation',
    step3_desc:
      'The workshop replies to confirm availability and the likely estimate.',
    step4_title: 'Visit the workshop',
    step4_desc:
      'Bring your bike at the agreed time and get it serviced.',
    process_cta: 'Start a booking request',
    process_note:
      'Your appointment is confirmed only after the workshop replies.',

    // Bike care tips
    tips_eyebrow: 'Bike care',
    tips_title: 'Small habits, fewer breakdowns.',
    tips_subtitle: 'Simple checks that prevent expensive repairs.',
    tip1_title: 'Service periodically',
    tip1_desc:
      'Get your bike serviced every 3,000 km or 3 months, whichever comes first.',
    tip2_title: 'Check tyre pressure',
    tip2_desc:
      'Check tyre pressure weekly. Correct pressure improves mileage and handling.',
    tip3_title: 'Clean and lube the chain',
    tip3_desc:
      'Keep the drive chain clean and well-lubricated for smooth power delivery.',
    tip4_title: 'Check engine oil',
    tip4_desc:
      'Monitor the engine oil level regularly. Low oil can cause serious engine damage.',

    // Feedback (no fabricated testimonials)
    reviews_eyebrow: 'Rider feedback',
    reviews_title: 'Trust is earned, not printed.',
    reviews_subtitle:
      'We do not publish testimonials, star ratings or review counts we cannot verify.',
    reviews_body:
      'If you have had your bike serviced with us, we would like to hear how it went. Your honest feedback helps us improve — and helps other riders in Sundaragiri decide with confidence.',
    reviews_whatsapp: 'Share feedback on WhatsApp',
    reviews_google: 'View us on Google Maps',
    reviews_google_review: 'Leave a Google review',
    reviews_card_title: 'Recently serviced with us?',
    reviews_card_body:
      'Tell us what worked well and what we could do better. We read every message.',
    reviews_note:
      'No review counts or ratings are displayed until they can be verified.',

    // FAQ
    faq_eyebrow: 'Good to know',
    faq_title: 'Frequently asked questions',
    faq_subtitle:
      'Straight answers about servicing, pricing and booking.',
    faq1_q: 'What services do you provide?',
    faq1_a:
      'We handle general bike servicing, engine repair and tuning, engine oil replacement, brake and clutch repair, routine maintenance, and chain cleaning and lubrication. If your bike needs something else, message us and we will tell you whether we can help.',
    faq2_q: 'How long does general servicing take?',
    faq2_a:
      'A general service usually takes a few hours, but the exact time depends on the bike and the work needed. We confirm the expected time when you book and tell you if a part has to be arranged.',
    faq3_q: 'Which motorcycle brands do you repair?',
    faq3_a:
      'We work on most popular motorcycle brands used around Sundaragiri, including Hero, Honda, Bajaj, TVS, Royal Enfield and Yamaha. Send us your brand and model on WhatsApp so we can confirm before you visit.',
    faq4_q: 'How can I book a service?',
    faq4_a:
      'Send a booking request through the form on this page, message us on WhatsApp, or call the workshop. We will reply to confirm availability.',
    faq5_q: 'How much does bike servicing cost?',
    faq5_a:
      'The cost depends on the service, your bike model and any parts required. We inspect the bike and share an estimate before starting work. You can ask for an estimate on WhatsApp first.',
    faq6_q: 'Where is the workshop located?',
    faq6_a:
      'We are in Sundaragiri, Telangana. Open the Google Maps link in the contact section for directions, or call us if you need help finding the workshop.',
    faq7_q: 'Are spare parts included in the service price?',
    faq7_a:
      'No. Service charges and spare parts are quoted separately. If a part needs replacing, we explain why and confirm the price with you before fitting it.',
    faq_contact: 'Still have a question?',
    faq_contact_cta: 'Ask on WhatsApp',

    // Booking
    booking_eyebrow: 'Booking',
    booking_title: 'Request your service in a few steps.',
    booking_subtitle:
      'Tell us what your bike needs. The workshop will reply on WhatsApp to confirm a time.',
    booking_next_title: 'What happens next',
    booking_next_1: 'You send the request on WhatsApp.',
    booking_next_2: 'The workshop replies to confirm your slot.',
    booking_next_3: 'Bring your bike at the agreed time.',
    booking_no_payment: 'No payment is taken on this website.',
    booking_step: 'Step',
    booking_of: 'of',
    booking_step1_title: 'Select a service',
    booking_step1_desc:
      'Choose the service closest to what your bike needs. You can change it later.',
    booking_step2_title: 'Tell us about your bike',
    booking_step2_desc:
      'The brand and model help the workshop prepare for the right job.',
    booking_step3_title: 'How can we reach you?',
    booking_step3_desc:
      'The workshop will use these details only to reply about this request.',
    booking_step4_title: 'Pick a preferred time',
    booking_step4_desc:
      'The workshop will confirm availability before you visit.',
    booking_step5_title: 'Describe the problem',
    booking_step5_desc:
      'Optional, but helpful. Mention any noise, warning light or recent change.',
    booking_step6_title: 'Review your request',
    booking_step6_desc:
      'Check the details below, then send them to the workshop on WhatsApp.',
    booking_back: 'Back',
    booking_next: 'Continue',
    booking_skip: 'Skip this step',
    booking_edit: 'Edit',
    booking_summary_service: 'Service',
    booking_summary_bike: 'Bike',
    booking_summary_contact: 'Contact',
    booking_summary_time: 'Preferred time',
    booking_summary_problem: 'Problem',
    booking_summary_not_provided: 'Not added',
    booking_summary_whatsapp: 'This opens a WhatsApp chat with',
    booking_summary_not_confirmed:
      'Your appointment is not confirmed until the workshop replies.',
    booking_progress_label: 'Booking progress',
    booking_brand_quick: 'Quick pick',
    booking_time_morning: 'Morning',
    booking_time_afternoon: 'Afternoon',
    booking_time_evening: 'Evening',
    booking_chip_noise: 'Engine noise',
    booking_chip_brakes: 'Weak brakes',
    booking_chip_start: 'Starting trouble',
    booking_chip_oil: 'Oil change',
    booking_required: 'Required',
    booking_optional: 'Optional',
    booking_name: 'Your name',
    booking_name_ph: 'e.g. Ravi Kumar',
    booking_phone: 'Mobile number',
    booking_phone_ph: '98765 43210',
    booking_phone_hint:
      '10-digit Indian mobile number. Used only to reply about this booking.',
    booking_brand: 'Bike brand',
    booking_brand_ph: 'Hero, Honda, TVS…',
    booking_model: 'Bike model',
    booking_model_ph: 'e.g. Splendor Plus',
    booking_service: 'Required service',
    booking_date: 'Preferred date',
    booking_date_hint: 'Today or later.',
    booking_time: 'Preferred time',
    booking_time_hint:
      'Workshop hours: Mon–Sat, 8:00 AM – 7:00 PM.',
    booking_sunday_note:
      'Sunday visits are by appointment only — the workshop will confirm.',
    booking_problem: 'Describe the problem',
    booking_problem_ph:
      'Noise from the engine, weak brakes, starting trouble…',
    booking_submit: 'Send request on WhatsApp',
    booking_submitting: 'Opening WhatsApp…',
    booking_disclaimer:
      'This opens WhatsApp with your details. Your appointment is not confirmed until the workshop replies.',
    booking_privacy:
      'Your details are not stored on this website. They are only sent to the workshop through WhatsApp when you choose to send them.',
    booking_success:
      'WhatsApp should have opened in a new tab. Send the message to reach the workshop.',
    booking_blocked: 'WhatsApp did not open automatically?',
    booking_open_manual: 'Open the booking message',
    booking_call_instead: 'Prefer to call?',
    booking_selected:
      'Service selected from the services section. You can change it here.',
    booking_changed_lang: 'Booking form language',
    booking_step_requires:
      'Complete the required fields to continue.',
    err_name: 'Please enter your name.',
    err_phone: 'Enter a valid 10-digit Indian mobile number.',
    err_brand: 'Please enter your bike brand.',
    err_model: 'Please enter your bike model.',
    err_service: 'Please choose a service.',
    err_date: 'Please choose a preferred date.',
    err_date_past: 'Please choose today or a later date.',
    err_time: 'Please choose a preferred time.',

    // Contact / location
    contact_eyebrow: 'Visit the workshop',
    contact_title: 'Find us in Sundaragiri.',
    contact_subtitle:
      'For a service, an estimate or a second opinion on a repair, call or message before you visit.',
    contact_address_label: 'Workshop address',
    contact_phone_label: 'Phone & WhatsApp',
    contact_hours_label: 'Opening hours',
    contact_hours_days: 'Monday – Saturday',
    contact_hours_note: 'Sunday: by appointment',
    contact_whatsapp: 'Message on WhatsApp',
    contact_call: 'Call the workshop',
    contact_directions: 'Get directions',
    contact_map_title:
      'Google Map showing the approximate location of Nivas Bike Repair Services in Sundaragiri',
    contact_map_note:
      'Map location is based on the Plus Code. Call ahead if you need help finding the workshop.',
    contact_open_maps: 'Open in Google Maps',
    contact_plus_code: 'Plus Code',

    // Footer
    footer_cta_title: 'Ready to get your bike back on the road?',
    footer_cta_desc:
      'Send a booking request or call the workshop directly.',
    footer_book: 'Book a service',
    footer_desc:
      'Bike servicing, repairs and maintenance in Sundaragiri, Telangana. Book directly with the mechanic on WhatsApp.',
    footer_quick: 'Quick links',
    footer_services: 'Services',
    footer_contact: 'Contact',
    footer_rights: 'All rights reserved.',
    footer_seo:
      'Nivas Bike Repair Services — bike repair, servicing and motorcycle maintenance in Sundaragiri, Telangana.',
    footer_whatsapp: 'WhatsApp the workshop',
    footer_back_top: 'Back to top',
    footer_credit: 'Workshop photography: Pexels contributors.',

    // Mobile action bar / floating button
    action_call: 'Call',
    action_whatsapp: 'WhatsApp',
    action_book: 'Book',
    floating_label: 'Chat on WhatsApp',
  },

  te: {
    // Global / navigation
    skip_link: 'కంటెంట్‌కు వెళ్లండి',
    new_tab: 'కొత్త ట్యాబ్‌లో తెరుచుకుంటుంది',
    nav_aria: 'ప్రధాన నావిగేషన్',
    mobile_nav_aria: 'మొబైల్ నావిగేషన్',
    nav_home: 'హోమ్',
    nav_services: 'సేవలు',
    nav_why: 'మేము ఎందుకు',
    nav_gallery: 'గ్యాలరీ',
    nav_process: 'ప్రక్రియ',
    nav_feedback: 'అభిప్రాయం',
    nav_faq: 'ప్రశ్నలు',
    nav_contact: 'సంప్రదించండి',
    nav_book: 'సేవ బుక్ చేయండి',
    nav_menu: 'మెనూ',
    nav_close: 'మెనూ మూసివేయండి',
    mobile_actions: 'త్వరిత సంప్రదింపు',
    lang_toggle: 'English',
    lang_toggle_aria: 'భాషను ఆంగ్లంలోకి మార్చండి',
    lang_current: 'తెలుగు',
    lang_label: 'భాష',

    // Hero
    hero_eyebrow: 'మోటార్‌సైకిల్ వర్క్షాప్ · సుందరగిరి',
    hero_title: 'నమ్మకమైన బైక్ రిపేర్,',
    hero_title_accent: 'సుందరగిరిలోనే.',
    hero_desc:
      'మీ బైక్‌ను తెలిసిన స్థానిక వర్క్షాప్ నుంచి సాధారణ సర్వీసింగ్, ఇంజిన్ మరమ్మతు మరియు స్పష్టమైన సలహాలు.',
    hero_cta: 'సేవ బుక్ చేయండి',
    hero_cta_secondary: 'వర్క్షాప్‌కు కాల్ చేయండి',
    hero_note:
      'వర్క్షాప్ వాట్సాప్‌లో సమాధానం ఇచ్చిన తర్వాతే మీ అపాయింట్‌మెంట్ నిర్ధారణ అవుతుంది.',
    hero_image_alt:
      'వర్క్షాప్‌లో దీపం వెలుగులో మోటార్‌సైకిల్ మరమ్మతు చేస్తున్న మెకానిక్',
    hero_hours_label: 'వర్క్షాప్ వేళలు',
    hero_hours_value: 'సోమ – శని · ఉదయం 8 – సాయంత్రం 7',
    hero_sunday: 'ఆదివారం: ముందస్తు అపాయింట్‌మెంట్ ద్వారా',
    hero_location_label: 'వర్క్షాప్ కనుగొనండి',
    hero_location_value: 'సుందరగిరి, తెలంగాణ',
    hero_scroll: 'కిందకు స్క్రోల్ చేయండి',
    hero_card_label: 'స్థానిక వర్క్షాప్',
    hero_card_meta: 'సుందరగిరి · తెలంగాణ',
    trust1_title: 'స్థానిక వర్క్షాప్',
    trust1_desc: 'సుందరగిరి, తెలంగాణలో ఉంది',
    trust2_title: 'మెకానిక్‌తో నేరుగా మాట్లాడండి',
    trust2_desc: 'మధ్యలో కాల్ సెంటర్ లేదు',
    trust3_title: 'సులభమైన వాట్సాప్ బుకింగ్',
    trust3_desc: 'కొన్ని దశల్లో మీ అభ్యర్థన పంపండి',

    // Services
    services_eyebrow: 'మేము చేసేది',
    services_title: 'మీ బైక్‌కు కావాల్సినవి, ఒకే చోట.',
    services_subtitle:
      'సాధారణ సర్వీస్ నుంచి క్లిష్టమైన ఇంజిన్ సమస్య వరకు — పని మొదలుపెట్టే ముందే స్పష్టంగా వివరిస్తాము.',
    services_book: 'ఈ సేవను బుక్ చేయండి',
    services_book_aria: 'ఈ సేవను బుక్ చేయండి:',
    services_estimate_note:
      'ప్రతి అంచనా తనిఖీ తర్వాత నిర్ధారణ అవుతుంది.',
    services_help_title: 'మీ బైక్‌కు ఏమి కావాలో తెలియదా?',
    services_help_desc:
      'సమస్యను వివరించండి — మొదట ఏమి తనిఖీ చేయాలో చెబుతాము.',
    services_help_cta: 'వాట్సాప్‌లో అడగండి',
    services_note:
      'విడి భాగాల ఖర్చు విడిగా తెలియజేస్తాము; మీ అంగీకారంతోనే మారుస్తాము.',
    svc1_title: 'పూర్తి బైక్ సర్వీసింగ్',
    svc1_desc:
      'మీ మోటార్‌సైకిల్ సజావుగా నడవడానికి పూర్తి తనిఖీ మరియు సమగ్ర సర్వీసింగ్.',
    svc2_title: 'ఇంజిన్ మరమ్మతు & ట్యూనింగ్',
    svc2_desc:
      'ఇంజిన్ సమస్యలు, అసమాన నడక మరియు శక్తి తగ్గుదలకు నిర్ధారణ, మరమ్మతు మరియు ట్యూనింగ్.',
    svc3_title: 'ఇంజిన్ ఆయిల్ మార్పు',
    svc3_desc:
      'మీ బైక్‌కు సరిపోయే గ్రేడ్ ఆయిల్‌తో ఇంజిన్ ఆయిల్ మార్చడం.',
    svc4_title: 'బ్రేక్ & క్లచ్ మరమ్మతు',
    svc4_desc:
      'సురక్షిత నడక కోసం బ్రేక్ మరియు క్లచ్ తనిఖీ, సర్దుబాటు మరియు మరమ్మతు.',
    svc5_title: 'సాధారణ నిర్వహణ',
    svc5_desc:
      'చిన్న సమస్యలను ముందే గుర్తించడానికి రొటీన్ చెక్కులు, సర్దుబాట్లు మరియు నివారణ సంరక్షణ.',
    svc6_title: 'చైన్ శుభ్రపరచడం & లూబ్రికేషన్',
    svc6_desc:
      'మృదువైన పవర్ డెలివరీ మరియు తక్కువ అరుగుదల కోసం చైన్ శుభ్రపరచడం, లూబ్రికేట్ చేయడం మరియు సర్దుబాటు.',
    price_estimate: 'అంచనా కోసం సంప్రదించండి',
    price_after_inspection: 'తనిఖీ తర్వాత నిర్ధారణ',
    pricing_from: 'దీని నుంచి',

    // Why choose us
    why_eyebrow: 'మేము ఎందుకు',
    why_title: 'మీరు నేరుగా మాట్లాడగల వర్క్షాప్.',
    why_subtitle:
      'అమ్మకాల ఒత్తిడి లేదు, గుప్త ఛార్జీలు లేవు — జాగ్రత్తగా చేసే పని మరియు మీ ప్రశ్నలకు సమాధానం చెప్పే మెకానిక్.',
    why1_title: 'వ్యక్తిగత శ్రద్ధ',
    why1_desc:
      'మీ బైక్‌ను తనిఖీ చేసే వ్యక్తి మరమ్మతు కూడా చేస్తారు.',
    why2_title: 'స్పష్టమైన సమాచారం',
    why2_desc:
      'ఇంజిన్‌కు చేయి వేసే ముందు సమస్యను సులభంగా వివరిస్తాము.',
    why3_title: 'మీరు ఆమోదించే అంచనాలు',
    why3_desc:
      'ఖర్చు ముందే తెలుస్తుంది. మీరు అంగీకరించిన తర్వాతే పని మొదలవుతుంది.',
    why4_title: 'జాగ్రత్తగా చేసే పని',
    why4_desc: 'బైక్ అప్పగించే ముందు ప్రతి మరమ్మతు తనిఖీ చేస్తాము.',
    why5_title: 'సులభమైన స్థానిక సేవ',
    why5_desc:
      'సుందరగిరిలో సులభంగా చేరుకోవచ్చు, వాట్సాప్‌లో బుకింగ్ చేయవచ్చు.',
    why6_title: 'నేరుగా అనుసరణ',
    why6_desc:
      'మరమ్మతు తర్వాత ఏదైనా సరిగా అనిపించకపోతే నేరుగా వర్క్షాప్‌కు కాల్ చేయండి.',
    why_image_alt:
      'వర్క్షాప్‌లో మోటార్‌సైకిల్‌ను జాగ్రత్తగా మరమ్మతు చేస్తున్న మెకానిక్',
    why_badge_title: 'నేరుగా సమాధానాలు',
    why_badge_text:
      'పని మొదలుపెట్టే ముందే మీ బైక్‌కు ఏమి కావాలో, ఎంత ఖర్చవుతుందో అడగండి.',
    why_note: 'మీరు అంచనాను ఆమోదించిన తర్వాతే పని మొదలవుతుంది.',

    // Gallery
    gallery_eyebrow: 'వర్క్షాప్ లోపల',
    gallery_title: 'జాగ్రత్తగా చేసే పని, దగ్గరగా.',
    gallery_subtitle:
      'మేము చేసే మరమ్మతు మరియు నిర్వహణ పనుల్లో కొన్ని చిత్రాలు.',
    gallery_note:
      'ఇవి ప్రాతినిధ్య వర్క్షాప్ ఫోటోలు. సర్వీస్ సమయంలో మీ బైక్ ఫోటోలను అడగవచ్చు.',
    gallery1_title: 'ఇంజిన్ మరియు క్లచ్ పని',
    gallery1_alt:
      'మోటార్‌సైకిల్ పక్కన ఇంజిన్ మరియు క్లచ్ భాగాలను శుభ్రం చేస్తున్న మెకానిక్',
    gallery2_title: 'ఇంజిన్ లోపలి భాగాలు',
    gallery2_alt:
      'మోటార్‌సైకిల్ ఇంజిన్ లోపలి భాగాలు మరియు టైమింగ్ చైన్ దగ్గరి చిత్రం',
    gallery3_title: 'చైన్ మరియు స్ప్రాకెట్',
    gallery3_alt:
      'నేలపై పనిముట్లతో మోటార్‌సైకిల్ చక్రం మరియు స్ప్రాకెట్',
    gallery4_title: 'క్లాసిక్ బైక్ సర్వీసింగ్',
    gallery4_alt: 'క్లాసిక్ మోటార్‌సైకిల్‌కు సర్వీసింగ్ చేస్తున్న మెకానిక్',
    gallery5_title: 'ఎలక్ట్రికల్ మరియు బాడీవర్క్',
    gallery5_alt:
      'మోటార్‌సైకిల్ ఎలక్ట్రికల్ భాగాలను తనిఖీ చేస్తున్న మెకానిక్',
    gallery6_title: 'స్థానిక వర్క్షాప్',
    gallery6_alt: 'మోటార్‌సైకిల్‌ను మరమ్మతు చేస్తున్న స్థానిక మెకానిక్',
    gallery_open: 'ఫోటో చూడండి',
    gallery_close: 'గ్యాలరీ మూసివేయండి',
    gallery_prev: 'మునుపటి ఫోటో',
    gallery_next: 'తదుపరి ఫోటో',
    gallery_view_label: 'ఫోటో తెరవండి:',

    // Process
    process_eyebrow: 'ఇది ఎలా పనిచేస్తుంది',
    process_title: 'మెరుగైన రైడ్ కోసం నాలుగు దశలు.',
    process_subtitle:
      'ఖాతా అవసరం లేదు, ముందస్తు చెల్లింపు లేదు. అభ్యర్థన పంపండి, నిర్ధారణ పొందండి, బైక్ తీసుకురండి.',
    process_step: 'దశ',
    step1_title: 'సేవను ఎంచుకోండి',
    step1_desc: 'మీ బైక్‌కు కావాల్సిన సేవను ఎంచుకోండి.',
    step2_title: 'మీ అభ్యర్థన పంపండి',
    step2_desc:
      'బైక్ వివరాలు మరియు సరిపోయే సమయాన్ని వాట్సాప్‌లో పంపండి.',
    step3_title: 'నిర్ధారణ పొందండి',
    step3_desc:
      'అందుబాటు మరియు అంచనా ఖర్చును వర్క్షాప్ నిర్ధారిస్తుంది.',
    step4_title: 'వర్క్షాప్‌కు రండి',
    step4_desc:
      'అంగీకరించిన సమయానికి బైక్ తీసుకువచ్చి సర్వీస్ చేయించుకోండి.',
    process_cta: 'బుకింగ్ అభ్యర్థన ప్రారంభించండి',
    process_note:
      'వర్క్షాప్ సమాధానం ఇచ్చిన తర్వాతే మీ అపాయింట్‌మెంట్ నిర్ధారణ అవుతుంది.',

    // Bike care tips
    tips_eyebrow: 'బైక్ సంరక్షణ',
    tips_title: 'చిన్న అలవాట్లు, తక్కువ బ్రేక్‌డౌన్‌లు.',
    tips_subtitle: 'ఖరీదైన మరమ్మతులను నివారించే సులభ తనిఖీలు.',
    tip1_title: 'క్రమంగా సర్వీస్ చేయించండి',
    tip1_desc:
      'ప్రతి 3,000 కి.మీ. లేదా 3 నెలలకు ఒకసారి మీ బైక్‌ను సర్వీస్ చేయించండి.',
    tip2_title: 'టైర్ ఒత్తిడి తనిఖీ చేయండి',
    tip2_desc:
      'వారానికి ఒకసారి టైర్ ఒత్తిడి తనిఖీ చేయండి. సరైన ఒత్తిడి మైలేజ్ మరియు నియంత్రణను మెరుగుపరుస్తుంది.',
    tip3_title: 'చైన్ శుభ్రం & లూబ్రికేట్ చేయండి',
    tip3_desc:
      'సున్నితమైన పవర్ డెలివరీ కోసం డ్రైవ్ చైన్‌ను శుభ్రంగా మరియు లూబ్రికేట్ చేసి ఉంచండి.',
    tip4_title: 'ఇంజిన్ ఆయిల్ తనిఖీ చేయండి',
    tip4_desc:
      'ఇంజిన్ ఆయిల్ స్థాయిని క్రమంగా పర్యవేక్షించండి. తక్కువ ఆయిల్ తీవ్రమైన ఇంజిన్ నష్టం కలిగిస్తుంది.',

    // Feedback
    reviews_eyebrow: 'రైడర్ అభిప్రాయం',
    reviews_title: 'నమ్మకం సంపాదించాలి, ముద్రించకూడదు.',
    reviews_subtitle:
      'మేము ధృవీకరించలేని సమీక్షలు, స్టార్ రేటింగ్‌లు లేదా రివ్యూ సంఖ్యలను ప్రచురించము.',
    reviews_body:
      'మీ బైక్ మా వద్ద సర్వీస్ చేయించుకుంటే, మీ అనుభవం మాకు చెప్పండి. మీ నిజాయితీ అభిప్రాయం మాకు మెరుగుపడటానికి, సుందరగిరిలోని ఇతర రైడర్లకు నమ్మకంగా నిర్ణయించుకోవడానికి సహాయపడుతుంది.',
    reviews_whatsapp: 'వాట్సాప్‌లో అభిప్రాయం చెప్పండి',
    reviews_google: 'Google Maps లో చూడండి',
    reviews_google_review: 'Google లో సమీక్ష రాయండి',
    reviews_card_title: 'ఇటీవల మా వద్ద సర్వీస్ చేయించారా?',
    reviews_card_body:
      'మంచి జరిగింది ఏమిటి, మెరుగుపరచాల్సింది ఏమిటి చెప్పండి. ప్రతి సందేశాన్ని చదువుతాము.',
    reviews_note:
      'ధృవీకరించే వరకు రివ్యూ సంఖ్యలు లేదా రేటింగ్‌లు చూపించము.',

    // FAQ
    faq_eyebrow: 'తెలుసుకోవాల్సినవి',
    faq_title: 'తరచుగా అడిగే ప్రశ్నలు',
    faq_subtitle:
      'సర్వీసింగ్, ధరలు మరియు బుకింగ్ గురించి నేరుగా సమాధానాలు.',
    faq1_q: 'మీరు ఏ సేవలు అందిస్తారు?',
    faq1_a:
      'మేము సాధారణ బైక్ సర్వీసింగ్, ఇంజిన్ మరమ్మతు మరియు ట్యూనింగ్, ఇంజిన్ ఆయిల్ మార్పు, బ్రేక్ మరియు క్లచ్ మరమ్మతు, సాధారణ నిర్వహణ, చైన్ శుభ్రపరచడం మరియు లూబ్రికేషన్ చేస్తాము. మీ బైక్‌కు వేరే పని కావాలంటే మెసేజ్ చేయండి — సహాయం చేయగలమో చెబుతాము.',
    faq2_q: 'సాధారణ బైక్ సర్వీస్ ఎంత సమయం పడుతుంది?',
    faq2_a:
      'సాధారణ సర్వీస్ సాధారణంగా కొన్ని గంటలు పడుతుంది. ఖచ్చితమైన సమయం బైక్ మరియు చేయాల్సిన పనిని బట్టి ఉంటుంది. బుకింగ్ సమయంలో అంచనా సమయం చెబుతాము; ఏదైనా భాగం తెప్పించాల్సి వస్తే ముందే తెలియజేస్తాము.',
    faq3_q: 'మీరు ఏ బైక్ బ్రాండ్‌లను మరమ్మతు చేస్తారు?',
    faq3_a:
      'సుందరగిరి చుట్టుపక్కల ఉపయోగించే ప్రజాదరణ పొందిన బ్రాండ్లు — Hero, Honda, Bajaj, TVS, Royal Enfield మరియు Yamaha — మేము చేస్తాము. మీరు రాకముందే మీ బ్రాండ్ మరియు మోడల్‌ను వాట్సాప్‌లో పంపి నిర్ధారించుకోండి.',
    faq4_q: 'సేవను ఎలా బుక్ చేయాలి?',
    faq4_a:
      'ఈ పేజీలోని బుకింగ్ ఫారమ్ ద్వారా అభ్యర్థన పంపండి, వాట్సాప్‌లో మెసేజ్ చేయండి లేదా వర్క్షాప్‌కు కాల్ చేయండి. అందుబాటును నిర్ధారించడానికి మేము సమాధానం ఇస్తాము.',
    faq5_q: 'బైక్ సర్వీసింగ్ ఖర్చు ఎంత?',
    faq5_a:
      'ఖర్చు సేవ, మీ బైక్ మోడల్ మరియు అవసరమైన భాగాలను బట్టి ఉంటుంది. పని ప్రారంభించే ముందు బైక్‌ను తనిఖీ చేసి అంచనా ఖర్చు తెలియజేస్తాము. ముందుగా వాట్సాప్‌లో అంచనా అడగవచ్చు.',
    faq6_q: 'వర్క్షాప్ ఎక్కడ ఉంది?',
    faq6_a:
      'మేము సుందరగిరి, తెలంగాణలో ఉన్నాము. దిశల కోసం సంప్రదింపు విభాగంలోని Google Maps లింక్ తెరవండి, లేదా వర్క్షాప్ కనుగొనడంలో సహాయం కావాలంటే కాల్ చేయండి.',
    faq7_q: 'సేవ ధరలో విడి భాగాలు చేర్చబడతాయా?',
    faq7_a:
      'లేదు. సేవ ఛార్జీలు మరియు విడి భాగాల ఖర్చు విడివిడిగా తెలియజేస్తాము. భాగం మార్చాల్సి వస్తే కారణం వివరించి, ధరను మీతో నిర్ధారించిన తర్వాతే అమర్చుతాము.',
    faq_contact: 'ఇంకా ప్రశ్న ఉందా?',
    faq_contact_cta: 'వాట్సాప్‌లో అడగండి',

    // Booking
    booking_eyebrow: 'బుకింగ్',
    booking_title: 'కొన్ని దశల్లో మీ సేవను అభ్యర్థించండి.',
    booking_subtitle:
      'మీ బైక్‌కు ఏమి కావాలో చెప్పండి. సమయాన్ని నిర్ధారించడానికి వర్క్షాప్ వాట్సాప్‌లో సమాధానం ఇస్తుంది.',
    booking_next_title: 'తర్వాత ఏమి జరుగుతుంది',
    booking_next_1: 'మీరు వాట్సాప్‌లో అభ్యర్థన పంపుతారు.',
    booking_next_2:
      'మీ సమయాన్ని నిర్ధారించడానికి వర్క్షాప్ సమాధానం ఇస్తుంది.',
    booking_next_3: 'అంగీకరించిన సమయానికి బైక్ తీసుకురండి.',
    booking_no_payment: 'ఈ వెబ్‌సైట్‌లో ఎలాంటి చెల్లింపు తీసుకోబడదు.',
    booking_step: 'దశ',
    booking_of: '/',
    booking_step1_title: 'సేవను ఎంచుకోండి',
    booking_step1_desc:
      'మీ బైక్‌కు దగ్గరగా ఉన్న సేవను ఎంచుకోండి. తర్వాత మార్చుకోవచ్చు.',
    booking_step2_title: 'మీ బైక్ గురించి చెప్పండి',
    booking_step2_desc:
      'బ్రాండ్ మరియు మోడల్ సరైన పనికి సిద్ధపడటానికి సహాయపడతాయి.',
    booking_step3_title: 'మిమ్మల్ని ఎలా సంప్రదించాలి?',
    booking_step3_desc:
      'ఈ వివరాలను ఈ అభ్యర్థనకు సమాధానం ఇవ్వడానికి మాత్రమే ఉపయోగిస్తాము.',
    booking_step4_title: 'సరిపోయే సమయాన్ని ఎంచుకోండి',
    booking_step4_desc:
      'మీరు రాకముందే వర్క్షాప్ అందుబాటును నిర్ధారిస్తుంది.',
    booking_step5_title: 'సమస్యను వివరించండి',
    booking_step5_desc:
      'ఐచ్ఛికం, కానీ సహాయకరం. శబ్దం, వార్నింగ్ లైట్ లేదా ఇటీవలి మార్పు గురించి చెప్పండి.',
    booking_step6_title: 'మీ అభ్యర్థనను సమీక్షించండి',
    booking_step6_desc:
      'కింది వివరాలను తనిఖీ చేసి, వాట్సాప్‌లో వర్క్షాప్‌కు పంపండి.',
    booking_back: 'వెనుకకు',
    booking_next: 'కొనసాగించండి',
    booking_skip: 'ఈ దశను దాటవేయండి',
    booking_edit: 'మార్చండి',
    booking_summary_service: 'సేవ',
    booking_summary_bike: 'బైక్',
    booking_summary_contact: 'సంప్రదింపు',
    booking_summary_time: 'అనుకున్న సమయం',
    booking_summary_problem: 'సమస్య',
    booking_summary_not_provided: 'జోడించలేదు',
    booking_summary_whatsapp: 'ఇది వాట్సాప్ చాట్‌ను తెరుస్తుంది:',
    booking_summary_not_confirmed:
      'వర్క్షాప్ సమాధానం ఇచ్చిన తర్వాతే మీ అపాయింట్‌మెంట్ నిర్ధారణ అవుతుంది.',
    booking_progress_label: 'బుకింగ్ పురోగతి',
    booking_brand_quick: 'త్వరిత ఎంపిక',
    booking_time_morning: 'ఉదయం',
    booking_time_afternoon: 'మధ్యాహ్నం',
    booking_time_evening: 'సాయంత్రం',
    booking_chip_noise: 'ఇంజిన్ శబ్దం',
    booking_chip_brakes: 'బ్రేక్‌లు బలహీనం',
    booking_chip_start: 'స్టార్ట్ అవ్వడం లేదు',
    booking_chip_oil: 'ఆయిల్ మార్పు',
    booking_required: 'అవసరం',
    booking_optional: 'ఐచ్ఛికం',
    booking_name: 'మీ పేరు',
    booking_name_ph: 'ఉదా. రవి కుమార్',
    booking_phone: 'మొబైల్ నంబర్',
    booking_phone_ph: '98765 43210',
    booking_phone_hint:
      '10 అంకెల భారతీయ మొబైల్ నంబర్. ఈ బుకింగ్ గురించి సమాధానం ఇవ్వడానికి మాత్రమే ఉపయోగిస్తాము.',
    booking_brand: 'బైక్ బ్రాండ్',
    booking_brand_ph: 'Hero, Honda, TVS…',
    booking_model: 'బైక్ మోడల్',
    booking_model_ph: 'ఉదా. స్ప్లెండర్ ప్లస్',
    booking_service: 'కావాల్సిన సేవ',
    booking_date: 'అనుకున్న తేదీ',
    booking_date_hint: 'ఈరోజు లేదా తర్వాత.',
    booking_time: 'అనుకున్న సమయం',
    booking_time_hint:
      'వర్క్షాప్ వేళలు: సోమ–శని, ఉదయం 8 – సాయంత్రం 7.',
    booking_sunday_note:
      'ఆదివారం సందర్శనలు ముందస్తు అపాయింట్‌మెంట్ ద్వారా మాత్రమే — వర్క్షాప్ నిర్ధారిస్తుంది.',
    booking_problem: 'సమస్యను వివరించండి',
    booking_problem_ph:
      'ఇంజిన్ నుంచి శబ్దం, బ్రేక్‌లు బలహీనం, స్టార్ట్ అవ్వడం లేదు…',
    booking_submit: 'వాట్సాప్‌లో అభ్యర్థన పంపండి',
    booking_submitting: 'వాట్సాప్ తెరుస్తోంది…',
    booking_disclaimer:
      'ఇది మీ వివరాలతో వాట్సాప్ తెరుస్తుంది. వర్క్షాప్ సమాధానం ఇచ్చిన తర్వాతే అపాయింట్‌మెంట్ నిర్ధారణ అవుతుంది.',
    booking_privacy:
      'మీ వివరాలు ఈ వెబ్‌సైట్‌లో నిల్వ చేయబడవు. మీరు పంపాలనుకున్నప్పుడు వాట్సాప్ ద్వారా వర్క్షాప్‌కు మాత్రమే వెళ్తాయి.',
    booking_success:
      'వాట్సాప్ కొత్త ట్యాబ్‌లో తెరవాలి. వర్క్షాప్‌ను చేరుకోవడానికి సందేశాన్ని పంపండి.',
    booking_blocked: 'వాట్సాప్ స్వయంచాలకంగా తెరవలేదా?',
    booking_open_manual: 'బుకింగ్ సందేశాన్ని తెరవండి',
    booking_call_instead: 'కాల్ చేయాలనుకుంటున్నారా?',
    booking_selected:
      'సేవల విభాగం నుంచి సేవ ఎంపిక చేయబడింది.',
    booking_changed_lang: 'బుకింగ్ ఫారమ్ భాష',
    booking_step_requires:
      'కొనసాగించడానికి అవసరమైన వివరాలు పూరించండి.',
    err_name: 'దయచేసి మీ పేరు నమోదు చేయండి.',
    err_phone: 'సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి.',
    err_brand: 'దయచేసి మీ బైక్ బ్రాండ్ నమోదు చేయండి.',
    err_model: 'దయచేసి మీ బైక్ మోడల్ నమోదు చేయండి.',
    err_service: 'దయచేసి ఒక సేవను ఎంచుకోండి.',
    err_date: 'దయచేసి అనుకున్న తేదీని ఎంచుకోండి.',
    err_date_past: 'దయచేసి ఈరోజు లేదా తర్వాతి తేదీని ఎంచుకోండి.',
    err_time: 'దయచేసి అనుకున్న సమయాన్ని ఎంచుకోండి.',

    // Contact / location
    contact_eyebrow: 'వర్క్షాప్‌ను సందర్శించండి',
    contact_title: 'సుందరగిరిలో మమ్మల్ని కనుగొనండి.',
    contact_subtitle:
      'సర్వీస్, అంచనా ధర లేదా మరమ్మతుపై మరో అభిప్రాయం కోసం రాకముందే కాల్ చేయండి లేదా మెసేజ్ చేయండి.',
    contact_address_label: 'వర్క్షాప్ చిరునామా',
    contact_phone_label: 'ఫోన్ & వాట్సాప్',
    contact_hours_label: 'పని వేళలు',
    contact_hours_days: 'సోమవారం – శనివారం',
    contact_hours_note: 'ఆదివారం: ముందస్తు అపాయింట్‌మెంట్ ద్వారా',
    contact_whatsapp: 'వాట్సాప్‌లో మెసేజ్ చేయండి',
    contact_call: 'వర్క్షాప్‌కు కాల్ చేయండి',
    contact_directions: 'దిశలు పొందండి',
    contact_map_title:
      'సుందరగిరిలో నివాస్ బైక్ రిపేర్ సర్వీసెస్ ఉన్న ప్రాంతాన్ని చూపించే Google మ్యాప్',
    contact_map_note:
      'మ్యాప్ స్థానం ప్లస్ కోడ్ ఆధారంగా ఉంది. వర్క్షాప్ కనుగొనడంలో సహాయం కావాలంటే ముందే కాల్ చేయండి.',
    contact_open_maps: 'Google Maps లో తెరవండి',
    contact_plus_code: 'ప్లస్ కోడ్',

    // Footer
    footer_cta_title: 'మీ బైక్‌ను తిరిగి రోడ్డుపైకి తీసుకురావాలా?',
    footer_cta_desc:
      'బుకింగ్ అభ్యర్థన పంపండి లేదా నేరుగా వర్క్షాప్‌కు కాల్ చేయండి.',
    footer_book: 'సేవ బుక్ చేయండి',
    footer_desc:
      'సుందరగిరి, తెలంగాణలో బైక్ సర్వీసింగ్, మరమ్మతులు మరియు నిర్వహణ. వాట్సాప్‌లో నేరుగా మెకానిక్‌తో బుక్ చేయండి.',
    footer_quick: 'త్వరిత లింకులు',
    footer_services: 'సేవలు',
    footer_contact: 'సంప్రదింపు',
    footer_rights: 'అన్ని హక్కులు రక్షించబడ్డాయి.',
    footer_seo:
      'నివాస్ బైక్ రిపేర్ సర్వీసెస్ — సుందరగిరి, తెలంగాణలో బైక్ రిపేర్, సర్వీసింగ్ మరియు మోటార్‌సైకిల్ నిర్వహణ.',
    footer_whatsapp: 'వర్క్షాప్‌కు వాట్సాప్ చేయండి',
    footer_back_top: 'పైకి వెళ్లండి',
    footer_credit: 'ఫోటోలు: Pexels కంట్రిబ్యూటర్లు.',

    // Mobile action bar / floating button
    action_call: 'కాల్',
    action_whatsapp: 'వాట్సాప్',
    action_book: 'బుక్',
    floating_label: 'వాట్సాప్‌లో చాట్ చేయండి',
  },
};

const STORAGE_KEY = 'nivas-lang';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'te' ? 'te' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be unavailable in private browsing — language switching
      // still works for the current session.
    }
  }, [lang]);

  const t = (key) => content[lang]?.[key] ?? content.en[key] ?? key;
  const toggleLang = () =>
    setLang((current) => (current === 'en' ? 'te' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
