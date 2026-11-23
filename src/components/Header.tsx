import { useState, useSyncExternalStore } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '#/portfolio', label: 'Portfolio' },
  { href: '#/life-log', label: 'Life Log' },
  { href: '#/thoughts', label: 'Thoughts' },
  { href: '#/contact', label: 'Contact' },
];

function subscribeToRoute(update: () => void) {
  window.addEventListener('hashchange', update);
  return () => window.removeEventListener('hashchange', update);
}

const readSection = () => window.location.hash.split('/')[1] ?? '';
const navLink = 'relative rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200 aria-[current=location]:bg-white/10 aria-[current=location]:text-[var(--light)] aria-[current=location]:shadow-[inset_0_0_0_1px_#ffffff20] motion-safe:transition-colors';

export function Header() {
  const [open, setOpen] = useState(false);
  const section = useSyncExternalStore(subscribeToRoute, readSection);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/65 bg-[radial-gradient(ellipse_at_20%_0%,#9ddfff13,transparent_48%)] shadow-[0_8px_32px_#02061745] backdrop-blur-xl after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent,#9ddfff45,transparent)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#/" className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sky-200/30 bg-[radial-gradient(circle_at_35%_25%,#d9efff35,#102238_70%)] text-2xl leading-none text-sky-100 shadow-[inset_0_1px_0_#ffffff36,0_4px_14px_#02061780] group-hover:text-white motion-safe:transition-colors"
            aria-hidden
          >
            ✦
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-100">Kexin</p>
            <p className="truncate text-xs text-slate-400">Personal channel</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-slate-950/30 p-1 md:flex" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.href === `#/${section}` ? 'location' : undefined}
              className={navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-sky-100 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-200 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          <span className="sr-only">菜单</span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-slate-950 md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="移动端导航">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.href === `#/${section}` ? 'location' : undefined}
              className={navLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
