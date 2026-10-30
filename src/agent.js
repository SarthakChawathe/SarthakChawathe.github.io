import { education, experience, profile, projectDetails, projects, socials, stack, testimonials } from './data.js';

// A scripted portfolio agent. Every answer is assembled from data.js, so it never invents facts.
// An answer is a list of tool steps (shown while "working"), a streamed reply, then artifacts.

export const slashCommands = [
  { command: '/about', label: `Who ${profile.firstName} is, in one paragraph`, prompt: `Give me the short version of ${profile.firstName}` },
  { command: '/now', label: 'What he is working on today', prompt: `What is ${profile.firstName} building right now?` },
  { command: '/projects', label: 'Everything he has built', prompt: `Show me what ${profile.firstName} has built` },
  { command: '/experience', label: 'Career history as a git log', prompt: 'Walk me through his experience' },
  { command: '/stack', label: 'Languages, frameworks and tools', prompt: 'What is his tech stack?' },
  { command: '/hire', label: 'The short pitch', prompt: `Why should I hire ${profile.firstName}?` },
  { command: '/contact', label: 'Where to reach him', prompt: 'How do I reach him?' },
  { command: '/gaming', label: 'What he plays off the clock', prompt: 'What games does he play?' },
  { command: '/clear', label: 'Start a new chat', prompt: null }
];

export function yearsSince(date, end = new Date()) {
  const start = new Date(date);
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (end.getDate() < start.getDate()) months -= 1;
  return { years: Math.floor(months / 12), months: months % 12 };
}

const byId = (ids) => ids.map((id) => projects.find((item) => item.id === id)).filter(Boolean);
const career = yearsSince(profile.careerStart);
const current = experience.filter((item) => item.roles.some(([, dates]) => /present/i.test(dates)));
const email = { name: 'Email', handle: profile.email, href: `mailto:${profile.email}`, icon: 'bi-envelope', badge: 'fastest' };
const linkedin = { name: 'LinkedIn', handle: 'sarthak-chawathe', href: socials.find((item) => item.name === 'LinkedIn').href, icon: 'bi-linkedin' };
const github = { name: 'GitHub', handle: 'SarthakChawathe', href: socials.find((item) => item.name === 'GitHub').href, icon: 'bi-github' };

