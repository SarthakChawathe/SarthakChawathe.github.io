export const projects = [
  {
    id: 'rag', route: 'projects/rag.html', title: 'Outside Knowledge Visual Question Answering Using Multi-Modal RAG',
    shortTitle: 'Multimodal RAG', category: 'AI & machine learning', type: 'LLM / RAG', association: 'Indiana University Bloomington',
    image: '/assets/images_copy/Projects/ragv4.jpg', images: ['/assets/images_copy/Projects/ragv4.jpg', '/assets/images_copy/Projects/ragv5.jpg'],
    description: 'The project explores Retrieval-Augmented Generation for visual question answering. It introduces outside knowledge dynamically during inference rather than relying on extensive retraining.',
    summary: 'Outside-knowledge retrieval for visual question answering with large language models.',
    source: 'https://github.com/SarthakChawathe/E533-Project', tags: ['RAG', 'Multimodal', 'LLMs']
  },
  {
    id: 'auto_ml', route: 'projects/auto_ml.html', title: 'AutoML', shortTitle: 'AutoML',
    category: 'AI & machine learning', type: 'Machine learning', association: 'Personal',
    image: '/assets/images_copy/Projects/AutoML.png', images: ['/assets/images_copy/Projects/AutoML.png', '/assets/images_copy/Projects/AutoML_2.png'],
    description: 'A user-friendly application designed to streamline machine-learning model development. Users can upload datasets, perform exploratory data analysis, and train and evaluate models without extensive coding knowledge.',
    summary: 'A no-code workflow for dataset exploration and automated model training.',
    source: 'https://github.com/SarthakChawathe/AutoML', tags: ['AutoML', 'Modeling', 'Data']
  },
  {
    id: 'covid', route: 'projects/covid.html', title: 'COVID-19 Prediction Using Chest X-Ray Images', shortTitle: 'COVID-19 X-ray prediction',
    category: 'AI & machine learning', type: 'Machine learning', association: 'Personal',
    image: '/assets/images_copy/Projects/covid.png', images: ['/assets/images_copy/Projects/covid.png'],
    description: 'A machine-learning project that analyzes chest X-ray images and classifies them as COVID-19 positive or negative.',
    summary: 'Medical image classification using chest X-ray images.',
    source: 'https://github.com/SarthakChawathe/COVID-19-Prediction-Using-Chest-X-Ray-Images', tags: ['Computer vision', 'Healthcare']
  },
  {
    id: 'drowsiness', route: 'projects/drowsiness.html', title: 'Driver Drowsiness Detection', shortTitle: 'Driver drowsiness detection',
    category: 'AI & machine learning', type: 'Computer vision', association: 'Personal',
    image: '/assets/images_copy/Projects/drowsiness.jpeg', images: ['/assets/images_copy/Projects/drowsiness.jpeg'],
    description: 'A real-time computer-vision system that analyzes video input for signs of driver drowsiness using eye tracking and triggers an alarm.',
    summary: 'Computer vision for detecting signs of drowsiness while driving.',
    source: 'https://github.com/SarthakChawathe/Driver-Drowsiness-Detection', tags: ['Computer vision', 'Detection']
  },
  {
    id: 'spaceX', route: 'projects/spaceX.html', title: 'SpaceX Falcon 9 Landing Prediction', shortTitle: 'SpaceX landing prediction',
    category: 'AI & machine learning', type: 'Machine learning', association: 'Personal',
    image: '/assets/images_copy/Projects/spacex.png', images: ['/assets/images_copy/Projects/spacex.png', '/assets/images_copy/Projects/spacex-falcon-9-landing-01.png'],
    description: 'A machine-learning project that analyzes Falcon 9 mission parameters and historical data to predict whether a landing will succeed.',
    summary: 'Predicting Falcon 9 first-stage landing outcomes from mission data.',
    source: 'https://github.com/SarthakChawathe/SpaceX-Falcon9-Landing-Prediction', tags: ['Classification', 'SpaceX']
  },
  {
    id: 'unimatch', route: 'projects/unimatch.html', title: 'UniMatch - University Recommendation System', shortTitle: 'UniMatch',
    category: 'AI & machine learning', type: 'Recommendation', association: 'Indiana University Bloomington',
    image: '/assets/images_copy/Projects/Biotechnology-universities-in-US.jpg', images: ['/assets/images_copy/Projects/Biotechnology-universities-in-US.jpg'],
    description: 'A university recommendation system for international master’s students, using a weighted K-nearest-neighbors approach to personalize recommendations.',
    summary: 'A university recommendation system based on student preferences and academic profiles.',
    source: 'https://github.com/SarthakChawathe/University-Recommendation-System', tags: ['Recommendation', 'KNN']
  },
  {
    id: 'uber-viz', route: 'projects/uber_data_viz.html', title: 'Uber Data Visualization V2', shortTitle: 'Uber data visualization',
    category: 'Data', type: 'Data visualization', association: 'Personal & Indiana University Bloomington',
    image: '/assets/images_copy/Projects/uber.jpeg', images: ['/assets/images_copy/Projects/uber.jpeg', '/assets/images_copy/Projects/uber_another.jpeg'],
    description: 'Visual analysis of Uber’s New York City operational data, using exploratory methods and K-means clustering to surface insights related to urban mobility.',
    summary: 'Visual exploration of Uber trip data and urban mobility.',
    source: 'https://github.com/SarthakChawathe/Data-Visualization-Project', extra: ['YouTube video', 'https://youtu.be/Yg0r8Nf9Wy8'], tags: ['Analytics', 'Visualization']
  },
  {
    id: 'uber-analysis', route: 'projects/uber_data_analyis.html', title: 'Uber Data Analysis V1', shortTitle: 'Uber data analysis',
    category: 'Data', type: 'ETL and data analysis', association: 'Personal',
    image: '/assets/images_copy/Projects/Uber_v2.jpg', images: ['/assets/images_copy/Projects/Uber_v2.jpg'],
    description: 'A data project using Google Cloud Platform tools to extract actionable insights from Uber’s dataset.',
    summary: 'Exploratory analysis of Uber data, from data preparation to findings.',
    source: 'https://github.com/SarthakChawathe/Uber-Data-Analysis', extra: ['Dashboard', 'https://lookerstudio.google.com/s/sQyFkRE_B0o'], tags: ['ETL', 'Analytics']
  },
  {
    id: 'splitright', route: 'projects/splitright.html', title: 'SplitRight', shortTitle: 'SplitRight',
    category: 'Tools & applications', type: 'OCR', association: 'Indiana University Luddy Hackathon',
    image: '/assets/images_copy/Projects/pdf_splitter_hackathon.jpeg', images: ['/assets/images_copy/Projects/pdf_splitter_hackathon.jpeg', '/assets/images_copy/Projects/pdf_final.png'],
    description: 'A standalone PDF-splitting tool designed for legal firms. OCR automates separating and organizing combined document files.',
    summary: 'An OCR-powered PDF splitting and document organization tool.',
    source: 'https://github.com/SarthakChawathe/SplitRight', extra: ['Live tool', 'https://www.pranavbadhe.live/SplitRight/'], tags: ['OCR', 'PDF']
  },
  {
    id: 'portfolio', route: 'projects/portfolio.html', title: 'Personal Portfolio Website', shortTitle: 'Portfolio website',
    category: 'Tools & applications', type: 'Web / design', association: 'Personal',
    image: '/assets/images_copy/Projects/portfolio.png', images: ['/assets/images_copy/Projects/portfolio.png'],
    description: 'A personal website highlighting professional projects and achievements, continuously updated as the portfolio evolves.',
    summary: 'This site: an interactive portfolio for AI engineering, data, and projects.',
    source: 'https://github.com/SarthakChawathe/SarthakChawathe.github.io', tags: ['React', 'Vite', 'Portfolio']
  }
];

