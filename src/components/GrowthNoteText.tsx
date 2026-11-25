import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Eraser, Highlighter } from 'lucide-react';
import lines from '../data/growth-note.json';
import './GrowthNoteText.css';

const endpoint = import.meta.env.VITE_NOTE_MARKS_URL || 'https://kexin-note-marks.kexin-personal-channel.workers.dev/growth/v1';
const empty = '0'.repeat(lines.flat().join('').length);
const legacyKey = 'growth-note-highlights:' + lines.flat().join('');
const colors = ['#d89213','#6f57ba','#168f80','#c55272','#4385bf','#bf673f',
  '#729036','#ae5396','#248f9f','#847139','#5b72c2','#ab645b'];
type Layer = { ink: number; bits: string };
type Span = [number, number];

function visitorToken() {
  const key = 'growth-note-visitor';
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const token = crypto.randomUUID();
  localStorage.setItem(key, token);
  return token;
}

function brush(inks: number[]): CSSProperties {
  const fills = inks.filter(ink => ink < 0 || ink % 2 === 0);
  const waves = inks.filter(ink => ink >= 0 && ink % 2 === 1);
  const images: string[] = [];
  const sizes: string[] = [];
  const positions: string[] = [];
  waves.forEach((ink, i) => {
    const color = colors[ink % colors.length];
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="4"><path d="M-2.5 2Q0 -1 2.5 2T7.5 2T12.5 2" fill="none" stroke="'+color+'" stroke-width="1.3"/></svg>';
    images.push('url("data:image/svg+xml,' + encodeURIComponent(svg) + '")');
    sizes.push('10px 4px');
    positions.push('left bottom ' + (i % 3) * 2 + 'px');
  });
  if (fills.length) {
    const stops = fills.map((ink,i) => {
      const color = ink < 0 ? '#fcd34d99' : colors[ink % colors.length] + '59';
      return color + ' ' + 100*i/fills.length + '% ' + 100*(i+1)/fills.length + '%';
    });
    images.push('linear-gradient(to bottom,' + stops.join(',') + ')');
    sizes.push('100% 65%');
    positions.push('left bottom 12%');
  }
  return { backgroundImage: images.join(','), backgroundSize: sizes.join(','),
    backgroundPosition: positions.join(','), backgroundRepeat: 'repeat-x' };
}

