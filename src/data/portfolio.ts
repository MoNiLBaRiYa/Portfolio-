import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Monil Bariya',
    title: 'Full Stack & AI-Powered Web Developer',
    location: 'India',
    email: 'monilbariya.dev@gmail.com',
    linkedin: 'https://www.linkedin.com/in/monilbariya28',
    github: 'https://github.com/MoNiLBaRiYa',
    summary:
      'I build fast, scalable, and SEO-friendly web applications that drive business growth. By combining modern tech stacks with intelligent automation, I deliver seamless digital products from concept to deployment.',
    availability: 'Available',
    profileImage: '/images/monilbariya.jpeg',
  },
  skills: [
    {
      category: 'Core Programming Languages',
      skills: [
        {
          name: 'Python',
          icon: '/icons/python.svg',
        },
        {
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        {
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        },
        {
          name: 'Java',
          icon: '/icons/java.svg',
        },
        {
          name: 'C++',
          icon: '/icons/cpp.svg',
        },
        {
          name: 'HTML',
          icon: '/icons/html.svg',
        },
        {
          name: 'CSS',
          icon: '/icons/css.svg',
        },
      ],
    },
    {
      category: 'Modern Web & Backend',
      skills: [
        {
          name: 'Next.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        },
        {
          name: 'Tailwind CSS',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        },
        {
          name: 'Flask',
          icon: '/icons/flask.svg',
        },
        {
          name: 'MongoDB',
          icon: '/icons/mongodb.svg',
        },
        {
          name: 'Three.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg',
        },
      ],
    },
    {
      category: 'AI & Intelligence',
      skills: [
        {
          name: 'Generative AI',
          icon: 'https://cdn-icons-png.flaticon.com/512/8637/8637099.png',
        },
        {
          name: 'Prompt Engineering',
          icon: 'https://cdn-icons-png.flaticon.com/512/9334/9334577.png',
        },
        {
          name: 'AI Agents',
          icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712027.png',
        },
        {
          name: 'Automation',
          icon: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
        },
      ],
    },
    {
      category: 'Professional Tools and IDE',
      skills: [
        {
          name: 'VS Code',
          icon: '/icons/vscode.svg',
        },
        {
          name: 'Cursor IDE',
          icon: '/icons/cursor.svg',
        },
        {
          name: 'Git',
          icon: '/icons/git.svg',
        },
        {
          name: 'Antigravity',
          icon: 'https://cdn-icons-png.flaticon.com/512/6295/6295417.png',
        },
        {
          name: 'Kiro',
          icon: '/icons/kiro.svg',
        },
        {
          name: 'Power BI',
          icon: '/icons/powerbi.svg',
        },
      ],
    },
    {
      category: 'Engineering & Digital Workflow',
      skills: [
        {
          name: 'API Understanding',
          icon: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
        },
        {
          name: 'Documentation',
          icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        },
        {
          name: 'UI/UX Basics',
          icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png',
        },
        {
          name: 'Data Visualization',
          icon: 'https://cdn-icons-png.flaticon.com/512/9672/9672887.png',
        },
      ],
    },
    {
      category: 'Soft Skills',
      skills: [
        {
          name: 'Analytical Thinking',
          icon: 'https://cdn-icons-png.flaticon.com/512/3588/3588592.png',
        },
        {
          name: 'Problem Solving',
          icon: 'https://cdn-icons-png.flaticon.com/512/4133/4133589.png',
        },
        {
          name: 'Collaboration',
          icon: '/icons/collaboration.svg',
        },
        {
          name: 'Quick Learning',
          icon: 'https://cdn-icons-png.flaticon.com/512/2490/2490402.png',
        },
      ],
    },
  ],
  projects: [
    {
      id: 'needmeet',
      title: 'NeedMeet: AI-Assisted Service Discovery & Marketplace',
      description:
        'A scalable AI-driven web application connecting local service providers with customers through an intelligent marketplace platform.',
      longDescription:
        'NeedMeet is a scalable, AI-driven marketplace designed to streamline local service discovery and booking. By integrating intelligent matching dashboards and modular UI components, it solves the inefficiencies in traditional scheduling, providing a seamless end-to-end experience for both service providers and customers.',
      projectStory: {
        problem:
          'Local service booking lacks intelligent decision-making tools and streamlined user interfaces, making scheduling inefficient for both providers and customers.',
        solution:
          'Engineered a scalable, responsive marketplace utilizing AI-assisted development to create modular UI components, robust data flows, and intelligent matching dashboards.',
        result:
          'Delivered a complete end-to-end platform enabling faster service discovery and seamless booking experience.',
      },
      technologies: [
        { name: 'Next.js', category: 'Frontend', icon: '/icons/nextjs.svg' },
        {
          name: 'TypeScript',
          category: 'Frontend',
          icon: '/icons/typescript.svg',
        },
        {
          name: 'Tailwind CSS',
          category: 'Frontend',
          icon: '/icons/tailwind.svg',
        },
        { name: 'AI Tools', category: 'AI/ML', icon: '/icons/ai.svg' },
      ],
      category: 'Web Development',
      images: [
        '/images/projects/needmeet-1.svg',
        '/images/projects/needmeet-2.svg',
      ],
      demoUrl: '#',
      githubUrl: 'https://github.com/MoNiLBaRiYa/NeedMeet',
      featured: true,
      ongoing: true,
      completionDate: '2025-01-15',
      teamSize: 1,
      challenges: [
        {
          title: 'Complex Workflow Design',
          description:
            'Creating intuitive user flows for service booking and management',
          solution:
            'Used AI-assisted development to rapidly prototype and iterate on UI/UX designs',
        },
        {
          title: 'AI Integration',
          description:
            'Implementing intelligent advisory system for repair/replace decisions',
          solution:
            'Integrated AI-based recommendation engine with user-friendly interface',
        },
      ],
      features: [
        {
          title: 'Service Booking System',
          description:
            'Complete workflow for scheduling and managing service appointments',
        },
        {
          title: 'AI Advisory System',
          description:
            'Intelligent recommendations for repair vs replace decisions',
        },
        {
          title: 'Dashboard Layouts',
          description:
            'User-friendly dashboards for both customers and service providers',
        },
      ],
      metrics: {
        userEngagement: 'Streamlined booking workflow with AI assistance',
        codeQuality: 'AI-assisted development with modern tools',
        result: 'Improved service booking efficiency and decision-making',
      },
    },
    {
      id: 'talentscout',
      title: 'TalentScout: AI-Powered Career Recommendation System',
      description:
        'An intelligent, real-time career advisory system leveraging structured prompt engineering to deliver personalized, data-driven growth roadmaps.',
      longDescription:
        'TalentScout is an intelligent career advisory system that leverages structured prompt engineering and AI workflows to deliver personalized growth roadmaps. It addresses the challenges job seekers face in identifying suitable career paths by providing automated, data-driven recommendations that are both scalable and highly targeted.',
      projectStory: {
        problem:
          'Job seekers struggle to identify suitable career paths, while traditional career counseling is time-consuming, expensive, and not highly scalable.',
        solution:
          'Built an intelligent advisory system leveraging structured prompt engineering and AI workflows to instantly analyze user profiles and identify optimal roles.',
        result:
          'Created an automated, dynamic workflow that delivers highly targeted, actionable career recommendations to users instantly.',
      },
      technologies: [
        { name: 'Next.js', category: 'Frontend', icon: '/icons/nextjs.svg' },
        {
          name: 'TypeScript',
          category: 'Frontend',
          icon: '/icons/typescript.svg',
        },
        { name: 'AI Workflows', category: 'AI/ML', icon: '/icons/ai.svg' },
        {
          name: 'Prompt Engineering',
          category: 'AI/ML',
          icon: '/icons/prompt.svg',
        },
      ],
      category: 'AI/ML',
      images: [
        '/images/projects/project-ts-1.svg',
        '/images/projects/project-ts-2.svg',
      ],
      demoUrl: '#',
      githubUrl: 'https://github.com/MoNiLBaRiYa/TalentScout',
      featured: true,
      ongoing: true,
      completionDate: '2025-01-10',
      teamSize: 1,
      challenges: [
        {
          title: 'Accurate Job Matching',
          description:
            'Creating algorithms that accurately match user skills to job roles',
          solution:
            'Developed structured prompt workflows and matching logic with AI assistance',
        },
        {
          title: 'User-Friendly Interface',
          description:
            'Designing forms that capture comprehensive user profiles',
          solution:
            'Created intuitive form-based inputs inspired by government career portals',
        },
      ],
      features: [
        {
          title: 'AI-Powered Recommendations',
          description:
            'Intelligent job role suggestions based on user profiles',
        },
        {
          title: 'Career Profiling System',
          description: 'Comprehensive skill and preference assessment',
        },
        {
          title: 'Form-Based Inputs',
          description: 'User-friendly data collection interface',
        },
      ],
      metrics: {
        userEngagement: 'Effective career guidance through AI workflows',
        codeQuality: 'AI-assisted development with structured approach',
        result: 'Democratized access to career counseling',
      },
    },
    {
      id: 'neolearn',
      title: 'NeoLearn: Accessibility-Focused Learning Platform',
      description:
        'An accessibility-first learning platform delivering inclusive educational experiences through strict WCAG-compliant design.',
      longDescription:
        'NeoLearn is an accessibility-first learning platform built with a focus on inclusivity and WCAG compliance. By implementing high-contrast themes, screen reader support, and simplified navigation, it ensures that educational content is equitable and accessible to users with various disabilities.',
      projectStory: {
        problem:
          'Digital learning platforms consistently fail to provide accessible experiences for disabled users, severely limiting inclusive education.',
        solution:
          'Developed an accessibility-first educational platform focusing heavily on high-contrast themes, screen reader compatibility, and simplified, intuitive navigation.',
        result:
          'Delivered a fully WCAG-compliant design that successfully ensures equitable and inclusive access to educational content for all users.',
      },
      technologies: [
        { name: 'Next.js', category: 'Frontend', icon: '/icons/nextjs.svg' },
        {
          name: 'TypeScript',
          category: 'Frontend',
          icon: '/icons/typescript.svg',
        },
        {
          name: 'Tailwind CSS',
          category: 'Frontend',
          icon: '/icons/tailwind.svg',
        },
        { name: 'AI Tools', category: 'AI/ML', icon: '/icons/ai.svg' },
      ],
      category: 'Web Development',
      images: [
        '/images/projects/project-nl-1.svg',
        '/images/projects/project-nl-2.svg',
      ],
      demoUrl: '#',
      githubUrl: 'https://github.com/MoNiLBaRiYa/NeoLearn',
      featured: true,
      completionDate: '2024-12-20',
      teamSize: 4,
      challenges: [
        {
          title: 'Accessibility Compliance',
          description:
            'Ensuring the platform meets accessibility standards for disabled users',
          solution:
            'Implemented WCAG guidelines with high-contrast themes and screen reader support',
        },
        {
          title: 'Inclusive Design',
          description:
            'Creating an interface that works for users with various disabilities',
          solution:
            'Used AI-assisted development to rapidly test and iterate on accessible designs',
        },
      ],
      features: [
        {
          title: 'High-Contrast Themes',
          description:
            'Multiple color schemes optimized for visual accessibility',
        },
        {
          title: 'Readable Typography',
          description:
            'Clear, large fonts with proper spacing for easy reading',
        },
        {
          title: 'Simple Navigation',
          description:
            'Intuitive interface designed for users with cognitive disabilities',
        },
      ],
      metrics: {
        userEngagement: 'High accessibility compliance and user satisfaction',
        codeQuality: 'AI-assisted development with accessibility focus',
        result: 'Promoted inclusive education for disabled learners',
      },
    },
    {
      id: 'fake-news-detection',
      title: 'Fake News AI Detection: ML-Powered Misinformation Analysis',
      description:
        'A Python-based misinformation detection system leveraging NLP and real-time machine learning predictions for instant classification.',
      longDescription:
        'This ML-powered misinformation analysis system uses advanced NLP techniques to provide real-time classification of news text. It features a secure backend pipeline and a user-friendly interface, designed to combat the rapid spread of online misinformation by delivering high-confidence verification results instantly.',
      projectStory: {
        problem:
          'The rapid, unchecked spread of online misinformation requires instant, automated verification to prevent viral fake news outbreaks before human fact-checkers can respond.',
        solution:
          'Designed and developed a secure pipeline integrating a backend NLP machine learning classification model with a responsive, user-friendly frontend interface.',
        result:
          'Deployed a highly functional system capable of delivering real-time, high-confidence news text classification to a live user base instantly.',
      },
      technologies: [
        { name: 'HTML', category: 'Frontend', icon: '/icons/html.svg' },
        { name: 'CSS', category: 'Frontend', icon: '/icons/css.svg' },
        { name: 'Flask', category: 'Backend', icon: '/icons/flask.svg' },
        { name: 'MongoDB', category: 'Database', icon: '/icons/mongodb.svg' },
        { name: 'Python', category: 'Backend', icon: '/icons/python.svg' },
      ],
      category: 'AI/ML',
      images: [
        '/images/projects/fake-news-1.svg',
        '/images/projects/fake-news-2.svg',
      ],
      demoUrl: '#',
      githubUrl: 'https://github.com/MoNiLBaRiYa/FakeNews_AI_Detection-',
      featured: true,
      completionDate: '2024-03-15',
      teamSize: 4,
      challenges: [
        {
          title: 'Database Security',
          description:
            'Implementing secure user authentication and data storage',
          solution:
            'Set up MongoDB with proper encryption and authentication mechanisms',
        },
        {
          title: 'UI/ML Integration',
          description:
            'Connecting the frontend interface with AI classification pipeline',
          solution:
            'Created Flask API endpoints to bridge UI and ML model seamlessly',
        },
      ],
      features: [
        {
          title: 'User Authentication',
          description: 'Secure login and signup system with MongoDB',
        },
        {
          title: 'News Verification',
          description: 'Real-time analysis with AI classification results',
        },
        {
          title: 'Responsive UI',
          description: 'Clean interface for news input and result display',
        },
      ],
      metrics: {
        userEngagement: 'Good user interaction with verification interface',
        codeQuality: 'Team collaboration with proper database integration',
        result:
          'Successfully demonstrates ML concepts in practical application',
      },
    },
  ],
  experience: [],
  education: [
    {
      id: 'btech-cse',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Parul University',
      startDate: '2022-08-01',
      endDate: '2026-06-30',
      cgpa: 6.68,
      relevantCoursework: [
        'Data Structures and Algorithms',
        'Machine Learning',
        'Database Management Systems',
        'Software Engineering',
        'Web Technologies',
        'Artificial Intelligence',
        'Computer Networks',
        'Operating Systems',
        'Object Oriented Programming',
        'Software Testing',
        'Computer Graphics',
        'Compiler Design',
      ],
      achievements: [
        'Currently in 8th Semester with CGPA of 6.68',
        'Active participant in coding competitions and technical events',
        'Developed multiple full-stack projects using modern technologies',
        'Gained practical experience through hands-on project development',
        'Completed industry simulations and certifications in software engineering and data visualization',
      ],
    },
    {
      id: 'higher-secondary',
      degree: '12th Grade (Higher Secondary)',
      institution: 'Aditya Birla Higher Secondary School',
      startDate: '2021-06-01',
      endDate: '2022-03-31',
      cgpa: 4.68, // Converting 46.76% to 10-point scale (46.76/10)
      relevantCoursework: [
        'Physics',
        'Chemistry',
        'Mathematics',
        'Computer Science',
        'English',
      ],
      achievements: [
        'Completed science stream with focus on mathematics and computer science',
        'Developed foundational knowledge in physics and chemistry',
        'Built strong analytical and problem-solving skills',
      ],
    },
    {
      id: 'secondary',
      degree: '10th Grade (Secondary)',
      institution: 'Aditya Birla Higher Secondary School',
      startDate: '2019-06-01',
      endDate: '2020-03-31',
      cgpa: 6.57, // Converting 65.66% to 10-point scale (65.66/10)
      relevantCoursework: [
        'Mathematics',
        'Science',
        'Social Studies',
        'English',
        'Sanskrit',
        'Computer Applications',
      ],
      achievements: [
        'Successfully completed secondary education with good academic performance',
        'Developed strong foundation in mathematics and science',
        'Early exposure to computer applications and technology',
      ],
    },
  ],
  certifications: [
    {
      id: 'generative-ai-mastermind',
      title: 'Generative AI Mastermind – Certificate of Completion',
      issuer: 'Outskill',
      date: '2025-11-01',
      description:
        'Completed a practical, industry-oriented program focusing on Generative AI, prompt engineering, automation workflows, and AI-assisted development.',
      skills: [
        'Generative AI',
        'Prompt Engineering',
        'Automation Workflows',
        'AI-Assisted Development',
        'AI Tools',
      ],
      achievements: [
        'Mastered Generative AI concepts and practical applications',
        'Developed expertise in prompt engineering techniques',
        'Learned automation workflows for AI-assisted development',
        'Gained hands-on experience with industry-standard AI tools',
      ],
      credentialUrl: '',
      image: '/images/certifications/generative-ai-mastermind.jpg',
    },
    {
      id: 'aws-cloudverse-appreciation',
      title: 'Certificate of Appreciation - AWS CloudVerse',
      issuer: 'AWS User Group, Vadodara',
      date: '2025-02-01',
      description:
        'Attended a seminar about Cloud computing which explained how to launch websites using cloud services and AWS infrastructure.',
      skills: ['AWS', 'Cloud Computing', 'Web Deployment', 'Cloud Services'],
      achievements: [
        'Learned about cloud-based website deployment',
        'Gained understanding of AWS cloud services',
        'Participated in hands-on cloud computing demonstrations',
      ],
      credentialUrl: '',
      image: '/images/certifications/aws-cloudverse.jpg',
    },
    {
      id: 'tableau-participation',
      title: 'Certificate of Participation',
      issuer: 'Gujarat Tableau User Group',
      date: '2025-01-01',
      description:
        'Participated in a workshop about Data Visualization in Tableau, learning about features and Agents in Tableau for advanced analytics.',
      skills: [
        'Tableau',
        'Data Visualization',
        'Analytics',
        'Dashboard Design',
      ],
      achievements: [
        'Completed hands-on Tableau workshop',
        'Learned advanced Tableau features and agents',
        'Gained practical experience in data visualization techniques',
      ],
      credentialUrl: '',
      image: '/images/certifications/tableau.jpg',
    },
    {
      id: 'nptel-computer-networks',
      title: 'Computer Networks and Internet Protocol',
      issuer: 'NPTEL',
      date: '2024-04-01',
      description:
        'Comprehensive course covering computer networks and internet protocols, providing fundamental knowledge about computer networking and internet technologies.',
      skills: [
        'Computer Networks',
        'Internet Protocol',
        'Network Security',
        'TCP/IP',
      ],
      achievements: [
        'Completed comprehensive networking course',
        'Gained fundamental knowledge of computer networking',
        'Understanding of internet protocols and network architecture',
      ],
      credentialUrl: '',
      image: '/images/certifications/nptel.jpg',
    },
    {
      id: 'ea-software-engineering-simulation',
      title: 'Software Engineering Job Simulation - Electronic Arts',
      issuer: 'Tata Forage',
      date: '2025-05-01',
      description:
        'Participated in Electronic Arts software engineering simulation focusing on code analysis, feature design, and codebase optimization for EA Sports College Football.',
      skills: [
        'Code Analysis',
        'Code Readability',
        'Data Structures',
        'Feature Design',
        'C++',
        'Software Engineering',
      ],
      achievements: [
        'Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders',
        'Built a class diagram and created a header file in C++ with class definitions for each object',
        'Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure',
      ],
      credentialUrl: '',
      image: '/images/certifications/ea-simulation.jpg',
    },
    {
      id: 'tata-data-visualization-simulation',
      title: 'Tata Data Visualization Job Simulation',
      issuer: 'Tata Forage',
      date: '2025-02-01',
      description:
        'Completed a simulation involving creating data visualizations for Tata Consultancy Services, focusing on data interpretation, cleanup, and executive decision-making support.',
      skills: [
        'Data Visualization',
        'Data Interpretation',
        'Data Cleanup',
        'Power BI',
        'Executive Communication',
        'Client Leadership',
      ],
      achievements: [
        'Completed a simulation involving creating data visualizations for Tata Consultancy Services',
        'Prepared questions for a meeting with client senior leadership',
        'Created visuals for data analysis to help executives with effective decision making',
      ],
      credentialUrl: '',
      image: '/images/certifications/tata-simulation.jpg',
    },
    {
      id: 'deloitte-cyber-simulation',
      title: 'Deloitte Australia Cyber Job Simulation',
      issuer: 'Deloitte Australia on Forage',
      date: '2026-01-01',
      description:
        'Completed a job simulation involving reading web activity logs, supporting a client in a cyber security breach, and identifying suspicious user activity.',
      skills: [
        'Cyber Security',
        'Log Analysis',
        'Threat Detection',
        'Incident Response',
        'Security Analysis',
      ],
      achievements: [
        'Completed a job simulation involving reading web activity logs',
        'Supported a client in a cyber security breach',
        'Answered questions to identify suspicious user activity',
      ],
      credentialUrl: '',
      image: '/images/certifications/deloitte-cyber.jpg',
    },
  ],
  hobbies: [
    {
      name: 'Drawing & Sketching',
      description:
        'Creating hand-drawn sketches and illustrations on paper, exploring artistic expression and developing visual storytelling skills.',
      image: '/images/hobbies/drawing.svg',
      relatedSkills: [
        'Creativity',
        'Visual Design',
        'UI/UX Design',
        'Attention to Detail',
      ],
    },
    {
      name: 'Spiritual & Philosophical Literature',
      description:
        'Reading transformative texts including "The Secret," Bhagavad Gita, Shiva Purana, and other spiritual and philosophical works that explore consciousness, ancient wisdom, and personal growth.',
      image: '/images/hobbies/reading.svg',
      relatedSkills: [
        'Continuous Learning',
        'Research Skills',
        'Critical Thinking',
        'Knowledge Synthesis',
      ],
    },
    {
      name: 'Gaming',
      description:
        'Playing video games for entertainment and relaxation, enjoying interactive experiences across various genres and platforms.',
      image: '/images/hobbies/gaming.svg',
      relatedSkills: [
        'Problem Solving',
        'Strategic Thinking',
        'User Experience Analysis',
        'Pattern Recognition',
      ],
    },
  ],
  offerings: [
    {
      title: 'MVP Development',
      description:
        'I turn your ideas into functional products quickly using modern technologies and AI-assisted workflows.',
      icon: 'Rocket',
      color: 'bg-indigo-50 border-indigo-100',
      iconBg: 'bg-indigo-100',
    },
    {
      title: 'AI Integration & Automation',
      description:
        'I integrate intelligent features like chatbots, recommendation systems, and automation into web applications.',
      icon: 'Bot',
      color: 'bg-purple-50 border-purple-100',
      iconBg: 'bg-purple-100',
    },
    {
      title: 'Data Visualization & Dashboards',
      description:
        'I create interactive dashboards using Power BI and Tableau to help businesses make data-driven decisions.',
      icon: 'BarChart',
      color: 'bg-emerald-50 border-emerald-100',
      iconBg: 'bg-emerald-100',
    },
    {
      title: 'Full-Stack Web Development',
      description:
        'I build scalable, responsive web applications tailored to your business needs using modern tech stacks.',
      icon: 'Code',
      color: 'bg-blue-50 border-blue-100',
      iconBg: 'bg-blue-100',
    },
    {
      title: 'SEO-Optimized Web Development',
      description:
        'I develop web applications with strong technical SEO foundations to improve performance and search visibility.',
      icon: 'Search',
      color: 'bg-orange-50 border-orange-100',
      iconBg: 'bg-orange-100',
    },
  ],
};
