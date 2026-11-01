import React, { useEffect, useRef, useState } from 'react';
import { Conversation, Hero, useConversation } from './Chat.jsx';
import { AboutPage, AnimePage, ContactPage, ExperiencePage, GamingPage, NotFoundPage, OffClockPage, ProjectDetail, ProjectsPage } from './Pages.jsx';
import Sky, { isDarkTime, sceneFor, timeOfDay } from './Sky.jsx';
import { profile, projectGroups, projects, socials } from './data.js';

const pages = {
  '/': ['New chat', null],
  '/projects': ['Side projects', ProjectsPage], '/experience': ['Experience', ExperiencePage],
  '/about': ['About', AboutPage], '/off-the-clock': ['Off the clock', OffClockPage],
  '/gaming': ['Gaming', GamingPage], '/anime': ['Anime', AnimePage], '/contact': ['Contact', ContactPage]
};

const navigation = [
  ['/about', 'bi-person', 'About'],
  ['/projects', 'bi-grid', 'Side projects'],
  ['/experience', 'bi-git', 'Experience'],
  ['/gaming', 'bi-controller', 'Gaming'],
  ['/anime', 'bi-tv', 'Anime'],
  ['/off-the-clock', 'bi-camera', 'Off the clock'],
  ['/contact', 'bi-at', 'Contact']
];

const storage = {
  get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* storage unavailable */ } }
};

// Old links used one HTML file per page (/projects.html, /projects/rag.html); map them to clean paths.
const normalize = (pathname) => pathname.replace(/(\/index)?\.html$/, '').replace(/\/$/, '') || '/';
const isHomePath = (path) => path === '/';
const knownPath = (path) => Boolean(pages[path]) || projects.some((item) => `/${item.route}` === path);

function useTheme() {
  // Read once: the `?time=` preview is dropped from the URL on the first navigation.
  const [time] = useState(timeOfDay);
  const [preference, setPreference] = useState(() => storage.get('portfolio-theme-pref', 'auto'));
  const theme = preference === 'auto' ? (isDarkTime(time) ? 'dark' : 'light') : preference;
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121212' : '#f6f6f4');
    storage.set('portfolio-theme-pref', preference);
  }, [theme, preference]);
  return { theme, preference, setPreference, scene: sceneFor(theme, time) };
}

// Single-page routing from index.html. GitHub Pages serves the same app as 404.html for deep links.
function useRouter() {
  const [route, setRoute] = useState(() => {
    const path = normalize(location.pathname);
    if (path !== location.pathname) history.replaceState(null, '', path + location.search);
    return { path, search: location.search, key: 0 };
  });
  useEffect(() => {
    const onPop = () => setRoute((current) => ({ path: normalize(location.pathname), search: location.search, key: current.key + 1 }));
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || !knownPath(normalize(url.pathname))) return;
      event.preventDefault();
      navigate(url.pathname + url.search);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('popstate', onPop); document.removeEventListener('click', onClick); };
  }, []);

  function navigate(href, { replace = false } = {}) {
    const url = new URL(href, location.href);
    history[replace ? 'replaceState' : 'pushState'](null, '', url.pathname + url.search);
    setRoute((current) => ({ path: normalize(url.pathname), search: url.search, key: current.key + 1 }));
  }

  return { ...route, navigate };
}

