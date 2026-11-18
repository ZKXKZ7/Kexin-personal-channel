import { DepthScene } from './DepthScene';
import { Climbing } from './Climbing';
import { GalleryFigure } from './GalleryFigure';
import { lifeInterestTrips } from '../data/content';

const activities = [
  { slug: 'climbing', title: '攀岩', label: 'The climbing atlas', description: '在地图上，收藏每一次向上的旅程。', glyph: '↗', color: 'from-teal-950' },
  { slug: 'dance', title: '街舞', label: 'Find your rhythm', description: '用身体表达，记录每一个节拍。', glyph: '〰', color: 'from-indigo-950' },
];

export function Sports({ route }: { route: string }) {
  const part = route.split('/')[2];
  const dance = part === 'dance';
  const photos = lifeInterestTrips.find(trip => trip.id === 'sports')!.photos;

  if (part === 'climbing') return <Climbing />;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <a href={dance ? '#/life-log/sports' : '#/life-log'} className="depth-kicker">
        ← {dance ? 'Sports' : 'Life Log'}
      </a>
      <header className="depth-stage mb-8 mt-5 space-y-3">
        <DepthScene />
        <p className="depth-kicker text-xs tracking-[.2em]">{dance ? 'MOVE TO YOUR OWN RHYTHM' : 'MOVEMENT & EXPLORATION'}</p>
        <h1 className="depth-title font-bold">{dance ? '街舞 / Dance' : 'Sports'}</h1>
        {!dance && <p className="text-slate-300">向上探索，自由律动。</p>}
      </header>
      {dance ? (
        <div className="mx-auto max-w-5xl"><GalleryFigure ph={photos[1]} /></div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {activities.map(activity => (
            <a
              key={activity.slug}
              href={`#/life-log/sports/${activity.slug}`}
              className={`depth-panel depth-link relief-card flex min-h-60 flex-col justify-between gap-7 rounded-3xl border border-white/15 bg-gradient-to-br ${activity.color} to-slate-950 p-7 sm:p-9`}
            >
              <span className="relief-emblem depth-kicker grid h-16 w-16 place-items-center text-4xl" aria-hidden="true">{activity.glyph}</span>
              <div className="relief-inset p-4">
                <p className="text-xs uppercase tracking-[.2em] text-slate-400">{activity.label}</p>
                <h2 className="mt-2 text-3xl font-semibold">{activity.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{activity.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
