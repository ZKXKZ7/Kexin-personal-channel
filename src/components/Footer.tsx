import { DepthScene } from './DepthScene';
import { Github, Twitter, Mail } from 'lucide-react';

const links = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  { href: 'mailto:hello@example.com', label: 'Email', icon: Mail },
];

export function Footer({ standalone = false }: { standalone?: boolean }) {
  return (
    <footer id="contact" className="bg-transparent">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className={standalone
          ? "depth-stage depth-contact"
          : "depth-panel depth-glass relief-card flex flex-col items-start justify-between gap-8 rounded-2xl border p-6 sm:flex-row sm:items-center"
        }>
          {standalone && <DepthScene />}
          <div className="space-y-1">
            {standalone
              ? <h1 className="depth-title mb-4 font-bold">保持联系</h1>
              : <p className="text-sm font-semibold text-slate-100">保持联系</p>}
            <p className="text-sm text-slate-400">欢迎交流产品、AI 协作与国际化体验相关话题。</p>
          </div>
          <nav className="flex flex-wrap gap-3" aria-label="社交链接">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="depth-panel depth-link relief-card inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-sky-400/35 hover:text-sky-300"
              >
                <span className="relief-emblem grid h-7 w-7 place-items-center"><Icon className="h-4 w-4 text-sky-300" strokeWidth={1.75} aria-hidden /></span>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">Built with Cursor & Love</p>
      </div>
    </footer>
  );
}
