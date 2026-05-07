import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const nav = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#life-log', label: 'Life Log' },
  { href: '#thoughts', label: 'Thoughts' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-sky-400/35 bg-white/5 text-lg"
            aria-hidden
          >
            🌟
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-100">Kexin</p>
            <p className="truncate text-xs text-slate-400">Personal channel</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-sky-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-sky-300 md:hidden"
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
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
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
