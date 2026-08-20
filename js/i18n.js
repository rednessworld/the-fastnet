/* ============================================================
   THE FASTNET — Multi-language support (EN / ES / CA)
   applyLang() always uses innerHTML, never textContent.
   ============================================================ */

const LANG_KEY = 'fastnet_lang';
const WA_PHONE = '+34600000000';

const translations = {
  en: {
    'skip.content': 'Skip to content',

    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.reviews': 'Reviews',
    'nav.findus': 'Find Us',
    'nav.reserve': 'Reserve',
    'nav.aria.main': 'Main navigation',
    'nav.aria.toggle': 'Menu',
    'mobile.aria.dialog': 'Mobile menu',
    'mobile.aria.close': 'Close menu',

    'hero.eyebrow': 'Irish Bar &amp; Restaurant · Ciutat Vella',
    'hero.title': 'Good Pints. Good Craic. Right on the Water.',
    'hero.sub': 'Cold Guinness, a proper whiskey shelf and home-style food, steps from the Barceloneta harbour — open every day of the week.',
    'hero.cta1': 'Reserve via WhatsApp',
    'hero.cta2': 'View the Menu',

    'about.eyebrow': 'Our Story',
    'about.title': 'A Proper Irish Pub, Barcelona Side',
    'about.p1': "The Fastnet brings the real thing to Passeig de Joan de Borbó — a well-kept pint of Guinness, Murphy's on tap, and a whiskey shelf worth taking your time over. Rugby and football play on the screens, and the regulars mix easily with whoever's just walked in off the port.",
    'about.p2': "The kitchen keeps it honest: tapas boards, hearty curries, stacked burgers and plates built to go with a pint, not compete with it.",
    'about.badge1.h': 'Open 7 Days',
    'about.badge1.l': 'No closing day',
    'about.badge2.h': 'On Tap',
    'about.badge2.l': "Guinness · Murphy's · Magners",
    'about.badge3.h': 'On Screen',
    'about.badge3.l': 'Rugby, football &amp; Six Nations',

    'menu.eyebrow': "What We're Pouring &amp; Plating",
    'menu.title': 'The Menu',
    'menu.sub': 'Pub classics, hearty curries and shareable plates — built to go with a pint. Full pricing coming very soon.',
    'menu.aria.tabs': 'Menu categories',
    'menu.tab.tapas': 'Tapas / Starters / Sides',
    'menu.tab.mains': 'Main Courses',
    'menu.tab.curry': 'Curry',
    'menu.tab.sandwiches': 'Sandwiches &amp; Baguettes',
    'menu.tab.salads': "Chef's Fresh Salads",
    'menu.tab.burgers': 'Homemade Burgers',
    'menu.tab.smoothies': 'Fruit Smoothies',
    'menu.tab.desserts': 'Desserts',
    'menu.pending': "We're adding the full menu here shortly — ask our team for today's dishes and prices in the meantime.",

    'gallery.eyebrow': 'The Fastnet, in Frame',
    'gallery.title': 'A Look Inside',
    'gallery.insta': 'Follow @thefastnet.bcn',
    'gallery.aria.insta': 'Follow The Fastnet on Instagram',

    'reviews.eyebrow': 'Word on the Street',
    'reviews.title': 'What People Are Saying',
    'reviews.count': 'Based on Google Reviews',
    'reviews.link': 'See all reviews on Google Maps',
    'reviews.aria.stars': 'Rated 4.7 out of 5 stars',

    'findus.eyebrow': 'Find Us',
    'findus.title': 'Pull Up a Stool',
    'findus.sub': 'Right on the Barceloneta waterfront — easy to find, easy to stay a while.',
    'findus.hours.title': 'Opening Hours',
    'findus.day.thu': 'Thursday',
    'findus.day.fri': 'Friday',
    'findus.day.sat': 'Saturday',
    'findus.day.sun': 'Sunday',
    'findus.day.mon': 'Monday',
    'findus.day.tue': 'Tuesday',
    'findus.day.wed': 'Wednesday',
    'findus.wa.title': 'Reserve via WhatsApp',
    'findus.wa.sub': 'Fastest way to book a table',
    'findus.call.title': 'Prefer to call?',
    'findus.maplink': 'Open in Google Maps',
    'findus.aria.map': 'Map showing The Fastnet location',

    'footer.tagline': 'Irish Bar &amp; Restaurant · Barcelona',
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': '© {year} The Fastnet. Pg. de Joan de Borbó, 22, Barcelona.',

    'cookie.text': 'We use cookies to improve your experience and understand how you use our site.',
    'cookie.accept': 'Accept',
    'cookie.decline': 'Decline',
    'cookie.privacy': 'Read our Privacy Policy',

    'whatsapp.aria': 'Reserve via WhatsApp',
    'backtotop.aria': 'Back to top',

    '404.title': 'Lost on the Way to the Bar?',
    '404.desc': "This page doesn't exist — but a cold pint at The Fastnet does.",
    '404.home': 'Back to Home',
  },

  es: {
    'skip.content': 'Saltar al contenido',

    'nav.about': 'Sobre Nosotros',
    'nav.menu': 'Carta',
    'nav.gallery': 'Galería',
    'nav.reviews': 'Reseñas',
    'nav.findus': 'Cómo Llegar',
    'nav.reserve': 'Reservar',
    'nav.aria.main': 'Navegación principal',
    'nav.aria.toggle': 'Menú',
    'mobile.aria.dialog': 'Menú móvil',
    'mobile.aria.close': 'Cerrar menú',

    'hero.eyebrow': 'Bar Irlandés y Restaurante · Ciutat Vella',
    'hero.title': 'Buenas pintas. Buen ambiente. Junto al mar.',
    'hero.sub': 'Guinness bien tirada, una buena selección de whiskies y comida casera, a pasos del puerto de la Barceloneta — abierto todos los días de la semana.',
    'hero.cta1': 'Reservar por WhatsApp',
    'hero.cta2': 'Ver la Carta',

    'about.eyebrow': 'Nuestra Historia',
    'about.title': 'Un Auténtico Pub Irlandés en Barcelona',
    'about.p1': "The Fastnet trae lo auténtico al Passeig de Joan de Borbó — una pinta de Guinness bien cuidada, Murphy's de barril y una selección de whiskies para tomarse con calma. El rugby y el fútbol se ven en las pantallas, y los habituales se mezclan sin problema con quien acaba de entrar desde el puerto.",
    'about.p2': 'La cocina va al grano: tablas de tapas, currys contundentes, hamburguesas bien cargadas y platos pensados para acompañar una pinta, no para competir con ella.',
    'about.badge1.h': 'Abierto 7 Días',
    'about.badge1.l': 'Sin día de descanso',
    'about.badge2.h': 'En Barril',
    'about.badge2.l': "Guinness · Murphy's · Magners",
    'about.badge3.h': 'En Pantalla',
    'about.badge3.l': 'Rugby, fútbol y Seis Naciones',

    'menu.eyebrow': 'Lo Que Servimos y Tiramos',
    'menu.title': 'La Carta',
    'menu.sub': 'Clásicos de pub, currys contundentes y platos para compartir — pensados para ir con una pinta. Precios completos muy pronto.',
    'menu.aria.tabs': 'Categorías de la carta',
    'menu.tab.tapas': 'Tapas / Entrantes / Guarniciones',
    'menu.tab.mains': 'Platos Principales',
    'menu.tab.curry': 'Curry',
    'menu.tab.sandwiches': 'Sándwiches y Baguettes',
    'menu.tab.salads': 'Ensaladas Frescas del Chef',
    'menu.tab.burgers': 'Hamburguesas Caseras',
    'menu.tab.smoothies': 'Batidos de Fruta',
    'menu.tab.desserts': 'Postres',
    'menu.pending': 'Estamos añadiendo la carta completa muy pronto — pregunta a nuestro equipo por los platos y precios del día.',

    'gallery.eyebrow': 'The Fastnet, en Imágenes',
    'gallery.title': 'Un Vistazo por Dentro',
    'gallery.insta': 'Síguenos en @thefastnet.bcn',
    'gallery.aria.insta': 'Síguenos en Instagram',

    'reviews.eyebrow': 'Se Comenta por Ahí',
    'reviews.title': 'Lo Que Dice la Gente',
    'reviews.count': 'Según reseñas de Google',
    'reviews.link': 'Ver todas las reseñas en Google Maps',
    'reviews.aria.stars': 'Valoración de 4,7 sobre 5 estrellas',

    'findus.eyebrow': 'Cómo Llegar',
    'findus.title': 'Ven a Tomar Algo',
    'findus.sub': 'Justo en el paseo marítimo de la Barceloneta — fácil de encontrar, fácil quedarse un rato.',
    'findus.hours.title': 'Horario',
    'findus.day.thu': 'Jueves',
    'findus.day.fri': 'Viernes',
    'findus.day.sat': 'Sábado',
    'findus.day.sun': 'Domingo',
    'findus.day.mon': 'Lunes',
    'findus.day.tue': 'Martes',
    'findus.day.wed': 'Miércoles',
    'findus.wa.title': 'Reservar por WhatsApp',
    'findus.wa.sub': 'La forma más rápida de reservar mesa',
    'findus.call.title': '¿Prefieres llamar?',
    'findus.maplink': 'Abrir en Google Maps',
    'findus.aria.map': 'Mapa con la ubicación de The Fastnet',

    'footer.tagline': 'Bar Irlandés y Restaurante · Barcelona',
    'footer.privacy': 'Política de Privacidad',
    'footer.copyright': '© {year} The Fastnet. Pg. de Joan de Borbó, 22, Barcelona.',

    'cookie.text': 'Utilizamos cookies para mejorar tu experiencia y entender cómo usas nuestra web.',
    'cookie.accept': 'Aceptar',
    'cookie.decline': 'Rechazar',
    'cookie.privacy': 'Lee nuestra Política de Privacidad',

    'whatsapp.aria': 'Reservar por WhatsApp',
    'backtotop.aria': 'Volver arriba',

    '404.title': '¿Perdido de Camino a la Barra?',
    '404.desc': 'Esta página no existe — pero una pinta bien fría en The Fastnet sí.',
    '404.home': 'Volver al Inicio',
  },

  ca: {
    'skip.content': 'Saltar al contingut',

    'nav.about': 'Sobre Nosaltres',
    'nav.menu': 'Carta',
    'nav.gallery': 'Galeria',
    'nav.reviews': 'Ressenyes',
    'nav.findus': 'Com Arribar',
    'nav.reserve': 'Reservar',
    'nav.aria.main': 'Navegació principal',
    'nav.aria.toggle': 'Menú',
    'mobile.aria.dialog': 'Menú mòbil',
    'mobile.aria.close': 'Tancar menú',

    'hero.eyebrow': 'Bar Irlandès i Restaurant · Ciutat Vella',
    'hero.title': 'Bones pintes. Bon ambient. Vora el mar.',
    'hero.sub': 'Guinness ben tirada, una bona selecció de whiskies i menjar casolà, a pocs passos del port de la Barceloneta — obert tots els dies de la setmana.',
    'hero.cta1': 'Reservar per WhatsApp',
    'hero.cta2': 'Veure la Carta',

    'about.eyebrow': 'La Nostra Història',
    'about.title': 'Un Autèntic Pub Irlandès a Barcelona',
    'about.p1': "The Fastnet porta l'autèntic al Passeig de Joan de Borbó — una pinta de Guinness ben cuidada, Murphy's de barril i una selecció de whiskies per tastar amb calma. El rugbi i el futbol es veuen a les pantalles, i els habituals es barregen sense problema amb qui acaba d'entrar des del port.",
    'about.p2': "La cuina va al gra: taules de tapes, curris contundents, hamburgueses ben carregades i plats pensats per acompanyar una pinta, no per competir-hi.",
    'about.badge1.h': 'Obert 7 Dies',
    'about.badge1.l': 'Sense dia de descans',
    'about.badge2.h': 'De Barril',
    'about.badge2.l': "Guinness · Murphy's · Magners",
    'about.badge3.h': 'A la Pantalla',
    'about.badge3.l': 'Rugbi, futbol i Sis Nacions',

    'menu.eyebrow': 'El Que Servim i Tirem',
    'menu.title': 'La Carta',
    'menu.sub': 'Clàssics de pub, curris contundents i plats per compartir — pensats per anar amb una pinta. Preus complets molt aviat.',
    'menu.aria.tabs': 'Categories de la carta',
    'menu.tab.tapas': 'Tapes / Entrants / Guarnicions',
    'menu.tab.mains': 'Plats Principals',
    'menu.tab.curry': 'Curry',
    'menu.tab.sandwiches': 'Entrepans i Baguettes',
    'menu.tab.salads': 'Amanides Fresques del Xef',
    'menu.tab.burgers': 'Hamburgueses Casolanes',
    'menu.tab.smoothies': 'Batuts de Fruita',
    'menu.tab.desserts': 'Postres',
    'menu.pending': 'Estem afegint la carta completa molt aviat — pregunta al nostre equip pels plats i preus del dia.',

    'gallery.eyebrow': 'The Fastnet, en Imatges',
    'gallery.title': "Un Cop d'Ull per Dins",
    'gallery.insta': 'Segueix-nos a @thefastnet.bcn',
    'gallery.aria.insta': 'Segueix-nos a Instagram',

    'reviews.eyebrow': 'Es Comenta per Aquí',
    'reviews.title': 'El Que Diu la Gent',
    'reviews.count': 'Segons ressenyes de Google',
    'reviews.link': 'Veure totes les ressenyes a Google Maps',
    'reviews.aria.stars': 'Valoració de 4,7 sobre 5 estrelles',

    'findus.eyebrow': 'Com Arribar',
    'findus.title': 'Vine a Fer un Got',
    'findus.sub': "Just al passeig marítim de la Barceloneta — fàcil de trobar, fàcil quedar-s'hi una estona.",
    'findus.hours.title': 'Horari',
    'findus.day.thu': 'Dijous',
    'findus.day.fri': 'Divendres',
    'findus.day.sat': 'Dissabte',
    'findus.day.sun': 'Diumenge',
    'findus.day.mon': 'Dilluns',
    'findus.day.tue': 'Dimarts',
    'findus.day.wed': 'Dimecres',
    'findus.wa.title': 'Reservar per WhatsApp',
    'findus.wa.sub': 'La manera més ràpida de reservar taula',
    'findus.call.title': 'Prefereixes trucar?',
    'findus.maplink': 'Obrir a Google Maps',
    'findus.aria.map': 'Mapa amb la ubicació de The Fastnet',

    'footer.tagline': 'Bar Irlandès i Restaurant · Barcelona',
    'footer.privacy': 'Política de Privacitat',
    'footer.copyright': '© {year} The Fastnet. Pg. de Joan de Borbó, 22, Barcelona.',

    'cookie.text': 'Fem servir cookies per millorar la teva experiència i entendre com fas servir el nostre web.',
    'cookie.accept': 'Acceptar',
    'cookie.decline': 'Rebutjar',
    'cookie.privacy': 'Llegeix la nostra Política de Privacitat',

    'whatsapp.aria': 'Reservar per WhatsApp',
    'backtotop.aria': 'Tornar amunt',

    '404.title': 'Perdut de Camí a la Barra?',
    '404.desc': 'Aquesta pàgina no existeix — però una pinta ben fresca a The Fastnet sí.',
    '404.home': "Tornar a l'Inici",
  },
};