function App() {
  const router = useRouter();
  const { path } = router;
  const project = projects.find((item) => `/${item.route}` === path);
  const [pageTitle, Page] = project ? [project.shortTitle, null] : pages[path] || ['Not found', NotFoundPage];
  const isHome = isHomePath(path);
  const chat = useConversation();
  const { theme, preference, setPreference, scene } = useTheme();
  const [collapsed, setCollapsed] = useState(() => storage.get('portfolio-sidebar', 'open') === 'collapsed');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const promptRef = useRef(null);
  const bodyRef = useRef(null);
  const chatTitle = chat.turns[0]?.question;
  const title = isHome && chatTitle ? chatTitle : pageTitle;

  useEffect(() => { document.title = isHome && !chatTitle ? `${profile.name} · ${profile.role}` : `${title} · ${profile.name}`; }, [title, isHome]);
  useEffect(() => { storage.set('portfolio-sidebar', collapsed ? 'collapsed' : 'open'); }, [collapsed]);

  // A route change scrolls to the top and closes the mobile drawer; `?q=` asks the agent.
  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
    setDrawerOpen(false);
    setMoreOpen(false);
    const question = new URLSearchParams(router.search).get('q');
    if (isHome && question) {
      router.navigate('/', { replace: true });
      chat.ask(question);
    }
  }, [router.key]);

  useEffect(() => {
    const onKey = (event) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen((open) => !open); }
      else if ((event.metaKey || event.ctrlKey) && event.key === '.') { event.preventDefault(); setCollapsed((value) => !value); }
      else if (event.key === '/' && !typing && promptRef.current) { event.preventDefault(); promptRef.current.focus(); }
      else if (event.key === 'Escape') { setSearchOpen(false); setDrawerOpen(false); setMoreOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!moreOpen) return undefined;
    const close = (event) => { if (!event.target.closest('.more-wrap')) setMoreOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [moreOpen]);

  const toggleSidebar = () => {
    if (window.matchMedia('(min-width: 900px)').matches) setCollapsed((value) => !value);
    else setDrawerOpen((open) => !open);
  };
  const newChat = () => { chat.clear(); router.navigate('/'); setTimeout(() => promptRef.current?.focus(), 50); };

  return <div className={`app${collapsed ? ' is-collapsed' : ''}${drawerOpen ? ' drawer-open' : ''}`}>
    {drawerOpen && <button className="scrim" type="button" aria-label="Close sidebar" onClick={() => setDrawerOpen(false)} />}
    <Sidebar path={path} chatTitle={chatTitle} newChat={newChat} toggle={toggleSidebar} openSearch={() => { setSearchOpen(true); setDrawerOpen(false); }}
      preference={preference} setPreference={setPreference} />

    <div className="panel">
      <Sky scene={scene} hidden={!isHome} />
      <header className="topbar">
        <button className="icon-button sidebar-open" type="button" aria-label="Toggle sidebar" data-tip="Toggle sidebar" onClick={toggleSidebar}><i className="bi bi-layout-sidebar" aria-hidden="true" /></button>
        <nav className="crumbs" aria-label="Breadcrumb">
          {project && <><a href="/projects">Side projects</a><span className="crumb-sep">/</span></>}
          <span className="crumb-current" aria-current="page"><span key={title} className="swap-in">{title}</span></span>
        </nav>
        <div className="topbar-actions">
          <a className="pill-link" href={socials[0].href} target="_blank" rel="noopener noreferrer">GitHub<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
          <div className="more-wrap">
            <button className="icon-button" type="button" aria-label="More" aria-expanded={moreOpen} onClick={() => setMoreOpen((open) => !open)}><i className="bi bi-three-dots" aria-hidden="true" /></button>
            {moreOpen && <div className="menu more-menu" role="menu">
              <button role="menuitem" type="button" onClick={newChat}><i className="bi bi-pencil-square" aria-hidden="true" />New chat</button>
              <a role="menuitem" href={profile.resume} target="_blank" rel="noopener noreferrer"><i className="bi bi-file-earmark-text" aria-hidden="true" />Resume</a>
              <a role="menuitem" href={`mailto:${profile.email}`}><i className="bi bi-envelope" aria-hidden="true" />Email {profile.firstName}</a>
              <button role="menuitem" type="button" onClick={() => { navigator.clipboard?.writeText(location.href); setMoreOpen(false); }}><i className="bi bi-link-45deg" aria-hidden="true" />Copy link</button>
            </div>}
          </div>
          <button className="icon-button theme-button" type="button" aria-label="Toggle theme" data-tip={theme === 'dark' ? 'Light theme' : 'Dark theme'} onClick={() => setPreference(theme === 'dark' ? 'light' : 'dark')}>
            <i key={theme} className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon'} spin-in`} aria-hidden="true" />
          </button>
        </div>
      </header>
      <main ref={bodyRef} className={`panel-body${isHome ? ' is-home' : ''}`}>
        <div key={isHome ? 'home' : path} className={`route${isHome ? ' is-home' : ''}`}>
          {isHome
            ? chat.turns.length ? <Conversation chat={chat} promptRef={promptRef} openSearch={() => setSearchOpen(true)} /> : <Hero chat={chat} promptRef={promptRef} openSearch={() => setSearchOpen(true)} />
            : project ? <ProjectDetail project={project} /> : <Page />}
        </div>
      </main>
    </div>

    {searchOpen && <CommandPalette close={() => setSearchOpen(false)} navigate={router.navigate} ask={(question) => { router.navigate('/'); chat.ask(question); }} />}
  </div>;
}

