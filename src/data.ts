import referencePackages from './referencePackages.json';

export type Trip = {
  id: string;
  title: string;
  shortTitle: string;
  region: string;
  type: string;
  duration: string;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
  route: string;
  bestTime: string;
  pickup: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  spiritual?: boolean;
  transport?: string;
  hotelStay?: string;
  meals?: string;
  itinerary?: { day: string; title: string; details: string }[];
};

export const trips: Trip[] = [
  {
    id: 'magical-himachal',
    title: 'Magical Himachal',
    shortTitle: 'Shimla, Kullu & Manali',
    region: 'Himachal Pradesh',
    type: 'MOUNTAINS & VALLEYS',
    duration: '6 days / 5 nights',
    price: 13499,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Travellers walking through snow in the Himalayan mountains',
    description: 'From the old-world charm of Shimla to the snow-dusted valleys of Manali, this is Himachal at its most unforgettable.',
    route: 'Delhi / Chandigarh - Shimla - Kullu - Manali - Solang - Atal Tunnel',
    bestTime: 'October to June',
    pickup: 'Delhi or Chandigarh',
    highlights: ['Stroll Shimla\'s Ridge and Mall Road', 'Explore Solang Valley and Atal Tunnel', 'Visit Hadimba Temple and Old Manali'],
    included: ['5 nights in mountain-view stays', 'Private cab with a local driver', 'Daily breakfast and dinner'],
    excluded: ['Flights or trains', 'Adventure activities and personal expenses'],
  },
  {
    id: 'do-dham',
    title: 'Sacred Do Dham',
    shortTitle: 'Kedarnath & Badrinath',
    region: 'Uttarakhand',
    type: 'A SACRED JOURNEY',
    duration: '6 days / 5 nights',
    price: 18499,
    image: 'https://images.pexels.com/photos/15031440/pexels-photo-15031440.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    imageAlt: 'Kedarnath temple beneath the Himalayan peaks',
    description: 'A meaningful journey to two of the Himalayas\' most revered shrines, through the sacred valleys of Uttarakhand.',
    route: 'Haridwar / Rishikesh - Guptkashi - Kedarnath - Badrinath',
    bestTime: 'May to October, subject to temple opening dates',
    pickup: 'Haridwar, Rishikesh or Dehradun',
    highlights: ['Kedarnath Jyotirlinga darshan', 'Badrinath temple and Tapt Kund', 'Visit Mana village'],
    included: ['5 nights in hotels and guesthouses', 'Private mountain cab', 'Vegetarian breakfast and dinner'],
    excluded: ['Helicopter, pony or doli charges', 'Special darshan and personal expenses'],
    spiritual: true,
  },
  {
    id: 'spiti',
    title: 'The Spiti Expedition',
    shortTitle: 'Kaza, Key & Chandratal',
    region: 'Himachal Pradesh',
    type: 'THE ROAD LESS TRAVELLED',
    duration: '8 days / 7 nights',
    price: 22499,
    image: 'https://images.pexels.com/photos/31307365/pexels-photo-31307365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    imageAlt: 'Key Monastery rising above the snow-covered Spiti Valley',
    description: 'Take the long way into a world of ancient monasteries, high mountain passes and impossibly clear night skies.',
    route: 'Shimla - Sangla - Kalpa - Tabo - Kaza - Chandratal - Manali',
    bestTime: 'May to October',
    pickup: 'Chandigarh or Shimla',
    highlights: ['Visit Key Monastery and Hikkim', 'Camp near Chandratal Lake', 'Cross Kunzum Pass and Chicham Bridge'],
    included: ['7 nights in homestays and camps', 'Mountain SUV or 4x4 with local driver', 'Breakfast and local dinners'],
    excluded: ['Lunch and personal expenses', 'Extra vehicle use beyond the itinerary'],
  },
  {
    id: 'char-dham',
    title: 'Complete Char Dham',
    shortTitle: 'The four sacred dhams',
    region: 'Uttarakhand',
    type: 'A SACRED JOURNEY',
    duration: '10 days / 9 nights',
    price: 24999,
    image: 'https://images.pexels.com/photos/15031440/pexels-photo-15031440.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    imageAlt: 'The sacred Kedarnath temple in Uttarakhand',
    description: 'Journey through Devbhoomi to Yamunotri, Gangotri, Kedarnath and Badrinath, with the mountains as your constant companion.',
    route: 'Haridwar - Yamunotri - Gangotri - Kedarnath - Badrinath - Rishikesh',
    bestTime: 'May to October, subject to temple opening dates',
    pickup: 'Haridwar or Rishikesh',
    highlights: ['Yamunotri and Gangotri darshan', 'Kedarnath Jyotirlinga', 'Badrinath temple and Mana village'],
    included: ['9 nights in hotels and guesthouses', 'Mountain transport with a local driver', 'Vegetarian meals and registration guidance'],
    excluded: ['Helicopter, pony or doli charges', 'Special pujas and personal expenses'],
    spiritual: true,
  },
  {
    id: 'rishikesh',
    title: 'Rishikesh Rapids',
    shortTitle: 'The Ganga & riverside camps',
    region: 'Uttarakhand',
    type: 'RIVER & ADVENTURE',
    duration: '3 days / 2 nights',
    price: 5499,
    image: 'https://images.unsplash.com/photo-1718383538820-524dd564fd06?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rafters on the Ganga River in Rishikesh',
    description: 'Find your flow on the Ganga, from white-water rapids and riverside evenings to the glow of the evening aarti.',
    route: 'Rishikesh - Shivpuri - Triveni Ghat - Haridwar',
    bestTime: 'September to May',
    pickup: 'Haridwar, Dehradun or Rishikesh',
    highlights: ['White-water rafting with a guide', 'Riverside camp and bonfire', 'Triveni Ghat evening aarti'],
    included: ['2 nights at a riverside camp', 'Rafting equipment and guide', 'Meals and local transfers'],
    excluded: ['Optional bungee jumping', 'Personal expenses'],
  },
  {
    id: 'auli',
    title: 'Auli & Chopta',
    shortTitle: 'Snow trails & Himalayan peaks',
    region: 'Uttarakhand',
    type: 'SNOW & TREKKING',
    duration: '6 days / 5 nights',
    price: 17499,
    image: 'https://images.pexels.com/photos/9963746/pexels-photo-9963746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    imageAlt: 'Snowy slopes and a mountain lake in Auli',
    description: 'Wake up to Himalayan peaks, follow the trail to Tungnath and experience the snowy slopes of Auli.',
    route: 'Rishikesh - Chopta - Tungnath - Joshimath - Auli',
    bestTime: 'December to March for snow',
    pickup: 'Rishikesh or Haridwar',
    highlights: ['Tungnath and Chandrashila trek', 'Auli ski slopes and Nanda Devi views', 'Gorson Bugyal meadow'],
    included: ['5 nights in mountain stays', 'Private cab with a hill driver', 'Breakfast, dinner and trek guidance'],
    excluded: ['Cable car and ski equipment', 'Personal expenses'],
  },
  {
    id: 'jibhi',
    title: 'Secret Himachal',
    shortTitle: 'Jibhi & Tirthan Valley',
    region: 'Himachal Pradesh',
    type: 'SLOW MOUNTAIN LIVING',
    duration: '5 days / 4 nights',
    price: 11999,
    image: 'https://him-ytra.vercel.app/destinations/jibhi.jpg',
    imageAlt: 'A quiet green mountain landscape in Jibhi',
    description: 'Trade the crowds for cedar forests, riverside cottages and the quiet beauty of the Tirthan Valley.',
    route: 'Chandigarh - Tirthan Valley - Jibhi - Jalori Pass',
    bestTime: 'March to December',
    pickup: 'Chandigarh or Aut',
    highlights: ['Jibhi waterfall and village walks', 'Jalori Pass and Serolsar Lake', 'Tirthan riverside and forest trails'],
    included: ['4 nights in treehouses and cottages', 'Private mountain vehicle', 'Breakfast and dinner'],
    excluded: ['Fishing permits', 'Lunch and personal expenses'],
  },
  {
    id: 'dharamshala',
    title: 'Dhauladhar Magic',
    shortTitle: 'Dharamshala & Dalhousie',
    region: 'Himachal Pradesh',
    type: 'CULTURE & NATURE',
    duration: '6 days / 5 nights',
    price: 13299,
    image: 'https://images.pexels.com/photos/37248332/pexels-photo-37248332.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200',
    imageAlt: 'The snow-capped Dhauladhar mountains in Dharamshala',
    description: 'Discover Tibetan culture, pine-covered hills and the open green meadows of Khajjiar.',
    route: 'Pathankot / Chandigarh - Dharamshala - McLeodganj - Dalhousie - Khajjiar',
    bestTime: 'September to June',
    pickup: 'Pathankot or Chandigarh',
    highlights: ['McLeodganj and the Dalai Lama temple', 'Bhagsu waterfall', 'Khajjiar meadow and Dainkund Peak'],
    included: ['5 nights in valley-view stays', 'Private cab with a mountain driver', 'Daily breakfast and dinner'],
    excluded: ['Adventure activity tickets', 'Lunch and personal expenses'],
  },
];

