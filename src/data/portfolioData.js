export const SECTIONS = [
  { id: 'home', label: 'HOME', code: '01' },
  { id: 'about', label: 'ABOUT', code: '02' },
  { id: 'skills', label: 'SKILLS', code: '03' },
  { id: 'projects', label: 'PROJECTS', code: '04' },
  { id: 'education', label: 'EDUCATION', code: '05' },
  { id: 'resume', label: 'RESUME', code: '06' },
  { id: 'contact', label: 'CONTACT', code: '07' },
];

export const PERSONAL_INFO = {
  name: "Yogini S",
  title: "AI & Machine Learning Engineering Student",
  tagline: "Building practical AI solutions across Generative AI, RAG, Computer Vision, and Deep Learning.",
  summary: "AI & Machine Learning Engineering student pursuing a B.E. in Artificial Intelligence and Machine Learning, with hands-on experience building applications across Generative AI, RAG, Computer Vision, NLP, and Deep Learning. Skilled in Python and familiar with modern AI frameworks and development technologies including LangChain, Hugging Face, TensorFlow, PyTorch, and React. Passionate about developing practical AI solutions and continuously exploring emerging technologies.",
  status: "B.E. in AI & ML • Coorg Institute of Technology (2024–2028)",
  location: "Mysuru, Karnataka, India",
  email: "yoginikumar0608@gmail.com",
  phone: "9449425436",
  github: "https://github.com/yoginikumar0608-gh",
  linkedin: "https://linkedin.com/in/yogini-s-kumar-360490386",
  avatar: "/images/avatar.jpg",
  cgpa: "8.16",
  institution: "Coorg Institute of Technology",
  stats: [
    { label: "Academic CGPA", value: "8.16", accent: "cyan" },
    { label: "Flagship AI Projects", value: "06", accent: "purple" },
    { label: "Certifications", value: "10+", accent: "blue" },
    { label: "Languages Known", value: "07", accent: "pink" },
  ]
};

export const ABOUT_DATA = {
  headline: "Developing Practical Intelligence & Deep Learning Architectures",
  paragraphs: [
    "AI & Machine Learning Engineering student pursuing a B.E. in Artificial Intelligence and Machine Learning, with hands-on experience building applications across Generative AI, RAG, Computer Vision, NLP, and Deep Learning.",
    "Skilled in Python and familiar with modern AI frameworks and development technologies including LangChain, Hugging Face, TensorFlow, PyTorch, and React.",
    "Passionate about developing practical AI solutions and continuously exploring emerging technologies."
  ],
  pillars: [
    {
      icon: "Cpu",
      title: "Generative AI & RAG",
      description: "Developing semantic retrieval systems, vector embeddings, and context-aware LLM agents using LangChain, Hugging Face, and ChromaDB."
    },
    {
      icon: "Layers",
      title: "Deep Learning & Vision",
      description: "Building CNN and GAN architectures for facial emotion recognition, synthetic face generation, and computer vision agronomy models."
    },
    {
      icon: "Zap",
      title: "Core CS & Algorithms",
      description: "Strong theoretical foundations in Data Structures & Algorithms, Object-Oriented Programming, DBMS, and Operating Systems."
    },
    {
      icon: "Shield",
      title: "Modern AI Stack",
      description: "Proficient in Python, TensorFlow, PyTorch, OpenCV, Streamlit, Gradio, Git/GitHub, and full-stack React integration."
    }
  ]
};

export const SKILLS_DATA = [
  {
    category: "PROGRAMMING LANGUAGES",
    icon: "Code",
    description: "Core languages for systems, algorithm implementation, and data pipelines",
    skills: ["Python", "C", "Java", "JavaScript", "SQL"]
  },
  {
    category: "FRAMEWORKS & LIBRARIES",
    icon: "Cpu",
    description: "Deep learning, neural architectures, LLM orchestration, and UI",
    skills: ["TensorFlow", "PyTorch", "Hugging Face", "LangChain", "LangGraph", "OpenCV", "React"]
  },
  {
    category: "TOOLS & PLATFORMS",
    icon: "Server",
    description: "Development environments, version control, deployment, and cloud",
    skills: ["Git", "GitHub", "VS Code", "Google Colab", "Jupyter", "Android Studio", "MongoDB Compass", "Streamlit", "Gradio", "AWS"]
  },
  {
    category: "AI / ML",
    icon: "Brain",
    description: "Frontier machine intelligence and specialized neural paradigms",
    skills: ["Machine Learning", "Deep Learning", "Generative AI", "RAG", "Computer Vision"]
  },
  {
    category: "CORE CS",
    icon: "Layers",
    description: "Foundational computer science principles and software engineering",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"]
  },
  {
    category: "WEB & DEVELOPMENT",
    icon: "Layout",
    description: "Modern interactive frontends and backend runtime interfaces",
    skills: ["HTML", "CSS", "React", "Node.js"]
  }
];

