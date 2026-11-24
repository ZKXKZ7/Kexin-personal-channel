import type { TravelTrip } from '../data/content';

export function TravelAlbum({ trip }: { trip: TravelTrip }) {
  const Icon = trip.icon;
  return (
    <section aria-label={trip.name + '旅行相册'} className="rounded-2xl bg-[#ded5c3] px-8 py-12 text-[#494037] shadow-inner sm:px-14">
      <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#857663]/40 pb-4">
        <h2 className="font-serif text-2xl italic">{trip.region}</h2>
        <time dateTime={trip.month} className="font-mono text-sm tracking-widest">{trip.month?.replace('-', ' / ')}</time>
      </header>
      <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:gap-16">
        {trip.photos.map(photo => (
          <figure key={photo.id} className="relative mx-auto w-full max-w-md rotate-[-2deg] bg-[#fffaf0] p-3 shadow-lg even:rotate-[2deg]">
            <span aria-hidden className="absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 rotate-[-5deg] border-x border-dashed border-[#b8a67b] bg-[#cdbb8d]/80" />
            {photo.imageSrc ? (
              <img src={photo.imageSrc.startsWith('/') ? import.meta.env.BASE_URL + photo.imageSrc.slice(1) : photo.imageSrc} alt={photo.label} loading="lazy" className="aspect-[4/3] w-full bg-[#e9e3d7] object-contain" />
            ) : (
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-[#c8beab] bg-[#eee8dc] text-[#766c5c]">
                <Icon size={30} strokeWidth={1} aria-hidden />
                <span className="text-xs tracking-widest">照片待放入</span>
              </div>
            )}
            <figcaption className="px-2 pb-1 pt-4 font-serif text-lg italic">{photo.imageSrc ? photo.label : trip.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
