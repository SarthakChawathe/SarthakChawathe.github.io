import React, { useState } from 'react';
import { yearsSince } from './agent.js';
import { ProjectCard } from './Chat.jsx';
import { education, experience, profile, projectDetails, projectGroups, projects, socials, stack, testimonials } from './data.js';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "Mar 2025 – Nov 2025" → "8 mo"; parsed by hand because Safari rejects new Date('Mar 2025').
function duration(dates) {
  const parse = (text) => /present/i.test(text) ? new Date() : new Date(Number(text.split(' ')[1]), months.indexOf(text.split(' ')[0]), 1);
  const [from, to] = dates.split(' – ').map(parse);
  const total = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth() + 1;
  const years = Math.floor(total / 12);
  return [years && `${years} yr${years > 1 ? 's' : ''}`, total % 12 && `${total % 12} mo`].filter(Boolean).join(' ');
}

function PageHeader({ path, title, children }) {
  return <header className="page-header">
    <p className="eyebrow">~/{path}</p>
    <h1>{title}</h1>
    {children && <p className="page-lede">{children}</p>}
  </header>;
}

function SectionHeading({ title, count, tone, aside }) {
  return <div className="section-heading">
    <h2>{tone && <span className={`dot dot-${tone}`} />}{title}{count !== undefined && <sup>{count}</sup>}</h2>
    {aside && <span>{aside}</span>}
  </div>;
}

