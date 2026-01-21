import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Monil Bariya',
    title: 'Computer Science Engineering Student',
    location: 'India',
    email: 'monil.bariya2003@gmail.com',
    linkedin: 'https://www.linkedin.com/in/monilbariya28',
    github: 'https://github.com/MoNiLBaRiYa',
    summary:
      'Passionate Computer Science Engineering student leveraging modern development practices and AI-assisted tools to build innovative software solutions. Experienced in creating interactive web applications, AI/ML projects, and data visualization dashboards using contemporary development workflows.',
    availability: 'Available',
    profileImage: '/images/profile.svg',
  },
  skills: [
    {
      category: 'Languages',
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
      category: 'Web Development',
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
          name: 'Three.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg',
        },
      ],
    },
    {
      category: 'Backend & Databases',
      skills: [
        {
          name: 'MongoDB',
          icon: '/icons/mongodb.svg',
        },
      ],
    },
    {
      category: 'AI Tools',
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
      category: 'Developer Tools',
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
          name: 'Kiro',
          icon: '/icons/kiro.svg',
        },
        {
          name: 'Power BI',
          icon: '/icons/powerbi.svg',
        },
        {
          name: 'Git',
          icon: '/icons/git.svg',
        },
      ],
    },
    {
      category: 'Core Skills',
      skills: [
        {
          name: 'Documentation',
          icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087815.png',
        },
        {
          name: 'UI/UX Basics',
          icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png',
        },
        {
          name: 'API Understanding',
          icon: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
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
      title: 'NeedMeet – Service Booking & Management Platform',
      description:
        'AI-Assisted Full Stack service booking platform with scheduling, user access management, and AI-based advisory system for repair/replace decisions. (Ongoing)',
      longDescription:
        'Designed end-to-end workflow for service booking, scheduling, and user access. Built responsive UI components and modular navigation using AI-assisted development tools. Created forms, dashboard layouts, and user data flow architecture similar to public service portals.',
      projectStory: {
        problem:
          'Service booking platforms often lack intelligent decision-making tools and have complex user interfaces that make scheduling and management difficult for both service providers and customers.',
        solution:
          'Built a comprehensive service booking platform with AI-assisted development, featuring responsive UI components, modular navigation, and an integrated AI-based advisory system that helps users make informed repair/replace decisions.',
        impact:
          'Created a scalable platform architecture that streamlines service booking workflows and provides intelligent recommendations, improving user decision-making and operational efficiency.',
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
        impact: 'Improved service booking efficiency and decision-making',
      },
    },
    {
      id: 'talentscout',
      title: 'TalentScout – AI Hiring Platform',
      description:
        'AI Workflow Development platform for career profiling that recommends suitable job roles based on user skills and preferences. (Ongoing)',
      longDescription:
        'Developed structured prompt workflows to recommend suitable job roles to users. Designed UI screens and form-based inputs used in many government career portals. Planned backend schema and matching logic with AI assistance.',
      projectStory: {
        problem:
          'Job seekers often struggle to identify suitable career paths that match their skills and interests, while traditional career counseling is time-consuming and not always accessible.',
        solution:
          'Created an AI-powered platform that uses structured prompt workflows to analyze user profiles and recommend personalized job roles. Designed intuitive form-based inputs and matching logic to provide accurate career guidance.',
        impact:
          'Automated the career recommendation process, making professional guidance accessible to more users while providing data-driven insights for better career decisions.',
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
        '/images/projects/talentscout-1.svg',
        '/images/projects/talentscout-2.svg',
      ],
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
        impact: 'Democratized access to career counseling',
      },
    },
    {
      id: 'neolearn',
      title: 'NeoLearn – AI-Integrated Learning App',
      description:
        'Accessibility-focused learning interface designed for disabled learners with high-contrast themes and inclusive design principles.',
      longDescription:
        'Built an accessibility-focused UI for disabled learners using AI-assisted development. Designed high-contrast themes, readable text, and simple navigation for inclusive access. Created responsive learning screens aligned with basic accessibility guidelines.',
      projectStory: {
        problem:
          'Many educational platforms lack proper accessibility features, making it difficult for disabled learners to access quality educational content and participate in online learning.',
        solution:
          'Developed an inclusive learning platform with AI-assisted development, featuring high-contrast themes, readable typography, and simplified navigation specifically designed for learners with disabilities.',
        impact:
          'Made online learning more accessible to disabled students, promoting inclusive education and ensuring equal access to learning resources.',
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
        '/images/projects/neolearn-1.svg',
        '/images/projects/neolearn-2.svg',
      ],
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
        impact: 'Promoted inclusive education for disabled learners',
      },
    },
    {
      id: 'fake-news-detection',
      title: 'Fake News AI Detection Model',
      description:
        'Machine learning system that analyzes news articles to detect potential misinformation using NLP techniques.',
      longDescription:
        'Created responsive UI for login, signup, and news verification. Assisted in database setup for secure user data handling. Helped integrate the AI classification pipeline with UI output display.',
      projectStory: {
        problem:
          'The rapid spread of misinformation online has become a critical challenge, with fake news articles often going viral before fact-checking can occur.',
        solution:
          'Developed an AI-powered system with responsive UI that automatically analyzes news articles using NLP techniques and machine learning, providing instant classification with confidence scores.',
        impact:
          'Successfully created a functional fake news detection system with secure user authentication and real-time analysis capabilities.',
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
        impact:
          'Successfully demonstrates ML concepts in practical application',
      },
    },
    {
      id: 'portfolio-website',
      title: 'Interactive Portfolio Website',
      description:
        'Modern, responsive personal website with subtle animations, smooth transitions, and clean minimalistic UI.',
      longDescription:
        'Developed a fast, responsive personal website showcasing work and skills. Built with Next.js, TypeScript, and Tailwind CSS featuring Three.js for visual effects. Added subtle animations, smooth transitions, and clean minimalistic UI.',
      projectStory: {
        problem:
          'Traditional portfolio websites are often static and fail to demonstrate technical skills effectively. Need a modern platform to showcase projects and abilities.',
        solution:
          'Built this interactive portfolio using modern web technologies like Next.js, TypeScript, and Tailwind CSS. Incorporated Three.js for visual effects and created an engaging user experience that demonstrates technical capabilities.',
        impact:
          'Created a professional online presence that effectively showcases projects and skills, leading to increased visibility and opportunities.',
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
        { name: 'Three.js', category: 'Frontend', icon: '/icons/threejs.svg' },
      ],
      category: 'Web Development',
      images: [
        '/images/projects/portfolio-1.svg',
        '/images/projects/portfolio-2.svg',
      ],
      githubUrl: 'https://github.com/MoNiLBaRiYa/Portfolio-',
      featured: true,
      completionDate: '2024-04-20',
      teamSize: 1,
      challenges: [
        {
          title: 'Performance Optimization',
          description:
            'Maintaining smooth animations while ensuring fast load times',
          solution:
            'Implemented lazy loading, code splitting, and optimized rendering',
        },
        {
          title: 'Responsive Design',
          description:
            'Ensuring consistent experience across different devices',
          solution:
            'Used Tailwind CSS responsive utilities and extensive testing',
        },
      ],
      features: [
        {
          title: 'Subtle Animations',
          description:
            'Smooth transitions and animations for enhanced user experience',
        },
        {
          title: 'Clean UI',
          description:
            'Minimalistic design focusing on content and readability',
        },
        {
          title: 'Fast Performance',
          description:
            'Optimized for speed with Next.js and modern web practices',
        },
      ],
      metrics: {
        userEngagement: 'Professional presentation with good user experience',
        codeQuality: 'Modern development with TypeScript and best practices',
        impact: 'Effective showcase of technical skills and projects',
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
};