const featuredReferenceIds: Record<string, string> = {
  'magical-himachal': 'pkg-himachal-magic',
  'do-dham': 'pkg-kedarnath-badrinath',
  spiti: 'pkg-spiti-circuit',
  rishikesh: 'pkg-rishikesh-adventure',
  auli: 'pkg-auli-chopta-winter',
  jibhi: 'pkg-jibhi-tirthan-offbeat',
  dharamshala: 'pkg-dharamshala-dalhousie',
};

for (const trip of trips) {
  const reference = referencePackages.find((item) => item.id === featuredReferenceIds[trip.id]);
  if (!reference) continue;
  trip.itinerary = reference.itinerary;
  trip.included = reference.included;
  trip.excluded = reference.excluded;
  trip.transport = reference.transport;
  trip.hotelStay = reference.hotelStay;
  trip.meals = reference.meals;
}

const additionalTrips = [
  { source: 'pkg-kashmir-paradise', id: 'kashmir', title: 'Kashmir Paradise', shortTitle: 'Srinagar, Gulmarg & Pahalgam', bestTime: 'March to October' },
  { source: 'pkg-rajasthan-royalty', id: 'rajasthan', title: 'Royal Rajasthan', shortTitle: 'Jaipur, Pushkar & Udaipur', bestTime: 'October to March' },
  { source: 'pkg-kerala-backwaters', id: 'kerala', title: 'Kerala Backwaters', shortTitle: 'Munnar, Thekkady & Alleppey', bestTime: 'September to March' },
  { source: 'pkg-sikkim-himalaya', id: 'sikkim', title: 'Majestic Sikkim', shortTitle: 'Gangtok & Tsomgo Lake', bestTime: 'March to June and September to December' },
  { source: 'pkg-goa-sunshine', id: 'goa', title: 'Goa Sunshine', shortTitle: 'Beaches & coastal heritage', bestTime: 'November to February' },
  { source: 'pkg-ayodhya-kashi', id: 'ayodhya', title: 'Ayodhya & Kashi', shortTitle: 'Sacred cities of the Ganga', bestTime: 'October to March' },
  { source: 'pkg-rishikesh-mussoorie', id: 'mussoorie', title: 'Mussoorie & Rishikesh', shortTitle: 'Misty hills & the Ganga', bestTime: 'March to June and September to November' },
  { source: 'pkg-nainital-corbett', id: 'nainital', title: 'Nainital & Corbett', shortTitle: 'Lakes & wilderness', bestTime: 'October to June' },
  { source: 'pkg-ladakh-pangong', id: 'ladakh', title: 'Ladakh Odyssey', shortTitle: 'Leh, Nubra & Pangong', bestTime: 'May to September' },
  { source: 'pkg-meghalaya-dawki', id: 'meghalaya', title: 'Enchanted Meghalaya', shortTitle: 'Shillong, Cherrapunji & Dawki', bestTime: 'October to April' },
  { source: 'pkg-amritsar-golden-heritage', id: 'amritsar', title: 'Divine Amritsar', shortTitle: 'Golden Temple & Wagah Border', bestTime: 'October to March' },
  { source: 'pkg-uttarakhand-offbeat', id: 'devbhoomi', title: 'Secret Devbhoomi', shortTitle: 'Kanatal, Chopta & Chakrata', bestTime: 'March to June and September to November' },
  { source: 'pkg-varanasi-prayagraj', id: 'varanasi', title: 'Kashi & Prayagraj', shortTitle: 'Ghats, aarti & Triveni Sangam', bestTime: 'October to March' },
];