export const projectGroups = [
  { category: 'AI & machine learning', label: 'AI & ML', tone: 'green', tagline: 'Models, retrieval and vision' },
  { category: 'Data', label: 'Data', tone: 'blue', tagline: 'Pipelines, analysis and dashboards' },
  { category: 'Tools & applications', label: 'Tools', tone: 'gray', tagline: 'Small things that save time' }
];

export const experience = [
  { company: 'CitiusTech', logo: '/assets/images_copy/Logos/Institution Logos/citiustech_logo.jpeg', sector: 'Healthcare technology', roles: [['AI Engineer', 'Apr 2026 – Present'], ['Software Engineer — AI & Business Analytics', 'Mar 2025 – Mar 2026']] },
  {
    company: 'Mayo Clinic', logo: '/assets/images_copy/Logos/Institution Logos/mayo_clinic_logo.jpeg', sector: 'Healthcare', roles: [['AI/ML Engineer', 'Nov 2025 – Present'], ['Data Scientist', 'Mar 2025 – Nov 2025']],
    stack: ['Gemini', 'Vertex AI', 'BigQuery', 'Python', 'SQL'],
    highlights: [
      'Leads prompt engineering, fine-tuning and evaluation of Gemini-based LLM workflows for clinical and operational use cases, lifting accuracy, safety and contextual reliability by 30%.',
      'Designed evaluation frameworks for 50+ LLM test scenarios: prompt testing, error analysis, edge-case validation and response-quality checks.',
      'Built AI workflow-automation and decision-support prototypes on Python, SQL, BigQuery and Vertex AI, cutting manual analysis effort by 40%.',
      'Ships stakeholder dashboards tracking 5+ product adoption metrics, from login trends to funnel conversion.'
    ]
  },
  {
    company: 'Gradient LLC', logo: '/assets/images_copy/Logos/Institution Logos/gradient_logo.jpeg', sector: 'Product analytics', roles: [['Software Engineer', 'Dec 2024 – Mar 2025']],
    highlights: [
      'Automated email outreach with A/B testing, audience segmentation and performance analysis, reducing manual effort by 80%.',
      'Analyzed 15+ mobile feature and engagement metrics to inform roadmap prioritization.'
    ]
  },
  {
    company: 'OneChimera Incorporated', logo: '/assets/images_copy/Logos/Institution Logos/Chimera_2.png', sector: 'Generative AI', roles: [['Machine Learning Engineer & Data Analyst', 'Aug 2024 – Dec 2024']],
    stack: ['LangChain', 'Diffusion models', 'Python'],
    highlights: [
      'Built pipelines to scrape, clean and structure 100,000+ architecture images into training datasets.',
      'Integrated LangChain to automate research workflows, reducing project turnaround by 40%.',
      'Led AI experimentation and mentored two ML interns on model evaluation and prompt testing.'
    ]
  },
  {
    company: 'Indiana University Bloomington', logo: '/assets/images_copy/Logos/Institution Logos/IU.jpeg', sector: 'Education', roles: [['Graduate Teaching Assistant', 'Aug 2023 – May 2024']],
    highlights: ['Teaching assistant for Data Science On-Ramp, a graduate course made up of twelve mini-courses.']
  },
  {
    company: 'Tata Consultancy Services', logo: '/assets/images_copy/Logos/Institution Logos/tcs.png', sector: 'Enterprise IT', roles: [['Assistant Systems Engineer', 'Jul 2019 – Dec 2020']],
    stack: ['Java', 'SQL Server', 'Agile'],
    highlights: ['Streamlined support processes, resolved a high volume of tickets and built reporting for the team.']
  }
];

