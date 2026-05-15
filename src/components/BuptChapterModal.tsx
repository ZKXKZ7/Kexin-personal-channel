import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { PortfolioModule } from '../data/content';
import { GalleryFigure } from './TravelGalleryModal';

type Props = {
  module: PortfolioModule | null;
  onClose: () => void;
};

export function BuptChapterModal({ module, onClose }: Props) {
  const data = module?.buptChapterModal;

  useEffect(() => {
    if (!data) return;
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
  }, [data, onClose]);

  if (!module || !data) return null;

  const region = module.modalSubtitle ?? module.tags.join(' · ');

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bupt-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-label="关闭"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-t-2xl border border-white/10 bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-sky-300/90">{region}</p>
            <h3 id="bupt-modal-title" className="text-xl font-bold text-slate-50">
              {module.title}
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
          <div className="space-y-1">
            <p className="text-sm font-medium leading-relaxed text-slate-50">{data.bachelorHeadingLine1}</p>
            <p className="text-sm leading-relaxed text-slate-400">{data.bachelorHeadingLine2}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.bachelorCards.map((ph) => (
              <div key={ph.id} className="min-w-0">
                <GalleryFigure ph={ph} />
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-sm font-medium leading-relaxed text-slate-50">{data.masterHeadingLine1}</p>
            <p className="text-sm leading-relaxed text-slate-400">{data.masterHeadingLine2}</p>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {data.masterCards.map((ph) => (
              <div key={ph.id} className="min-w-0">
                <GalleryFigure ph={ph} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