function shortHash(text) {
  let hash = 2166136261;
  for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return (hash >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

const span = (dates) => {
  const [from, to] = dates.split(' – ');
  return { from, to: /present/i.test(to) ? 'now' : to };
};

const careerLog = () => experience.map((item, index) => {
  const first = span(item.roles[item.roles.length - 1][1]);
  const last = span(item.roles[0][1]);
  return { hash: shortHash(item.company), head: index === 0, title: item.roles[0][0], company: item.company, dates: `${first.from} → ${last.to}` };
});

const projectResults = (list) => list.map((item) => ({ title: item.shortTitle, meta: item.type.toLowerCase() }));

const intents = [
  {
    id: 'about',
    pattern: /short (version|pitch)|who is|about (him|sarthak)|introduce|summar|tell me about (him|sarthak)$|^\/about/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'data/profile.js' }],
      text: `${profile.name} is an ${profile.role} based in ${profile.location}. He has been shipping software since 2019: enterprise systems at Tata Consultancy Services, an MS in Data Science at Indiana University, and now LLM evaluation and healthcare AI with CitiusTech and Mayo Clinic. He likes the whole arc of the work, from shaping messy data to making a model dependable enough for clinicians and product teams to trust.`,
      fast: `${profile.role} in ${profile.location}, working on LLM evaluation and healthcare AI with CitiusTech and Mayo Clinic.`,
      artifacts: [{ type: 'stats', items: [[`${career.years}+`, 'Years building'], [String(experience.length), 'Teams'], [String(projects.length), 'Projects']] }],
      ctas: [['Read the about page', '/about.html']],
      followups: ['What is he building right now?', `Why should I hire ${profile.firstName}?`, 'What is his tech stack?']
    })
  },
  {
    id: 'now',
    pattern: /building|working on|right now|currently|these days|today|^\/now/i,
    build: () => ({
      steps: [
        { kind: 'read', label: 'data/experience.js' },
        { kind: 'search', label: 'roles where end = "present"', results: current.map((item) => ({ title: item.company, meta: item.roles[0][0], logo: item.logo })) }
      ],
      text: `By day he is an AI Engineer at CitiusTech and an AI/ML Engineer at Mayo Clinic. That means prompt engineering, fine-tuning and evaluating Gemini-based LLM workflows for clinical and operational use, including an evaluation service that scores model quality across multiple metrics. He also builds decision-support prototypes on Vertex AI and BigQuery.`,
      fast: 'LLM evaluation and healthcare AI at CitiusTech and Mayo Clinic, on Gemini, Vertex AI and BigQuery.',
      artifacts: [{ type: 'file', name: 'mayo-clinic.md', lang: 'Markdown', lines: ['# Mayo Clinic · AI/ML Engineer', '', ...experience.find((item) => item.company === 'Mayo Clinic').highlights.map((line) => `- ${line}`)] }],
      ctas: [['Open full experience', '/experience.html']],
      followups: ['How does he evaluate LLMs?', 'Show me his AI projects', `Why should I hire ${profile.firstName}?`]
    })
  },
  {
    id: 'evaluation',
    pattern: /evaluat|eval\b|llm|gemini|mayo|iris|clinical|healthcare/i,
    build: () => ({
      steps: [
        { kind: 'read', label: 'data/experience.js' },
        { kind: 'search', label: 'highlights matching "evaluation"', results: [{ title: 'Mayo Clinic', meta: '50+ LLM test scenarios' }, { title: 'Ryan Linea', meta: 'recommendation' }] }
      ],
      text: 'At Mayo Clinic he designed evaluation frameworks covering 50+ LLM test scenarios: prompt testing, error analysis, edge-case validation and response-quality checks. Together with prompt engineering and fine-tuning, that work raised the accuracy, safety and contextual reliability of Gemini-based workflows by 30%. He also turns adversarial risks and edge cases into user stories, which made the solutions about 40% more robust.',
      fast: '50+ LLM test scenarios and a multi-metric evaluation service at Mayo Clinic; reliability up 30%.',
      artifacts: [{ type: 'quotes', items: testimonials.slice(0, 1) }],
      ctas: [['Open full experience', '/experience.html']],
      followups: ['What is his tech stack?', 'Tell me about the RAG project']
    })
  },
  {
    id: 'hire',
    pattern: /hire|fit|why (him|sarthak)|strength|good at|recommend|testimonial|what do (people|others|colleagues)|^\/hire/i,
    build: () => ({
      steps: [
        { kind: 'read', label: 'data/experience.js' },
        { kind: 'read', label: 'data/testimonials.js' },
        { kind: 'think', label: 'Summarising what is backed by real work.' }
      ],
      text: 'Three reasons. He makes LLMs measurable: evaluation frameworks, error analysis and edge cases, not just prompts. He covers the whole data path, from a 100,000-image scraping pipeline to BigQuery dashboards product owners actually use. And the people he has worked with say he is easy to work with, in their own words.',
      fast: 'He makes LLMs measurable, covers the full data path and is easy to work with.',
      artifacts: [{ type: 'quotes', items: testimonials.slice(0, 3) }, { type: 'links', items: [email, linkedin] }],
      followups: ['Walk me through his experience', 'How do I reach him?']
    })
  },
  {
    id: 'experience',
    pattern: /experience|career|work history|worked|company|companies|job|role|^\/experience/i,
    build: () => ({
      steps: [{ kind: 'run', label: `git log --author="${profile.firstName}" --career`, results: [{ title: `${experience.length} commits`, meta: 'since 2019' }] }],
      text: `About ${career.years} years across teams: enterprise systems at TCS, teaching and a data-science master’s at Indiana University, ML engineering at OneChimera, analytics at Gradient, and now healthcare AI with CitiusTech and Mayo Clinic.`,
      fast: 'TCS → Indiana University → OneChimera → Gradient → CitiusTech and Mayo Clinic.',
      artifacts: [{ type: 'terminal', command: `git log --author="${profile.firstName}" --career`, meta: `${experience.length} commits`, rows: careerLog() }],
      ctas: [['Open full experience', '/experience.html']],
      followups: ['What is his stack?', 'What has he built?', 'How do I reach him?']
    })
  },
  {
    id: 'stack',
    pattern: /stack|tool|tech|skill|language|framework|python|sql|cloud|^\/stack/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'stack.json' }],
      text: 'Python and SQL end to end. Gemini, Vertex AI and BigQuery are the daily drivers at work, with LangChain, Hugging Face and FAISS for retrieval and agents. Underneath that is a classic ML toolkit and enough cloud and data engineering to ship it.',
      fast: 'Python and SQL everywhere; Gemini, Vertex AI and BigQuery at work.',
      artifacts: [{ type: 'file', name: 'stack.json', lang: 'JSON', lines: JSON.stringify(Object.fromEntries(stack.map((group) => [group.job, group.items])), null, 2).split('\n') }],
      followups: ['Show me what he built with it', 'Walk me through his experience']
    })
  },
  {
    id: 'education',
    pattern: /education|degree|university|study|studied|school|college|master/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'data/education.js' }],
      text: `He holds an MS in Data Science from ${education[0].school} and a BE in Computer Engineering from ${education[1].school}. At Indiana he was also a teaching assistant for the graduate course Data Science On-Ramp.`,
      fast: 'MS in Data Science from Indiana University; BE in Computer Engineering from K.J. Somaiya.',
      artifacts: [{ type: 'list', items: education.map((item) => ({ title: item.school, meta: `${item.degree} · ${item.dates}`, initials: item.school.split(' ').map((word) => word[0]).join('').slice(0, 2) })) }],
      ctas: [['Open full experience', '/experience.html']],
      followups: ['Walk me through his experience', 'What has he built?']
    })
  },
  {
    id: 'contact',
    pattern: /contact|email|reach|connect|touch|linkedin|talk|message|^\/contact/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'data/socials.js' }],
      text: `Email is the fastest way to reach him. He is also on LinkedIn and GitHub.`,
      fast: `Email ${profile.email}.`,
      artifacts: [{ type: 'links', items: [email, linkedin, github] }],
      followups: [`Why should I hire ${profile.firstName}?`]
    })
  },
  {
    id: 'gaming',
    pattern: /gam(e|es|ing)|hitman|call of duty|last of us|play|^\/gaming/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'data/gaming.js' }],
      text: 'Off the clock he plays Hitman, Call of Duty and The Last of Us: a bit of stealth, a bit of chaos and one very good story.',
      fast: 'Hitman, Call of Duty and The Last of Us.',
      ctas: [['Open gaming', '/gaming.html']],
      followups: ['What else does he do for fun?', 'How do I reach him?']
    })
  },
  {
    id: 'offclock',
    pattern: /outside|off the clock|hobb|travel|photo|cook|fun|weekend|anime/i,
    build: () => ({
      steps: [{ kind: 'read', label: 'data/off-the-clock.js' }, { kind: 'read', label: 'data/gaming.js' }],
      text: 'Outside work he travels, takes photographs and cooks at home. When he is in, it is Hitman, Call of Duty or The Last of Us.',
      fast: 'Travel, photography, home cooking and games.',
      ctas: [['Open off the clock', '/off-the-clock.html'], ['Open gaming', '/gaming.html']],
      followups: ['What games does he play?', 'How do I reach him?']
    })
  },
  {
    id: 'projects',
    pattern: /project|built|build|shipped|portfolio|side|show me|ai work|^\/projects/i,
    build: (question) => {
      if (/\bai\b|ml|machine|model|vision|llm/i.test(question)) {
        const ai = projects.filter((item) => item.category === 'AI & machine learning');
        return {
          steps: [{ kind: 'read', label: 'data/projects.js' }, { kind: 'search', label: 'projects where category = "AI & ML"', results: projectResults(ai.slice(0, 3)) }],
          text: `${ai.length} of his projects are AI and machine learning, from multimodal RAG for visual question answering to computer vision and recommendation systems. These three are the best place to start.`,
          fast: `${ai.length} AI projects; start with multimodal RAG.`,
          artifacts: [{ type: 'cards', items: byId(['rag', 'unimatch', 'drowsiness']) }],
          ctas: [['Open all projects', '/projects.html']],
          followups: ['Tell me about the RAG project', 'What is his tech stack?']
        };
      }
      const counts = ['AI & machine learning', 'Data', 'Tools & applications'].map((category) => projects.filter((item) => item.category === category).length);
      return {
        steps: [{ kind: 'run', label: 'ls ~/projects --group-by=category', output: `${projects.length} projects found: ${counts[0]} AI & ML, ${counts[1]} data, ${counts[2]} tools.` }],
        text: `He has built ${projects.length} projects: ${counts[0]} in AI and machine learning, ${counts[1]} in data and ${counts[2]} tools. The multimodal RAG work is the strongest; SplitRight, built at a hackathon, is the most practical.`,
        fast: `${projects.length} projects; start with multimodal RAG.`,
        artifacts: [{ type: 'projects', items: projects }],
        ctas: [['Open all projects', '/projects.html']],
        followups: ['Tell me about the RAG project', 'Show me his AI projects', 'What is his stack?']
      };
    }
  }
];