export const profile = {
  name: 'Sarthak Chawathe',
  firstName: 'Sarthak',
  role: 'AI Engineer',
  location: 'Austin, TX',
  photo: '/assets/images_copy/Personal/IMG_8538_square.jpg',
  email: 'sarthak.chawathe2012@gmail.com',
  resume: '/assets/pdf/Sarthak_Chawathe_Latest.pdf',
  careerStart: '2019-07-01'
};

export const socials = [
  { name: 'GitHub', href: 'https://github.com/SarthakChawathe', icon: 'bi-github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sarthak-chawathe/', icon: 'bi-linkedin' },
  { name: 'Instagram', href: 'https://www.instagram.com/sarthakchawathe/', icon: 'bi-instagram' },
  { name: 'Resume', href: '/assets/pdf/Sarthak_Chawathe_Latest.pdf', icon: 'bi-file-earmark-text' }
];

export const education = [
  { school: 'Indiana University Bloomington', degree: 'MS, Data Science', dates: 'Aug 2022 – May 2024' },
  { school: 'K.J. Somaiya Institute of Technology', degree: 'BE, Computer Engineering', dates: 'Aug 2015 – May 2019' }
];

// Grouped by the job each tool does, from the resume's technical skills section.
export const stack = [
  { job: 'LLMs & generative AI', items: ['Gemini', 'Vertex AI', 'LangChain', 'Hugging Face', 'FAISS', 'Prompt engineering', 'LLM evaluation'] },
  { job: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'NLP', 'Computer vision'] },
  { job: 'Languages & services', items: ['Python', 'SQL', 'PySpark', 'FastAPI', 'Go', 'R', 'Java', 'React'] },
  { job: 'Data engineering', items: ['BigQuery', 'PostgreSQL', 'MySQL', 'MongoDB', 'Apache Spark', 'ETL/ELT pipelines'] },
  { job: 'Cloud & delivery', items: ['GCP', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git'] },
  { job: 'Analytics & BI', items: ['Tableau', 'Power BI', 'Looker Studio', 'A/B testing', 'Funnel analysis'] }
];

export const testimonials = [
  { name: 'Ryan Linea', title: 'Lead AI Engineer, Mayo Clinic', photo: '/assets/images_copy/Testimonials/Ryan.jpeg', quote: 'He is a highly capable AI engineer who handles stress well, delivering complex features across a large and intricate codebase. One recent example is standing up an evaluation service that analyzes our model’s quality across multiple metrics.' },
  { name: 'Michelle James', title: 'Technical Product Owner, Mayo Clinic', photo: '/assets/images_copy/Testimonials/Michelle.png', quote: 'His work and attention to detail is beyond words. He is such a great collaborator and picks up new code so fast.' },
  { name: 'Vartan Susmanyan', title: 'CEO & Co-Founder, OneChimera', photo: '/assets/images_copy/Testimonials/Vartan.jpeg', quote: 'He was a key part of developing our back-end chatbot and database systems, and his technical skills and problem-solving really stood out.' },
  { name: 'Nasim Anousheh', title: 'Professor, Indiana University Bloomington', photo: '/assets/images_copy/Testimonials/Nasim.jpeg', quote: 'A highly talented and dedicated individual whose expertise in Machine Learning, coupled with his exceptional teaching abilities, make him a valuable asset to any organization.' }
];

// Extra detail for project pages and agent answers, keyed by project id.
export const projectDetails = {
  rag: {
    stack: ['BLIP-2', 'CLIP', 'FAISS', 'Hugging Face', 'Python'],
    highlights: ['Retrieval-Augmented Generation pipeline on BLIP-2 for outside-knowledge VQA, avoiding full model retraining.', 'Multimodal retrieval with a CLIP text encoder and FAISS index over 1,000+ VQA examples.', 'Injected Wikipedia knowledge at inference time for a 20% gain in zero-shot accuracy.']
  },
  unimatch: {
    stack: ['Python', 'Selenium', 'Weighted KNN', 'Flask', 'Bootstrap'],
    highlights: ['Led a four-person team building the recommender end to end.', 'Weighted KNN over academic background, test scores and preferences, with Selenium-scraped university data.', 'Flask backend with a Bootstrap front end.']
  },
  'uber-analysis': { stack: ['Google Cloud Platform', 'Looker Studio', 'Python'] },
  'uber-viz': { stack: ['K-means', 'Python'] },
  portfolio: { stack: ['React', 'Vite'] }
};
