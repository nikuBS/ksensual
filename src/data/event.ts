export type Socials = {
  instagram?: string
  youtube?: string
  website?: string
}

export type EventMeta = {
  title: string
  subtitle: string
  dateRangeText: string
  startDateISO: string
  endDateISO: string
  venueName: string
  cityCountry: string
  heroCopy: string
  heroPoster: string
  heroPosterAlt: string
  ctas: Array<{ label: string; to: string }>
}

export type Highlight = {
  icon: string
  title: string
  desc: string
}

export type Artist = {
  id: string
  name: string
  roles: string[]
  styles: string[]
  country?: string
  image: string
  bio: string
  socials: Socials
}

export type ScheduleDay = {
  dayId: string
  label: string
  dateISO: string
  sessions: Array<{
    time: string
    title: string
    type: string
    location?: string
    hosts?: string[]
  }>
}

export type TicketTier = {
  id: string
  name: string
  priceText: string
  badge?: string
  includes: string[]
  note?: string
}

const assetBase = import.meta.env.BASE_URL

export const eventMeta: EventMeta = {
  title: 'K-SENSUAL',
  subtitle: '10th Anniversary',
  dateRangeText: 'July 10-12, 2026',
  startDateISO: '2026-07-10T16:00:00+09:00',
  endDateISO: '2026-07-12T23:00:00+09:00',
  venueName: 'Iho Coastal Festival Grounds',
  cityCountry: 'Jeju Island, Korea',
  heroCopy:
    'K-SENSUAL 10th Anniversary in the Korean Maldives: ocean breeze stages, summer dance nights, and global artists in Jeju.',
  heroPoster: `${assetBase}placeholders/jeju-main-poster.jpg`,
  heroPosterAlt: 'K-SENSUAL 10th Anniversary poster, July 10-12 2026, Jeju Island Korea',
  ctas: [
    { label: 'Tickets', to: '/tickets' },
    { label: 'Line-up', to: '/artists' },
  ],
}

export const highlights: Highlight[] = [
  { icon: 'Sparkles', title: 'Immersive Stages', desc: '3 themed stages with synchronized light storytelling.' },
  { icon: 'Music2', title: '24 Curated Acts', desc: 'From deep house to alt-R&B selectors and live hybrid sets.' },
  { icon: 'Train', title: 'Late Night Shuttle', desc: 'Continuous city loops from station and downtown zones.' },
  { icon: 'Hotel', title: 'Partner Hotels', desc: 'Discounted stays within 10 minutes of the venue.' },
  { icon: 'UtensilsCrossed', title: 'Chef Pop-up Street', desc: 'Regional flavors and after-midnight tasting counters.' },
  { icon: 'ShieldCheck', title: 'Safe Experience', desc: 'On-site medics, multilingual support, and contact desk.' },
]

const artistSeeds: Array<[string, string, string[], string[], string]> = [
  ['ari-veil', 'Ari Veil', ['DJ', 'Producer'], ['Deep House', 'Organic'], 'KR'],
  ['nova-ray', 'Nova Ray', ['Vocal Live'], ['Alt-R&B', 'Soultronica'], 'US'],
  ['lumen-k', 'LUMEN K', ['Live Set'], ['Techno', 'Ambient'], 'DE'],
  ['shio', 'SHIO', ['DJ'], ['UK Garage', 'Bass'], 'JP'],
  ['mira-jo', 'Mira Jo', ['DJ'], ['Afro House', 'Tribal'], 'BR'],
  ['pulse-101', 'Pulse 101', ['Producer'], ['Electro', 'Breaks'], 'KR'],
  ['zenit', 'Zenit', ['Live Set'], ['Melodic Techno'], 'FR'],
  ['luna-rio', 'Luna Rio', ['Vocal Live'], ['Downtempo', 'Latin Electronica'], 'MX'],
  ['delta-min', 'Delta Min', ['DJ'], ['Progressive House'], 'AU'],
  ['hana-x', 'HANA X', ['DJ', 'Producer'], ['Minimal', 'Acid'], 'KR'],
  ['ito-sora', 'Ito Sora', ['Live Set'], ['IDM', 'Glitch'], 'JP'],
  ['calix', 'CALIX', ['DJ'], ['Trance', 'Peak Time'], 'NL'],
  ['sael', 'SAEL', ['Vocal Live'], ['Neo Soul', 'Electronica'], 'CA'],
  ['voidline', 'Voidline', ['DJ'], ['Industrial Techno'], 'SE'],
  ['mellow-jin', 'Mellow Jin', ['DJ'], ['Lo-fi House', 'Chill'], 'KR'],
  ['rune-park', 'Rune Park', ['Producer'], ['Cinematic Bass'], 'KR'],
  ['ivy-tone', 'Ivy Tone', ['Vocal Live'], ['Dream Pop', 'Future Beats'], 'GB'],
  ['kairo', 'KAIRO', ['DJ'], ['House', 'Disco'], 'ES'],
  ['mono-kid', 'Mono Kid', ['Live Set'], ['Synthwave', 'Nu Disco'], 'US'],
  ['echo-bin', 'Echo Bin', ['DJ'], ['Afro Tech', 'Percussive'], 'NG'],
]

export const artists: Artist[] = artistSeeds.map(([id, name, roles, styles, country], index) => ({
  id,
  name,
  roles,
  styles,
  country,
  image: `${assetBase}placeholders/artist-${(index % 8) + 1}.svg`,
  bio: `${name} crafts high-emotion sets with rhythm-focused transitions and cinematic crescendos tailored for large-scale stages.`,
  socials: {
    instagram: `https://instagram.com/${id.replace('-', '')}`,
    youtube: `https://youtube.com/@${id}`,
    website: `https://www.${id}.music`,
  },
}))

