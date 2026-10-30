import React, { useEffect, useRef, useState } from 'react';
import { answer, slashCommands, stepSummary } from './agent.js';
import { profile, projectGroups, projects, socials } from './data.js';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const external = (href) => (/^(https?:|mailto:)/.test(href) ? { target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : {});
const toneOf = (project) => projectGroups.find((group) => group.category === project.category)?.tone || 'gray';

const suggestions = [
  ['What is Sarthak building?', 'What is Sarthak building right now?'],
  ['AI projects', 'Show me his AI projects'],
  ['Work history', 'Walk me through his experience'],
  ['Tech stack', 'What is his tech stack?'],
  ['Why hire Sarthak?', 'Why should I hire Sarthak?'],
  ['Off the clock', 'What does he do for fun?']
];

const models = {
  high: { name: 'SC-1 High', icon: 'bi-stars', detail: 'Full answers with tools, files and sources' },
  fast: { name: 'SC-1 Fast', icon: 'bi-lightning-charge', detail: 'One or two lines, straight to the point' }
};

function readMode() {
  try { return localStorage.getItem('portfolio-answer-mode') === 'fast' ? 'fast' : 'high'; }
  catch { return 'high'; }
}

// Conversation state lives above the router so a chat survives page changes, like a real assistant.
export function useConversation() {
  const [turns, setTurns] = useState([]);
  const [mode, setMode] = useState(readMode);
  const timers = useRef([]);
  const busy = turns.some((turn) => turn.phase !== 'done');

  useEffect(() => { try { localStorage.setItem('portfolio-answer-mode', mode); } catch { /* storage unavailable */ } }, [mode]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const update = (id, patch) => setTurns((list) => list.map((turn) => turn.id === id ? { ...turn, ...patch } : turn));
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  function run(id, question, turnMode) {
    const result = answer(question);
    const fast = turnMode === 'fast';
    const text = fast ? result.fast || result.text : result.text;
    const steps = result.steps || [];
    update(id, { result, text, steps, phase: 'working', progress: { step: -1, result: 0 }, chars: 0, feedback: null, stopped: false });

    if (reducedMotion()) { update(id, { phase: 'done', progress: { step: steps.length, result: 0 }, chars: text.length }); return; }

    // Reveal each step, then each of its results, then stream the reply character by character.
    const beat = fast ? 140 : 420;
    let at = fast ? 120 : 260;
    steps.forEach((step, index) => {
      later(() => update(id, { progress: { step: index, result: 0 } }), at);
      at += beat;
      (step.results || []).forEach((_, resultIndex) => {
        later(() => update(id, { progress: { step: index, result: resultIndex + 1 } }), at);
        at += fast ? 60 : 170;
      });
      if (step.output) at += fast ? 60 : 200;
    });
    later(() => {
      update(id, { phase: 'streaming', progress: { step: steps.length, result: 0 } });
      let chars = 0;
      const tick = () => {
        chars = Math.min(text.length, chars + (fast ? 5 : 3));
        update(id, chars >= text.length ? { chars, phase: 'done' } : { chars });
        if (chars < text.length) later(tick, 14);
      };
      tick();
    }, at + 120);
  }

  function ask(raw) {
    const question = raw.trim();
    if (!question || busy) return;
    if (question.toLowerCase() === '/clear') { clear(); return; }
    const id = `${Date.now()}`;
    const command = slashCommands.find((item) => item.command === question.toLowerCase());
    setTurns((list) => [...list, { id, question: command?.prompt || question, mode, phase: 'working', steps: [], progress: { step: -1, result: 0 }, chars: 0 }]);
    run(id, question, mode);
  }

  function stop() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTurns((list) => list.map((turn) => turn.phase === 'done' ? turn : { ...turn, phase: 'done', chars: turn.text?.length ?? 0, progress: { step: turn.steps.length, result: 0 }, stopped: true }));
  }

  function clear() {
    stop();
    setTurns([]);
  }

  return {
    turns, mode, setMode, busy, ask, stop, clear,
    retry: (turn) => run(turn.id, turn.question, turn.mode),
    setFeedback: (id, value) => setTurns((list) => list.map((turn) => turn.id === id ? { ...turn, feedback: turn.feedback === value ? null : value } : turn))
  };
}

export function Hero({ chat, promptRef, openSearch }) {
  return <section className="hero" aria-labelledby="hero-title">
    <a className="identity-pill" href="/about"><img src={profile.photo} alt="" />{profile.name} · {profile.role}</a>
    <h1 id="hero-title" className="hero-title">
      {`What do you want to know about ${profile.firstName}?`.split(' ').map((word, index) => <span key={index} style={{ '--i': index }}>{word}{' '}</span>)}
    </h1>
    <nav className="social-chips" aria-label="Social links">
      {socials.map((item) => <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"><i className={`bi ${item.icon}`} aria-hidden="true" />{item.name}</a>)}
    </nav>
    <Prompt chat={chat} promptRef={promptRef} openSearch={openSearch} />
    <div className="suggestion-row" aria-label="Suggested questions">
      {suggestions.map(([label, question], index) => <button key={label} type="button" style={{ '--i': index }} onClick={() => chat.ask(question)}>{label}</button>)}
    </div>
    <p className="hero-hint"><kbd>⌘ K</kbd> to search · <kbd>/</kbd> for commands · Answers come from {profile.firstName}’s real work</p>
  </section>;
}

export function Conversation({ chat, promptRef, openSearch }) {
  const endRef = useRef(null);
  const last = chat.turns[chat.turns.length - 1];
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end', behavior: reducedMotion() ? 'auto' : 'smooth' }); }, [chat.turns.length, last?.phase, last?.progress?.step, last?.progress?.result]);

  return <section className="conversation" aria-label="Conversation">
    <div className="turns" aria-live="polite">
      {chat.turns.map((turn, index) => <Turn key={turn.id} turn={turn} last={index === chat.turns.length - 1} chat={chat} />)}
      <div ref={endRef} className="turns-end" />
    </div>
    <div className="dock">
      <Prompt chat={chat} promptRef={promptRef} openSearch={openSearch} docked />
      <p className="dock-note">Scripted from {profile.firstName}’s portfolio data, so it won’t make things up.</p>
    </div>
  </section>;
}

function usePopover(open, setOpen, ref) {
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', onKey); };
  }, [open]);
}

function Prompt({ chat, promptRef, openSearch, docked }) {
  const [value, setValue] = useState('');
  const [slashOpen, setSlashOpen] = useState(false);
  const [activeCommand, setActiveCommand] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [plusView, setPlusView] = useState('root');
  const [listening, setListening] = useState(false);
  const pickerRef = useRef(null);
  const plusRef = useRef(null);
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  const commands = value.startsWith('/') && !value.includes(' ') ? slashCommands.filter((item) => item.command.startsWith(value.toLowerCase())) : [];
  const showSlash = slashOpen && commands.length > 0;

  usePopover(modelOpen, setModelOpen, pickerRef);
  usePopover(plusOpen, setPlusOpen, plusRef);
  useEffect(() => { if (!plusOpen) setPlusView('root'); }, [plusOpen]);

  useEffect(() => {
    const input = promptRef.current;
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
  }, [value]);

  function submit(text = value) {
    if (chat.busy || !text.trim()) return;
    chat.ask(text);
    setValue('');
    setSlashOpen(false);
  }

  function onKeyDown(event) {
    if (showSlash) {
      if (event.key === 'ArrowDown') { event.preventDefault(); setActiveCommand((index) => (index + 1) % commands.length); return; }
      if (event.key === 'ArrowUp') { event.preventDefault(); setActiveCommand((index) => (index - 1 + commands.length) % commands.length); return; }
      if (event.key === 'Tab') { event.preventDefault(); setValue(commands[activeCommand].command); return; }
      if (event.key === 'Enter') { event.preventDefault(); submit(commands[activeCommand].command); return; }
      if (event.key === 'Escape') { event.stopPropagation(); setSlashOpen(false); return; }
    }
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submit(); }
  }

  function listen() {
    if (!Speech || listening) return;
    const recognition = new Speech();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => setValue(event.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    setListening(true);
    recognition.start();
  }

  return <form className={`prompt${docked ? ' is-docked' : ''}`} onSubmit={(event) => { event.preventDefault(); submit(); }}>
    {showSlash && <div className="slash-menu" role="listbox" aria-label="Slash commands" style={{ '--active': Math.min(activeCommand, commands.length - 1) }}>
      <span className="slash-highlight" aria-hidden="true" />
      {commands.map((item, index) => <button key={item.command} type="button" role="option" aria-selected={index === activeCommand}
        onMouseEnter={() => setActiveCommand(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => submit(item.command)}>
        <code>{item.command}</code><span>{item.label}</span>
      </button>)}
    </div>}
    <label className="visually-hidden" htmlFor="prompt-input">Ask the portfolio agent</label>
    <textarea id="prompt-input" ref={promptRef} rows="1" value={value} placeholder={docked ? 'Ask a follow-up' : `Ask about ${profile.firstName}’s projects, stack or experience`}
      onChange={(event) => { setValue(event.target.value); setSlashOpen(true); setActiveCommand(0); }} onKeyDown={onKeyDown} />
    <div className="prompt-bar">
      <div className="plus-wrap" ref={plusRef}>
        <button className={`icon-button plus-button${plusOpen ? ' is-open' : ''}`} type="button" aria-label="Add to prompt" aria-expanded={plusOpen} onClick={() => setPlusOpen((open) => !open)}><i className="bi bi-plus-lg" aria-hidden="true" /></button>
        {plusOpen && <div className="menu plus-menu" role="menu">
          {plusView === 'root' ? <>
            <button type="button" role="menuitem" onClick={() => setPlusView('projects')}><i className="bi bi-at" aria-hidden="true" /><span><strong>Ask about a project</strong><small>Start a question about one of his projects</small></span><i className="bi bi-chevron-right menu-chevron" aria-hidden="true" /></button>
            <button type="button" role="menuitem" onClick={() => { setValue('/'); setSlashOpen(true); setPlusOpen(false); promptRef.current?.focus(); }}><i className="bi bi-slash-lg" aria-hidden="true" /><span><strong>Slash commands</strong><small>Everything the agent can answer</small></span></button>
            <button type="button" role="menuitem" onClick={() => { setPlusOpen(false); openSearch(); }}><i className="bi bi-search" aria-hidden="true" /><span><strong>Search the site</strong><small>Pages, projects and links</small></span></button>
          </> : <>
            <button type="button" className="menu-back" onClick={() => setPlusView('root')}><i className="bi bi-chevron-left" aria-hidden="true" />Projects</button>
            <div className="menu-scroll">{projects.map((project) => <button key={project.id} type="button" role="menuitem" onClick={() => { setPlusOpen(false); submit(`Tell me about ${project.shortTitle}`); }}>
              <img src={project.image} alt="" /><span><strong>{project.shortTitle}</strong><small>{project.type}</small></span><span className={`dot dot-${toneOf(project)}`} />
            </button>)}</div>
          </>}
        </div>}
      </div>
      <div className="model-picker" ref={pickerRef}>
        <button type="button" className="model-button" aria-haspopup="listbox" aria-expanded={modelOpen} onClick={() => setModelOpen((open) => !open)}>
          <i className={`bi ${models[chat.mode].icon}`} aria-hidden="true" />{models[chat.mode].name}<i className="bi bi-chevron-down model-chevron" aria-hidden="true" />
        </button>
        {modelOpen && <div className="menu model-menu" role="listbox" aria-label="Answer mode">
          {Object.entries(models).map(([key, model]) => <button key={key} type="button" role="option" aria-selected={chat.mode === key} onClick={() => { chat.setMode(key); setModelOpen(false); }}>
            <i className={`bi ${model.icon}`} aria-hidden="true" /><span><strong>{model.name}</strong><small>{model.detail}</small></span>
            {chat.mode === key && <i className="bi bi-check2 menu-check" aria-hidden="true" />}
          </button>)}
        </div>}
      </div>
      <span className="prompt-spacer" />
      {Speech && <button className={`icon-button${listening ? ' is-listening' : ''}`} type="button" aria-label="Dictate a question" aria-pressed={listening} onClick={listen}><i className="bi bi-mic" aria-hidden="true" /></button>}
      {chat.busy
        ? <button className="send-button is-stop" type="button" aria-label="Stop response" onClick={chat.stop}><span className="stop-square" /></button>
        : <button className="send-button" type="submit" aria-label="Send" disabled={!value.trim()}><i className="bi bi-arrow-up" aria-hidden="true" /></button>}
    </div>
  </form>;
}

function Turn({ turn, last, chat }) {
  const [copied, setCopied] = useState(false);
  const { result } = turn;
  const done = turn.phase === 'done';
  const fast = turn.mode === 'fast';
  const artifacts = (result?.artifacts || []).filter((item) => !fast || ['links', 'suggestions'].includes(item.type));
  let order = 0;
  return <article className="turn">
    <div className="user-bubble"><p>{turn.question}</p></div>
    <div className="agent">
      {turn.steps.length > 0 && <Steps turn={turn} />}
      {turn.phase !== 'working' && result && <p className={`agent-text${done ? '' : ' is-streaming'}`}>{turn.text.slice(0, turn.chars)}</p>}
      {done && result && <>
        {artifacts.map((artifact, index) => <div className="reveal" style={{ '--i': order++ }} key={index}><Artifact artifact={artifact} ask={chat.ask} busy={chat.busy} /></div>)}
        {result.ctas?.length > 0 && <div className="cta-row reveal" style={{ '--i': order++ }}>{result.ctas.map(([label, href]) => <a key={href} className="cta-pill" href={href} {...external(href)}>{label}<i className={`bi ${href.startsWith('http') ? 'bi-arrow-up-right' : 'bi-arrow-right'}`} aria-hidden="true" /></a>)}</div>}
        <div className="agent-actions reveal" style={{ '--i': order++ }}>
          <button type="button" aria-label="Copy response" data-tip={copied ? 'Copied' : 'Copy'} onClick={() => navigator.clipboard?.writeText(turn.text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); })}><i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} aria-hidden="true" /></button>
          <button type="button" aria-label="Helpful" data-tip="Helpful" aria-pressed={turn.feedback === 'up'} onClick={() => chat.setFeedback(turn.id, 'up')}><i className={`bi ${turn.feedback === 'up' ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`} aria-hidden="true" /></button>
          <button type="button" aria-label="Not helpful" data-tip="Not helpful" aria-pressed={turn.feedback === 'down'} onClick={() => chat.setFeedback(turn.id, 'down')}><i className={`bi ${turn.feedback === 'down' ? 'bi-hand-thumbs-down-fill' : 'bi-hand-thumbs-down'}`} aria-hidden="true" /></button>
          <button type="button" aria-label="Retry response" data-tip="Run again" disabled={chat.busy} onClick={() => chat.retry(turn)}><i className="bi bi-arrow-repeat" aria-hidden="true" /></button>
          {turn.stopped && <span className="agent-stopped">Stopped</span>}
        </div>
        {last && result.followups?.length > 0 && <div className="followups reveal" style={{ '--i': order++ }}>{result.followups.map((item) => <button key={item} type="button" disabled={chat.busy} onClick={() => chat.ask(item)}>{item}</button>)}</div>}
      </>}
    </div>
  </article>;
}

