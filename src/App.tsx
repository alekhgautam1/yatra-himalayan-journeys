import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ImagePlus, Menu, MessageCircle, Phone, X } from 'lucide-react';
import BackgroundPicker, { BACKGROUND_STORAGE_KEY, DEFAULT_BACKGROUND } from './BackgroundPicker';
import MountainScene from './MountainScene';
import { cabRoutes, trips, vehicles, type Trip, type Vehicle } from './data';

const money = (amount: number) => `\u20B9${amount.toLocaleString('en-IN')}`;
const PHONE = '+919044194556';
const PHONE_DISPLAY = '+91 90441 94556';
const EMAIL = 'alekhgautam3@gmail.com';
const whatsappLink = (message: string) => `https://wa.me/919044194556?text=${encodeURIComponent(message)}`;

function savedBackground() {
  try {
    return localStorage.getItem(BACKGROUND_STORAGE_KEY) || DEFAULT_BACKGROUND;
  } catch {
    return DEFAULT_BACKGROUND;
  }
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#top" aria-label="Yatra Tour, back to top">
      <svg className="brand-mark" width="39" height="32" viewBox="0 0 39 32" fill="none" aria-hidden="true">
        <path d="M1.5 26.5 12.2 8.5l5.6 9.1L23.8 5 37.5 26.5H1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="m8.4 26.5 7-11.7 3.8 6.1 4.6-7.8 8.5 13.4" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" opacity=".7" />
        <circle cx="29.7" cy="5.8" r="2.2" fill="currentColor" />
      </svg>
      <span className="brand-word">YATRA TOUR<span>HIMALAYAN JOURNEYS</span></span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</span>;
}

function TripCard({ trip, onSelect }: { trip: Trip; onSelect: (trip: Trip) => void }) {
  return (
    <button className="trip-card" onClick={() => onSelect(trip)} aria-label={`View ${trip.title} trip details`}>
      <span className="trip-image-wrap">
        <img src={trip.image} alt={trip.imageAlt} loading="lazy" onError={(event) => { event.currentTarget.src = DEFAULT_BACKGROUND; }} />
        <span className="trip-image-arrow"><ArrowUpRight size={18} strokeWidth={1.5} /></span>
      </span>
      <span className="trip-card-region">{trip.region} <span /> {trip.duration}</span>
      <span className="trip-card-title">{trip.title}</span>
      <span className="trip-card-subtitle">{trip.shortTitle}</span>
      <span className="trip-card-bottom">
        <span>FROM <strong>{money(trip.price)}</strong> <small>/ PERSON</small></span>
        <span className="trip-card-link">DISCOVER <ArrowRight size={15} /></span>
      </span>
    </button>
  );
}

