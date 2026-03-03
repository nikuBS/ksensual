import type { Locale } from '../i18n/locales'
import type { EventMeta, Highlight, TicketTier } from './event'

type ContactContent = {
  email: string
  instagramUrl: string
  etc: string
  formLabels: {
    name: string
    email: string
    message: string
    submit: string
    success: string
    invalidEmail: string
  }
}

type VenueContent = {
  address: string
  transport: string[]
  shuttle: string
  hotels: string[]
  mapUrl: string
}

type LocalizedContent = {
  eventMeta: EventMeta
  highlights: Highlight[]
  tickets: TicketTier[]
  faq: Array<{ q: string; a: string }>
  contact: ContactContent
  venue: VenueContent
}

const baseHero = {
  title: 'K-SENSUAL',
  startDateISO: '2026-07-10T16:00:00+09:00',
  endDateISO: '2026-07-12T23:00:00+09:00',
  venueName: 'Iho Coastal Festival Grounds',
  heroPoster: `${import.meta.env.BASE_URL}placeholders/jeju-main-poster.jpg`,
  heroPosterMobile: `${import.meta.env.BASE_URL}placeholders/jeju-main-poster-mobile.jpg`,
  heroPosterAlt: 'K-SENSUAL 10th Anniversary poster, July 10-12 2026, Jeju Island Korea',
}

const commonVenue = {
  mapUrl: 'https://maps.google.com/?q=33,+Hyeonsa-gil,+Jeju-si,+Jeju-do',
}