export function GrowthNoteText() {
  const body = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const revision = useRef(0);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [legacy, setLegacy] = useState(() => {
    try {
      const bits = localStorage.getItem(legacyKey);
      if (bits?.length === empty.length && /^[01]+$/.test(bits)) return bits;
    } catch { /* Public annotations remain readable. */ }
    return empty;
  });
  const [selection, setSelection] = useState<Span | null>(null);
  const [message, setMessage] = useState('');
  const [offline, setOffline] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    let reading = false;
    async function refresh() {
      if (reading || busy.current || document.hidden) return;
      const version = revision.current;
      reading = true;
      try {
        if (!endpoint) throw new Error();
        const response = await fetch(endpoint, { signal: abort.signal, cache: 'no-store' });
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (version === revision.current && !abort.signal.aborted) {
          setLayers(data);
          setOffline(false);
        }
      } catch {
        if (!abort.signal.aborted && version === revision.current) setOffline(true);
      } finally { reading = false; }
    }
    function updateSelection() {
      const selected = window.getSelection();
      const range = selected?.rangeCount ? selected.getRangeAt(0) : null;
      if (!range || range.collapsed || !body.current?.contains(range.commonAncestorContainer)) {
        setSelection(null);
        return;
      }
      const before = range.cloneRange();
      before.selectNodeContents(body.current);
      before.setEnd(range.startContainer, range.startOffset);
      const start = before.toString().length;
      setSelection([start, start + range.toString().length]);
      setMessage('');
    }
    void refresh();
    const timer = window.setInterval(refresh, 6000);
    document.addEventListener('visibilitychange', refresh);
    document.addEventListener('selectionchange', updateSelection);
    return () => {
      abort.abort();
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
      document.removeEventListener('selectionchange', updateSelection);
    };
  }, []);

  async function apply(erase: boolean) {
    if (busy.current) return;
    if (!selection) {
      setMessage(erase ? '选中要擦除的文字，再点橡皮擦。' : '选中便签文字，再点画重点。');
      return;
    }
    const [start, end] = selection;
    busy.current = true;
    revision.current++;
    setSaving(true);
    try {
      if (!endpoint) throw new Error();
      const response = await fetch(endpoint, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + visitorToken() },
        body: JSON.stringify({ start, end, erase }),
      });
      if (!response.ok) throw new Error();
      setLayers(await response.json());
      setOffline(false);
      if (erase && legacy.slice(start,end).includes('1')) {
        const next = legacy.slice(0,start) + '0'.repeat(end-start) + legacy.slice(end);
        setLegacy(next);
        localStorage.setItem(legacyKey,next);
      }
      window.getSelection()?.removeAllRanges();
      setSelection(null);
      setMessage(erase ? '已擦除选区内自己的笔迹。' : '已标记，其他访客也能看到。');
    } catch { setMessage('未能保存，请检查网络及浏览器存储后重试。'); }
    finally { busy.current = false; setSaving(false); }
  }

  const visible = legacy.includes('1') ? [...layers, { ink: -1, bits: legacy }] : layers;
  let offset = 0;
  function decorate(text: string) {
    const pieces = [];
    let i = 0;
    while (i < text.length) {
      const active = visible.filter(layer => layer.bits[offset+i] === '1').map(layer => layer.ink);
      let end = i + 1;
      while (end < text.length && visible.every(layer => layer.bits[offset+i] === layer.bits[offset+end])) end++;
      pieces.push(active.length ? <span key={i} style={brush(active)}>{text.slice(i,end)}</span> : text.slice(i,end));
      i = end;
    }
    offset += text.length;
    return pieces;
  }
  return (
    <section className="reader-note">
      <article className="reader-paper relative rounded-sm bg-amber-100 px-6 py-7 text-stone-900 shadow-lg sm:px-8">
        <span aria-hidden="true" className="absolute -top-2 left-8 h-4 w-16 -rotate-3 bg-amber-300/80" />
        <h2 className="text-xl font-bold">AI 时代，哪些投入会让人有更多选择？</h2>
        <p className="mt-4 leading-relaxed">游戏换了版本，装备的用处也会变。在 AI 时代，哪些能力值得优先投入？衡量一项投入，可以问三个问题：我还有多少精力做事？工具把我的能力扩展到了哪里？我能直接接触到哪些人和机会？</p>
        <div ref={body} className="select-text">
          <p className="mt-4 font-semibold">{decorate(lines[0][0])}</p>
          <div className="mt-4 space-y-3 text-base leading-relaxed">
            <p>{decorate(lines[1][1])}</p>
            <ol className="list-decimal space-y-2 pl-6">
              {lines.slice(2).map(([label,text]) => <li key={label}><strong>{decorate(label)}</strong>{decorate(text)}</li>)}
            </ol>
          </div>
        </div>
        <p className="mt-4 leading-relaxed"><strong>日常练习。</strong>每周至少锻炼两次，亲手试用 Claude Code 等工具，找机会直接用英语交流。尤其在使用 AI 时，判断结果好在哪里、还缺什么，是人要练的本事。</p>
        <a className="mt-5 inline-block text-sm text-stone-700 underline underline-offset-4" href="https://www.xiaohongshu.com/explore/6b030edc0000000009020a3c?xsec_token=ABkVwEP4vW9vXxQkbo68OdGqgn7EBdoYZ5Dtx9UzEk4tA%3D&amp;xsec_source=pc_share">原视频 ·「阿布布的思考笔记」↗</a>
      </article>
      <aside className="reader-tools" aria-label="便签标记工具">
        <div className="reader-pens">
          <button type="button" disabled={saving} onPointerDown={event => event.preventDefault()} onClick={() => apply(false)}>
            <Highlighter aria-hidden="true" /><span>画重点</span>
          </button>
          <button type="button" disabled={saving} onPointerDown={event => event.preventDefault()} onClick={() => apply(true)}>
            <Eraser aria-hidden="true" /><span>橡皮擦</span>
          </button>
        </div>
        <p role="status">{saving ? '正在保存…' : message || (offline ? '共享笔迹暂时无法加载' : '选中文字，留下你的笔迹')}</p>
      </aside>
    </section>
  );
}