const stepIcons = { read: 'bi-file-earmark-text', run: 'bi-terminal', search: 'bi-search', think: 'bi-stars' };
const stepVerbs = { read: 'Read', run: 'Run' };

function StepList({ steps, progress, live }) {
  return <ol className="step-list">
    {steps.map((step, index) => {
      if (live && index > progress.step) return null;
      const active = live && index === progress.step;
      const shownResults = active ? (step.results || []).slice(0, progress.result) : step.results || [];
      return <li key={index} className={`step step-${step.kind}`}>
        <div className="step-line">
          <i className={`bi ${stepIcons[step.kind]}`} aria-hidden="true" />
          {stepVerbs[step.kind] && <strong>{stepVerbs[step.kind]}</strong>}
          {step.kind === 'read' || step.kind === 'run'
            ? <code className={`step-chip${active ? ' is-active' : ''}`}>{step.label}</code>
            : <span className={active ? 'shimmer-text' : undefined}>{step.label}</span>}
        </div>
        {step.output && <p className="step-output">{step.output}</p>}
        {shownResults.length > 0 && <ul className="step-results">{shownResults.map((item) => <li key={item.title}>
          {item.logo ? <img src={item.logo} alt="" /> : <i className="bi bi-globe2" aria-hidden="true" />}<strong>{item.title}</strong><span>{item.meta}</span>
        </li>)}</ul>}
      </li>;
    })}
  </ol>;
}