const byLocale: Record<Locale, LocalizedContent> = {
  en: {
    eventMeta: {
      ...baseHero,
      subtitle: '10th Anniversary',
      dateRangeText: 'July 10-12, 2026',
      cityCountry: 'Jeju Island, Korea',
      heroCopy: 'K-SENSUAL 10th Anniversary in the Korean Maldives: ocean breeze stages, summer dance nights, and global artists in Jeju.',
      ctas: [
        { label: 'Tickets', to: '/tickets' },
        { label: 'Line-up', to: '/artists' },
      ],
    },
    highlights: [
      { icon: 'Sparkles', title: 'Immersive Stages', desc: '3 themed stages with synchronized light storytelling.' },
      { icon: 'Music2', title: 'Global Artists', desc: 'Artist showcases, social dance sets, and curated DJ sessions.' },
      { icon: 'Train', title: 'Easy Access', desc: 'Airport and downtown routes with late-night return options.' },
      { icon: 'Hotel', title: 'Partner Hotels', desc: 'Stay options near Iho coast and Jeju city center.' },
      { icon: 'UtensilsCrossed', title: 'Summer Food Zone', desc: 'Curated Jeju bites, drinks, and chill spaces.' },
      { icon: 'ShieldCheck', title: 'Safe Experience', desc: 'On-site support desk, first aid, and guest assistance.' },
    ],
    tickets: [
      { id: 'starter', name: 'Starter Pass', priceText: '$129', includes: ['One-day entry', 'General zone access', 'Official mobile guide'], note: 'Limited inventory for early buyers.' },
      { id: 'weekend', name: 'Weekend Pass', priceText: '$289', badge: 'Best Value', includes: ['All 3 days access', 'Priority entry lane', 'Shuttle pass', 'Gallery zone access'], note: 'Most popular tier.' },
      { id: 'vip', name: 'VIP Aura', priceText: '$499', badge: 'Premium', includes: ['All weekend access', 'VIP deck access', 'Dedicated bar', 'Artist Q&A lottery'], note: '21+ for premium beverage service.' },
      { id: 'crew', name: 'Group 4 Pack', priceText: '$960', includes: ['Weekend entry x4', 'Fast track entry', 'Shared concierge desk'], note: 'Single checkout with four attendee names required.' },
    ],
    faq: [
      { q: 'Is K-SENSUAL an all-ages event?', a: 'Entry is 19+ for all attendees. Government-issued ID is required at check-in.' },
      { q: 'Can I re-enter after leaving the venue?', a: 'Yes. Re-entry is allowed until 2:00 AM with a valid wristband and ticket.' },
      { q: 'Are there lockers on-site?', a: 'Yes, paid lockers are available near Gate B and can be booked on arrival.' },
      { q: 'What payment methods are accepted?', a: 'Card, NFC mobile payment, and selected local wallets are accepted in all zones.' },
      { q: 'Can I transfer my ticket?', a: 'Ticket transfer is available up to 48 hours before event start through your ticket account.' },
      { q: 'Is outside food allowed?', a: 'Outside food is not permitted except for medically required dietary items.' },
      { q: 'How do shuttle buses operate?', a: 'Shuttles run every 25 minutes from Jeju Airport and Tap-dong from 3 PM to 3 AM.' },
      { q: 'Where can I find lost and found?', a: 'Visit the Contact Desk beside the main entrance during operating hours.' },
      { q: 'Are photo and video cameras allowed?', a: 'Small personal cameras are allowed. Professional rigs require media approval.' },
      { q: 'Will sessions be recorded?', a: 'Selected sessions are recorded and uploaded within two weeks.' },
    ],
    contact: {
      email: 'hello@k-sensual.com',
      instagramUrl: 'https://instagram.com/ksensual_official',
      etc: 'For partner inquiries, include your brand profile and expected attendance.',
      formLabels: {
        name: 'Your Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send Inquiry',
        success: 'Your message has been sent. Our team will reply within 48 hours.',
        invalidEmail: 'Please enter a valid email format.',
      },
    },
    venue: {
      ...commonVenue,
      address: '33, Hyeonsa-gil, Ihoil-dong, Jeju-si, Jeju-do, Republic of Korea',
      transport: ['Jeju Int’l Airport → venue taxi approx. 15 min', 'Airport limousine + short walk via Iho coast road'],
      shuttle: 'Shuttle runs every 25 minutes from Jeju Airport and downtown hubs.',
      hotels: ['Iho Breeze Hotel (7 min)', 'Aewol Coast Stay (14 min)', 'Jeju Harbor Suites (16 min)'],
    },
  },
  ko: {
    eventMeta: {
      ...baseHero,
      subtitle: '10주년',
      dateRangeText: '2026년 7월 10-12일',
      cityCountry: '제주, 대한민국',
      heroCopy: '한국의 몰디브 제주에서 열리는 K-SENSUAL 10주년. 바다 바람이 흐르는 무대와 여름 밤의 퍼포먼스를 만나보세요.',
      ctas: [
        { label: '티켓', to: '/tickets' },
        { label: '라인업', to: '/artists' },
      ],
    },
    highlights: [
      { icon: 'Sparkles', title: '몰입형 스테이지', desc: '감각적인 연출이 결합된 3개 테마 스테이지.' },
      { icon: 'Music2', title: '글로벌 아티스트', desc: '메인 댄서 쇼케이스와 DJ 세션을 함께 경험.' },
      { icon: 'Train', title: '편리한 이동', desc: '공항·도심 연계 동선과 야간 귀가 옵션 제공.' },
      { icon: 'Hotel', title: '제휴 숙소', desc: '이호 해안과 제주시 중심 인근 숙박 옵션.' },
      { icon: 'UtensilsCrossed', title: '서머 푸드존', desc: '제주 감성의 푸드와 드링크, 휴식 공간 구성.' },
      { icon: 'ShieldCheck', title: '안전 운영', desc: '현장 지원 데스크, 응급 대응, 안내 인력 운영.' },
    ],
    tickets: [
      { id: 'starter', name: '스타터 패스', priceText: '$129', includes: ['1일 입장', '일반 구역 이용', '모바일 가이드 제공'], note: '얼리 구매 수량 한정.' },
      { id: 'weekend', name: '위켄드 패스', priceText: '$289', badge: '인기', includes: ['3일 전체 입장', '우선 입장 라인', '셔틀 패스', '갤러리 존 이용'], note: '가장 많이 선택되는 티어.' },
      { id: 'vip', name: 'VIP Aura', priceText: '$499', badge: '프리미엄', includes: ['주말 전체 입장', 'VIP 덱 이용', '전용 바', '아티스트 Q&A 추첨'], note: '프리미엄 주류 서비스는 21세 이상.' },
      { id: 'crew', name: '4인 그룹 패스', priceText: '$960', includes: ['주말 입장 4인', '패스트 트랙 입장', '공용 컨시어지'], note: '결제 시 4인 정보 등록 필요.' },
    ],
    faq: [
      { q: 'K-SENSUAL은 연령 제한이 있나요?', a: '만 19세 이상 입장 가능하며, 신분증 확인이 필요합니다.' },
      { q: '재입장이 가능한가요?', a: '네, 유효한 손목밴드와 티켓이 있으면 오전 2시까지 재입장 가능합니다.' },
      { q: '락커가 있나요?', a: '게이트 B 근처 유료 락커를 현장에서 이용할 수 있습니다.' },
      { q: '결제 수단은 무엇인가요?', a: '카드, NFC 간편결제 및 일부 로컬 월렛을 지원합니다.' },
      { q: '티켓 양도가 가능한가요?', a: '행사 시작 48시간 전까지 티켓 계정에서 양도할 수 있습니다.' },
      { q: '외부 음식 반입이 가능한가요?', a: '의료 목적 식품을 제외한 외부 음식 반입은 제한됩니다.' },
      { q: '셔틀은 어떻게 운영되나요?', a: '제주공항·탑동 기준 25분 간격으로 15시~03시 운영됩니다.' },
      { q: '분실물은 어디에서 찾나요?', a: '메인 입구 옆 안내 데스크에서 운영 시간 내 확인 가능합니다.' },
      { q: '촬영 장비 반입이 가능한가요?', a: '개인 소형 카메라는 가능하며, 전문 장비는 사전 승인 필요.' },
      { q: '세션 녹화본이 제공되나요?', a: '일부 세션은 녹화 후 2주 내 업로드됩니다.' },
    ],
    contact: {
      email: 'hello@k-sensual.com',
      instagramUrl: 'https://instagram.com/ksensual_official',
      etc: '파트너 제안 시 브랜드 소개와 예상 참여 인원을 함께 전달해 주세요.',
      formLabels: {
        name: '이름',
        email: '이메일',
        message: '문의 내용',
        submit: '문의 보내기',
        success: '문의가 접수되었습니다. 48시간 내 답변드리겠습니다.',
        invalidEmail: '올바른 이메일 형식을 입력해 주세요.',
      },
    },
    venue: {
      ...commonVenue,
      address: '대한민국 제주특별자치도 제주시 이호일동 1812-7 (33, Hyeonsa-gil)',
      transport: ['제주공항 → 행사장 택시 약 15분', '공항 리무진 + 이호 해안 도보 이동'],
      shuttle: '제주공항/도심 주요 지점에서 25분 간격 셔틀 운행.',
      hotels: ['이호 브리즈 호텔 (7분)', '애월 코스트 스테이 (14분)', '제주 하버 스위트 (16분)'],
    },
  },
  es: {
    eventMeta: {
      ...baseHero,
      subtitle: '10º Aniversario',
      dateRangeText: '10-12 de julio, 2026',
      cityCountry: 'Isla de Jeju, Corea',
      heroCopy: 'K-SENSUAL 10º Aniversario en el “Maldivas de Corea”: escenarios con brisa marina, noches de verano y artistas globales.',
      ctas: [
        { label: 'Entradas', to: '/tickets' },
        { label: 'Line-up', to: '/artists' },
      ],
    },
    highlights: [
      { icon: 'Sparkles', title: 'Escenarios inmersivos', desc: 'Tres escenarios temáticos con narrativa visual y sonora.' },
      { icon: 'Music2', title: 'Artistas globales', desc: 'Showcases de bailarines principales y sesiones DJ curadas.' },
      { icon: 'Train', title: 'Acceso sencillo', desc: 'Conexión desde aeropuerto y zonas céntricas con regreso nocturno.' },
      { icon: 'Hotel', title: 'Hoteles asociados', desc: 'Opciones de alojamiento cerca de la costa de Iho y Jeju city.' },
      { icon: 'UtensilsCrossed', title: 'Zona food de verano', desc: 'Comida y bebidas seleccionadas con ambiente relajado.' },
      { icon: 'ShieldCheck', title: 'Experiencia segura', desc: 'Punto de soporte, primeros auxilios y atención al visitante.' },
    ],
    tickets: [
      { id: 'starter', name: 'Starter Pass', priceText: '$129', includes: ['Entrada 1 día', 'Acceso zona general', 'Guía móvil oficial'], note: 'Cupo limitado para compra temprana.' },
      { id: 'weekend', name: 'Weekend Pass', priceText: '$289', badge: 'Más elegido', includes: ['Acceso 3 días', 'Fila de entrada prioritaria', 'Pase de shuttle', 'Acceso zona galería'], note: 'La opción más popular.' },
      { id: 'vip', name: 'VIP Aura', priceText: '$499', badge: 'Premium', includes: ['Acceso completo fin de semana', 'Deck VIP', 'Bar dedicado', 'Sorteo Q&A con artistas'], note: 'Servicio premium de bebidas para mayores de 21.' },
      { id: 'crew', name: 'Pack grupo x4', priceText: '$960', includes: ['Entrada de fin de semana x4', 'Acceso fast track', 'Conserjería compartida'], note: 'Se requieren datos de 4 asistentes al pagar.' },
    ],
    faq: [
      { q: '¿K-SENSUAL tiene restricción de edad?', a: 'El acceso es para mayores de 19 años con identificación oficial.' },
      { q: '¿Se permite reingreso?', a: 'Sí, hasta las 2:00 AM con pulsera y entrada válidas.' },
      { q: '¿Hay lockers en el lugar?', a: 'Sí, lockers de pago disponibles cerca de la puerta B.' },
      { q: '¿Qué métodos de pago aceptan?', a: 'Tarjetas, pagos NFC y algunas billeteras locales.' },
      { q: '¿Puedo transferir mi entrada?', a: 'Sí, hasta 48 horas antes del inicio desde tu cuenta de entradas.' },
      { q: '¿Se permite comida externa?', a: 'Solo alimentos por requerimientos médicos están permitidos.' },
      { q: '¿Cómo funciona el shuttle?', a: 'Cada 25 minutos desde aeropuerto de Jeju y Tap-dong, de 3 PM a 3 AM.' },
      { q: '¿Dónde está objetos perdidos?', a: 'En el escritorio de atención junto a la entrada principal.' },
      { q: '¿Se permiten cámaras?', a: 'Cámaras personales pequeñas sí; equipo profesional requiere aprobación.' },
      { q: '¿Habrá grabaciones de sesiones?', a: 'Algunas sesiones se publican dentro de dos semanas.' },
    ],
    contact: {
      email: 'hello@k-sensual.com',
      instagramUrl: 'https://instagram.com/ksensual_official',
      etc: 'Para alianzas, incluye perfil de marca y aforo estimado.',
      formLabels: {
        name: 'Nombre',
        email: 'Correo',
        message: 'Mensaje',
        submit: 'Enviar consulta',
        success: 'Tu mensaje fue enviado. Te responderemos en 48 horas.',
        invalidEmail: 'Introduce un formato de correo válido.',
      },
    },
    venue: {
      ...commonVenue,
      address: '33, Hyeonsa-gil, Ihoil-dong, Jeju-si, Jeju-do, República de Corea',
      transport: ['Aeropuerto de Jeju → taxi al venue aprox. 15 min', 'Limusina de aeropuerto + breve caminata por costa Iho'],
      shuttle: 'Shuttle cada 25 minutos desde aeropuerto y zonas céntricas.',
      hotels: ['Iho Breeze Hotel (7 min)', 'Aewol Coast Stay (14 min)', 'Jeju Harbor Suites (16 min)'],
    },
  },
}

export function getLocalizedContent(locale: Locale): LocalizedContent {
  return byLocale[locale]
}