function Sidebar({ path, chatTitle, newChat, toggle, openSearch, preference, setPreference }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    if (!settingsOpen) return undefined;
    const close = (event) => { if (!event.target.closest('.sidebar-footer')) setSettingsOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [settingsOpen]);
  const home = isHomePath(path);

  return <aside className="sidebar" aria-label="Sidebar">
    <div className="sidebar-head">
      <a className="wordmark" href="/" aria-label={`${profile.name}, home`}>SC</a>
      <div>
        <button className="icon-button is-quiet" type="button" aria-label="Back" data-tip="Back" onClick={() => history.back()}><i className="bi bi-arrow-left" aria-hidden="true" /></button>
        <button className="icon-button is-quiet" type="button" aria-label="Forward" data-tip="Forward" onClick={() => history.forward()}><i className="bi bi-arrow-right" aria-hidden="true" /></button>
        <button className="icon-button is-quiet" type="button" aria-label="Close sidebar" data-tip="Toggle sidebar ⌘." onClick={toggle}><i className="bi bi-layout-sidebar" aria-hidden="true" /></button>
      </div>
    </div>
    <div className="sidebar-scroll">
      <nav className="nav-list" aria-label="Main">
        <button type="button" onClick={newChat} aria-current={home && !chatTitle ? 'page' : undefined}><i className="bi bi-pencil-square" aria-hidden="true" />New chat</button>
        <button type="button" onClick={openSearch}><i className="bi bi-search" aria-hidden="true" />Search<kbd>⌘K</kbd></button>
      </nav>
      <nav className="nav-list" aria-label="Library">
        {chatTitle && <a href="/" className="nav-chat" aria-current={home ? 'page' : undefined}><i className="bi bi-chat" aria-hidden="true" /><span>{chatTitle}</span></a>}
        {navigation.map(([href, icon, label]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined}><i className={`bi ${icon}`} aria-hidden="true" />{label}</a>)}
      </nav>
      {projectGroups.map((group) => <nav className="nav-group" key={group.category} aria-label={`${group.label} projects`}>
        <p className="nav-label">{group.label}<a href="/projects" aria-label="All projects"><i className="bi bi-arrow-up-right" aria-hidden="true" /></a></p>
        {projects.filter((item) => item.category === group.category).map((item) => <a key={item.id} href={`/${item.route}`} aria-current={path === `/${item.route}` ? 'page' : undefined}>
          <img src={item.image} alt="" loading="lazy" /><span className="nav-text">{item.shortTitle}</span><span className={`dot dot-${group.tone}`} />
        </a>)}
      </nav>)}
    </div>
    <div className="sidebar-footer">
      <a className="profile-link" href="/about"><img src={profile.photo} alt="" /><span><strong>{profile.name}</strong><small>{profile.role}</small></span></a>
      <button className={`icon-button is-quiet settings-button${settingsOpen ? ' is-open' : ''}`} type="button" aria-label="Settings" aria-expanded={settingsOpen} onClick={() => setSettingsOpen((open) => !open)}><i className="bi bi-gear" aria-hidden="true" /></button>
      {settingsOpen && <div className="menu settings-menu">
        <p className="menu-label">Theme</p>
        <div className="segmented" role="radiogroup" aria-label="Theme" style={{ '--index': ['auto', 'light', 'dark'].indexOf(preference) }}>
          <span className="segmented-thumb" aria-hidden="true" />
          {[['auto', 'Sky'], ['light', 'Light'], ['dark', 'Dark']].map(([value, label]) => <button key={value} type="button" role="radio" aria-checked={preference === value} onClick={() => setPreference(value)}>{label}</button>)}
        </div>
        <p className="settings-note">Sky follows your local time: light from 5am, dark from 5pm.</p>
        <p className="menu-label">Find {profile.firstName} on</p>
        {socials.map((item) => <a key={item.name} className="menu-row" href={item.href} target="_blank" rel="noopener noreferrer"><i className={`bi ${item.icon}`} aria-hidden="true" />{item.name}</a>)}
      </div>}
    </div>
  </aside>;
}