function Steps({ turn }) {
  if (turn.phase === 'working') {
    return <div className="steps is-live">
      <p className="shimmer-text steps-label">Working</p>
      <StepList steps={turn.steps} progress={turn.progress} live />
    </div>;
  }
  return <details className="steps">
    <summary>{stepSummary(turn.steps)}<i className="bi bi-chevron-down" aria-hidden="true" /></summary>
    <StepList steps={turn.steps} progress={turn.progress} />
  </details>;
}

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="tool-copy" aria-label={label} data-tip={copied ? 'Copied' : label}
    onClick={(event) => { event.stopPropagation(); navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }); }}>
    <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} aria-hidden="true" />
  </button>;
}

function highlightJson(line) {
  const parts = [];
  const pattern = /("(?:[^"\\]|\\.)*")(\s*:)?|([{}[\],])/g;
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(line))) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    if (match[1]) parts.push(<span key={match.index} className={match[2] ? 'tok-key' : 'tok-string'}>{match[1]}</span>, match[2] || '');
    else parts.push(<span key={match.index} className="tok-punct">{match[3]}</span>);
    lastIndex = pattern.lastIndex;
  }
  parts.push(line.slice(lastIndex));
  return parts;
}

function highlightMarkdown(line) {
  if (line.startsWith('#')) return <span className="tok-key">{line}</span>;
  if (line.startsWith('- ')) return <><span className="tok-punct">- </span>{line.slice(2).split(/(\d[\d,]*\+?%?)/).map((part, index) => index % 2 ? <span key={index} className="tok-string">{part}</span> : part)}</>;
  return line;
}

