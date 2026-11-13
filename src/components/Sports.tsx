import { Climbing } from './Climbing';
import { GalleryFigure } from './GalleryFigure';
import { lifeInterestTrips } from '../data/content';

export function Sports({ route }: { route: string }) {
  const part = route.split('/')[2];
  const photos = lifeInterestTrips.find(t => t.id === 'sports')!.photos;
  if (part === 'climbing') return <Climbing />;
  if (part === 'dance') return <div className="mx-auto max-w-5xl px-6 py-12"><a href="#/life-log/sports" className="text-sky-300">← Sports</a><p className="mt-12 text-sm tracking-[.3em] text-sky-300">MOVE TO YOUR OWN RHYTHM</p><h1 className="mb-10 mt-4 text-5xl font-bold">街舞 / Dance</h1><GalleryFigure ph={photos[1]} /></div>;
  return <div className="mx-auto max-w-7xl px-6 py-12"><a href="#/life-log" className="text-sky-300">← Life Log</a><p className="mt-12 text-sm tracking-[.3em] text-sky-300">MOVEMENT & EXPLORATION</p><h1 className="mt-4 text-6xl font-bold">Sports</h1><p className="mt-5 text-slate-400">向上探索，自由律动。</p><div className="mt-12 grid gap-6 md:grid-cols-2">{[{ slug: 'climbing', title: '攀岩', en: 'The climbing atlas', text: '在地图上，收藏每一次向上的旅程。', glyph: '↗' }, { slug: 'dance', title: '街舞', en: 'Find your rhythm', text: '用身体表达，记录每一个节拍。', glyph: '〰' }].map((item, i) => <a key={item.slug} href={item.slug === 'climbing' ? import.meta.env.BASE_URL + 'climbing/' : '#/life-log/sports/dance'} className={`group flex min-h-80 flex-col justify-between rounded-3xl border border-white/10 p-9 transition hover:-translate-y-1 hover:border-sky-300/50 ${i ? 'bg-gradient-to-br from-indigo-950 to-slate-950' : 'bg-gradient-to-br from-teal-950 to-slate-950'}`}><span className="text-6xl text-emerald-200">{item.glyph}</span><div><p className="text-xs uppercase tracking-[.25em] text-slate-400">{item.en}</p><h2 className="mt-3 text-3xl font-semibold">{item.title} <span className="float-right text-sky-300">↗</span></h2><p className="mt-4 text-sm text-slate-400">{item.text}</p></div></a>)}</div></div>;
}