function TripModal({ trip, onClose, onBook }: { trip: Trip; onClose: () => void; onBook: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal trip-modal" role="dialog" aria-modal="true" aria-labelledby="trip-modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close trip details"><X size={20} /></button>
        <button className="trip-modal-image" type="button" onClick={onBook} aria-label={`Book ${trip.title} by clicking its photo`}><img src={trip.image} alt={trip.imageAlt} onError={(event) => { event.currentTarget.src = DEFAULT_BACKGROUND; }} /></button>
        <div className="trip-modal-content">
          <Eyebrow>{trip.region}</Eyebrow>
          <h2 id="trip-modal-title">{trip.title}</h2>
          <p className="modal-subtitle">{trip.shortTitle}</p>
          <p className="modal-description">{trip.description}</p>
          <div className="modal-facts">
            <div><span>DURATION</span><strong>{trip.duration}</strong></div>
            <div><span>BEST TIME</span><strong>{trip.bestTime}</strong></div>
          </div>
          <div className="modal-detail">
            <h3>The route</h3>
            <p>{trip.route}</p>
            <p className="pickup">Pickup: {trip.pickup}</p>
          </div>
          {(trip.transport || trip.hotelStay || trip.meals) && <div className="modal-detail travel-details">
            <h3>Travel, stays & meals</h3>
            {trip.transport && <p><strong>Transport:</strong> {trip.transport}</p>}
            {trip.hotelStay && <p><strong>Stay:</strong> {trip.hotelStay}</p>}
            {trip.meals && <p><strong>Meals:</strong> {trip.meals}</p>}
          </div>}
          <div className="modal-detail">
            <h3>Journey highlights</h3>
            <ul>{trip.highlights.map((highlight) => <li key={highlight}><Check size={15} />{highlight}</li>)}</ul>
          </div>
          {trip.itinerary && <div className="modal-detail">
            <h3>Day by day</h3>
            <div className="itinerary-list">{trip.itinerary.map((day) => <details key={`${day.day}-${day.title}`}>
              <summary><span>{day.day}</span><strong>{day.title}</strong><ChevronDown size={15} /></summary>
              <p>{day.details}</p>
            </details>)}</div>
          </div>}
          <div className="modal-inclusions">
            <div className="modal-detail"><h3>Included</h3><ul>{trip.included.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div>
            <div className="modal-detail"><h3>Not included</h3><ul>{trip.excluded.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="modal-book-row">
            <div><span>STARTING FROM</span><strong>{money(trip.price)} <small>/ person</small></strong></div>
            <button className="button button-dark" onClick={onBook}>Book this journey <ArrowRight size={17} /></button>
          </div>
          <p className="fine-print">Prices are indicative and depend on dates, availability and your final itinerary.</p>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ initialTrip, onClose }: { initialTrip: string; onClose: () => void }) {
  const [readyLink, setReadyLink] = useState('');
  const [journey, setJourney] = useState(initialTrip || 'Help me decide');
  const featuredTrips = [trips[0], trips[1], trips[2]];

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Hello Yatra Tour! I would like to plan a journey.',
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone')}`,
      `Journey: ${form.get('journey')}`,
      `Travel date: ${form.get('date') || 'Flexible'}`,
      `Travellers: ${form.get('travellers')}`,
      `Notes: ${form.get('notes') || 'None'}`,
    ].join('\n');
    const link = whatsappLink(message);
    setReadyLink(link);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form"><X size={20} /></button>
        <Eyebrow>LET'S MAKE IT HAPPEN</Eyebrow>
        <h2 id="booking-title">A journey made <em>for you.</em></h2>
        <p>Choose a view or tell us about your plans. Alekh Gautam will receive your request on WhatsApp.</p>
        {readyLink ? (
          <div className="enquiry-ready" role="status">
            <span className="enquiry-check"><Check size={22} /></span>
            <h3>Your enquiry is ready.</h3>
            <p>Continue in WhatsApp to send your trip details to the Yatra travel team.</p>
            <a className="button button-dark" href={readyLink} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={17} /></a>
            <button className="plain-button" onClick={() => setReadyLink('')}>Start another enquiry</button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={submitEnquiry}>
            <div className="booking-photo-picks" aria-label="Choose a journey by photo">
              {featuredTrips.map((trip) => (
                <button className={`booking-photo-pick ${journey === trip.title ? 'is-active' : ''}`} type="button" key={trip.id} onClick={() => setJourney(trip.title)} aria-pressed={journey === trip.title} aria-label={`Choose ${trip.title}`}>
                  <img src={trip.image} alt={trip.imageAlt} loading="lazy" onError={(event) => { event.currentTarget.src = DEFAULT_BACKGROUND; }} />
                  <span>{trip.title}</span>
                </button>
              ))}
            </div>
            <div className="form-grid">
              <label>Your name <input name="name" placeholder="Full name" required autoFocus /></label>
              <label>Phone number <input name="phone" type="tel" placeholder="Your contact number" required /></label>
              <label className="form-wide">Where would you like to go?
                <span className="select-wrap"><select name="journey" value={journey} onChange={(event) => setJourney(event.target.value)}>
                  <option>Help me decide</option>
                  {trips.map((trip) => <option key={trip.id} value={trip.title}>{trip.title}</option>)}
                  <option>Custom Himalayan journey</option>
                  <option>Private cab rental</option>
                </select><ChevronDown size={16} /></span>
              </label>
              <label>Preferred date <input name="date" type="date" /></label>
              <label>Travellers <span className="select-wrap"><select name="travellers" defaultValue="2 travellers"><option>1 traveller</option><option>2 travellers</option><option>3 travellers</option><option>4 travellers</option><option>5-7 travellers</option><option>8+ travellers</option></select><ChevronDown size={16} /></span></label>
              <label className="form-wide">Anything else? <textarea name="notes" rows={3} placeholder="Tell us what your dream trip looks like" /></label>
            </div>
            <button type="submit" className="button button-dark form-submit">Request booking on WhatsApp <ArrowUpRight size={17} /></button>
            <p className="fine-print">This opens WhatsApp with your details. No booking or payment is made here.</p>
          </form>
        )}
      </div>
    </div>
  );
}

