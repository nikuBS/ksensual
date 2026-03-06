import { assetPath } from '../lib/assets'

export type Socials = {
  instagram?: string
  youtube?: string
  website?: string
}

export type GuestRegion = 'DOMESTIC' | 'INTERNATIONAL'

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
  heroPosterMobile: string
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
  category: ArtistCategory
  guestRegion?: GuestRegion
  image: string
  bio: string
  socials: Socials
}

export type ArtistCategory = 'DJ' | 'ARTIST' | 'GUEST' | 'GUEST_ARTIST' | 'MEDIA'

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
  heroPoster: assetPath('placeholders/jeju-main-poster.jpg'),
  heroPosterMobile: assetPath('placeholders/jeju-main-poster-mobile.jpg'),
  heroPosterAlt: 'K-SENSUAL 10th Anniversary poster, July 10-12 2026, Jeju Island Korea',
  ctas: [
    { label: 'Line-up', to: '/lineup' },
    { label: 'Tickets', to: '/tickets' },
    { label: 'Venue', to: '/venue' },
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

const artistSeeds: Array<[string, string, ArtistCategory, GuestRegion?]> = [
  ['cristian-gabriella', 'CRISTIAN & GABRIELLA', 'ARTIST'],
  ['klau-los', 'KLAU & LOS', 'ARTIST'],
  ['carlos-paz', 'CARLOS & PAZ', 'ARTIST'],
  ['evelyn-la-negra', 'EVELYN LA NEGRA', 'ARTIST'],
  ['dario-sara', 'DARIO & SARA', 'ARTIST'],
  ['sorish-elise', 'SORISH & ELISE', 'ARTIST'],
  ['masa-polina', 'MASA & POLINA', 'ARTIST'],
  ['xi-alina', 'XI & ALINA', 'ARTIST'],
  ['valentino-umi', 'VALENTINO & UMI', 'ARTIST'],
  ['juangoong-yoni', 'JUANGOONG & YONI', 'ARTIST'],
  ['dj-alejandro', 'DJ ALEJANDRO', 'DJ'],
  ['dj-toxica', 'DJ TOXICA', 'DJ'],
  ['dj-ashish', 'DJ ASHISH', 'DJ'],
  ['ga-ace', 'ACE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-amanda', 'AMANDA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-andre', 'ANDRE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-arie', 'ARIE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-becky', 'BECKY', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-boram', 'BORAM', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-cola-susie', 'COLA Y SUSIE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-daewoo-dream', 'DAEWOO Y DREAM', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-dancing-king-queen', 'DANCING KING Y DANCING QUEEN', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-dang-yi', 'DANG YI', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-dorothy', 'DOROTHY', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-fairy', 'FAIRY', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-gold', 'GOLD', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-happynyang-ez', 'HAPPYNYANG Y EZ', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-hug-may', 'HUG Y MAY', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-jessica', 'JESSICA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-khan', 'KHAN', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-klui-dalla', 'KLUI Y DALLA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-logan-bk', 'LOGAN Y BK', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-lui', 'LUI', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-mila', 'MILA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-min-yong', 'MIN YONG', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-mongu-raffle', 'MONGU Y RAFFLE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-rony', 'RONY', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-ryuji', 'RYUJI', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-salsal-sage', 'SALSAL Y SAGE', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-sarah', 'SARAH', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-shanna', 'SHANNA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-sparrow-bella', 'SPARROW Y BELLA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-stella', 'STELLA', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-summerhill', 'SUMMERHILL', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-sunghoney-mj', 'SUNGHONEY & MJ', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-tiamo', 'TIAMO', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-vani', 'VANI', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-scarllet', 'SCARLLET', 'GUEST_ARTIST', 'DOMESTIC'],
  ['ga-adrian-sheri', 'ADRIAN & SHERI', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-andrew', 'ANDREW', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-brenda', 'BRENDA', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-chuu', 'CHUU', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-corrine', 'CORRINE', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-flora', 'FLORA', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-grace-show', 'GRACE & SHOW', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-joel', 'JOEL', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-natsuki', 'NATSUKI', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-patty', 'PATTY', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-pinky', 'PINKY', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['ga-carlito', 'CARLITO', 'GUEST_ARTIST', 'INTERNATIONAL'],
  ['dk-media', 'DK', 'MEDIA'],
  ['jay-style-media', 'JAY STYLE', 'MEDIA'],
  ['kyrie-tws-media', 'KYRIE TWS', 'MEDIA'],
  ['macpan-media', 'MACPAN', 'MEDIA'],
]

let dancerImageOrder = 0
let djImageOrder = 0
let guestDomesticImageOrder = 0
let guestInternationalImageOrder = 0
let mediaImageOrder = 0
const domesticGuestArtistImageFiles = [
  'ga-1.jpg', 'ga-2.jpg', 'ga-3.jpg', 'ga-4.png', 'ga-5.jpg', 'ga-6.png', 'ga-7.jpg', 'ga-8.jpg', 'ga-9.jpg',
  'ga-10.jpg', 'ga-11.jpg', 'ga-12.png', 'ga-13.jpg', 'ga-14.png', 'ga-15.jpg', 'ga-16.jpg', 'ga-17.jpg', 'ga-18.jpg',
  'ga-19.jpg', 'ga-20.png', 'ga-21.jpg', 'ga-22.jpg', 'ga-23.jpg', 'ga-24.jpg', 'ga-25.jpg', 'ga-26.jpg', 'ga-27.png',
  'ga-28.jpg', 'ga-29.jpg', 'ga-30.jpg', 'ga-31.jpg', 'ga-32.jpg', 'ga-33.jpg', 'ga-34.jpg', 'ga-35.png',
]
const internationalGuestArtistImageFiles = [
  'ga-36.jpg', 'ga-37.jpg', 'ga-38.jpg', 'ga-39.jpg', 'ga-40.jpg', 'ga-41.jpg', 'ga-42.png', 'ga-43.jpg', 'ga-44.jpg',
  'ga-45.png', 'ga-46.jpg', 'ga-47.jpg',
]
const mediaImageFiles = ['md-1.png', 'md-2.jpg', 'md-3.jpg', 'md-4.jpg']

export const artists: Artist[] = artistSeeds.map(([id, name, category, guestRegion]) => {
  let image: string
  if (category === 'ARTIST' && dancerImageOrder < 10) {
    dancerImageOrder += 1
    image = assetPath(`placeholders/at/at-${dancerImageOrder}.png`)
  } else if (category === 'DJ' && djImageOrder < 3) {
    djImageOrder += 1
    image = assetPath(`placeholders/dj/dj-${djImageOrder}.png`)
  } else if (category === 'GUEST_ARTIST') {
    const guestArtistFile =
      guestRegion === 'INTERNATIONAL'
        ? internationalGuestArtistImageFiles[guestInternationalImageOrder++]
        : domesticGuestArtistImageFiles[guestDomesticImageOrder++]
    image = guestArtistFile ? assetPath(`placeholders/ga/${guestArtistFile}`) : assetPath('placeholders/artist-1.svg')
  } else if (category === 'MEDIA') {
    const mediaFile = mediaImageFiles[mediaImageOrder]
    mediaImageOrder += 1
    image = mediaFile ? assetPath(`placeholders/md/${mediaFile}`) : assetPath('placeholders/artist-1.svg')
  } else {
    image = assetPath('placeholders/artist-1.svg')
  }

  return {
    id,
    name,
    category,
    guestRegion,
    image,
    bio: `${name} crafts high-emotion sets with rhythm-focused transitions and cinematic crescendos tailored for large-scale stages.`,
    socials: {
      instagram: `https://instagram.com/${id.replace('-', '')}`,
      youtube: `https://youtube.com/@${id}`,
      website: `https://www.${id}.music`,
    },
  }
})

export function getArtistCategory(artist: Artist): ArtistCategory {
  return artist.category
}

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
  src: assetPath('placeholders/gallery-1.svg'),
  alt: `K-SENSUAL scene ${index + 1}`,
}))

export const contact = {
  email: 'hello@k-sensual.com',
  instagramUrl: 'https://instagram.com/ksensual_official',
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
  { label: 'Line-up', to: '/lineup' },
  { label: 'Tickets', to: '/tickets' },
  { label: 'Venue', to: '/venue' },
]