const additionalImages: Record<string, string> = {
  'pkg-kashmir-paradise': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
  'pkg-rajasthan-royalty': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
  'pkg-kerala-backwaters': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  'pkg-sikkim-himalaya': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
  'pkg-goa-sunshine': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  'pkg-ayodhya-kashi': 'https://him-ytra.vercel.app/destinations/ayodhya-full.jpg',
  'pkg-rishikesh-mussoorie': 'https://him-ytra.vercel.app/destinations/mussoorie-honeymoon.jpg',
  'pkg-nainital-corbett': 'https://him-ytra.vercel.app/destinations/nainital.jpg',
  'pkg-ladakh-pangong': 'https://images.unsplash.com/photo-1652204597589-962156b9483d?auto=format&fit=crop&w=1200&q=80',
  'pkg-meghalaya-dawki': 'https://images.unsplash.com/photo-1521437620269-f477f5437820?auto=format&fit=crop&w=1200&q=80',
  'pkg-amritsar-golden-heritage': 'https://him-ytra.vercel.app/destinations/golden_temple_amritsar.jpg',
  'pkg-uttarakhand-offbeat': 'https://him-ytra.vercel.app/destinations/chopta-tungnath.jpg',
  'pkg-varanasi-prayagraj': 'https://him-ytra.vercel.app/destinations/varanasi-aarti.jpg',
};