function projectIntent(question) {
  const lower = question.toLowerCase();
  const keywords = {
    rag: ['rag', 'retrieval', 'vqa', 'visual question', 'multimodal'],
    auto_ml: ['automl', 'auto ml', 'no-code'],
    covid: ['covid', 'x-ray', 'xray'],
    drowsiness: ['drowsi', 'driver'],
    spaceX: ['spacex', 'falcon', 'rocket'],
    unimatch: ['unimatch', 'university recommend', 'recommendation'],
    'uber-viz': ['uber visual', 'uber viz', 'k-means'],
    'uber-analysis': ['uber'],
    splitright: ['splitright', 'pdf', 'ocr', 'hackathon'],
    portfolio: ['this site', 'this portfolio', 'website']
  };
  const id = Object.keys(keywords).find((key) => keywords[key].some((word) => new RegExp(`\\b${word}`).test(lower)));
  if (!id) return null;
  const project = projects.find((item) => item.id === id);
  const detail = projectDetails[id] || {};
  return {
    id: 'project',
    steps: [{ kind: 'read', label: `projects/${id}.md` }],
    text: `${project.title}. ${project.description}`,
    fast: project.summary,
    artifacts: [{ type: 'cards', items: [project] }, ...(detail.highlights ? [{ type: 'bullets', items: detail.highlights }] : [])],
    ctas: [['Open project page', `/${project.route}`], ['Source on GitHub', project.source]],
    followups: ['Show me his other projects', 'What is his tech stack?']
  };
}

