import type { Locale } from './locales'

export const messages: Record<
  Locale,
  {
    language: string
    nav: { home: string; artists: string; tickets: string; faq: string }
    sections: {
      highlightsTitle: string
      highlightsSubtitle: string
      lineupTitle: string
      lineupSubtitle: string
      scheduleTitle: string
      scheduleSubtitle: string
      ticketsTitle: string
      ticketsSubtitle: string
      galleryTitle: string
      gallerySubtitle: string
      faqTitle: string
      faqSubtitle: string
      contactTitle: string
      contactSubtitle: string
      venueTitle: string
      venueSubtitle: string
      moreQuestions: string
    }
    common: {
      seeAllArtists: string
      ticketsPage: string
      viewAllFaq: string
      openMapUrl: string
      mapPlaceholder: string
      mapPlaceholderDesc: string
      address: string
      email: string
      transport: string
      hotels: string
      artistDetail: string
      galleryImage: string
      downloadIcs: string
      searchArtistName: string
      filterCategory: string
      all: string
      artist: string
      dj: string
      instagram: string
      countdownLoading: string
      countdownStartsIn: string
      selectDayTabLabel: string
      day: string
    }
  }
> = {
  en: {
    language: 'Language',
    nav: { home: 'Home', artists: 'Artists', tickets: 'Tickets', faq: 'FAQ' },
    sections: {
      highlightsTitle: 'Highlights',
      highlightsSubtitle: 'A premium yet approachable festival journey, crafted for discovery.',
      lineupTitle: 'Line-up',
      lineupSubtitle: 'Genre-diverse artists across live showcases and late-night sets.',
      scheduleTitle: 'Schedule',
      scheduleSubtitle: 'Select a day and export that day into your calendar.',
      ticketsTitle: 'Tickets',
      ticketsSubtitle: 'Choose your access tier. Taxes and processing fees are shown at checkout.',
      galleryTitle: 'Gallery',
      gallerySubtitle: 'Snapshots of stage design, crowd moments, and sensory details.',
      faqTitle: 'FAQ',
      faqSubtitle: 'Quick answers for planning your K-SENSUAL weekend.',
      contactTitle: 'Contact',
      contactSubtitle: 'Questions, partnerships, and accessibility requests.',
      venueTitle: 'Venue',
      venueSubtitle: 'Plan your route and stay near the festival district.',
      moreQuestions: 'More Questions?',
    },
    common: {
      seeAllArtists: 'See all artists',
      ticketsPage: 'Tickets page',
      viewAllFaq: 'View all FAQ',
      openMapUrl: 'Open Map URL',
      mapPlaceholder: 'Map Placeholder',
      mapPlaceholderDesc: 'Replace this box with an embedded map iframe if needed. External URL is already prepared.',
      address: 'Address',
      email: 'Email',
      transport: 'Transport',
      hotels: 'Hotels',
      artistDetail: 'Artist detail',
      galleryImage: 'Gallery image',
      downloadIcs: 'Download ICS',
      searchArtistName: 'Search artist name',
      filterCategory: 'Filter by category',
      all: 'All',
      artist: 'Artist',
      dj: 'Dj',
      instagram: 'Instagram',
      countdownLoading: 'Loading countdown...',
      countdownStartsIn: 'Starts in',
      selectDayTabLabel: 'Day tabs',
      day: 'Day',
    },
  },
  ko: {
    language: '언어',
    nav: { home: '홈', artists: '아티스트', tickets: '티켓', faq: 'FAQ' },
    sections: {
      highlightsTitle: '하이라이트',
      highlightsSubtitle: '프리미엄 무드와 접근성을 함께 담은 페스티벌 경험입니다.',
      lineupTitle: '라인업',
      lineupSubtitle: '라이브 쇼케이스와 나이트 세트를 아우르는 아티스트 라인업.',
      scheduleTitle: '스케줄',
      scheduleSubtitle: '날짜를 선택하고 해당 날짜 일정만 캘린더로 저장하세요.',
      ticketsTitle: '티켓',
      ticketsSubtitle: '원하는 티어를 선택하세요. 세금 및 수수료는 결제 단계에서 확인됩니다.',
      galleryTitle: '갤러리',
      gallerySubtitle: '무대 연출, 관객 분위기, 감각적인 순간들을 담았습니다.',
      faqTitle: 'FAQ',
      faqSubtitle: 'K-SENSUAL 주말을 준비하기 위한 핵심 안내입니다.',
      contactTitle: '문의',
      contactSubtitle: '문의, 파트너십, 접근성 요청을 남겨주세요.',
      venueTitle: '장소',
      venueSubtitle: '오시는 길과 주변 숙소 정보를 확인하세요.',
      moreQuestions: '추가 문의가 있나요?',
    },
    common: {
      seeAllArtists: '전체 아티스트 보기',
      ticketsPage: '티켓 페이지',
      viewAllFaq: 'FAQ 전체 보기',
      openMapUrl: '지도 링크 열기',
      mapPlaceholder: '지도 자리 표시',
      mapPlaceholderDesc: '필요 시 이 영역을 지도 iframe으로 교체하세요. 외부 URL은 준비되어 있습니다.',
      address: '주소',
      email: '이메일',
      transport: '교통',
      hotels: '호텔',
      artistDetail: '아티스트 상세',
      galleryImage: '갤러리 이미지',
      downloadIcs: 'ICS 다운로드',
      searchArtistName: '아티스트 이름 검색',
      filterCategory: '카테고리 필터',
      all: '전체',
      artist: '아티스트',
      dj: '디제이',
      instagram: '인스타그램',
      countdownLoading: '카운트다운 로딩 중...',
      countdownStartsIn: '시작까지',
      selectDayTabLabel: '요일 탭',
      day: 'DAY',
    },
  },
  es: {
    language: 'Idioma',
    nav: { home: 'Inicio', artists: 'Artistas', tickets: 'Entradas', faq: 'FAQ' },
    sections: {
      highlightsTitle: 'Destacados',
      highlightsSubtitle: 'Una experiencia de festival premium y accesible para descubrir.',
      lineupTitle: 'Line-up',
      lineupSubtitle: 'Artistas diversos entre showcases en vivo y sets nocturnos.',
      scheduleTitle: 'Horario',
      scheduleSubtitle: 'Selecciona un día y exporta ese día a tu calendario.',
      ticketsTitle: 'Entradas',
      ticketsSubtitle: 'Elige tu nivel de acceso. Impuestos y comisiones se muestran al pagar.',
      galleryTitle: 'Galería',
      gallerySubtitle: 'Escenas del escenario, energía del público y detalles sensoriales.',
      faqTitle: 'FAQ',
      faqSubtitle: 'Respuestas rápidas para planear tu fin de semana K-SENSUAL.',
      contactTitle: 'Contacto',
      contactSubtitle: 'Consultas, alianzas y solicitudes de accesibilidad.',
      venueTitle: 'Lugar',
      venueSubtitle: 'Planifica tu ruta y opciones de estancia cerca del festival.',
      moreQuestions: '¿Más preguntas?',
    },
    common: {
      seeAllArtists: 'Ver todos los artistas',
      ticketsPage: 'Página de entradas',
      viewAllFaq: 'Ver FAQ completa',
      openMapUrl: 'Abrir mapa',
      mapPlaceholder: 'Espacio del mapa',
      mapPlaceholderDesc: 'Puedes reemplazar este bloque por un iframe de mapa. La URL externa ya está lista.',
      address: 'Dirección',
      email: 'Correo',
      transport: 'Transporte',
      hotels: 'Hoteles',
      artistDetail: 'Detalle del artista',
      galleryImage: 'Imagen de galería',
      downloadIcs: 'Descargar ICS',
      searchArtistName: 'Buscar nombre de artista',
      filterCategory: 'Filtrar por categoría',
      all: 'Todo',
      artist: 'Artista',
      dj: 'Dj',
      instagram: 'Instagram',
      countdownLoading: 'Cargando cuenta regresiva...',
      countdownStartsIn: 'Comienza en',
      selectDayTabLabel: 'Pestañas de día',
      day: 'Día',
    },
  },
}
