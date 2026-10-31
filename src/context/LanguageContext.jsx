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
    logo_aria: 'Nivas Bike Repair Services — home',
    nav_home: 'Home',
    nav_services: 'Services',
    nav_why: 'Why us',
    nav_process: 'Process',
    nav_reviews: 'Reviews',
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
    hero_eyebrow: 'Two-wheeler workshop · Sundaragiri',
    hero_title: 'Your trusted bike repair experts in',
    hero_title_accent: 'Sundaragiri.',
    hero_desc:
      'Reliable motorcycle servicing, maintenance and repairs with personal attention and clear communication — right here in Sundaragiri, Telangana.',
    hero_cta: 'Book on WhatsApp',
    hero_cta_secondary: 'View services',
    hero_note:
      'Your appointment is confirmed once the workshop replies on WhatsApp.',
    hero_image_alt:
      'Mechanic repairing a motorcycle engine at the workshop in Sundaragiri',
    hero_card_label: 'Inside the workshop',
    hero_card_meta: 'Sundaragiri · Telangana',
    hero_scroll: 'Scroll',
    trust1_title: 'Local workshop',
    trust1_desc: 'Based in Sundaragiri, Telangana',
    trust2_title: 'Talk to the mechanic',
    trust2_desc: 'No call centre in between',
    trust3_title: 'Popular bike brands',
    trust3_desc: 'Servicing for everyday motorcycles',

    // Services
    services_eyebrow: 'What we do',
    services_title: 'Bike services in Sundaragiri',
    services_subtitle:
      'From a routine service to a difficult engine problem — explained clearly before any work begins.',
    services_book: 'Book this service',
    services_book_aria: 'Book this service:',
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

    // Pricing
    pricing_eyebrow: 'Pricing',
    pricing_title: 'Clear pricing, no guesswork',
    pricing_subtitle:
      'We do not publish rates we cannot stand behind. Tell us what your bike needs and we will confirm the cost after inspecting it.',
    pricing_service: 'Service',
    pricing_price: 'Indicative price',
    pricing_cta: 'Request a quote',
    price_estimate: 'Contact us for an estimate',
    price_after_inspection: 'Confirmed after inspection',
    pricing_from: 'Starting from',
    pricing_note_title: 'How estimates work',
    pricing_note_1: 'We inspect the bike and explain what needs attention.',
    pricing_note_2: 'You receive an estimate before we start the repair.',
    pricing_note_3:
      'Spare parts are quoted separately and only replaced with your approval.',
    pricing_note_4:
      'The final cost depends on the bike, the parts needed and the work involved.',
    pricing_disclaimer:
      'Every bike is different. The estimate we give you is specific to your motorcycle — never a generic online price.',

    // Why choose us
    why_eyebrow: 'Why choose us',
    why_title: 'A workshop you can talk to',
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
      'Motorcycle tools and spare parts arranged on the workshop wall',
    why_badge_title: 'Straight answers',
    why_badge_text: 'Ask what your bike needs and what it will cost.',

    // Process
    process_eyebrow: 'How it works',
    process_title: 'From message to handover',
    process_subtitle:
      'Six simple steps, with your approval at every stage.',
    process_step: 'Step',
    p1_title: 'Contact the mechanic',
    p1_desc: 'Call or send a WhatsApp message to start.',
    p2_title: 'Explain the bike problem',
    p2_desc: 'Tell us the model and what you have noticed.',
    p3_title: 'Arrange an inspection',
    p3_desc: 'Bring the bike in at a time the workshop confirms.',
    p4_title: 'Receive the estimate',
    p4_desc: 'We explain the fault and share the likely cost.',
    p5_title: 'Approve the repair',
    p5_desc: 'Work starts only after you agree to the estimate.',
    p6_title: 'Service and handover',
    p6_desc: 'Collect the bike once the work is completed and checked.',

    // Bike care tips
    tips_eyebrow: 'Bike care',
    tips_title: 'Keep your bike healthy',
    tips_subtitle: 'Simple habits that prevent expensive repairs.',
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

    // Reviews (no fabricated testimonials)
    reviews_eyebrow: 'Rider feedback',
    reviews_title: 'Trust is earned, not printed',
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
      'Send a booking request through the form on this page, message us on WhatsApp at +91 91103 72978, or call the same number. We will reply to confirm availability.',
    faq5_q: 'How much does bike servicing cost?',
    faq5_a:
      'The cost depends on the service, your bike model and any parts required. We inspect the bike and share an estimate before starting work. You can ask for an estimate on WhatsApp first.',
    faq6_q: 'Where is the workshop located?',
    faq6_a:
      'We are at 55VX+VRM, Sundaragiri, Telangana 505467. Open the Google Maps link in the contact section for directions, or call us if you need help finding the workshop.',
    faq7_q: 'Are spare parts included in the service price?',
    faq7_a:
      'No. Service charges and spare parts are quoted separately. If a part needs replacing, we explain why and confirm the price with you before fitting it.',
    faq_contact: 'Still have a question?',
    faq_contact_cta: 'Ask on WhatsApp',

    // Booking
    booking_eyebrow: 'Booking',
    booking_title: 'Request a bike service',
    booking_subtitle:
      'Send the details on WhatsApp. We will reply to confirm a time that works.',
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
    booking_service_ph: 'Choose a service',
    booking_date: 'Preferred date',
    booking_time: 'Preferred time',
    booking_time_hint: 'Workshop hours: 8:00 AM – 7:00 PM, Monday to Saturday.',
    booking_problem: 'Describe the problem',
    booking_problem_ph:
      'Noise from the engine, weak brakes, starting trouble…',
    booking_submit: 'Send booking request on WhatsApp',
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
    contact_title: 'Find us in Sundaragiri',
    contact_subtitle:
      'For a service, an estimate or a second opinion on a repair, call or message before you visit.',
    contact_address_label: 'Address',
    contact_address: '55VX+VRM, Sundaragiri, Telangana 505467, India',
    contact_plus_code: 'Plus Code: 55VX+VRM',
    contact_phone_label: 'Phone & WhatsApp',
    contact_hours_label: 'Working hours',
    contact_hours: 'Monday – Saturday: 8:00 AM – 7:00 PM',
    contact_hours_note: 'Sunday: by appointment',
    contact_whatsapp: 'Message on WhatsApp',
    contact_call: 'Call the workshop',
    contact_directions: 'Get directions',
    contact_map_title:
      'Google Map showing the approximate location of Nivas Bike Repair Services in Sundaragiri',
    contact_map_note:
      'Map location is based on the Plus Code. Call ahead if you need help finding the workshop.',
    contact_open_maps: 'Open in Google Maps',

    // Footer
    footer_tagline: 'Your trusted bike mechanic in Sundaragiri.',
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
    logo_aria: 'నివాస్ బైక్ రిపేర్ సర్వీసెస్ — హోమ్',
    nav_home: 'హోమ్',
    nav_services: 'సేవలు',
    nav_why: 'మేము ఎందుకు',
    nav_process: 'ప్రక్రియ',
    nav_reviews: 'అభిప్రాయాలు',
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
    hero_eyebrow: 'టూ-వీలర్ వర్క్షాప్ · సుందరగిరి',
    hero_title: 'సుందరగిరిలో మీ నమ్మకమైన',
    hero_title_accent: 'బైక్ మెకానిక్.',
    hero_desc:
      'వ్యక్తిగత శ్రద్ధతో, స్పష్టమైన సమాచారంతో నమ్మకమైన మోటార్‌సైకిల్ సర్వీసింగ్, నిర్వహణ మరియు మరమ్మతులు — సుందరగిరి, తెలంగాణలోనే.',
    hero_cta: 'వాట్సాప్‌లో బుక్ చేయండి',
    hero_cta_secondary: 'సేవలు చూడండి',
    hero_note:
      'వర్క్షాప్ వాట్సాప్‌లో సమాధానం ఇచ్చిన తర్వాతే మీ అపాయింట్‌మెంట్ నిర్ధారణ అవుతుంది.',
    hero_image_alt:
      'సుందరగిరి వర్క్షాప్‌లో మోటార్‌సైకిల్ ఇంజిన్‌ను మరమ్మతు చేస్తున్న మెకానిక్',
    hero_card_label: 'వర్క్షాప్ లోపల',
    hero_card_meta: 'సుందరగిరి · తెలంగాణ',
    hero_scroll: 'స్క్రోల్',
    trust1_title: 'స్థానిక వర్క్షాప్',
    trust1_desc: 'సుందరగిరి, తెలంగాణలో ఉంది',
    trust2_title: 'మెకానిక్‌తో నేరుగా మాట్లాడండి',
    trust2_desc: 'మధ్యలో కాల్ సెంటర్ లేదు',
    trust3_title: 'ప్రజాదరణ పొందిన బైక్ బ్రాండ్లు',
    trust3_desc: 'రోజువారీ మోటార్‌సైకిల్స్‌కు సర్వీసింగ్',

    // Services
    services_eyebrow: 'మేము చేసేది',
    services_title: 'సుందరగిరిలో బైక్ సేవలు',
    services_subtitle:
      'సాధారణ సర్వీస్ నుంచి క్లిష్టమైన ఇంజిన్ సమస్య వరకు — పని మొదలుపెట్టే ముందే స్పష్టంగా వివరిస్తాము.',
    services_book: 'ఈ సేవను బుక్ చేయండి',
    services_book_aria: 'ఈ సేవను బుక్ చేయండి:',
    svc1_title: 'పూర్తి బైక్ సర్వీసింగ్',
    svc1_desc:
      'మీ మోటార్‌సైకిల్ సజావుగా నడవడానికి పూర్తి తనిఖీ మరియు సమగ్ర సర్వీసింగ్.',
    svc2_title: 'ఇంజిన్ మరమ్మతు & ట్యూనింగ్',
    svc2_desc:
      'ఇంజిన్ సమస్యలు, అసమాన నడక మరియు శక్తి తగ్గుదలకు నిర్ధారణ, మరమ్మతు మరియు ట్యూనింగ్.',
    svc3_title: 'ఇంజిన్ ఆయిల్ మార్పు',
    svc3_desc: 'మీ బైక్‌కు సరిపోయే గ్రేడ్ ఆయిల్‌తో ఇంజిన్ ఆయిల్ మార్చడం.',
    svc4_title: 'బ్రేక్ & క్లచ్ మరమ్మతు',
    svc4_desc:
      'సురక్షిత నడక కోసం బ్రేక్ మరియు క్లచ్ తనిఖీ, సర్దుబాటు మరియు మరమ్మతు.',
    svc5_title: 'సాధారణ నిర్వహణ',
    svc5_desc:
      'చిన్న సమస్యలను ముందే గుర్తించడానికి రొటీన్ చెక్కులు, సర్దుబాట్లు మరియు నివారణ సంరక్షణ.',
    svc6_title: 'చైన్ శుభ్రపరచడం & లూబ్రికేషన్',
    svc6_desc:
      'మృదువైన పవర్ డెలివరీ మరియు తక్కువ అరుగుదల కోసం చైన్ శుభ్రపరచడం, లూబ్రికేట్ చేయడం మరియు సర్దుబాటు.',

    // Pricing
    pricing_eyebrow: 'ధరలు',
    pricing_title: 'స్పష్టమైన ధరలు, ఊహలు లేవు',
    pricing_subtitle:
      'మేము నిర్ధారించలేని ధరలను ప్రచురించము. మీ బైక్‌కు ఏమి కావాలో చెప్పండి — తనిఖీ తర్వాత ఖర్చును నిర్ధారిస్తాము.',
    pricing_service: 'సేవ',
    pricing_price: 'సూచన ధర',
    pricing_cta: 'ధర అడగండి',
    price_estimate: 'అంచనా కోసం సంప్రదించండి',
    price_after_inspection: 'తనిఖీ తర్వాత నిర్ధారణ',
    pricing_from: 'దీని నుంచి',
    pricing_note_title: 'అంచనాలు ఎలా పనిచేస్తాయి',
    pricing_note_1:
      'బైక్‌ను తనిఖీ చేసి, ఏమి చేయాలో వివరిస్తాము.',
    pricing_note_2:
      'మరమ్మతు ప్రారంభించే ముందు అంచనా ఖర్చు తెలియజేస్తాము.',
    pricing_note_3:
      'విడి భాగాల ఖర్చు విడిగా తెలియజేస్తాము; మీ అంగీకారంతోనే మారుస్తాము.',
    pricing_note_4:
      'తుది ఖర్చు బైక్, అవసరమైన భాగాలు మరియు పనిని బట్టి ఉంటుంది.',
    pricing_disclaimer:
      'ప్రతి బైక్ వేరు. మేము ఇచ్చే అంచనా మీ బైక్‌కే ప్రత్యేకం — సాధారణ ఆన్‌లైన్ ధర కాదు.',

    // Why choose us
    why_eyebrow: 'మేము ఎందుకు',
    why_title: 'మీరు నేరుగా మాట్లాడగల వర్క్షాప్',
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
      'వర్క్షాప్ గోడపై అమర్చిన పనిముట్లు మరియు విడి భాగాలు',
    why_badge_title: 'నేరుగా సమాధానాలు',
    why_badge_text: 'మీ బైక్‌కు ఏమి కావాలో, ఎంత ఖర్చవుతుందో అడగండి.',

    // Process
    process_eyebrow: 'ఇది ఎలా పనిచేస్తుంది',
    process_title: 'సందేశం నుంచి అప్పగింపు వరకు',
    process_subtitle: 'ఆరు సులభ దశలు, ప్రతి దశలో మీ ఆమోదంతో.',
    process_step: 'దశ',
    p1_title: 'మెకానిక్‌ను సంప్రదించండి',
    p1_desc: 'కాల్ చేయండి లేదా వాట్సాప్ మెసేజ్ పంపండి.',
    p2_title: 'బైక్ సమస్యను వివరించండి',
    p2_desc: 'మీ బైక్ మోడల్ మరియు మీరు గమనించిన సమస్యను చెప్పండి.',
    p3_title: 'తనిఖీ సమయం ఏర్పాటు',
    p3_desc: 'వర్క్షాప్ నిర్ధారించిన సమయానికి బైక్ తీసుకురండి.',
    p4_title: 'అంచనా అందుకోండి',
    p4_desc: 'మేము సమస్యను వివరించి, అంచనా ఖర్చు తెలియజేస్తాము.',
    p5_title: 'మరమ్మతుకు అంగీకరించండి',
    p5_desc: 'మీరు అంగీకరించిన తర్వాతే పని ప్రారంభమవుతుంది.',
    p6_title: 'సేవ మరియు అప్పగింపు',
    p6_desc: 'పని పూర్తయి తనిఖీ చేసిన తర్వాత బైక్ తీసుకోండి.',

    // Bike care tips
    tips_eyebrow: 'బైక్ సంరక్షణ',
    tips_title: 'మీ బైక్‌ను ఆరోగ్యంగా ఉంచండి',
    tips_subtitle: 'ఖరీదైన మరమ్మతులను నివారించే సులభ అలవాట్లు.',
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

    // Reviews
    reviews_eyebrow: 'రైడర్ అభిప్రాయం',
    reviews_title: 'నమ్మకం సంపాదించాలి, ముద్రించకూడదు',
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
      'ఈ పేజీలోని ఫారమ్ ద్వారా బుకింగ్ అభ్యర్థన పంపండి, +91 91103 72978కు వాట్సాప్ మెసేజ్ చేయండి లేదా అదే నంబర్‌కు కాల్ చేయండి. అందుబాటును నిర్ధారించడానికి మేము సమాధానం ఇస్తాము.',
    faq5_q: 'బైక్ సర్వీసింగ్ ఖర్చు ఎంత?',
    faq5_a:
      'ఖర్చు సేవ, మీ బైక్ మోడల్ మరియు అవసరమైన భాగాలను బట్టి ఉంటుంది. పని ప్రారంభించే ముందు బైక్‌ను తనిఖీ చేసి అంచనా ఖర్చు తెలియజేస్తాము. ముందుగా వాట్సాప్‌లో అంచనా అడగవచ్చు.',
    faq6_q: 'వర్క్షాప్ ఎక్కడ ఉంది?',
    faq6_a:
      'మేము 55VX+VRM, సుందరగిరి, తెలంగాణ 505467లో ఉన్నాము. దిశల కోసం సంప్రదింపు విభాగంలోని Google Maps లింక్ తెరవండి, లేదా వర్క్షాప్ కనుగొనడంలో సహాయం కావాలంటే కాల్ చేయండి.',
    faq7_q: 'సేవ ధరలో విడి భాగాలు చేర్చబడతాయా?',
    faq7_a:
      'లేదు. సేవ ఛార్జీలు మరియు విడి భాగాల ఖర్చు విడివిడిగా తెలియజేస్తాము. భాగం మార్చాల్సి వస్తే కారణం వివరించి, ధరను మీతో నిర్ధారించిన తర్వాతే అమర్చుతాము.',
    faq_contact: 'ఇంకా ప్రశ్న ఉందా?',
    faq_contact_cta: 'వాట్సాప్‌లో అడగండి',

    // Booking
    booking_eyebrow: 'బుకింగ్',
    booking_title: 'బైక్ సేవను అభ్యర్థించండి',
    booking_subtitle:
      'వివరాలను వాట్సాప్‌లో పంపండి. సరిపోయే సమయాన్ని నిర్ధారించడానికి మేము సమాధానం ఇస్తాము.',
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
    booking_service_ph: 'సేవను ఎంచుకోండి',
    booking_date: 'అనుకున్న తేదీ',
    booking_time: 'అనుకున్న సమయం',
    booking_time_hint:
      'వర్క్షాప్ వేళలు: ఉదయం 8:00 – సాయంత్రం 7:00, సోమవారం నుంచి శనివారం.',
    booking_problem: 'సమస్యను వివరించండి',
    booking_problem_ph:
      'ఇంజిన్ నుంచి శబ్దం, బ్రేక్‌లు బలహీనం, స్టార్ట్ అవ్వడం లేదు…',
    booking_submit: 'వాట్సాప్‌లో బుకింగ్ అభ్యర్థన పంపండి',
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
      'సేవల విభాగం నుంచి సేవ ఎంపిక చేయబడింది. ఇక్కడ మార్చుకోవచ్చు.',
    booking_changed_lang: 'బుకింగ్ ఫారమ్ భాష',
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
    contact_title: 'సుందరగిరిలో మమ్మల్ని కనుగొనండి',
    contact_subtitle:
      'సర్వీస్, అంచనా ధర లేదా మరమ్మతుపై మరో అభిప్రాయం కోసం రాకముందే కాల్ చేయండి లేదా మెసేజ్ చేయండి.',
    contact_address_label: 'చిరునామా',
    contact_address: '55VX+VRM, సుందరగిరి, తెలంగాణ 505467, భారతదేశం',
    contact_plus_code: 'ప్లస్ కోడ్: 55VX+VRM',
    contact_phone_label: 'ఫోన్ & వాట్సాప్',
    contact_hours_label: 'పని వేళలు',
    contact_hours: 'సోమవారం – శనివారం: ఉదయం 8:00 – సాయంత్రం 7:00',
    contact_hours_note: 'ఆదివారం: ముందస్తు అపాయింట్‌మెంట్ ద్వారా',
    contact_whatsapp: 'వాట్సాప్‌లో మెసేజ్ చేయండి',
    contact_call: 'వర్క్షాప్‌కు కాల్ చేయండి',
    contact_directions: 'దిశలు పొందండి',
    contact_map_title:
      'సుందరగిరిలో నివాస్ బైక్ రిపేర్ సర్వీసెస్ ఉన్న ప్రాంతాన్ని చూపించే Google మ్యాప్',
    contact_map_note:
      'మ్యాప్ స్థానం ప్లస్ కోడ్ ఆధారంగా ఉంది. వర్క్షాప్ కనుగొనడంలో సహాయం కావాలంటే ముందే కాల్ చేయండి.',
    contact_open_maps: 'Google Maps లో తెరవండి',

    // Footer
    footer_tagline: 'సుందరగిరిలో మీ నమ్మకమైన బైక్ మెకానిక్.',
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
  const toggleLang = () => setLang((current) => (current === 'en' ? 'te' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
