import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { TravelTrip, TripPhoto } from '../data/content';

function GalleryFigure({ ph }: { ph: TripPhoto }) {
  const hasVideo = Boolean(ph.videoSrc?.trim());

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-white/10 ${
        hasVideo ? 'bg-slate-950' : `bg-gradient-to-br ${ph.gradient}`
      }`}
    >
      <div className="aspect-[4/3] w-full">
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            src={ph.videoSrc}
            controls
            playsInline
            preload="metadata"
            aria-label={ph.label}
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${ph.gradient}`} />
        )}
      </div>
      <figcaption className="border-t border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-medium text-slate-300">
        {ph.label}
      </figcaption>
    </figure>
  );
}

type Props = {
  trip: TravelTrip | null;
  onClose: () => void;
};

export function TravelGalleryModal({ trip, onClose }: Props) {
  useEffect(() => {
    if (!trip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [trip, onClose]);

  if (!trip) return null;

  const defaultModalIntro =
    '点击下方卡片查看每一段旅程的“快照”（示意渐变占位，可替换为真实照片）。';
  const modalIntroResolved =
    trip.modalIntro === undefined ? defaultModalIntro : trip.modalIntro.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="travel-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-2xl border border-white/10 bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-wide text-sky-300/90">{trip.region}</p>
            <h3 id="travel-modal-title" className="text-xl font-bold text-slate-50">
              {trip.name}
            </h3>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-sky-300 hover:bg-white/5"
            onClick={onClose}
          >
            <X className="h-4 w-4" strokeWidth={2} />
            <span className="sr-only">关闭</span>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          {modalIntroResolved ? (
            <p className="mb-4 text-sm text-slate-400">{modalIntroResolved}</p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {trip.photos.map((ph) => (
              <GalleryFigure key={ph.id} ph={ph} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
