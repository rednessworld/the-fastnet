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
    'menu.item.confirm': 'Ask our team for details',
    'menu.tag.share': 'To Share',

    'menu.tapas.i1.name': 'Cured Meats &amp; Cheese Platter',
    'menu.tapas.i2.name': 'Chilli &amp; Cheese Nachos',
    'menu.tapas.i3.name': 'Wood Smoked Chicken Wings',
    'menu.tapas.i4.name': 'Spicy Fried Chicken Wings',
    'menu.tapas.i5.name': 'Battered Squid Rings',
    'menu.tapas.i6.name': 'Gazpacho',
    'menu.tapas.i7.name': 'Pan con Tomate',
    'menu.tapas.i8.name': 'Patatas Bravas',
    'menu.tapas.i9.name': 'Green Salad',
    'menu.tapas.i10.name': 'Fries',
    'menu.tapas.i11.name': 'Olives',

    'menu.mains.i1.name': 'Summer Tapas Platter',
    'menu.mains.i1.desc': 'Squid rings, breaded fish pieces, bravas and tomato bread',
    'menu.mains.i2.name': 'Hamburger in a Bowl',
    'menu.mains.i2.desc': "Beef or chicken burger, with a fresh chef's salad",
    'menu.mains.i3.name': 'Fish &amp; Chips',
    'menu.mains.i3.desc': 'Battered cod, mushy peas, fries and tartar sauce',
    'menu.mains.i4.name': 'Lasagne (Meat or Veg)',
    'menu.mains.i4.desc': 'Served with fries or salad',
    'menu.mains.i5.name': 'Chilli Con Carne',
    'menu.mains.i5.desc': 'Served with rice and tortilla',
    'menu.mains.i6.name': 'Pesto Pasta',
    'menu.mains.i6.desc': 'Fresh pesto with basil, cherry tomato, feta cheese, and pasta with a sprinkle of parmesan',

    'menu.curry.intro': 'Made in an authentic North Indian style, all served with naan bread and rice.',
    'menu.curry.i1.name': 'Chicken Vindaloo',
    'menu.curry.i1.desc': 'Hot curry with potatoes',
    'menu.curry.i2.name': 'Lamb Balti',
    'menu.curry.i2.desc': 'Medium curry with peppers and onions',
    'menu.curry.i3.name': 'Dal Makhni',
    'menu.curry.i3.desc': 'Slow cooked lentil curry, medium',

    'menu.sandwiches.i1.name': 'Fastnet Sandwich',

    'menu.salads.i1.name': 'Chicken Caesar Salad',
    'menu.salads.i1.desc': 'Romaine lettuce, croutons, shaved parmesan, grilled chicken',
    'menu.salads.i2.name': 'Greek Salad',
    'menu.salads.i2.desc': 'Feta cheese, cucumber, tomato, red onion, olives',
    'menu.salads.i3.name': "Chef's Tuna Pasta Salad",
    'menu.salads.i3.desc': 'Tuna, pickles, pasta, green peas, celery, parmesan',

    'menu.burgers.i1.name': 'The Towering Fastnet',
    'menu.burgers.i1.desc': 'Caramelised onion, mushroom, bacon, cheddar, hash browns, fried egg, tomato',
    'menu.burgers.i2.name': 'Polly Burger',
    'menu.burgers.i2.desc': 'Marinated chicken breast, smoked bacon, cheddar, lettuce, onion, tomato',
    'menu.burgers.i3.name': 'The Fastnet Classic',
    'menu.burgers.i3.desc': 'Lettuce, onion, tomato, mayonnaise',
    'menu.burgers.i4.name': 'The Lost Mexican',
    'menu.burgers.i4.desc': 'Blue cheese, jalapeño peppers, guacamole, lettuce, onion, tomato',
    'menu.burgers.i5.name': 'La Jolie Brie',
    'menu.burgers.i5.desc': 'Brie, bacon, caramelised onions, mushroom chutney, lettuce, tomato',
    'menu.burgers.i6.name': 'Bean Bang Burger',
    'menu.burgers.i6.desc': 'Black bean veggie burger, guacamole, lettuce, onion, tomato',

    'menu.smoothies.i1.name': 'Pineapple &amp; Mango',
    'menu.smoothies.i2.name': 'Banana &amp; Strawberry',
    'menu.smoothies.i3.name': 'Raspberry',
    'menu.smoothies.i4.name': 'Blueberry',
    'menu.smoothies.i5.name': 'Mango &amp; Raspberry',
    'menu.smoothies.i6.name': 'Add Vodka',

    'menu.desserts.i1.name': 'Chocolate Fudge Cake',

    'gallery.eyebrow': 'The Fastnet, in Frame',
    'gallery.title': 'A Look Inside',
    'gallery.insta': 'Follow @thefastnet_barcelona',
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
    'menu.item.confirm': 'Pregunta a nuestro equipo por los detalles',
    'menu.tag.share': 'Para Compartir',

    'menu.tapas.i1.name': 'Tabla de Embutidos y Quesos',
    'menu.tapas.i2.name': 'Nachos con Chili y Queso',
    'menu.tapas.i3.name': 'Alitas de Pollo Ahumadas',
    'menu.tapas.i4.name': 'Alitas de Pollo Fritas Picantes',
    'menu.tapas.i5.name': 'Rabas de Calamar Rebozadas',
    'menu.tapas.i6.name': 'Gazpacho',
    'menu.tapas.i7.name': 'Pan con Tomate',
    'menu.tapas.i8.name': 'Patatas Bravas',
    'menu.tapas.i9.name': 'Ensalada Verde',
    'menu.tapas.i10.name': 'Patatas Fritas',
    'menu.tapas.i11.name': 'Aceitunas',

    'menu.mains.i1.name': 'Tabla de Tapas de Verano',
    'menu.mains.i1.desc': 'Rabas de calamar, trozos de pescado rebozado, bravas y pan con tomate',
    'menu.mains.i2.name': 'Hamburguesa en Bol',
    'menu.mains.i2.desc': 'Hamburguesa de ternera o de pollo, con una ensalada fresca del chef',
    'menu.mains.i3.name': 'Fish &amp; Chips',
    'menu.mains.i3.desc': 'Bacalao rebozado, guisantes triturados, patatas fritas y salsa tártara',
    'menu.mains.i4.name': 'Lasaña (de Carne o Vegetal)',
    'menu.mains.i4.desc': 'Servida con patatas fritas o ensalada',
    'menu.mains.i5.name': 'Chili con Carne',
    'menu.mains.i5.desc': 'Servido con arroz y tortilla',
    'menu.mains.i6.name': 'Pasta al Pesto',
    'menu.mains.i6.desc': 'Pesto fresco con albahaca, tomate cherry, queso feta y pasta con un toque de parmesano',

    'menu.curry.intro': 'Elaborados al auténtico estilo del norte de la India, todos servidos con pan naan y arroz.',
    'menu.curry.i1.name': 'Pollo Vindaloo',
    'menu.curry.i1.desc': 'Curry picante con patatas',
    'menu.curry.i2.name': 'Cordero Balti',
    'menu.curry.i2.desc': 'Curry medio con pimientos y cebolla',
    'menu.curry.i3.name': 'Dal Makhni',
    'menu.curry.i3.desc': 'Curry de lentejas cocido a fuego lento, medio',

    'menu.sandwiches.i1.name': 'Sándwich Fastnet',

    'menu.salads.i1.name': 'Ensalada César de Pollo',
    'menu.salads.i1.desc': 'Lechuga romana, picatostes, parmesano laminado, pollo a la plancha',
    'menu.salads.i2.name': 'Ensalada Griega',
    'menu.salads.i2.desc': 'Queso feta, pepino, tomate, cebolla roja, aceitunas',
    'menu.salads.i3.name': 'Ensalada de Pasta y Atún del Chef',
    'menu.salads.i3.desc': 'Atún, pepinillos, pasta, guisantes, apio, parmesano',

    'menu.burgers.i1.name': 'The Towering Fastnet',
    'menu.burgers.i1.desc': 'Cebolla caramelizada, champiñones, bacon, cheddar, hash browns, huevo frito, tomate',
    'menu.burgers.i2.name': 'Polly Burger',
    'menu.burgers.i2.desc': 'Pechuga de pollo marinada, bacon ahumado, cheddar, lechuga, cebolla, tomate',
    'menu.burgers.i3.name': 'The Fastnet Classic',
    'menu.burgers.i3.desc': 'Lechuga, cebolla, tomate, mayonesa',
    'menu.burgers.i4.name': 'The Lost Mexican',
    'menu.burgers.i4.desc': 'Queso azul, jalapeños, guacamole, lechuga, cebolla, tomate',
    'menu.burgers.i5.name': 'La Jolie Brie',
    'menu.burgers.i5.desc': 'Brie, bacon, cebolla caramelizada, chutney de champiñones, lechuga, tomate',
    'menu.burgers.i6.name': 'Bean Bang Burger',
    'menu.burgers.i6.desc': 'Hamburguesa vegetal de alubias negras, guacamole, lechuga, cebolla, tomate',

    'menu.smoothies.i1.name': 'Piña y Mango',
    'menu.smoothies.i2.name': 'Plátano y Fresa',
    'menu.smoothies.i3.name': 'Frambuesa',
    'menu.smoothies.i4.name': 'Arándanos',
    'menu.smoothies.i5.name': 'Mango y Frambuesa',
    'menu.smoothies.i6.name': 'Añadir Vodka',

    'menu.desserts.i1.name': 'Tarta de Chocolate Fudge',

    'gallery.eyebrow': 'The Fastnet, en Imágenes',
    'gallery.title': 'Un Vistazo por Dentro',
    'gallery.insta': 'Síguenos en @thefastnet_barcelona',
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
    'menu.item.confirm': 'Pregunta al nostre equip pels detalls',
    'menu.tag.share': 'Per Compartir',

    'menu.tapas.i1.name': "Taula d'Embotits i Formatges",
    'menu.tapas.i2.name': 'Nachos amb Xili i Formatge',
    'menu.tapas.i3.name': 'Ales de Pollastre Fumades',
    'menu.tapas.i4.name': 'Ales de Pollastre Fregides Picants',
    'menu.tapas.i5.name': 'Anelles de Calamar Arrebossades',
    'menu.tapas.i6.name': 'Gaspatxo',
    'menu.tapas.i7.name': 'Pa amb Tomàquet',
    'menu.tapas.i8.name': 'Patates Braves',
    'menu.tapas.i9.name': 'Amanida Verda',
    'menu.tapas.i10.name': 'Patates Fregides',
    'menu.tapas.i11.name': 'Olives',

    'menu.mains.i1.name': "Taula de Tapes d'Estiu",
    'menu.mains.i1.desc': 'Anelles de calamar, trossos de peix arrebossat, braves i pa amb tomàquet',
    'menu.mains.i2.name': 'Hamburguesa en Bol',
    'menu.mains.i2.desc': "Hamburguesa de vedella o de pollastre, amb una amanida fresca del xef",
    'menu.mains.i3.name': 'Fish &amp; Chips',
    'menu.mains.i3.desc': 'Bacallà arrebossat, pèsols triturats, patates fregides i salsa tàrtara',
    'menu.mains.i4.name': 'Lasanya (de Carn o Vegetal)',
    'menu.mains.i4.desc': 'Servida amb patates fregides o amanida',
    'menu.mains.i5.name': 'Chili con Carne',
    'menu.mains.i5.desc': 'Servit amb arròs i tortilla',
    'menu.mains.i6.name': 'Pasta al Pesto',
    'menu.mains.i6.desc': 'Pesto fresc amb alfàbrega, tomàquet cherry, formatge feta i pasta amb un toc de parmesà',

    'menu.curry.intro': "Elaborats a l'autèntic estil del nord de l'Índia, tots servits amb pa naan i arròs.",
    'menu.curry.i1.name': 'Pollastre Vindaloo',
    'menu.curry.i1.desc': 'Curri picant amb patates',
    'menu.curry.i2.name': 'Xai Balti',
    'menu.curry.i2.desc': 'Curri mitjà amb pebrots i ceba',
    'menu.curry.i3.name': 'Dal Makhni',
    'menu.curry.i3.desc': 'Curri de llenties cuit a foc lent, mitjà',

    'menu.sandwiches.i1.name': 'Entrepà Fastnet',

    'menu.salads.i1.name': 'Amanida Cèsar de Pollastre',
    'menu.salads.i1.desc': 'Enciam romà, torradetes, parmesà laminat, pollastre a la planxa',
    'menu.salads.i2.name': 'Amanida Grega',
    'menu.salads.i2.desc': 'Formatge feta, cogombre, tomàquet, ceba vermella, olives',
    'menu.salads.i3.name': 'Amanida de Pasta i Tonyina del Xef',
    'menu.salads.i3.desc': 'Tonyina, cogombrets, pasta, pèsols, api, parmesà',

    'menu.burgers.i1.name': 'The Towering Fastnet',
    'menu.burgers.i1.desc': 'Ceba caramel·litzada, xampinyons, bacon, cheddar, hash browns, ou fregit, tomàquet',
    'menu.burgers.i2.name': 'Polly Burger',
    'menu.burgers.i2.desc': 'Pit de pollastre marinat, bacon fumat, cheddar, enciam, ceba, tomàquet',
    'menu.burgers.i3.name': 'The Fastnet Classic',
    'menu.burgers.i3.desc': 'Enciam, ceba, tomàquet, maionesa',
    'menu.burgers.i4.name': 'The Lost Mexican',
    'menu.burgers.i4.desc': 'Formatge blau, jalapenys, guacamole, enciam, ceba, tomàquet',
    'menu.burgers.i5.name': 'La Jolie Brie',
    'menu.burgers.i5.desc': 'Brie, bacon, ceba caramel·litzada, chutney de xampinyons, enciam, tomàquet',
    'menu.burgers.i6.name': 'Bean Bang Burger',
    'menu.burgers.i6.desc': 'Hamburguesa vegetal de mongetes negres, guacamole, enciam, ceba, tomàquet',

    'menu.smoothies.i1.name': 'Pinya i Mango',
    'menu.smoothies.i2.name': 'Plàtan i Maduixa',
    'menu.smoothies.i3.name': 'Gerd',
    'menu.smoothies.i4.name': 'Nabius',
    'menu.smoothies.i5.name': 'Mango i Gerd',
    'menu.smoothies.i6.name': 'Afegir Vodka',

    'menu.desserts.i1.name': 'Pastís de Xocolata Fudge',

    'gallery.eyebrow': 'The Fastnet, en Imatges',
    'gallery.title': "Un Cop d'Ull per Dins",
    'gallery.insta': 'Segueix-nos a @thefastnet_barcelona',
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