const sessionTitles = [
  'Gate Opening Soundscape',
  'Sunset Terrace Warm-up',
  'Deep Pulse Session',
  'Vocal Atmos Program',
  'Midnight Core Drive',
  'Live Hybrid Showcase',
  'Ambient Reset',
  'Warehouse Peak Hour',
  'Global Groove Circuit',
  'Closing Ritual',
  'Afterflow Lounge',
  'Late Motion Lab',
  'Neon Bassline Arc',
  'Analog Dream Module',
  'Sonic Dawn Finale',
]

const sessionTypes = ['Performance', 'Live', 'DJ Set', 'Talk', 'Workshop']
const locations = ['Prism Main', 'Harbor Stage', 'Wave Dome', 'Sky Lounge']

function makeDay(dayId: string, label: string, dateISO: string, offset: number): ScheduleDay {
  const sessions = Array.from({ length: 15 }, (_, i) => {
    const hour = 14 + Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return {
      time: `${String(hour).padStart(2, '0')}:${minute}`,
      title: sessionTitles[(i + offset) % sessionTitles.length],
      type: sessionTypes[(i + offset) % sessionTypes.length],
      location: locations[(i + offset) % locations.length],
      hosts: [artists[(i + offset) % artists.length].name],
    }
  })

  return { dayId, label, dateISO, sessions }
}

export const schedule: ScheduleDay[] = [
  makeDay('day-1', 'Day 1', '2026-07-10', 0),
  makeDay('day-2', 'Day 2', '2026-07-11', 5),
  makeDay('day-3', 'Day 3', '2026-07-12', 10),
]

export const tickets: TicketTier[] = [
  {
    id: 'starter',
    name: 'Starter Pass',
    priceText: '$129',
    includes: ['One-day entry', 'Public zone access', 'Official mobile guide'],
    note: 'Limited inventory for early buyers.',
  },
  {
    id: 'weekend',
    name: 'Weekend Pass',
    priceText: '$289',
    badge: 'Best Value',
    includes: ['All 3 days access', 'Priority entry lane', 'Gallery zone access', 'Shuttle pass'],
    note: 'Most popular tier.',
  },
  {
    id: 'vip',
    name: 'VIP Aura',
    priceText: '$499',
    badge: 'Premium',
    includes: ['Weekend Pass features', 'VIP deck', 'Dedicated bar', 'Artist Q&A lottery'],
    note: '21+ for premium beverage service.',
  },
  {
    id: 'crew',
    name: 'Group 4 Pack',
    priceText: '$960',
    includes: ['Weekend entry x4', 'Fast track entry', 'Shared concierge desk'],
    note: 'Single checkout with four attendee names required.',
  },
]

export const faq = [
  { q: 'Is K-SENSUAL an all-ages event?', a: 'Entry is 19+ for all attendees. Government-issued ID is required at check-in.' },
  { q: 'Can I re-enter after leaving the venue?', a: 'Yes. Re-entry is allowed until 2:00 AM with a valid wristband and ticket.' },
  { q: 'Are there lockers on-site?', a: 'Yes, paid lockers are available near Gate B and can be booked on arrival.' },
  { q: 'What payment methods are accepted?', a: 'Card, NFC mobile payment, and selected local wallets are accepted in all zones.' },
  { q: 'Can I transfer my ticket?', a: 'Ticket transfer is available up to 48 hours before event start through your ticket account.' },
  { q: 'Is outside food allowed?', a: 'Outside food is not permitted except for medically required dietary items.' },
  { q: 'How do shuttle buses operate?', a: 'Shuttles run every 25 minutes from Jeju Airport and Tap-dong from 3 PM to 3 AM.' },
  { q: 'Where can I find lost and found?', a: 'Visit the Contact Desk beside the Prism Main entrance during operating hours.' },
  { q: 'Are photo and video cameras allowed?', a: 'Small personal cameras are allowed. Professional rigs require media approval.' },
  { q: 'Will sessions be recorded?', a: 'Selected talks and showcases are recorded and uploaded within two weeks.' },
]

export const gallery = Array.from({ length: 12 }, (_, index) => ({
  id: `gallery-${index + 1}`,
  src: `${assetBase}placeholders/gallery-${(index % 6) + 1}.svg`,
  alt: `K-SENSUAL scene ${index + 1}`,
}))

export const contact = {
  email: 'hello@k-sensual.com',
  instagramUrl: 'https://instagram.com/k_sensual',
  etc: 'For partner inquiries, include your brand profile and expected attendance.',
  formLabels: {
    name: 'Your Name',
    email: 'Email',
    message: 'Message',
    submit: 'Send Inquiry',
    success: 'Your message has been sent. Our team will reply within 48 hours.',
  },
}

export const venue = {
  address: '33, Hyeonsa-gil, Ihoil-dong, Jeju-si, Jeju-do, Republic of Korea',
  transport: ['Jeju Int’l Airport → venue taxi approx. 15 min', 'Airport limousine + short walk via Iho coast road'],
  shuttle: 'Shuttle runs every 25 minutes from Jeju Airport and downtown hubs.',
  hotels: ['Iho Breeze Hotel (7 min)', 'Aewol Coast Stay (14 min)', 'Jeju Harbor Suites (16 min)'],
  mapUrl: 'https://maps.google.com/?q=33,+Hyeonsa-gil,+Jeju-si,+Jeju-do',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Artists', to: '/artists' },
  { label: 'Tickets', to: '/tickets' },
  { label: 'FAQ', to: '/faq' },
]