export function ProjectsPage() {
  const ai = projects.filter((item) => item.category === 'AI & machine learning').length;
  return <div className="page">
    <PageHeader path="projects" title="Side projects">
      {projects.length} projects built end to end, from multimodal retrieval to a hackathon OCR tool. {ai} of them are AI and machine learning; the rest taught him how data moves.
    </PageHeader>
    {projectGroups.map((group, groupIndex) => {
      const items = projects.filter((item) => item.category === group.category);
      return <section className="page-section" key={group.category} style={{ '--i': groupIndex + 1 }}>
        <SectionHeading title={group.label} count={items.length} tone={group.tone} aside={group.tagline} />
        <div className="project-grid">{items.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </section>;
    })}
  </div>;
}

export function ProjectDetail({ project }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const detail = projectDetails[project.id] || {};
  const group = projectGroups.find((item) => item.category === project.category);
  const [lightbox, setLightbox] = useState(null);
  return <div className="page">
    <header className="page-header">
      <p className="project-status"><span className="status-pill"><span className={`dot dot-${group?.tone || 'gray'}`} />{group?.label}</span><code>{project.type}</code></p>
      <h1>{project.shortTitle}</h1>
      <p className="page-lede">{project.summary}</p>
    </header>
    <div className="button-row">
      <a className="button-primary" href={project.source} {...external}><i className="bi bi-github" aria-hidden="true" />Source<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
      {project.extra && <a className="button-ghost" href={project.extra[1]} {...external}>{project.extra[0]}<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>}
      <a className="button-quiet" href={`/?q=${encodeURIComponent(`Tell me about ${project.shortTitle}`)}`}><i className="bi bi-stars" aria-hidden="true" />Ask the agent</a>
    </div>
    <button type="button" className="project-hero" onClick={() => setLightbox(project.images[0])} aria-label="Enlarge cover image"><img src={project.images[0]} alt={`${project.shortTitle} cover`} /></button>
    <section className="page-section project-overview">
      <div><SectionHeading title="Overview" />
        <p className="prose">{project.description}</p>
        {detail.highlights && <ul className="bullet-list">{detail.highlights.map((item) => <li key={item}>{item}</li>)}</ul>}
      </div>
      <dl className="fact-list">
        <div><dt>Category</dt><dd>{project.category}</dd></div>
        <div><dt>Built at</dt><dd>{project.association}</dd></div>
        <div><dt>Stack</dt><dd><ul className="chip-list is-small">{(detail.stack || project.tags).map((item) => <li key={item}>{item}</li>)}</ul></dd></div>
      </dl>
    </section>
    {project.images.length > 1 && <section className="page-section"><SectionHeading title="Screenshots" count={project.images.length - 1} />
      <div className="screenshots">{project.images.slice(1).map((image) => <button key={image} type="button" onClick={() => setLightbox(image)} aria-label="Enlarge screenshot">
        <img src={image} alt={`${project.shortTitle} screenshot`} loading="lazy" onError={(event) => { event.currentTarget.replaceWith(Object.assign(document.createElement('span'), { className: 'image-error', textContent: 'Unable to load this image.' })); }} />
      </button>)}</div>
    </section>}
    <nav className="pager" aria-label="More projects">
      <a href={`/${previous.route}`}><small>← Previous</small>{previous.shortTitle}</a>
      <a href={`/${next.route}`}><small>Next →</small>{next.shortTitle}</a>
    </nav>
    {lightbox && <button className="lightbox" type="button" aria-label="Close screenshot" onClick={() => setLightbox(null)}><img src={lightbox} alt="" /></button>}
  </div>;
}

export function ExperiencePage() {
  const span = yearsSince(profile.careerStart);
  return <div className="page">
    <PageHeader path="experience" title={`Where ${profile.firstName} has worked`}>
      {span.years} yrs {span.months} mo since his first commit at TCS, from enterprise systems to LLM evaluation in healthcare.
    </PageHeader>
    <ol className="gitlog">
      {experience.map((item, index) => <li key={item.company} style={{ '--i': index }}>
        <span className="commit" aria-hidden="true" />
        <div className="gitlog-head">
          <img src={item.logo} alt="" />
          <div>
            <h2>{item.company}{index === 0 && <code className="head-ref">(HEAD → now)</code>}</h2>
            {item.sector && <p>{item.sector}</p>}
          </div>
        </div>
        {item.roles.map(([title, dates]) => <div className="gitlog-role" key={title}><h3>{title}</h3><time>{dates}<span> · {duration(dates)}</span></time></div>)}
        {item.highlights && <ul className="bullet-list">{item.highlights.map((line) => <li key={line}>{line}</li>)}</ul>}
        {item.stack && <ul className="chip-list is-small">{item.stack.map((tool) => <li key={tool}>{tool}</li>)}</ul>}
      </li>)}
      <li className="gitlog-root"><span className="commit" aria-hidden="true" /><code>initial commit · 2019</code></li>
    </ol>
    <section className="page-section"><SectionHeading title="Education" />
      <div className="edu-list">{education.map((item) => <div key={item.school}><strong>{item.school}</strong><span>{item.degree}</span><time>{item.dates}</time></div>)}</div>
    </section>
    <section className="page-section"><SectionHeading title="Stack" aside="What he reaches for, grouped by job to be done" />
      <div className="stack-grid">{stack.map((group) => <div key={group.job}><h3>{group.job}</h3><ul className="chip-list is-small">{group.items.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>)}</div>
    </section>
    <section className="page-section"><SectionHeading title="In their words" count={testimonials.length} />
      <div className="quote-grid">{testimonials.map((item) => <figure key={item.name}><blockquote>“{item.quote}”</blockquote><figcaption><img src={item.photo} alt="" /><span><strong>{item.name}</strong><small>{item.title}</small></span></figcaption></figure>)}</div>
    </section>
  </div>;
}

export function AboutPage() {
  const span = yearsSince(profile.careerStart);
  return <div className="page">
    <PageHeader path="about" title="AI engineering, with a data-science foundation.">
      {profile.name} is an {profile.role} in {profile.location}. He turns messy data and new AI techniques into things people can rely on.
    </PageHeader>
    <section className="about-card">
      <img src={profile.photo} alt={profile.name} />
      <div>
        <p>His path runs from computer engineering in Mumbai, through enterprise systems at TCS and a master’s in data science at Indiana University, into ML engineering and now LLM evaluation for healthcare. He enjoys the whole arc: understanding the problem, shaping the data, building the model or workflow, and proving it works.</p>
        <dl className="stat-row">
          <div><dt>Years building</dt><dd>{span.years}+</dd></div>
          <div><dt>Projects</dt><dd>{projects.length}</dd></div>
          <div><dt>Recommendations</dt><dd>{testimonials.length}+</dd></div>
        </dl>
      </div>
    </section>
    <section className="page-section"><SectionHeading title="How he works" />
      <ol className="principles">
        <li><strong>Start with the problem.</strong> Understand the context and the people before choosing a model, metric or tool.</li>
        <li><strong>Make it measurable.</strong> An LLM feature is only done when there is an evaluation that says so.</li>
        <li><strong>Ship and keep learning.</strong> Thoughtful, measurable progress over complexity for its own sake.</li>
      </ol>
    </section>
    <div className="button-row"><a className="button-primary" href="/experience.html">Experience</a><a className="button-ghost" href={profile.resume} {...external}>Resume<i className="bi bi-arrow-up-right" aria-hidden="true" /></a></div>
  </div>;
}

export function OffClockPage() {
  const photos = [
    ['/assets/images_copy/Personal/686741E2-CD58-4F3D-B1B5-F2E2B3FB690D_1_105_c.jpeg', 'By the Chicago lakefront'],
    ['/assets/images_copy/Personal/A14486C8-05B2-4B97-A67D-2A399EB8E444_1_105_c.jpeg', 'A view from a Chicago visit'],
    ['/assets/images_copy/Personal/6B0FFF6B-64CA-4DD4-9F58-9EF644DBA406_1_105_c.jpeg', 'Graduation day']
  ];
  return <div className="page">
    <PageHeader path="off-the-clock" title="Off the clock">New places, photographs and something good on the stove.</PageHeader>
    <div className="photo-grid">{photos.map(([src, caption]) => <figure key={src}><img src={src} alt={caption} loading="lazy" /><figcaption>{caption}</figcaption></figure>)}</div>
    <section className="page-section"><SectionHeading title="Favourite things" />
      <ul className="interest-rows">
        <li><span>Travel</span><small>Find a new route</small></li>
        <li><span>Photography</span><small>Keep the moment</small></li>
        <li><span>Home cooking</span><small>Make something good</small></li>
        <li><a href="/gaming.html">Gaming</a><small>Hitman, Call of Duty, The Last of Us</small></li>
      </ul>
    </section>
  </div>;
}

export function GamingPage() {
  const games = [
    { title: 'Hitman', genre: 'Stealth', image: 'https://upload.wikimedia.org/wikipedia/en/8/84/Hitman_2015.jpg', href: 'https://en.wikipedia.org/wiki/Hitman_(2016_video_game)' },
    { title: 'Call of Duty', genre: 'First-person shooter', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Call_of_Duty_logo.svg', href: 'https://en.wikipedia.org/wiki/Call_of_Duty', contain: true },
    { title: 'The Last of Us', genre: 'Action-adventure', image: 'https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg', href: 'https://en.wikipedia.org/wiki/The_Last_of_Us_(video_game)' }
  ];
  return <div className="page">
    <PageHeader path="gaming" title="Gaming">A bit of stealth, a bit of chaos and one very good story.</PageHeader>
    <section className="page-section"><SectionHeading title="Library" count={games.length} aside="Covers via Wikipedia" />
      <ul className="cover-grid">{games.map((game) => <li key={game.title}><a href={game.href} {...external}>
        <span className={`cover${game.contain ? ' is-contain' : ''}`}><img src={game.image} alt={`${game.title} cover`} loading="lazy" /></span>
        <strong>{game.title}</strong><small>{game.genre}</small>
      </a></li>)}</ul>
    </section>
    <section className="cta-card"><p>Up for a match, or want to talk shop instead?</p><a className="button-ghost" href="/contact.html">Get in touch<i className="bi bi-arrow-up-right" aria-hidden="true" /></a></section>
  </div>;
}

export function AnimePage() {
  return <div className="page">
    <PageHeader path="anime" title="Anime">The watchlist, coming soon.</PageHeader>
    <section className="empty-card">
      <i className="bi bi-tv" aria-hidden="true" />
      <h2>Nothing on rotation yet</h2>
      <p>{profile.firstName} hasn’t picked which shows to share. Have a recommendation?</p>
      <a className="button-ghost" href={`mailto:${profile.email}?subject=Anime%20recommendation`}>Suggest one<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
    </section>
  </div>;
}

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  return <div className="page">
    <PageHeader path="contact" title="Get in touch">AI engineering, data-heavy products, or a problem worth solving. Email is the fastest way to reach him.</PageHeader>
    <div className="email-card">
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <button type="button" className="button-ghost" onClick={() => navigator.clipboard?.writeText(profile.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); })}>
        <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} aria-hidden="true" />{copied ? 'Copied' : 'Copy'}
      </button>
    </div>
    <section className="page-section"><SectionHeading title="Elsewhere" />
      <ul className="link-rows">{socials.map((item) => <li key={item.name}><a href={item.href} {...external}><i className={`bi ${item.icon}`} aria-hidden="true" />{item.name}<i className="bi bi-arrow-up-right" aria-hidden="true" /></a></li>)}</ul>
    </section>
  </div>;
}

export function NotFoundPage() {
  return <div className="page not-found">
    <p className="eyebrow">404</p>
    <h1>This page went out of scope.</h1>
    <p className="page-lede">The link may be old, or the page was renamed.</p>
    <div className="button-row"><a className="button-primary" href="/">New chat</a><a className="button-ghost" href="/projects.html">All projects</a></div>
  </div>;
}