const WA_MESSAGE = {
  en: "Hi! I'd like to reserve a table at The Fastnet for ___ people on ___ at ___. Thanks!",
  es: '¡Hola! Me gustaría reservar una mesa en The Fastnet para ___ personas el ___ a las ___. ¡Gracias!',
  ca: "Hola! M'agradaria reservar una taula a The Fastnet per a ___ persones el ___ a les ___. Gràcies!",
};

function getWaLink(lang) {
  const msg = encodeURIComponent(WA_MESSAGE[lang] || WA_MESSAGE.en);
  return `https://wa.me/${WA_PHONE.replace('+', '')}?text=${msg}`;
}

function applyLang(lang) {
  if (!translations[lang]) lang = 'en';

  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem(LANG_KEY, lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key].replace('{year}', new Date().getFullYear());
    }
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (translations[lang][key] !== undefined) {
      el.setAttribute('aria-label', translations[lang][key]);
    }
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
  });

  document.querySelectorAll('[data-wa-link]').forEach((el) => {
    el.setAttribute('href', getWaLink(lang));
  });
}

function initLang() {
  const stored = localStorage.getItem(LANG_KEY);
  const browserLang = (navigator.language || 'en').slice(0, 2);
  const initial = stored || (translations[browserLang] ? browserLang : 'en');
  applyLang(initial);

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

document.addEventListener('DOMContentLoaded', initLang);
