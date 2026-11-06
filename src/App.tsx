import { Sports } from './components/Sports';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Thoughts } from './components/Thoughts';
import { LifeLog } from './components/LifeLog';
import { Footer } from './components/Footer';
import { Snowfall } from './components/Snowfall';
import { SnowCursor } from './components/SnowCursor';
import { GalleryFigure } from './components/GalleryFigure';
import { BuptChapter } from './components/BuptChapter';
import { lifeInterestTrips, travelTrips, portfolioModules, portfolioModuleToTrip } from './data/content';

// Hash routes also work on static hosts and under a GitHub Pages repository path.
const sectionTitles: Record<string, string> = { portfolio: 'Portfolio', 'life-log': 'Life Log', thoughts: 'Thoughts', contact: 'Contact' };
const readRoute = () => window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const [section, id] = route.split('/');
  const module = section === 'portfolio' && id ? portfolioModules.find(item => item.id === id) : undefined;
  const trip = module ? portfolioModuleToTrip(module) : section === 'life-log' && id
    ? [...lifeInterestTrips, ...travelTrips].find(item => item.id === id) : undefined;
  const isDetail = Boolean(trip);
  const knownRoute = !route || (!id && ['portfolio', 'life-log', 'thoughts', 'contact'].includes(section)) || isDetail;
  const title = trip?.name ?? sectionTitles[section] ?? (knownRoute ? 'Home' : 'Page not found');

  useEffect(() => {
    document.title = `${title} | Kexin`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [route, title]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-[#070b14] to-slate-950 text-slate-200">
      <Snowfall />
      <SnowCursor />
      <div className="relative z-10 min-h-screen overflow-x-hidden">
        <Header />
        <main ref={mainRef} tabIndex={-1} className="min-h-[calc(100svh-5rem)] outline-none">
          {section === 'life-log' && id === 'sports' ? <Sports route={route} /> : isDetail && trip ? (
            <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
              <a href={`#/${section}`} className="inline-flex items-center gap-2 rounded-lg py-2 text-sm text-sky-300 transition hover:text-white focus-visible:outline focus-visible:outline-sky-300">
                <ArrowLeft className="h-4 w-4" />
                返回 {section === 'portfolio' ? 'Portfolio' : 'Life Log'}
              </a>
              <header className="mb-10 mt-8 border-b border-white/10 pb-8 sm:mt-12">
                <p className="mb-4 text-sm tracking-wide text-sky-300">{trip.region}</p>
                <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-6xl">{trip.name}</h1>
                {trip.modalIntro && <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-400">{trip.modalIntro}</p>}
              </header>
              {module?.buptChapterModal ? <BuptChapter module={module} /> : (
                <div className="grid items-start gap-6 md:grid-cols-2">
                  {trip.photos.map(photo => <GalleryFigure key={photo.id} ph={photo} />)}
                </div>
              )}
            </article>
          ) : !knownRoute ? (
            <div className="mx-auto max-w-5xl px-6 py-24">
              <h1 className="mb-6 text-4xl font-bold">页面未找到</h1>
              <a className="text-sky-300" href="#/">返回首页</a>
            </div>
          ) : <>
            {!route && <Hero />}
            {(!route || section === 'portfolio') && <Portfolio />}
            {(!route || section === 'life-log') && <LifeLog />}
            {(!route || section === 'thoughts') && <Thoughts />}
            {section === 'contact' && <Footer />}
          </>}
        </main>
        {section !== 'contact' && <Footer />}
      </div>
    </div>
  );
}
