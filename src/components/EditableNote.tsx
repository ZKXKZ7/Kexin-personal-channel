import { useRef, useState, type ReactNode } from 'react';
import health from '../data/published/health.json';
import growth from '../data/published/growth.json';

type Note = { title: string; text: string; href: string; source: string };
const published: Record<'health' | 'growth', Note | null> = { health, growth };
const api = 'https://api.github.com/repos/ZKXKZ7/Kexin-personal-channel/contents/src/data/published/';

export function EditableNote({ id, children }: { id: keyof typeof published; children: ReactNode }) {
  const original = useRef<HTMLDivElement>(null);
  const secret = useRef<HTMLInputElement>(null);
  const credentials = useRef('');
  const revision = useRef('');
  const [note, setNote] = useState(published[id]);
  const [draft, setDraft] = useState<Note | null>(null);
  const [login, setLogin] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const url = api + id + '.json';

  function close() {
    credentials.current = '';
    setDraft(null);
    setLogin(false);
  }

  async function edit() {
    const token = secret.current?.value.trim();
    if (!token) return;
    setBusy(true);
    try {
      const headers = { Authorization: 'Bearer ' + token };
      const user = await fetch('https://api.github.com/user', { headers });
      if (!user.ok || (await user.json()).login.toLowerCase() !== 'zkxkz7') throw Error('请使用站主的 GitHub Token。');
      const response = await fetch(url + '?ref=main', { headers, cache: 'no-store' });
      if (!response.ok) throw Error('无法读取最新版本，请重试。');
      const file = await response.json();
      const latest: Note | null = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(file.content), c => c.charCodeAt(0))));
      const article = original.current?.querySelector('article');
      const link = article?.querySelector('a');
      if (!latest && (!article || !link)) throw Error('请刷新页面后重试。');
      setDraft(latest ?? { title: article!.querySelector('h2')!.textContent!, text: Array.from(article!.querySelectorAll('p,li'), el => el.textContent).join('\n\n'), href: link!.href, source: link!.textContent! });
      revision.current = file.sha;
      credentials.current = token;
      setLogin(false);
      setStatus('');
    } catch (e) { setStatus(e instanceof Error ? e.message : '读取失败'); }
    finally { setBusy(false); }
  }

  async function save() {
    if (!draft || !draft.title.trim() || !draft.text.trim()) return;
    setBusy(true);
    try {
      const bytes = new TextEncoder().encode(JSON.stringify(draft, null, 2) + '\n');
      const response = await fetch(url, { method: 'PUT', headers: { Authorization: 'Bearer ' + credentials.current, 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Update published ' + id + ' note', branch: 'main', sha: revision.current, content: btoa(Array.from(bytes, b => String.fromCharCode(b)).join('')) }) });
      if (!response.ok) throw Error(response.status === 409 ? '便签已有新版。请复制草稿，取消后重新编辑。' : '未能发布，请检查网络和 Token 的仓库内容写入权限。');
      setNote(draft);
      close();
      setStatus('已提交，部署完成后所有访客都能看到。');
    } catch (e) { setStatus(e instanceof Error ? e.message : '保存失败'); }
    finally { setBusy(false); }
  }

  return <section className="my-8">
    {draft ? <article className="reader-paper rounded-sm bg-amber-100 p-6 text-stone-900">
      <input aria-label="便签标题" className="w-full bg-transparent text-xl font-bold" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} />
      <textarea aria-label="便签正文" className="my-4 w-full bg-transparent leading-relaxed" rows={14} value={draft.text} onChange={e => setDraft({ ...draft, text: e.target.value })} />
      <button disabled={busy || !draft.title.trim() || !draft.text.trim()} onClick={save}>保存并公开发布</button>
      <button className="ml-5" disabled={busy} onClick={close}>取消</button>
    </article> : <div ref={original}>{note ? <article className="reader-paper max-w-2xl rounded-sm bg-amber-100 p-6 text-stone-900">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p className="my-4 whitespace-pre-wrap leading-relaxed">{note.text}</p>
      <a className="text-sm underline" href={note.href}>{note.source}</a>
    </article> : children}</div>}
    {login ? <form className="mt-3 flex flex-wrap items-center gap-3" onSubmit={e => { e.preventDefault(); void edit(); }}>
      <label>站主 GitHub Token <input className="text-stone-900" ref={secret} type="password" required autoComplete="off" /></label>
      <button disabled={busy}>验证并编辑</button><button type="button" disabled={busy} onClick={close}>取消</button>
    </form> : !draft && <button className="mt-3 text-sm underline" onClick={() => { setLogin(true); setStatus(''); }}>站主编辑</button>}
    <p role="status">{status}</p>
  </section>;
}