const filters = ['All journeys', 'Himachal', 'Uttarakhand', 'Spiritual', 'More of India'] as const;
type Filter = typeof filters[number];

export default function App() {
  const [filter, setFilter] = useState<Filter>('All journeys');
  const [showAll, setShowAll] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTrip, setBookingTrip] = useState('');
  const [photoOpen, setPhotoOpen] = useState(false);
  const [heroPhoto, setHeroPhoto] = useState(savedBackground);
  const [menuOpen, setMenuOpen] = useState(false);
  const [routeId, setRouteId] = useState(cabRoutes[0].id);
  const [vehicle, setVehicle] = useState<Vehicle>('sedan');
  const heroRef = useRef<HTMLElement>(null);

  const filteredTrips = trips.filter((trip) => {
    if (filter === 'Himachal') return trip.region === 'Himachal Pradesh';
    if (filter === 'Uttarakhand') return trip.region === 'Uttarakhand';
    if (filter === 'Spiritual') return trip.spiritual;
    if (filter === 'More of India') return trip.region !== 'Himachal Pradesh' && trip.region !== 'Uttarakhand';
    return true;
  });
  const visibleTrips = showAll ? filteredTrips : filteredTrips.slice(0, 3);
  const route = cabRoutes.find((item) => item.id === routeId) || cabRoutes[0];
  const selectedVehicle = vehicles.find((item) => item.id === vehicle) || vehicles[0];
  const fare = route.fares[vehicle];

  const openBooking = (trip = '') => {
    setSelectedTrip(null);
    setPhotoOpen(false);
    setBookingTrip(trip);
    setBookingOpen(true);
    setMenuOpen(false);
  };

  const openPhotoPicker = () => {
    setMenuOpen(false);
    setPhotoOpen(true);
  };

  const changeBackground = (photo: string) => {
    setHeroPhoto(photo);
    try {
      localStorage.setItem(BACKGROUND_STORAGE_KEY, photo);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!selectedTrip && !bookingOpen && !photoOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTrip(null);
        setBookingOpen(false);
        setPhotoOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedTrip, bookingOpen, photoOpen]);

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX / rect.width - 0.5) * -18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    heroRef.current?.style.setProperty('--hero-x', `${x}px`);
    heroRef.current?.style.setProperty('--hero-y', `${y}px`);
  };

  const resetHero = () => {
    heroRef.current?.style.setProperty('--hero-x', '0px');
    heroRef.current?.style.setProperty('--hero-y', '0px');
  };

  const cabMessage = `Hello Yatra Tour! I would like to enquire about a ${selectedVehicle.name} for ${route.label}. The listed one-way fare is ${fare === null ? 'not available' : money(fare)}. Please share availability.`;

  return (
    <>
      <main id="top">
        <section className="hero" ref={heroRef} onPointerMove={moveHero} onPointerLeave={resetHero}>
          <div className="hero-background"><div key={heroPhoto} className="hero-image" style={{ backgroundImage: `url("${heroPhoto}")` }} /></div>
          <div className="hero-shade" />
          <button className="hero-photo-action" type="button" aria-label="Book a tour inspired by this mountain photo" onClick={() => openBooking()} />
          <header className="site-header">
            <div className="header-inner">
              <Brand light />
              <nav className="desktop-nav" aria-label="Main navigation">
                <a href="#journeys">Destinations</a>
                <a href="#story">Our story</a>
                <a href="#sacred">Char Dham</a>
                <a href="#cabs">Cabs</a>
                <a href="#contact">Contact</a>
              </nav>
              <div className="header-actions">
                <a className="header-phone" href={whatsappLink('Hello Alekh! I would like to plan a journey with Yatra Tour.')} target="_blank" rel="noreferrer"><MessageCircle size={15} /> <span>WhatsApp {PHONE_DISPLAY}</span></a>
                <button className="header-photo" onClick={openPhotoPicker} aria-label="Change background photo"><ImagePlus size={16} /><span>Change photo</span></button>
                <button className="header-cta" onClick={() => openBooking()}>BOOK A TOUR <ArrowUpRight size={15} /></button>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
              </div>
            </div>
            {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
              <a href="#journeys" onClick={() => setMenuOpen(false)}>Destinations</a>
              <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
              <a href="#sacred" onClick={() => setMenuOpen(false)}>Char Dham</a>
              <a href="#cabs" onClick={() => setMenuOpen(false)}>Cabs</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <a href={whatsappLink('Hello Alekh! I would like to plan a journey with Yatra Tour.')} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>WhatsApp Alekh <ArrowUpRight size={16} /></a>
              <button onClick={openPhotoPicker}>Change background photo <ImagePlus size={16} /></button>
              <button onClick={() => openBooking()}>Book a tour <ArrowRight size={16} /></button>
            </nav>}
          </header>

          <div className="hero-content page-width">
            <div className="hero-copy">
              <Eyebrow light>HIMALAYAN JOURNEYS, MADE PERSONAL</Eyebrow>
              <h1>YATRA<span className="hero-brand-tour">TOUR<span className="brand-period">.</span></span></h1>
              <p className="hero-headline">Find your way <em>to wonder.</em></p>
              <p className="hero-description">Thoughtful journeys through Himachal Pradesh, Uttarakhand and beyond, for wherever the road is calling you.</p>
              <div className="hero-buttons">
                <button className="button button-lime" onClick={() => openBooking()}>Book your journey <ArrowRight size={18} /></button>
                <a href={whatsappLink('Hello Alekh! I would like to plan a journey with Yatra Tour.')} className="hero-text-link" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WHATSAPP ALEKH <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="journeys" className="journeys-section section-pad">
          <div className="page-width">
            <div className="section-heading journeys-heading">
              <div>
                <Eyebrow>THE JOURNEY STARTS HERE</Eyebrow>
                <h2>Some places just<br /><em>stay with you.</em></h2>
              </div>
              <p>From quiet valleys to sacred peaks and beyond, find a journey that feels like it was made just for you.</p>
            </div>

            <div className="filter-row" aria-label="Filter journeys">
              <div className="filter-buttons">
                {filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} aria-pressed={filter === item} onClick={() => { setFilter(item); setShowAll(false); }}>{item}</button>)}
              </div>
              <span className="filter-note">HANDPICKED ESCAPES, NEAR & FAR</span>
            </div>

            <div className="trip-grid">
              {visibleTrips.map((trip) => <TripCard key={trip.id} trip={trip} onSelect={setSelectedTrip} />)}
            </div>
            {filteredTrips.length > 3 && <div className="all-trips-row"><button className="underlined-link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer journeys' : `View all ${filteredTrips.length} journeys`} <ArrowRight size={17} /></button></div>}
            <p className="price-note">Starting prices are per person and subject to availability.</p>
          </div>
        </section>

        <section id="story" className="dimension-section">
          <div className="page-width dimension-inner">
            <div className="dimension-copy">
              <Eyebrow light>THE YATRA WAY</Eyebrow>
              <h2>Go a little <em>higher.</em></h2>
              <p>We believe the best journeys are more than places on a map. They are the people you meet, the roads you take, and the moments you bring home.</p>
              <button className="button button-outline" onClick={() => openBooking()}>Let's plan your journey <ArrowRight size={17} /></button>
            </div>
            <div className="dimension-visual">
              <div className="scene-glow" />
              <MountainScene />
              <div className="scene-caption"><span>THE HIMALAYAS IN 3D</span><span>MOVE TO EXPLORE <ArrowUpRight size={14} /></span></div>
            </div>
          </div>
        </section>

        <section id="sacred" className="sacred-section">
          <button className="sacred-image" type="button" onClick={() => setSelectedTrip(trips[1])} aria-label="View Kedarnath and Badrinath tour details from photo"><img src="https://images.pexels.com/photos/15031440/pexels-photo-15031440.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1400" alt="Kedarnath temple surrounded by the Himalayan mountains" loading="lazy" onError={(event) => { event.currentTarget.src = DEFAULT_BACKGROUND; }} /></button>
          <div className="sacred-content">
            <Eyebrow>THE SACRED HIMALAYAS</Eyebrow>
            <h2>A journey for<br /><em>the soul.</em></h2>
            <p>Follow ancient paths through Devbhoomi. From Kedarnath to Badrinath, let us help you plan a pilgrimage with care.</p>
            <div className="sacred-options">
              <button onClick={() => setSelectedTrip(trips.find((trip) => trip.id === 'do-dham') || null)}>
                <span className="option-number">01</span><span><strong>Do Dham Yatra</strong><small>6 DAYS / 5 NIGHTS &nbsp; | &nbsp; FROM {money(18499)}</small></span><ArrowUpRight size={19} />
              </button>
              <button onClick={() => setSelectedTrip(trips.find((trip) => trip.id === 'char-dham') || null)}>
                <span className="option-number">02</span><span><strong>Complete Char Dham</strong><small>10 DAYS / 9 NIGHTS &nbsp; | &nbsp; FROM {money(24999)}</small></span><ArrowUpRight size={19} />
              </button>
            </div>
            <p className="sacred-note">Temple dates, road conditions and registration requirements vary by season. Please confirm before travelling.</p>
          </div>
        </section>

        <section id="cabs" className="rides-section section-pad">
          <div className="page-width rides-inner">
            <div className="rides-copy">
              <Eyebrow>THE ROAD IS PART OF THE JOURNEY</Eyebrow>
              <h2>Good journeys start<br />on <em>good roads.</em></h2>
              <p>Get there comfortably with a private mountain cab and a driver who knows the way. Choose a route to see an indicative fare.</p>
              <a className="underlined-link" href={`tel:${PHONE}`}>Talk to a travel expert <ArrowUpRight size={17} /></a>
            </div>
            <div className="fare-panel">
              <div className="fare-panel-heading"><div><span>YOUR RIDE, YOUR WAY</span><h3>Find your mountain cab</h3></div><span className="fare-heading-number">01 / 02</span></div>
              <div className="fare-inputs">
                <label>SELECT YOUR ROUTE<span className="select-wrap"><select value={routeId} onChange={(event) => setRouteId(event.target.value)}>{cabRoutes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><ChevronDown size={17} /></span></label>
                <label>CHOOSE YOUR VEHICLE<span className="select-wrap"><select value={vehicle} onChange={(event) => setVehicle(event.target.value as Vehicle)}>{vehicles.map((item) => <option key={item.id} value={item.id}>{item.name} ({item.seats})</option>)}</select><ChevronDown size={17} /></span></label>
              </div>
              <div className="fare-result">
                <div><span>ESTIMATED ONE-WAY FARE</span><strong>{fare === null ? 'On request' : money(fare)}</strong><small>{route.distance} &nbsp; / &nbsp; {route.duration}</small></div>
                <a className="round-arrow" href={whatsappLink(cabMessage)} target="_blank" rel="noreferrer" aria-label="Enquire about this cab on WhatsApp"><ArrowUpRight size={21} /></a>
              </div>
              <p className="fare-disclaimer">Indicative fare only. Availability, route conditions and final pricing will be confirmed with your enquiry.</p>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad">
          <div className="page-width faq-inner">
            <div><Eyebrow>GOOD TO KNOW</Eyebrow><h2>A few things<br /><em>you might ask.</em></h2></div>
            <div className="faq-list">
              <details><summary>Can I customise my journey?<span>+</span></summary><p>Yes. Ask us about changing your dates, pickup city, hotel category, vehicle or the pace of your itinerary.</p></details>
              <details><summary>What is included in a package?<span>+</span></summary><p>Most journeys include stays, a private vehicle and selected meals. Open any journey to see its inclusions and exclusions, and confirm the final details when you enquire.</p></details>
              <details><summary>When is the best time to visit?<span>+</span></summary><p>It depends on your destination. Spring and autumn are lovely for many valleys, while winter brings snow. Char Dham trips depend on seasonal temple opening dates and road conditions.</p></details>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="closing-image" />
          <div className="closing-shade" />
          <button className="closing-photo-action" type="button" aria-label="Book a journey from this mountain photo" onClick={() => openBooking()} />
          <div className="closing-content">
            <Eyebrow light>YOUR NEXT CHAPTER AWAITS</Eyebrow>
            <h2>Let's find your<br /><em>somewhere.</em></h2>
            <div className="closing-actions">
              <button className="button button-lime" onClick={() => openBooking()}>Plan a journey with Alekh <ArrowRight size={18} /></button>
               <a className="closing-whatsapp" href={whatsappLink('Hello Alekh! I would like to plan a journey with Yatra Tour.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp Alekh <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand"><Brand light /><p>For the roads less travelled,<br />and the stories still to come.</p></div>
          <div className="footer-column"><h3>EXPLORE</h3><a href="#journeys">Our journeys</a><a href="#sacred">Char Dham Yatra</a><a href="#cabs">Mountain cabs</a><a href="#story">The Yatra way</a></div>
          <div className="footer-column"><h3>GET IN TOUCH</h3><strong className="footer-contact-name">Alekh Gautam</strong><a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={whatsappLink('Hello Alekh! I would like to plan a Himalayan journey with Yatra Tour.')} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Chat on WhatsApp <ArrowUpRight size={14} /></a><button className="footer-book-link" onClick={() => openBooking()}>Book a tour <ArrowUpRight size={14} /></button></div>
          <div className="footer-column footer-address"><h3>WHERE WE GO</h3><p>Himachal Pradesh<br />Uttarakhand<br />and beyond</p></div>
        </div>
        <div className="page-width footer-bottom"><span>&copy; {new Date().getFullYear()} YATRA TOUR. ALL RIGHTS RESERVED.</span><span>MADE FOR THE MOUNTAINS</span><a href="https://lnkd.in/g9MTjpyx" target="_blank" rel="noreferrer">REFERENCE SITE <ArrowUpRight size={12} /></a></div>
      </footer>

      {selectedTrip && <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} onBook={() => openBooking(selectedTrip.title)} />}
      {bookingOpen && <BookingModal initialTrip={bookingTrip} onClose={() => setBookingOpen(false)} />}
      {photoOpen && <BackgroundPicker current={heroPhoto} onChange={changeBackground} onClose={() => setPhotoOpen(false)} />}
    </>
  );
}