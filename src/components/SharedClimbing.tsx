import { useEffect, useState } from 'react';
import { Climbing, readGyms, sharedDraftKey } from './Climbing';
import type { Gym } from './Climbing';

type Member = { id: string; name: string; avatar: string; gyms: Gym[] };
const endpoint = import.meta.env.VITE_SHARED_CLIMBING_API?.replace(/\/$/, '');
const identityKey = 'climbing-community-identity-v1';
const nameKey = 'climbing-community-name-v1';

export function SharedClimbing() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState(() => localStorage.getItem(nameKey) || '');
  const [avatar, setAvatar] = useState(() => localStorage.getItem(nameKey + '-avatar') || '🧗');
  const [ownId, setOwnId] = useState(() => localStorage.getItem(identityKey + '-id'));
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function refresh(signal?: AbortSignal) {
    if (!endpoint) return;
    const response = await fetch(endpoint + '/footprints', { signal });
    if (!response.ok) throw new Error('读取失败');
    setMembers(await response.json());
  }

  useEffect(() => {
    const controller = new AbortController();
    refresh(controller.signal).catch(() => {
      if (!controller.signal.aborted) setStatus('暂时无法读取共享足迹。');
    });
    return () => controller.abort();
  }, []);

  async function publish() {
    if (!endpoint || !name.trim() || busy) return;
    setBusy(true);
    setStatus('');
    try {
      const token = localStorage.getItem(identityKey) || crypto.randomUUID();
      localStorage.setItem(identityKey, token);
      const response = await fetch(endpoint + '/footprints', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ name: name.trim(), avatar, gyms: readGyms(sharedDraftKey) }),
      });
      if (!response.ok) throw new Error('发布失败');
      const { id } = await response.json();
      localStorage.setItem(nameKey, name.trim());
      localStorage.setItem(identityKey + '-id', id);
      localStorage.setItem(nameKey + '-avatar', avatar);
      setOwnId(id);
      await refresh();
      setStatus('共享足迹已更新。');
    } catch {
      setStatus('暂时无法更新共享地图，请稍后重试。');
    } finally {
      setBusy(false);
    }
  }

  return <>
    <Climbing standalone communityGyms={members.filter(member => member.id !== ownId).flatMap(member => member.gyms)} />
    <section className="mx-auto max-w-5xl space-y-5 px-5 pb-12">
      <h2 className="text-2xl font-semibold">同行岩友</h2>
      {endpoint ? <form className="flex flex-wrap items-end gap-3" onSubmit={event => {
        event.preventDefault();
        void publish();
      }}>
        <label className="text-sm">你的昵称
          <input className="atlas-input" required maxLength={32} value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label className="text-sm">头像
          <select className="atlas-input" value={avatar} onChange={event => setAvatar(event.target.value)}>
            {['🧗', '⛰️', '🦊', '🐈', '🐼', '🌙'].map(icon => <option key={icon}>{icon}</option>)}
          </select>
        </label>
        <button disabled={busy} className="rounded-lg bg-emerald-300 px-4 py-2 text-slate-950">发布我的足迹</button>
        <button type="button" className="px-3 py-2 text-emerald-300" onClick={() => {
          void refresh().catch(() => setStatus('暂时无法读取共享足迹。'));
        }}>刷新足迹</button>
        <p className="basis-full text-xs text-slate-400">发布后，拿到链接的人可以看到你的昵称和到访地点。用当前浏览器更新你的记录。</p>
      </form> : <p className="text-sm text-slate-400">共享服务尚未配置，当前可以保存草稿。</p>}
      {status && <p role="status" className="text-sm">{status}</p>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {members.map(member => <li key={member.id} className="rounded-xl border border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-emerald-900 text-emerald-100">{member.avatar || Array.from(member.name)[0]}</span>
            <div><h3 className="font-semibold">{member.name}</h3>
              <p className="text-xs text-slate-400">{new Set(member.gyms.map(gym => gym.city)).size} 座城市 · {member.gyms.length} 家岩馆</p>
            </div>
          </div>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {member.gyms.map(gym => <li key={gym.id}>{gym.city} · {gym.name}</li>)}
          </ul>
        </li>)}
      </ul>
    </section>
  </>;
}
