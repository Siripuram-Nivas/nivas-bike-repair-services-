import { useState } from 'react';
import { LanguageContext } from './useLanguage';

const content = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_services: 'Services',
    nav_why: 'Why Us',
    nav_process: 'Process',
    nav_tips: 'Tips',
    nav_testimonials: 'Testimonials',
    nav_faq: 'FAQ',
    nav_contact: 'Contact',
    nav_book: 'Book Now',

    // Hero
    hero_title: 'Nivas Bike Repair Services',
    hero_subtitle: 'Trusted Bike Repairs in Sundaragiri',
    hero_desc: 'Expert mechanic services, honest pricing, and fast turnaround. Your bike deserves the best care.',
    hero_cta: 'Book a Service',
    hero_cta2: 'Our Services',
    hero_badge1: '10+ Years',
    hero_badge1_sub: 'Experience',
    hero_badge2: '5000+',
    hero_badge2_sub: 'Bikes Serviced',
    hero_badge3: 'Same Day',
    hero_badge3_sub: 'Service',

    // Services
    services_title: 'Our Services',
    services_subtitle: 'Complete bike care solutions for every need',
    svc1_title: 'Complete Bike Servicing',
    svc1_desc: 'Full inspection and comprehensive servicing to keep your bike running at peak performance.',
    svc2_title: 'Engine Overhaul & Tuning',
    svc2_desc: 'Deep engine diagnostics, overhaul and fine-tuning for maximum power and efficiency.',
    svc3_title: 'Oil Change & Lubrication',
    svc3_desc: 'Fresh engine oil and proper lubrication to extend your engine\'s life.',
    svc4_title: 'Brake & Clutch Repair',
    svc4_desc: 'Safety-first brake and clutch inspection, adjustment and replacement.',
    svc5_title: 'General Maintenance',
    svc5_desc: 'Routine checks, adjustments and preventive maintenance to avoid costly repairs.',
    svc6_title: 'Chain Cleaning & Lubrication',
    svc6_desc: 'Professional chain cleaning, lubrication, and adjustment to improve performance, reduce wear, and ensure a smoother riding experience.',

    // Why Choose Us
    why_title: 'Why Choose Us',
    why_subtitle: 'We go above and beyond for every bike we service',
    why1_title: 'Trusted Village Mechanic',
    why1_desc: 'Honest opinions and top-quality service. We treat your bike like our own.',
    why2_title: 'Honest Pricing',
    why2_desc: 'Transparent quotes, no hidden charges. You know exactly what you pay for.',
    why3_title: 'Same-Day Service',
    why3_desc: 'Most repairs completed the same day so you\'re back on the road fast.',
    why4_title: 'Years of Experience',
    why4_desc: 'Over a decade of hands-on motorcycle experience across all major brands.',
    why5_title: 'Quality Workmanship',
    why5_desc: 'We only use high-quality OEM and genuine spare parts for every job.',
    why6_title: 'Customer Satisfaction',
    why6_desc: 'Your safety and satisfaction is our top priority, every single time.',

    // Process
    process_title: 'Our Service Process',
    process_subtitle: 'Simple, transparent and hassle-free',
    p1_title: 'Bike Inspection',
    p1_desc: 'We do a complete visual and mechanical inspection of your bike.',
    p2_title: 'Problem Identification',
    p2_desc: 'Our expert identifies all issues accurately and thoroughly.',
    p3_title: 'Service Recommendation',
    p3_desc: 'We explain the issues and recommend the best service plan for you.',
    p4_title: 'Repair & Maintenance',
    p4_desc: 'Skilled hands carry out all repairs and maintenance with care.',
    p5_title: 'Quality Check',
    p5_desc: 'Every repair is tested and checked before we hand over your bike.',
    p6_title: 'Ready for Pickup',
    p6_desc: 'Your bike is cleaned, ready and waiting for you!',

    // Tips
    tips_title: 'Bike Care Tips',
    tips_subtitle: 'Simple habits to keep your bike healthy longer',
    tip1_title: 'Service Periodically',
    tip1_desc: 'Get your bike serviced every 3,000 km or 3 months, whichever comes first.',
    tip2_title: 'Check Tyre Pressure',
    tip2_desc: 'Check tyre pressure weekly. Correct pressure improves mileage and handling.',
    tip3_title: 'Clean & Lube Chain',
    tip3_desc: 'Keep the drive chain clean and well-lubricated for smooth power delivery.',
    tip4_title: 'Check Engine Oil',
    tip4_desc: 'Monitor engine oil level regularly. Low oil causes serious engine damage.',

    // Stats
    stats_title: 'Our Track Record',
    stats_subtitle: 'Numbers that speak for our dedication',
    stat1_num: '5000',
    stat1_label: 'Bikes Serviced',
    stat2_num: '1500',
    stat2_label: 'Happy Customers',
    stat3_num: '10',
    stat3_label: 'Years Experience',
    stat4_num: '100',
    stat4_label: '% Satisfaction',

    // Testimonials
    test_title: 'What Our Customers Say',
    test_subtitle: 'Real words from real riders',
    test1_name: 'Ravi Kumar',
    test1_text: 'Excellent service! My bike\'s engine was making noise and they fixed it the same day. Very honest mechanic — no unnecessary repairs suggested.',
    test2_name: 'Suresh Babu',
    test2_text: 'Best bike shop in Sundaragiri. Very affordable and quick. They explained every problem clearly before starting work. Highly recommended!',
    test3_name: 'Anitha Reddy',
    test3_text: 'I was worried about a strange sound from the engine. Nivas diagnosed it in minutes and the repair was done at a very fair price. Very trustworthy!',
    test4_name: 'Prakash Rao',
    test4_text: 'Great experience! The mechanic is very experienced and treated my old bike with great care. It runs like new now. Will definitely come back.',

    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_subtitle: 'Everything you need to know',
    faq1_q: 'How long does a general bike service take?',
    faq1_a: 'A standard general service typically takes 2–3 hours. More complex repairs like engine overhauls may take longer and we will inform you in advance.',
    faq2_q: 'Do you provide home pickup and drop service?',
    faq2_a: 'Yes! We offer home pickup and drop service within Sundaragiri village limits. Contact us on WhatsApp to arrange a convenient time.',
    faq3_q: 'Are the spare parts used original?',
    faq3_a: 'Yes, we use only OEM (Original Equipment Manufacturer) genuine spare parts to ensure the quality and longevity of every repair.',
    faq4_q: 'What bike brands do you service?',
    faq4_a: 'We service all major brands including Hero, Honda, Bajaj, TVS, Royal Enfield, Yamaha and more.',

    // Contact
    contact_title: 'Get In Touch',
    contact_subtitle: 'Ready to book? Chat with us on WhatsApp!',
    contact_address: 'Nivas Bike Repair Services, Sundaragiri',
    contact_hours: 'Mon–Sat: 8:00 AM – 7:00 PM',
    contact_whatsapp: 'Chat on WhatsApp',
    contact_call: 'Call Us',

    // Footer
    footer_tagline: 'Your trusted mechanic in Sundaragiri.',
    footer_rights: '© 2024 Nivas Bike Repair Services. All rights reserved.',
  },

  te: {
    // Navbar
    nav_home: 'హోమ్',
    nav_services: 'సేవలు',
    nav_why: 'మేము ఎందుకు',
    nav_process: 'ప్రక్రియ',
    nav_tips: 'చిట్కాలు',
    nav_testimonials: 'అభిప్రాయాలు',
    nav_faq: 'FAQ',
    nav_contact: 'సంప్రదించండి',
    nav_book: 'బుక్ చేయండి',

    // Hero
    hero_title: 'నివాస్ బైక్ రిపేర్ సర్వీసెస్',
    hero_subtitle: 'సుందరగిరిలో నమ్మకమైన బైక్ రిపేర్',
    hero_desc: 'నిపుణమైన మెకానిక్ సేవలు, నిజాయితీగల ధరలు, వేగవంతమైన సేవ. మీ బైక్ కు అత్యుత్తమ సంరక్షణ.',
    hero_cta: 'సేవ బుక్ చేయండి',
    hero_cta2: 'మా సేవలు',
    hero_badge1: '10+ సంవత్సరాలు',
    hero_badge1_sub: 'అనుభవం',
    hero_badge2: '5000+',
    hero_badge2_sub: 'బైక్‌లు సర్వీస్',
    hero_badge3: 'అదే రోజు',
    hero_badge3_sub: 'సేవ',

    // Services
    services_title: 'మా సేవలు',
    services_subtitle: 'ప్రతి అవసరానికి పూర్తి బైక్ సంరక్షణ',
    svc1_title: 'పూర్తి బైక్ సర్వీసింగ్',
    svc1_desc: 'మీ బైక్‌ను అత్యుత్తమ పనితీరులో ఉంచడానికి పూర్తి తనిఖీ మరియు సమగ్ర సర్వీసింగ్.',
    svc2_title: 'ఇంజిన్ ఓవర్‌హాల్ & ట్యూనింగ్',
    svc2_desc: 'గరిష్ట శక్తి మరియు సామర్థ్యం కోసం లోతైన ఇంజిన్ డయాగ్నోస్టిక్స్ మరియు ఓవర్‌హాల్.',
    svc3_title: 'ఆయిల్ చేంజ్ & లూబ్రికేషన్',
    svc3_desc: 'మీ ఇంజిన్ జీవితాన్ని పొడిగించడానికి తాజా ఇంజిన్ ఆయిల్ మరియు సరైన లూబ్రికేషన్.',
    svc4_title: 'బ్రేక్ & క్లచ్ రిపేర్',
    svc4_desc: 'భద్రతకు ప్రాధాన్యత ఇస్తూ బ్రేక్ మరియు క్లచ్ తనిఖీ, సర్దుబాటు మరియు రీప్లేస్‌మెంట్.',
    svc5_title: 'సాధారణ నిర్వహణ',
    svc5_desc: 'ఖర్చుతో కూడిన మరమ్మతులను నివారించడానికి రొటీన్ చెక్కులు మరియు నివారణ నిర్వహణ.',
    svc6_title: 'చైన్ క్లీనింగ్ & లూబ్రికేషన్',
    svc6_desc: 'పనితీరును మెరుగుపరచడానికి, అరుగుదలను తగ్గించడానికి మరియు మృదువైన రైడింగ్ అనుభవాన్ని నిర్ధారించడానికి ప్రొఫెషనల్ చైన్ క్లీనింగ్, లూబ్రికేషన్ మరియు సర్దుబాటు.',

    // Why Choose Us
    why_title: 'మేమ్ ఎందుకు ఎంచుకోవాలి',
    why_subtitle: 'మేము సర్వీస్ చేసే ప్రతి బైక్ కోసం అదనంగా చేస్తాం',
    why1_title: 'నమ్మకమైన మెకానిక్',
    why1_desc: 'నిజాయితీగల అభిప్రాయాలు మరియు అత్యుత్తమ సేవ. మేము మీ బైక్‌ని మా స్వంతంగా చూస్తాం.',
    why2_title: 'నిజాయితీగల ధరలు',
    why2_desc: 'పారదర్శక కోట్‌లు, దాచిన చార్జీలు లేవు. మీరు ఖచ్చితంగా ఎంత చెల్లిస్తున్నారో తెలుసుకోండి.',
    why3_title: 'అదే రోజు సేవ',
    why3_desc: 'చాలా మరమ్మతులు అదే రోజు పూర్తవుతాయి, తద్వారా మీరు త్వరగా రోడ్డుపై వెళ్ళవచ్చు.',
    why4_title: 'సంవత్సరాల అనుభవం',
    why4_desc: 'అన్ని ప్రధాన బ్రాండ్‌లలో ఒక దశాబ్దానికి పైగా మోటార్‌సైకిల్ అనుభవం.',
    why5_title: 'నాణ్యమైన పని',
    why5_desc: 'మేము ప్రతి పనికి అధిక నాణ్యత OEM మరియు అసలైన విడిభాగాలు మాత్రమే ఉపయోగిస్తాం.',
    why6_title: 'కస్టమర్ సంతృప్తి',
    why6_desc: 'మీ భద్రత మరియు సంతృప్తి మా అగ్ర ప్రాధాన్యత, ప్రతిసారీ.',

    // Process
    process_title: 'మా సర్వీస్ ప్రక్రియ',
    process_subtitle: 'సరళంగా, పారదర్శకంగా మరియు ఇబ్బంది లేకుండా',
    p1_title: 'బైక్ తనిఖీ',
    p1_desc: 'మేము మీ బైక్ యొక్క సంపూర్ణ విజువల్ మరియు మెకానికల్ తనిఖీ చేస్తాం.',
    p2_title: 'సమస్య గుర్తింపు',
    p2_desc: 'మా నిపుణుడు అన్ని సమస్యలను ఖచ్చితంగా మరియు పూర్తిగా గుర్తిస్తాడు.',
    p3_title: 'సేవ సిఫార్సు',
    p3_desc: 'మేము సమస్యలను వివరిస్తాం మరియు మీకు ఉత్తమ సేవా ప్రణాళికను సూచిస్తాం.',
    p4_title: 'రిపేర్ & నిర్వహణ',
    p4_desc: 'నైపుణ్యమైన చేతులు జాగ్రత్తగా అన్ని మరమ్మతులు మరియు నిర్వహణ చేస్తాయి.',
    p5_title: 'నాణ్యత తనిఖీ',
    p5_desc: 'మేము మీ బైక్‌ని అప్పగించే ముందు ప్రతి మరమ్మతు పరీక్షించి చెక్ చేస్తాం.',
    p6_title: 'తీసుకోవడానికి సిద్ధం',
    p6_desc: 'మీ బైక్ శుభ్రంగా, సిద్ధంగా మరియు మీ కోసం వేచి ఉంది!',

    // Tips
    tips_title: 'బైక్ కేర్ చిట్కాలు',
    tips_subtitle: 'మీ బైక్‌ను ఆరోగ్యంగా ఉంచే సరళమైన అలవాట్లు',
    tip1_title: 'క్రమానుగతంగా సర్వీస్ చేయించండి',
    tip1_desc: 'ప్రతి 3,000 కి.మీ. లేదా 3 నెలలకు ఒకసారి మీ బైక్‌ను సర్వీస్ చేయించండి.',
    tip2_title: 'టైర్ ఒత్తిడి తనిఖీ చేయండి',
    tip2_desc: 'వారానికి ఒకసారి టైర్ ఒత్తిడి తనిఖీ చేయండి. సరైన ఒత్తిడి మైలేజ్ మెరుగుపరుస్తుంది.',
    tip3_title: 'చైన్ శుభ్రం & లూబ్రికేట్ చేయండి',
    tip3_desc: 'సున్నితమైన పవర్ డెలివరీ కోసం డ్రైవ్ చైన్‌ను శుభ్రంగా మరియు లూబ్రికేట్ చేసి ఉంచండి.',
    tip4_title: 'ఇంజిన్ ఆయిల్ తనిఖీ చేయండి',
    tip4_desc: 'ఇంజిన్ ఆయిల్ స్థాయిని క్రమానుగతంగా పర్యవేక్షించండి. తక్కువ ఆయిల్ తీవ్రమైన ఇంజిన్ నష్టం కలిగిస్తుంది.',

    // Stats
    stats_title: 'మా ట్రాక్ రికార్డ్',
    stats_subtitle: 'మా అంకితభావానికి మాట్లాడే సంఖ్యలు',
    stat1_num: '5000',
    stat1_label: 'బైక్‌లు సర్వీస్',
    stat2_num: '1500',
    stat2_label: 'సంతోషకరమైన కస్టమర్‌లు',
    stat3_num: '10',
    stat3_label: 'సంవత్సరాల అనుభవం',
    stat4_num: '100',
    stat4_label: '% సంతృప్తి',

    // Testimonials
    test_title: 'మా కస్టమర్‌లు ఏమంటున్నారు',
    test_subtitle: 'నిజమైన రైడర్‌ల నుండి నిజమైన మాటలు',
    test1_name: 'రవి కుమార్',
    test1_text: 'అద్భుతమైన సేవ! నా బైక్ ఇంజిన్ శబ్దం చేస్తోంది, వారు అదే రోజు సరిచేశారు. చాలా నిజాయితీగల మెకానిక్.',
    test2_name: 'సురేష్ బాబు',
    test2_text: 'సుందరగిరిలో అత్యుత్తమ బైక్ షాప్. చాలా సరసమైన ధర మరియు వేగం. పని ప్రారంభించే ముందు ప్రతి సమస్యను స్పష్టంగా వివరించారు.',
    test3_name: 'అనిత రెడ్డి',
    test3_text: 'ఇంజిన్ నుండి విచిత్రమైన శబ్దం గురించి నేను ఆందోళన చెందాను. నివాస్ నిమిషాల్లో నిర్ధారించారు మరియు చాలా సరైన ధరలో మరమ్మతు జరిగింది.',
    test4_name: 'ప్రకాష్ రావు',
    test4_text: 'గొప్ప అనుభవం! మెకానిక్ చాలా అనుభవజ్ఞుడు మరియు నా పాత బైక్‌ని చాలా జాగ్రత్తగా సేవ చేశారు. ఇప్పుడు కొత్తదిలా నడుస్తోంది.',

    // FAQ
    faq_title: 'తరచుగా అడిగే ప్రశ్నలు',
    faq_subtitle: 'మీకు తెలుసుకోవలసిన అన్నీ',
    faq1_q: 'సాధారణ బైక్ సర్వీస్ ఎంత సమయం పడుతుంది?',
    faq1_a: 'ఒక ప్రామాణిక సర్వీస్ సాధారణంగా 2–3 గంటలు పడుతుంది. ఇంజిన్ ఓవర్‌హాల్ వంటి సంక్లిష్ట మరమ్మతులకు ఎక్కువ సమయం పడవచ్చు.',
    faq2_q: 'మీరు హోమ్ పికప్ అండ్ డ్రాప్ సేవ అందిస్తారా?',
    faq2_a: 'అవును! మేము సుందరగిరి గ్రామ సరిహద్దుల్లో హోమ్ పికప్ మరియు డ్రాప్ సేవ అందిస్తాం.',
    faq3_q: 'ఉపయోగించే విడి భాగాలు అసలైనవా?',
    faq3_a: 'అవును, మేము ప్రతి మరమ్మతు నాణ్యత మరియు దీర్ఘాయువు నిర్ధారించడానికి OEM అసలైన విడి భాగాలు మాత్రమే ఉపయోగిస్తాం.',
    faq4_q: 'మీరు ఏ బైక్ బ్రాండ్‌లను సర్వీస్ చేస్తారు?',
    faq4_a: 'మేము హీరో, హోండా, బజాజ్, TVS, రాయల్ ఎన్‌ఫీల్డ్, యమహా మరియు ఇంకా అన్ని ప్రధాన బ్రాండ్‌లను సర్వీస్ చేస్తాం.',

    // Contact
    contact_title: 'సంప్రదించండి',
    contact_subtitle: 'బుక్ చేయడానికి సిద్ధంగా ఉన్నారా? WhatsApp లో మాకు చాట్ చేయండి!',
    contact_address: 'నివాస్ బైక్ రిపేర్ సర్వీసెస్, సుందరగిరి',
    contact_hours: 'సోమ–శని: ఉ. 8:00 – సా. 7:00',
    contact_whatsapp: 'WhatsApp లో చాట్ చేయండి',
    contact_call: 'కాల్ చేయండి',

    // Footer
    footer_tagline: 'సుందరగిరిలో మీ నమ్మకమైన మెకానిక్.',
    footer_rights: '© 2024 నివాస్ బైక్ రిపేర్ సర్వీసెస్. అన్ని హక్కులు రక్షించబడ్డాయి.',
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = (key) => content[lang][key] || key;
  const toggleLang = () => setLang(l => l === 'en' ? 'te' : 'en');
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
