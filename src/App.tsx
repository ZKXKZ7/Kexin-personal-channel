import { Sports } from './components/Sports';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DepthScene } from './components/DepthScene';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeSections } from './components/HomeSections';
import { Portfolio } from './components/Portfolio';
import { ThoughtDetail, Thoughts, thoughtTopics } from './components/Thoughts';
import { LifeLog, TravelLog } from './components/LifeLog';
import { Footer } from './components/Footer';
import { Snowfall } from './components/Snowfall';
import { SnowCursor } from './components/SnowCursor';
import { TravelAlbum } from './components/TravelAlbum';
import { GalleryFigure } from './components/GalleryFigure';
import { CareerExperience } from './components/CareerExperience';
import { BuptChapter } from './components/BuptChapter';
import { lifeInterestTrips, travelTrips, portfolioModules, portfolioModuleToTrip } from './data/content';

// Hash routes also work on static hosts and under a GitHub Pages repository path.
const sectionTitles: Record<string, string> = { portfolio: 'Portfolio', 'life-log': 'Life Log', thoughts: 'Insights' };
const readRoute = () => {
  const route = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');
  if (route === 'contact') {
    window.history.replaceState(window.history.state, '', '#/');
    return '';
  }
  return route;
};

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
  const thought = section === 'thoughts' && route === `thoughts/${id}`
    ? thoughtTopics.find(topic => topic.id === id) : undefined;
  const isTravelLog = route === 'life-log/travel';
  const isDestination = section === 'life-log' && travelTrips.some(item => item.id === id);
  const isDetail = Boolean(trip);
  const tone = moduleId === 'bupt' ? 'lime'
    : section === 'thoughts' || route === 'life-log/sports/dance' ? 'violet'
    : section === 'life-log' ? 'mint' : 'blue';
  const knownRoute = !route || (!id && ['portfolio', 'life-log', 'thoughts'].includes(section)) || isDetail || isTravelLog || Boolean(thought);
  const title = thought?.title ?? (isTravelLog ? 'Travel' : undefined) ?? trip?.name ?? sectionTitles[section] ?? (knownRoute ? 'Home' : 'Page not found');

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
          {thought ? <ThoughtDetail topic={thought} /> : isTravelLog ? <TravelLog /> : section === 'life-log' && id === 'sports' ? <Sports route={route} /> : module?.id === 'bupt' ? <BuptChapter /> : isDetail && trip ? (
            <article className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
              <a href={isDestination ? '#/life-log/travel' : `#/${section}`} className="inline-flex items-center gap-2 rounded-lg py-2 text-sm text-sky-300 transition hover:text-white focus-visible:outline focus-visible:outline-sky-300">
                <ArrowLeft className="h-4 w-4" />
                返回 {section === 'portfolio' ? 'Portfolio' : isDestination ? 'Travel' : 'Life Log'}
              </a>
              <header className="depth-stage mb-10 mt-5">
                <DepthScene />
                <p className="mb-4 text-sm tracking-wide depth-kicker">{trip.region}</p>
                <h1 className="depth-title font-bold">{trip.name}</h1>
                {trip.modalIntro && <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-400">{trip.modalIntro}</p>}
              </header>
              {module?.id === 'career' ? <CareerExperience /> : isDestination ? <TravelAlbum trip={trip} /> : (
                <div className="grid items-start gap-6 md:grid-cols-2">
                  {trip.photos.map(photo => <GalleryFigure key={photo.id} ph={photo} />)}
                </div>
              )}
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
            {route && <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8"><a href="#/" className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden />返回首页</a></div>}
            {(section === 'portfolio') && <Portfolio />}
            {(section === 'life-log') && <LifeLog />}
            {(section === 'thoughts') && <Thoughts />}
          </>}
        </main>
        {!route ? (
          <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-slate-400">
            保持联系 <span aria-hidden="true" className="mx-2 text-slate-500">·</span>
            <a href="https://github.com/ZKXKZ7" className="text-sky-200 underline-offset-4 hover:underline focus-visible:underline">GitHub</a>
          </footer>
        ) : <Footer />}
      </div>
    </div>
  );
}