function CommandPalette({ close, navigate, ask }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const q = query.trim().toLowerCase();
  const matches = (text) => text.toLowerCase().includes(q);
  const goTo = [['/', 'bi-pencil-square', 'New chat'], ...navigation]
    .filter(([, , label]) => matches(label)).map(([href, icon, label]) => ({ href, icon, label }));
  const projectItems = projects.filter((item) => matches(`${item.shortTitle} ${item.type} ${item.summary}`))
    .map((item) => ({ href: `/${item.route}`, label: item.shortTitle, image: item.image, meta: `${item.type} · ${projectGroups.find((group) => group.category === item.category).label}` }));
  const askItem = q ? [{ ask: query.trim(), icon: 'bi-stars', label: `Ask “${query.trim()}”`, meta: 'portfolio agent' }] : [];
  const groups = [['Go to', goTo], ['Projects', projectItems], ['Agent', askItem]].filter(([, items]) => items.length);
  const flat = groups.flatMap(([, items]) => items);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { document.querySelector('.palette [aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const choose = (item) => { close(); item.ask ? ask(item.ask) : navigate(item.href); };
  let index = -1;

  return <div className="palette-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
      <label className="palette-input"><i className="bi bi-search" aria-hidden="true" />
        <input ref={inputRef} value={query} placeholder="Search projects, pages and links" onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => (value + 1) % Math.max(flat.length, 1)); }
          if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => (value - 1 + flat.length) % Math.max(flat.length, 1)); }
          if (event.key === 'Enter' && flat[active]) choose(flat[active]);
        }} />
        <button type="button" aria-label="Close command palette" onClick={close}><kbd>esc</kbd></button>
      </label>
      <div className="palette-results" role="listbox" aria-label="Commands">
        {groups.map(([heading, items]) => <div key={heading} className="palette-group">
          <p className="palette-heading">{heading}</p>
          {items.map((item) => {
            index += 1;
            const current = index;
            return <button key={item.href || item.ask} type="button" role="option" aria-selected={current === active} onMouseEnter={() => setActive(current)} onClick={() => choose(item)}>
              {item.image ? <img src={item.image} alt="" /> : <i className={`bi ${item.icon}`} aria-hidden="true" />}
              <span className="palette-label">{item.label}</span>
              {item.meta && <code className="palette-meta">{item.meta}</code>}
            </button>;
          })}
        </div>)}
        {flat.length === 0 && <p className="palette-empty">Nothing matches.</p>}
      </div>
      <p className="palette-foot"><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> open <kbd>esc</kbd> close</p>
    </div>
  </div>;
}

export default App;
