import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { PortfolioModule } from '../data/content';
import { BuptChapterDetails } from './BuptChapter';

type Props = {
  module: PortfolioModule | null;
  onClose: () => void;
};

export function BuptChapterModal({ module, onClose }: Props) {
  const isBupt = module?.id === 'bupt';

  useEffect(() => {
    if (!isBupt) return;
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
  }, [isBupt, onClose]);

  if (!module || !isBupt) return null;

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
        <div className="bupt-page bupt-details overflow-y-auto">
          <BuptChapterDetails />
        </div>
      </div>
    </div>
  );
}