export const PROJECTS_DATA = [
  {
    id: "ai-face-generator",
    title: "AI Face Generator",
    subtitle: "GAN-based Synthetic Face Generation",
    description: "Developed a GAN-based system for generating synthetic human faces from random noise.",
    tagline: "Teaching machines to create, not just recognize — generating realistic human faces with GANs.",
    image: "/images/project1.jpg",
    tags: ["Python", "TensorFlow", "Keras", "GAN"],
    metrics: "Synthetic human face generation from latent noise distributions",
    animationOrigin: "center",
    highlights: [
      "Constructed deep convolutional Generator and Discriminator adversarial networks",
      "Optimized adversarial minimax loss to stabilize generator training and prevent mode collapse",
      "Synthesized high-fidelity realistic facial features and expressions from random noise vectors"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  },
  {
    id: "health-information-researcher",
    title: "AI Health Information Researcher",
    subtitle: "AI-powered Health Information Retrieval & Research",
    description: "AI-powered health information retrieval & research assistant using LangChain and RAG.",
    tagline: "Bridging complex biomedical literature with conversational RAG intelligence.",
    image: "/images/project2.jpg",
    tags: ["Python", "Generative AI", "RAG", "LangChain", "Information Retrieval"],
    metrics: "Context-aware biomedical Q&A with verifiable source citations",
    animationOrigin: "depth",
    highlights: [
      "Engineered a retrieval-augmented generation (RAG) pipeline over medical research documents",
      "Integrated LangChain query transformation to semantically parse patient inquiries",
      "Delivered structured, hallucination-resistant medical summaries with verified references"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  },
  {
    id: "careermate",
    title: "CareerMate",
    subtitle: "AI-powered Resume & Career Intelligence Assistant",
    description: "Developed an AI career assistant for resume analysis, job matching, and personalized career insights using Generative AI and RAG.",
    tagline: "Empowering job seekers with automated resume scoring and intelligent career roadmaps.",
    image: "/images/project3.jpg",
    tags: ["Python", "LangChain", "RAG", "Generative AI", "Gradio", "TTS"],
    metrics: "Intelligent resume parsing, automated scoring & audio feedback via TTS",
    animationOrigin: "rise",
    highlights: [
      "Automated PDF resume extraction, ATS keyword matching, and skill gap identification",
      "Designed personalized interview prep coaching with conversational text-to-speech (TTS)",
      "Deployed an interactive Gradio interface for seamless candidate experience"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  },
  {
    id: "facial-emotion-recognition",
    title: "Facial Emotion Recognition",
    subtitle: "CNN-based Facial Emotion Classification",
    description: "Teaching AI to understand human emotions through facial expressions using deep learning and computer vision.",
    tagline: "Deciphering human nonverbal cues through real-time convolutional neural networks.",
    image: "/images/project4.jpg",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    metrics: "Multi-class emotion categorization with real-time video feed inference",
    animationOrigin: "assemble",
    highlights: [
      "Trained a Convolutional Neural Network (CNN) on facial expression landmark datasets",
      "Utilized OpenCV for real-time face detection bounding boxes and frame preprocessing",
      "Classified discrete affective states (Happiness, Sadness, Anger, Surprise, Neutral) with high confidence"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  },
  {
    id: "kaapi-sense",
    title: "Kaapi Sense Leaf Disease Detector",
    subtitle: "Coffee Leaf Disease Detection using Computer Vision",
    description: "Teaching AI to recognize the early signs of coffee leaf diseases through computer vision and deep learning.",
    tagline: "Protecting coffee agriculture through automated, edge-ready plant pathology.",
    image: "/images/project5.jpg",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "Computer Vision"],
    metrics: "Early-stage coffee rust and leaf spot lesion detection with high diagnostic accuracy",
    animationOrigin: "scan",
    highlights: [
      "Trained deep CNN vision models to identify coffee leaf rust (Hemileia vastatrix) and cercospora lesions",
      "Preprocessed leaf imagery with OpenCV spatial filtering and contrast enhancement",
      "Formulated diagnostic guidance to help coffee growers take early preventative action"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  },
  {
    id: "studymate",
    title: "StudyMate",
    subtitle: "RAG-based Intelligent Study Assistant",
    description: "Built a RAG-based learning assistant that retrieves information from uploaded study materials and generates context-aware responses.",
    tagline: "Transforming static textbooks and notes into conversational knowledge graphs.",
    image: "/images/project6.jpg",
    tags: ["Python", "LangChain", "ChromaDB", "Embeddings", "Gemini", "RAG"],
    metrics: "Document chunking, vector indexing in ChromaDB & Gemini LLM synthesis",
    animationOrigin: "particles",
    highlights: [
      "Constructed an ingestion pipeline chunking study materials with recursive text splitters",
      "Stored dense vector embeddings in ChromaDB for sub-second semantic similarity search",
      "Synthesized precise answers with Gemini API using contextual prompt augmentation"
    ],
    github: "https://github.com/yoginikumar0608-gh"
  }
];

export const EDUCATION_DATA = [
  {
    degree: "Bachelor of Engineering in Artificial Intelligence & Machine Learning",
    institution: "Coorg Institute of Technology",
    period: "2024 – 2028",
    cgpa: "8.16",
    honors: "Academic CGPA: 8.16",
    description: "Pursuing rigorous foundations in Artificial Intelligence and Machine Learning, with hands-on experience building applications across Generative AI, RAG, Computer Vision, NLP, and Deep Learning.",
    courses: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision & NLP",
      "Data Structures & Algorithms",
      "DBMS & SQL",
      "Object-Oriented Programming"
    ]
  }
];

export const CERTIFICATIONS_DATA = [
  {
    category: "AI & GENERATIVE AI",
    items: [
      { name: "Getting Started with Generative AI", issuer: "IBM" },
      { name: "AI Literacy", issuer: "IBM" },
      { name: "Generative AI", issuer: "IBM" },
      { name: "Agentic AI", issuer: "" },
      { name: "AI: From Algorithms to Decisions", issuer: "EBSCO" }
    ]
  },
  {
    category: "PROGRAMMING & DATABASE",
    items: [
      { name: "DBMS & SQL", issuer: "Infosys Springboard" },
      { name: "Understanding Classes & Objects in Java", issuer: "Infosys Springboard" }
    ]
  },
  {
    category: "PROFESSIONAL DEVELOPMENT",
    items: [
      { name: "Becoming a Strategic Thinker", issuer: "EBSCO" },
      { name: "Planning for Success", issuer: "EBSCO" },
      { name: "Developing and Organizing Presentation Content", issuer: "EBSCO" }
    ]
  }
];

export const POSITIONS_OF_RESPONSIBILITY = [
  {
    role: "Student Member",
    organization: "Avinyam Student Association",
    description: "Supported technical events, student initiatives, planning, and participant coordination."
  },
  {
    role: "Event Organizer",
    organization: "Event Planning & Execution",
    description: "Coordinated participants and supported event planning, logistics, and execution."
  },
  {
    role: "Active Participant",
    organization: "Sports",
    description: "Developed teamwork, discipline, communication, and leadership through team-based sports."
  }
];

export const LANGUAGES_DATA = [
  "English",
  "Telugu",
  "Malayalam",
  "Tamil",
  "Hindi",
  "Kannada",
  "Urdu"
];

export const RESUME_DATA = {
  personal: PERSONAL_INFO,
  summary: PERSONAL_INFO.summary,
  education: EDUCATION_DATA[0],
  skills: SKILLS_DATA,
  projects: PROJECTS_DATA,
  certifications: CERTIFICATIONS_DATA,
  leadership: POSITIONS_OF_RESPONSIBILITY,
  experience: POSITIONS_OF_RESPONSIBILITY,
  languages: LANGUAGES_DATA
};