export function answer(question) {
  const clean = question.trim();
  const command = slashCommands.find((item) => clean.toLowerCase() === item.command);
  const resolved = command?.prompt || clean;
  const project = projectIntent(resolved);
  if (project && !command) return project;
  const intent = intents.find((item) => item.pattern.test(command ? command.command : resolved));
  if (intent) return { id: intent.id, ...intent.build(resolved) };
  return {
    id: 'fallback',
    steps: [{ kind: 'search', label: 'portfolio for a matching topic', results: [] }],
    text: `I only know about ${profile.firstName}: his projects, experience, stack, what he does off the clock and how to reach him. Try one of these.`,
    fast: `I only know about ${profile.firstName}. Try one of these.`,
    artifacts: [{ type: 'suggestions', items: [`What is ${profile.firstName} building right now?`, `Show me what ${profile.firstName} has built`, 'Walk me through his experience', 'What is his tech stack?'] }]
  };
}

// "Ran 2 tools" when every step touched a file or command, otherwise "Completed 3 steps".
export function stepSummary(steps) {
  const tools = steps.filter((step) => step.kind === 'read' || step.kind === 'run').length;
  if (tools === steps.length) return `Ran ${tools} tool${tools === 1 ? '' : 's'}`;
  if (steps.length === 1 && steps[0].kind === 'search') return 'Searched the portfolio';
  return `Completed ${steps.length} steps`;
}