function Artifact({ artifact, ask, busy }) {
  const [open, setOpen] = useState(true);
  switch (artifact.type) {
    case 'terminal': {
      const plain = artifact.rows.map((row) => `${row.hash}${row.head ? ' (HEAD → now)' : ''} ${row.title} @ ${row.company}  ${row.dates}`).join('\n');
      return <div className="tool-card">
        <button type="button" className="tool-head" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <i className="bi bi-terminal" aria-hidden="true" /><code className="tool-title">{artifact.command}</code><span className="tool-meta">{artifact.meta}</span><span className="tool-tag">terminal</span>
          <span className="tool-status"><i className="bi bi-check-circle" aria-hidden="true" />Completed</span><i className="bi bi-chevron-up tool-chevron" aria-hidden="true" />
        </button>
        {open && <div className="terminal">
          {artifact.rows.map((row) => <div className="terminal-row" key={row.hash}>
            <span className="terminal-main"><span className="tok-hash">{row.hash}</span>{row.head && <span className="tok-ref"> (HEAD → now)</span>} {row.title} <span className="tok-dim">@</span> {row.company}</span>
            <span className="terminal-date">{row.dates}</span>
          </div>)}
          <div className="terminal-foot"><CopyButton text={plain} label="Copy output" /><span>Completed</span></div>
        </div>}
      </div>;
    }
    case 'file':
      return <div className="tool-card">
        <div className="tool-head is-static">
          <i className={`bi ${artifact.lang === 'JSON' ? 'bi-filetype-json' : 'bi-markdown'}`} aria-hidden="true" /><code className="tool-title">{artifact.name}</code><span className="tool-tag">{artifact.lang}</span>
          <span className="tool-status"><i className="bi bi-check2" aria-hidden="true" />Ready</span><CopyButton text={artifact.lines.join('\n')} label="Copy file" />
        </div>
        <div className={`code-view${artifact.lang === 'Markdown' ? ' is-wrap' : ''}`}><table><tbody>{artifact.lines.map((line, index) => <tr key={index}>
          <td className="line-no">{index + 1}</td>
          <td className="line-code">{artifact.lang === 'JSON' ? highlightJson(line) : highlightMarkdown(line)}</td>
        </tr>)}</tbody></table></div>
      </div>;
    case 'cards':
      return <div className={`project-cards${artifact.items.length === 1 ? ' is-single' : ''}`}>{artifact.items.map((project) => <ProjectCard key={project.id} project={project} />)}</div>;
    case 'projects':
      return <div className="list-card">{artifact.items.map((project) => <a key={project.id} href={`/${project.route}`}>
        <img src={project.image} alt="" loading="lazy" /><span><strong>{project.shortTitle}<span className={`dot dot-${toneOf(project)}`} /></strong><small>{project.type}</small></span><i className="bi bi-arrow-up-right" aria-hidden="true" />
      </a>)}</div>;
    case 'list':
      return <div className="list-card">{artifact.items.map((item) => <div key={item.title} className="list-row">
        <span className="initials">{item.initials}</span><span><strong>{item.title}</strong><small>{item.meta}</small></span>
      </div>)}</div>;
    case 'links':
      return <div className="link-cards">{artifact.items.map((item) => <a key={item.name} href={item.href} {...external(item.href)}>
        <span className="link-icon"><i className={`bi ${item.icon}`} aria-hidden="true" /></span>
        <span><strong>{item.name}{item.badge && <em>{item.badge}</em>}</strong><small>{item.handle}</small></span><i className="bi bi-arrow-up-right" aria-hidden="true" />
      </a>)}</div>;
    case 'quotes':
      return <div className="quote-stack">{artifact.items.map((item) => <figure key={item.name}>
        <blockquote>“{item.quote}”</blockquote><figcaption><img src={item.photo} alt="" /><span><strong>{item.name}</strong><small>{item.title}</small></span></figcaption>
      </figure>)}</div>;
    case 'stats':
      return <dl className="stat-row">{artifact.items.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
    case 'bullets':
      return <ul className="agent-bullets">{artifact.items.map((item) => <li key={item}>{item}</li>)}</ul>;
    case 'suggestions':
      return <div className="suggestion-list">{artifact.items.map((item) => <button key={item} type="button" disabled={busy} onClick={() => ask(item)}><i className="bi bi-arrow-return-right" aria-hidden="true" />{item}</button>)}</div>;
    default:
      return null;
  }
}

export function ProjectCard({ project }) {
  return <a className="project-card" href={`/${project.route}`}>
    <span className="project-card-media"><img src={project.image} alt="" loading="lazy" /></span>
    <span className="project-card-body">
      <span className="project-card-title"><strong>{project.shortTitle}</strong><span className={`dot dot-${toneOf(project)}`} /></span>
      <small className="project-card-type">{project.type}</small>
      <span className="project-card-desc">{project.description}</span>
      <span className="mono-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</span>
    </span>
  </a>;
}
