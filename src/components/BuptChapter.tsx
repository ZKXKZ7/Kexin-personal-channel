import type { PortfolioModule } from '../data/content';
import { GalleryFigure } from './GalleryFigure';

export function BuptChapter({ module }: { module: PortfolioModule }) {
  const data = module.buptChapterModal;
  if (!data) return null;
  return <div>
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
  </div>;
}
