import { useEffect, useRef, useState } from 'react';

const lines = [
  [
    "给未来的自己留点选择",
    ""
  ],
  [
    "",
    "想象一下，换一份工作、搬去另一座城市，我还能带走什么？"
  ],
  [
    "体力。",
    "练出一点余力，忙完一天，还有精神去见喜欢的人、做喜欢的事。"
  ],
  [
    "算力和品味。",
    "亲手用一流的 AI，才知道今天能做出什么。它能给我十个方案，哪个值得做、哪里还差一点，要靠自己的品味来判断。"
  ],
  [
    "英语。",
    "能读原文，也敢直接开口，就多了认识一个人、问清一个问题、抓住一次机会的可能。"
  ]
];

const noteText = lines.flat().join('');
const storageKey = 'growth-note-highlights:' + noteText;
const empty = '0'.repeat(noteText.length);

function readMarks() {
  try {
    const value = localStorage.getItem(storageKey);
    if (value?.length === empty.length && /^[01]+$/.test(value)) return value;
  } catch { /* Storage may be disabled. */ }
  return empty;
}

export function GrowthNoteText() {
  const body = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState(readMarks);
  const [selection, setSelection] = useState<[number, number] | null>(null);
  const [stored, setStored] = useState(true);

  useEffect(() => {
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
    }
    document.addEventListener('selectionchange', updateSelection);
    return () => document.removeEventListener('selectionchange', updateSelection);
  }, []);

  function apply() {
    if (!selection) return;
    const [start, end] = selection;
    const fill = marks.slice(start, end).includes('0') ? '1' : '0';
    const next = marks.slice(0, start) + fill.repeat(end - start) + marks.slice(end);
    setMarks(next);
    try {
      localStorage.setItem(storageKey, next);
      setStored(true);
    } catch { setStored(false); }
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }

  let offset = 0;
  function decorate(text: string) {
    const start = offset;
    offset += text.length;
    const runs = marks.slice(start, offset).match(/0+|1+/g) ?? [];
    let index = 0;
    return runs.map(run => {
      const part = text.slice(index, index + run.length);
      index += run.length;
      return run[0] === '1' ? <mark key={index} className="rounded-sm bg-amber-300 text-inherit">{part}</mark> : part;
    });
  }

  return (
    <>
      <div ref={body} className="select-text">
        <h2 className="text-xl font-bold">{decorate(lines[0][0])}</h2>
        <div className="mt-4 space-y-3 text-base leading-relaxed">
          {lines.slice(1).map(([label, text]) => (
            <p key={text}><strong>{decorate(label)}</strong>{decorate(text)}</p>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-amber-900/20 pt-3 text-sm">
        <button type="button" disabled={!selection} onPointerDown={event => event.preventDefault()} onClick={apply}
          className="rounded-md border border-amber-800/40 bg-amber-200 px-3 py-2 font-semibold disabled:opacity-60">
          {selection && !marks.slice(...selection).includes('0') ? '擦除重点' : '画重点'}
        </button>
        <span className="text-stone-600">{stored ? '选中文字即可标记，仅保存在当前浏览器' : '浏览器无法保存，本次阅读仍可标记'}</span>
      </div>
    </>
  );
}
