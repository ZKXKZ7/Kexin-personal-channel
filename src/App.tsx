import { Sports } from './components/Sports';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DepthScene } from './components/DepthScene';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
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
  const isLegacyMargin = section === 'portfolio' && id === 'margin';
  const moduleId = isLegacyMargin ? 'bupt' : id;
  const module = section === 'portfolio' && moduleId ? portfolioModules.find(item => item.id === moduleId) : undefined;
  const trip = module ? portfolioModuleToTrip(module) : section === 'life-log' && id
    ? [...lifeInterestTrips, ...travelTrips].find(item => item.id === id) : undefined;
  const isDetail = Boolean(trip);
  const tone = moduleId === 'bupt' ? 'lime'
    : section === 'thoughts' || route === 'life-log/sports/dance' ? 'violet'
    : section === 'contact' ? 'amber'
    : section === 'life-log' ? 'mint' : 'blue';
  const knownRoute = !route || (!id && ['portfolio', 'life-log', 'thoughts', 'contact'].includes(section)) || isDetail;
  const title = trip?.name ?? sectionTitles[section] ?? (knownRoute ? 'Home' : 'Page not found');

  useEffect(() => {
    document.title = `${title} | Kexin`;
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
    if (isLegacyMargin) document.getElementById('bupt-volunteering')?.scrollIntoView({ behavior: 'instant' });
  }, [route, title, isLegacyMargin]);

  return (
    <div className="depth-site relative" data-tone={tone}>
      <Snowfall />
      <SnowCursor />
      <div className="relative z-10 min-h-screen overflow-x-hidden">
        <Header />
        <main ref={mainRef} tabIndex={-1} className="min-h-[calc(100svh-5rem)] outline-none">
          {section === 'life-log' && id === 'sports' ? <Sports route={route} /> : module?.id === 'bupt' ? <BuptChapter /> : isDetail && trip ? (
            <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
              <a href={`#/${section}`} className="inline-flex items-center gap-2 rounded-lg py-2 text-sm text-sky-300 transition hover:text-white focus-visible:outline focus-visible:outline-sky-300">
                <ArrowLeft className="h-4 w-4" />
                返回 {section === 'portfolio' ? 'Portfolio' : 'Life Log'}
              </a>
              <header className="depth-stage mb-10 mt-5">
                <DepthScene />
                <p className="mb-4 text-sm tracking-wide depth-kicker">{trip.region}</p>
                <h1 className="depth-title font-bold">{trip.name}</h1>
                {trip.modalIntro && <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-400">{trip.modalIntro}</p>}
              </header>
              <div className="grid items-start gap-6 md:grid-cols-2">
                {trip.photos.map(photo => <GalleryFigure key={photo.id} ph={photo} />)}
              </div>
            </article>
          ) : !knownRoute ? (
            <div className="mx-auto max-w-5xl px-6 py-24">
              <section className="depth-stage">
                <DepthScene />
                <h1 className="depth-title mb-5 font-bold">页面未找到</h1>
                <a className="depth-kicker w-fit" href="#/">返回首页</a>
              </section>
            </div>
          ) : <>
            {!route && <><Hero /><HomeSections /></>}
            {route && section !== 'contact' && <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8"><a href="#/" className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden />返回首页</a></div>}
            {(section === 'portfolio') && <Portfolio />}
            {(section === 'life-log') && <LifeLog />}
            {(section === 'thoughts') && <Thoughts />}
            {section === 'contact' && <Footer standalone />}
          </>}
        </main>
        {section !== 'contact' && <Footer />}
      </div>
    </div>
  );
}