for (const item of additionalTrips) {
  const reference = referencePackages.find((packageItem) => packageItem.id === item.source);
  if (!reference) continue;
  trips.push({
    id: item.id,
    title: item.title,
    shortTitle: item.shortTitle,
    region: reference.state,
    type: reference.category.toUpperCase(),
    duration: reference.duration,
    price: reference.price,
    image: additionalImages[reference.id] || '/images/himalaya-hero.jpg',
    imageAlt: `${item.shortTitle} in ${reference.state}`,
    description: reference.description,
    route: reference.route,
    bestTime: item.bestTime,
    pickup: reference.pickup,
    highlights: reference.itinerary.slice(0, 3).map((day) => day.title),
    included: reference.included,
    excluded: reference.excluded,
    spiritual: reference.category === 'Spiritual',
    transport: reference.transport,
    hotelStay: reference.hotelStay,
    meals: reference.meals,
    itinerary: reference.itinerary,
  });
}

export type Vehicle = 'sedan' | 'suv' | 'thar' | 'tempo';

export const vehicles: { id: Vehicle; name: string; seats: string }[] = [
  { id: 'sedan', name: 'Sedan', seats: 'up to 4 guests' },
  { id: 'suv', name: 'Mountain SUV', seats: '6-7 guests' },
  { id: 'thar', name: 'Thar / 4x4', seats: 'up to 4 guests' },
  { id: 'tempo', name: 'Tempo Traveller', seats: '12-16 guests' },
];

export const cabRoutes: {
  id: string;
  label: string;
  distance: string;
  duration: string;
  fares: Record<Vehicle, number | null>;
}[] = [
  { id: 'del-manali', label: 'Delhi to Manali', distance: '540 km', duration: '11-12 hrs', fares: { sedan: 7499, suv: 10999, thar: 13999, tempo: 16999 } },
  { id: 'del-shimla', label: 'Delhi to Shimla', distance: '350 km', duration: '7-8 hrs', fares: { sedan: 4999, suv: 7499, thar: 9999, tempo: 11999 } },
  { id: 'chd-manali', label: 'Chandigarh to Manali', distance: '310 km', duration: '7 hrs', fares: { sedan: 4499, suv: 6999, thar: 8999, tempo: 10999 } },
  { id: 'har-kedar', label: 'Haridwar to Kedarnath base', distance: '240 km', duration: '8-9 hrs', fares: { sedan: 5999, suv: 8499, thar: 10999, tempo: 13499 } },
  { id: 'har-badri', label: 'Haridwar to Badrinath', distance: '320 km', duration: '10-11 hrs', fares: { sedan: 7499, suv: 10499, thar: 12999, tempo: 15999 } },
  { id: 'deh-mussoorie', label: 'Dehradun to Mussoorie', distance: '80 km', duration: '2.5 hrs', fares: { sedan: 2199, suv: 3499, thar: 4499, tempo: 5499 } },
  { id: 'del-dharamshala', label: 'Delhi to Dharamshala', distance: '490 km', duration: '10 hrs', fares: { sedan: 7199, suv: 10499, thar: 13499, tempo: 15499 } },
  { id: 'shimla-spiti', label: 'Shimla to Spiti Valley', distance: '420 km', duration: '2 days', fares: { sedan: null, suv: 18499, thar: 21999, tempo: 26999 } },
];