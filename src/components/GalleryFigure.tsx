import type { TripPhoto } from '../data/content';

export function GalleryFigure({ ph }: { ph: TripPhoto }) {
  const hasImage = Boolean(ph.imageSrc?.trim());
  const hasVideo = Boolean(ph.videoSrc?.trim());
  const bodyTags = ph.bodyTags?.filter((t) => t.trim()) ?? [];
  const showTags = !hasImage && !hasVideo && bodyTags.length > 0;
  const tagSurface =
    ph.bodyTagSurfaceClass?.trim() ||
    'border border-white/20 bg-black/35 shadow-sm backdrop-blur-[2px]';

  const leadN = Math.min(
    Math.max(0, ph.bodyTagsLeadFullWidthCount ?? 0),
    bodyTags.length,
  );
  const leadTags = bodyTags.slice(0, leadN);
  const tailTags = bodyTags.slice(leadN);

  const fullRowTextClass =
    'block min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere]';
  const fullRowClass = `min-w-0 w-full rounded-md px-2 py-1.5 text-left text-[10px] font-medium leading-snug text-slate-100 sm:rounded-lg sm:px-2.5 sm:text-[11px] sm:leading-snug ${tagSurface}`;
  const pairSpanClass = `inline-flex w-fit shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 text-left text-[10px] font-medium leading-snug text-slate-100 sm:rounded-lg sm:px-2.5 sm:text-[11px] sm:leading-snug ${tagSurface}`;

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-white/10 ${
        hasImage || hasVideo ? 'bg-slate-950' : `bg-gradient-to-br ${ph.gradient}`
      }`}
    >
      <div className={showTags ? 'w-full' : 'aspect-[4/3] w-full'}>
        {hasImage ? (
          <img
            className="h-full w-full object-cover"
            src={ph.imageSrc?.startsWith('/') ? `${import.meta.env.BASE_URL}${ph.imageSrc.slice(1)}` : ph.imageSrc}
            alt={ph.label}
            loading="lazy"
            decoding="async"
          />
        ) : hasVideo ? (
          <video
            className="h-full w-full object-cover"
            src={ph.videoSrc?.startsWith('/') ? `${import.meta.env.BASE_URL}${ph.videoSrc.slice(1)}` : ph.videoSrc}
            controls
            playsInline
            preload="metadata"
            aria-label={ph.label}
          />
        ) : showTags ? (
          <div className={`w-full bg-gradient-to-br ${ph.gradient}`}>
            <ul
              className="box-border flex list-none flex-col gap-1 p-2 sm:gap-1.5 sm:p-2.5"
              aria-label={ph.label}
            >
              {leadTags.map((text, i) => (
                <li key={`lead-${i}`} className={fullRowClass}>
                  <span className={fullRowTextClass}>{text}</span>
                </li>
              ))}
              {tailTags.length >= 2 ? (
                <li className="flex w-full min-w-0 flex-row flex-nowrap gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
                  <span className={pairSpanClass}>{tailTags[0]}</span>
                  <span className={pairSpanClass}>{tailTags[1]}</span>
                </li>
              ) : tailTags.length === 1 ? (
                <li key="tail-single" className={fullRowClass}>
                  <span className={fullRowTextClass}>{tailTags[0]}</span>
                </li>
              ) : null}
              {tailTags.length >= 2
                ? tailTags.slice(2).map((text, i) => (
                    <li key={`tail-${i}`} className={fullRowClass}>
                      <span className={fullRowTextClass}>{text}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
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

