(() => {
  const scriptUrl = document.currentScript.src;
  const siteRoot = new URL('../../', scriptUrl);
  let shellTarget = document.querySelector('#app-shell');
  if (!shellTarget && document.body.classList.contains('portfolio-details-page')) {
    shellTarget = document.createElement('div');
    shellTarget.id = 'app-shell';
    document.body.prepend(shellTarget);
    document.querySelector('#header')?.remove();
    document.body.classList.add('app-page');
    const projectTitle = document.querySelector('.portfolio-info h3')?.textContent.trim();
    document.body.dataset.page = projectTitle ? `Project / ${projectTitle}` : 'Project details';
  }
  const routes = {
    home: 'index.html', projects: 'projects.html', experience: 'experience.html', about: 'about.html',
    offclock: 'off-the-clock.html', gaming: 'gaming.html', anime: 'anime.html', contact: 'contact.html',
    resume: 'assets/pdf/Sarthak_Chawathe_Latest.pdf', rag: 'projects/rag.html',
    automl: 'projects/auto_ml.html', unimatch: 'projects/unimatch.html', covid: 'projects/covid.html',
    drowsiness: 'projects/drowsiness.html', spacex: 'projects/spaceX.html',
    'uber-viz': 'projects/uber_data_viz.html', 'uber-analysis': 'projects/uber_data_analyis.html',
    splitright: 'projects/splitright.html'
  };
  const answers = [
    { match: /rag|retrieval|multimodal|visual question/i, text: 'I built a multimodal Retrieval-Augmented Generation project for outside-knowledge visual question answering. It explores bringing relevant external knowledge into an LLM at inference time instead of relying on extensive retraining.', sources: [['Multimodal RAG', 'projects/rag.html'], ['All projects', 'projects.html']] },
    { match: /experience|career|work|company|job/i, text: 'My experience spans AI engineering, data science, and software engineering across healthcare, research, and product teams. The experience page has the roles, dates, and education listed in my resume.', sources: [['Experience', 'experience.html']] },
    { match: /skill|tool|stack|technology|language/i, text: 'My portfolio lists machine learning, deep learning, statistics, data analysis, big data technologies, database management, programming, and version control among my areas of focus.', sources: [['Experience & focus areas', 'experience.html']] },
    { match: /project|built|portfolio|automl|unimatch|spacex|uber|covid|drowsiness/i, text: 'My projects cover machine learning, multimodal RAG, computer vision, data analysis and visualization, recommendation systems, OCR, and this portfolio. Each project page links to its available details and source repository.', sources: [['Browse projects', 'projects.html'], ['Multimodal RAG', 'projects/rag.html'], ['AutoML', 'projects/auto_ml.html']] },
    { match: /education|degree|university|study|school/i, text: 'I earned an MS in Data Science from Indiana University Bloomington and a BE in Computer Engineering from KJ Somaiya Institute of Technology.', sources: [['Experience & education', 'experience.html']] },
    { match: /contact|email|hire|connect|reach/i, text: 'The best way to reach me is by email. You can also find my work on GitHub and connect with me on LinkedIn.', sources: [['Contact', 'contact.html']] },
    { match: /gaming|games|hitman|call of duty|last of us/i, text: 'My Gaming page currently features Hitman, Call of Duty, and The Last of Us, with linked thumbnail sources.', sources: [['Gaming library', 'gaming.html']] },
    { match: /travel|photo|cook|outside|clock|hobby/i, text: 'Outside work, I enjoy traveling, photography, and home cooking. I keep a small personal page for those interests too.', sources: [['Off the clock', 'off-the-clock.html']] }
  ];
  const searchItems = [
    ['Home', 'Ask about Sarthak’s work and profile', 'index.html', 'bi-house'],
    ['Projects', 'AI, machine learning, data, and tools', 'projects.html', 'bi-grid'],
    ['Experience', 'Career history, education, and focus areas', 'experience.html', 'bi-briefcase'],
    ['About', 'Background and professional profile', 'about.html', 'bi-person'],
    ['Off the clock', 'Travel, photography, and home cooking', 'off-the-clock.html', 'bi-camera'],
    ['Contact', 'Email and professional profiles', 'contact.html', 'bi-envelope'],
    ['Multimodal RAG', 'Visual question answering with outside knowledge', 'projects/rag.html', 'bi-stars'],
    ['AutoML', 'Automated machine learning project', 'projects/auto_ml.html', 'bi-cpu'],
    ['COVID-19 X-ray prediction', 'Medical image classification', 'projects/covid.html', 'bi-heart-pulse'],
    ['Driver drowsiness detection', 'Computer vision project', 'projects/drowsiness.html', 'bi-eye'],
    ['SpaceX landing prediction', 'Falcon 9 machine learning project', 'projects/spaceX.html', 'bi-rocket'],
    ['UniMatch', 'University recommendation system', 'projects/unimatch.html', 'bi-mortarboard'],
    ['Uber data visualization', 'Interactive exploration of trip data', 'projects/uber_data_viz.html', 'bi-bar-chart'],
    ['Uber data analysis', 'Data analysis project', 'projects/uber_data_analyis.html', 'bi-graph-up'],
    ['SplitRight', 'OCR and PDF splitting tool', 'projects/splitright.html', 'bi-file-earmark-pdf'],
    ['Portfolio website', 'This portfolio, rebuilt around AI engineering', 'projects/portfolio.html', 'bi-window'],
    ['Gaming', 'Hitman, Call of Duty, and The Last of Us', 'gaming.html', 'bi-controller'],
    ['Anime', 'Shows on rotation', 'anime.html', 'bi-tv']
  ].map(([title, detail, href, icon]) => ({ title, detail, href, icon }));
  const rootLink = (route) => new URL(route, siteRoot).href;

  async function initializeShell() {
    if (!shellTarget) return;
    const response = await fetch(new URL('components/app-shell.html', siteRoot));
    if (!response.ok) return;
    shellTarget.innerHTML = await response.text();
    shellTarget.querySelectorAll('[data-route]').forEach((link) => {
      const route = routes[link.dataset.route];
      if (route) link.href = rootLink(route);
    });
    shellTarget.querySelector('.current-page-name').textContent = document.body.dataset.page || 'New chat';

    const pathname = window.location.pathname.replace(/\/$/, '');
    const currentRoute = Object.keys(routes).find((key) => rootLink(routes[key]).replace(siteRoot.origin, '').replace(/\/$/, '') === pathname);
    const activeRoute = pathname.includes('/projects/') ? 'projects' : currentRoute;
    shellTarget.querySelectorAll('.sidebar-navigation [data-route]').forEach((link) => {
      if (link.dataset.route === activeRoute) link.setAttribute('aria-current', 'page');
    });

    const savedTheme = localStorage.getItem('portfolio-theme');
    document.body.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';
    const themeToggle = shellTarget.querySelector('.theme-toggle');
    const updateThemeButton = () => {
      const dark = document.body.dataset.theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
      themeToggle.innerHTML = `<i class="bi ${dark ? 'bi-sun' : 'bi-moon-stars'}" aria-hidden="true"></i>`;
    };
    updateThemeButton();
    themeToggle.addEventListener('click', () => {
      const dark = document.body.dataset.theme !== 'dark';
      document.body.dataset.theme = dark ? 'dark' : 'light';
      localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
      updateThemeButton();
    });

    const sidebar = shellTarget.querySelector('.site-sidebar');
    const backdrop = shellTarget.querySelector('.sidebar-backdrop');
    const openButton = shellTarget.querySelector('.sidebar-toggle');
    const closeButton = shellTarget.querySelector('.sidebar-close');
    const desktopRail = window.matchMedia('(min-width: 1000px)');
    const setSidebarOpen = (open) => {
      if (desktopRail.matches) {
        document.body.classList.toggle('sidebar-collapsed', !open);
        sidebar.setAttribute('aria-hidden', 'false');
        sidebar.inert = false;
        openButton.setAttribute('aria-expanded', String(open));
        openButton.setAttribute('aria-label', open ? 'Collapse navigation' : 'Expand navigation');
        return;
      }
      sidebar.classList.toggle('is-open', open);
      sidebar.setAttribute('aria-hidden', String(!open));
      sidebar.inert = !open;
      backdrop.hidden = !open;
      openButton.setAttribute('aria-expanded', String(open));
      openButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (open) closeButton.focus();
      else openButton.focus();
    };
    if (desktopRail.matches) {
      sidebar.setAttribute('aria-hidden', 'false');
      sidebar.inert = false;
      openButton.setAttribute('aria-expanded', 'true');
      openButton.setAttribute('aria-label', 'Collapse navigation');
    }
    desktopRail.addEventListener('change', (event) => {
      document.body.classList.remove('sidebar-collapsed');
      sidebar.setAttribute('aria-hidden', String(!event.matches));
      sidebar.inert = !event.matches;
      shellTarget.querySelector('.sidebar-backdrop').hidden = true;
      openButton.setAttribute('aria-expanded', String(event.matches));
      openButton.setAttribute('aria-label', event.matches ? 'Collapse navigation' : 'Open navigation');
    });
    openButton.addEventListener('click', () => setSidebarOpen(desktopRail.matches ? document.body.classList.contains('sidebar-collapsed') : true));
    closeButton.addEventListener('click', () => setSidebarOpen(false));
    backdrop.addEventListener('click', () => setSidebarOpen(false));
    sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setSidebarOpen(false)));
    initializeCommandSearch(shellTarget);
    initializeMoreMenu(shellTarget);
    initializeRecentQuestions(shellTarget);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) setSidebarOpen(false);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const command = shellTarget.querySelector('.command-backdrop');
        if (command && !command.hidden) document.dispatchEvent(new Event('portfolio-command-close'));
        else shellTarget.querySelector('.search-trigger')?.click();
      }
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        const prompt = document.querySelector('#portfolio-question');
        if (prompt) { event.preventDefault(); prompt.focus(); }
      }
    });
  }

  function initializePortfolioChat() {
    const form = document.querySelector('#portfolio-chat-form');
    const input = document.querySelector('#portfolio-question');
    const responsePanel = document.querySelector('#chat-response');
    const conversation = document.querySelector('#conversation-turns');
    if (!form || !input || !responsePanel || !conversation) return;
    const ask = (question) => {
      const answer = answers.find((item) => item.match.test(question)) || {
        text: 'I can help with Sarthak’s projects, experience, skills, education, and contact details. Try one of the suggested questions or explore the pages in the navigation.',
        sources: [['Browse projects', 'projects.html'], ['Experience', 'experience.html'], ['Contact', 'contact.html']]
      };
      const turn = document.createElement('article');
      turn.className = 'conversation-turn';
      const questionLine = document.createElement('div');
      questionLine.className = 'question-line';
      const avatar = document.createElement('span');
      avatar.className = 'response-avatar';
      avatar.textContent = 'SC';
      const questionText = document.createElement('p');
      questionText.textContent = question;
      questionLine.append(avatar, questionText);

      const answerLine = document.createElement('div');
      answerLine.className = 'answer-line';
      const answerMark = document.createElement('span');
      answerMark.className = 'answer-mark';
      answerMark.innerHTML = '<i class="bi bi-stars" aria-hidden="true"></i>';
      const answerBody = document.createElement('div');
      const answerText = document.createElement('p');
      answerText.textContent = answer.text;
      const sources = document.createElement('nav');
      sources.className = 'answer-sources';
      sources.setAttribute('aria-label', 'Related portfolio pages');
      answer.sources.forEach(([label, route]) => {
        const link = document.createElement('a');
        link.href = rootLink(route);
        link.textContent = `${label} ↗`;
        sources.append(link);
      });
      answerBody.append(answerText, sources);
      answerLine.append(answerMark, answerBody);
      turn.append(questionLine, answerLine);
      conversation.append(turn);
      responsePanel.hidden = false;
      saveRecentQuestion(question);
      initializeRecentQuestions(shellTarget);
      responsePanel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      ask(question);
      input.value = '';
    });
    document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => {
      input.value = button.dataset.question;
      ask(input.value);
    }));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
    });
    initializeVoiceInput(input);
    const initialQuestion = new URLSearchParams(window.location.search).get('q');
    if (initialQuestion) { input.value = initialQuestion; ask(initialQuestion); }
  }

  function initializeCommandSearch(shell) {
    const overlay = shell.querySelector('.command-backdrop');
    const input = shell.querySelector('.command-input');
    const results = shell.querySelector('.command-results');
    const openButton = shell.querySelector('.search-trigger');
    if (!overlay || !input || !results || !openButton) return;
    let activeIndex = 0;
    const close = () => {
      overlay.hidden = true;
      overlay.classList.remove('is-open');
      openButton.focus();
    };
    const open = () => {
      overlay.hidden = false;
      overlay.classList.add('is-open');
      input.value = '';
      render('');
      input.focus();
    };
    const render = (query) => {
      const normalized = query.trim().toLowerCase();
      const filtered = searchItems.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(normalized));
      activeIndex = 0;
      results.replaceChildren();
      if (!filtered.length) {
        const empty = document.createElement('p');
        empty.className = 'command-empty';
        empty.textContent = 'No matching pages or projects.';
        results.append(empty);
        return;
      }
      filtered.forEach((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'command-result';
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', String(index === activeIndex));
        button.innerHTML = `<span class="command-result-icon"><i class="bi ${item.icon}" aria-hidden="true"></i></span><span class="command-result-copy"><strong></strong><small></small></span><span class="command-result-type">Open</span>`;
        button.querySelector('strong').textContent = item.title;
        button.querySelector('small').textContent = item.detail;
        button.addEventListener('click', () => { window.location.href = rootLink(item.href); });
        results.append(button);
      });
    };
    const selectActive = (direction) => {
      const options = [...results.querySelectorAll('.command-result')];
      if (!options.length) return;
      activeIndex = (activeIndex + direction + options.length) % options.length;
      options.forEach((option, index) => option.setAttribute('aria-selected', String(index === activeIndex)));
      options[activeIndex].scrollIntoView({ block: 'nearest' });
    };
    openButton.addEventListener('click', open);
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'ArrowDown') { event.preventDefault(); selectActive(1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); selectActive(-1); }
      if (event.key === 'Enter') { event.preventDefault(); results.querySelectorAll('.command-result')[activeIndex]?.click(); }
    });
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });
    overlay.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    document.addEventListener('portfolio-command-close', close);
  }

  function initializeMoreMenu(shell) {
    const button = shell.querySelector('.more-toggle');
    const menu = shell.querySelector('.more-menu');
    if (!button || !menu) return;
    const setOpen = (open) => {
      menu.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
    };
    button.addEventListener('click', () => setOpen(menu.hidden));
    document.addEventListener('click', (event) => {
      if (!button.contains(event.target) && !menu.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  }

  function saveRecentQuestion(question) {
    const recent = JSON.parse(localStorage.getItem('portfolio-recent-questions') || '[]');
    const updated = [question, ...recent.filter((item) => item !== question)].slice(0, 6);
    localStorage.setItem('portfolio-recent-questions', JSON.stringify(updated));
  }

  function initializeRecentQuestions(shell) {
    const section = shell.querySelector('.recent-chat-section');
    const list = shell.querySelector('.recent-chat-list');
    if (!section || !list) return;
    const recent = JSON.parse(localStorage.getItem('portfolio-recent-questions') || '[]');
    list.replaceChildren();
    recent.forEach((question) => {
      const link = document.createElement('a');
      link.href = `${rootLink('index.html')}?q=${encodeURIComponent(question)}`;
      link.textContent = question;
      link.title = question;
      list.append(link);
    });
    section.hidden = recent.length === 0;
  }

  function initializeVoiceInput(input) {
    const button = document.querySelector('.voice-question');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!button || !SpeechRecognition) return;
    button.hidden = false;
    const recognition = new SpeechRecognition();
    recognition.lang = document.documentElement.lang || 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => { input.value = event.results[0][0].transcript; input.focus(); };
    recognition.onend = () => button.setAttribute('aria-pressed', 'false');
    recognition.onerror = () => button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', 'true');
      recognition.start();
    });
  }

  function initializeProjectFilters() {
    const filters = document.querySelectorAll('[data-filter-category]');
    const cards = document.querySelectorAll('[data-project-category]');
    filters.forEach((filter) => filter.addEventListener('click', () => {
      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
      cards.forEach((card) => { card.hidden = filter.dataset.filterCategory !== 'all' && card.dataset.projectCategory !== filter.dataset.filterCategory; });
    }));
  }

  function initializeReveals() {
    document.querySelectorAll('.portfolio-details-page .portfolio-details-slider, .portfolio-details-page .portfolio-info, .portfolio-details-page .portfolio-description').forEach((element) => element.classList.add('reveal'));
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { elements.forEach((element) => element.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
      observer.observe(element);
    });
  }

  initializeShell().then(() => {
    initializePortfolioChat();
    initializeProjectFilters();
    initializeReveals();
  }).catch((error) => console.error('Portfolio shell failed to load:', error));
})();