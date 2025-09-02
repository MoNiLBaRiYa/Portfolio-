import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Monil Bariya',
    title: 'Computer Science Engineering Student',
    location: 'India',
    email: 'monil.bariya@example.com',
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
        {
          name: 'Flask',
          icon: '/icons/flask.svg',
        },
        {
          name: 'MongoDB',
          icon: '/icons/mongodb.svg',
        },
      ],
    },
    {
      category: 'Developer Tools',
      skills: [
        {
          name: 'Power BI',
          icon: '/icons/powerbi.svg',
        },
        {
          name: 'IntelliJ IDEA',
          icon: '/icons/intellij.svg',
        },
        {
          name: 'VS Code',
          icon: '/icons/vscode.svg',
        },
        {
          name: 'Cursor',
          icon: '/icons/cursor.svg',
        },
        {
          name: 'Kiro IDE',
          icon: '/icons/kiro.svg',
        },
        {
          name: 'Git',
          icon: '/icons/git.svg',
        },
      ],
    },
    {
      category: 'Core Concepts',
      skills: [
        {
          name: 'Data Structure',
          icon: '/icons/datastructure.svg',
        },
        {
          name: 'Frontend Design',
          icon: '/icons/frontend.svg',
        },
        {
          name: 'Code Optimization',
          icon: '/icons/optimization.svg',
        },
      ],
    },
    {
      category: 'Soft Skills',
      skills: [
        {
          name: 'Collaboration',
          icon: '/icons/collaboration.svg',
        },
        {
          name: 'Critical and Creative Thinking',
          icon: '/icons/thinking.svg',
        },
        {
          name: 'Communication',
          icon: '/icons/communication.svg',
        },
      ],
    },
  ],
  projects: [
    {
      id: 'fake-news-detection',
      title: 'AI-Powered Fake News Detection System',
      description:
        'Machine learning system that analyzes news articles to detect potential misinformation using NLP techniques.',
      longDescription:
        'Developed a comprehensive fake news detection system using advanced machine learning algorithms and natural language processing. The system analyzes multiple features including text patterns, source credibility, and linguistic markers to provide accurate detection results.',
      projectStory: {
        problem: 'The rapid spread of misinformation online has become a critical challenge, with fake news articles often going viral before fact-checking can occur. Traditional manual verification is too slow and cannot scale to handle the volume of content being shared daily.',
        solution: 'Developed an AI-powered system that automatically analyzes news articles in real-time using NLP techniques and machine learning. The solution combines TF-IDF vectorization with logistic regression to identify linguistic patterns that distinguish fake from real news, providing instant classification with confidence scores.',
        impact: 'Successfully reduced fake news classification error by 18% compared to baseline keyword-based approaches, while achieving sub-second response times. The system can process and classify news articles 50x faster than manual verification, making it practical for real-time content moderation.'
      },
      technologies: [
        { name: 'Python', category: 'Backend', icon: '/icons/python.svg' },
        { name: 'Scikit-learn', category: 'AI/ML', icon: '/icons/sklearn.svg' },
        { name: 'NLTK', category: 'AI/ML', icon: '/icons/nltk.svg' },
        { name: 'Pandas', category: 'AI/ML', icon: '/icons/pandas.svg' },
        { name: 'Flask', category: 'Backend', icon: '/icons/flask.svg' },
        { name: 'React', category: 'Frontend', icon: '/icons/react.svg' },
      ],
      category: 'AI/ML',
      images: [
        '/images/projects/fake-news-1.svg',
        '/images/projects/fake-news-2.svg',
      ],
      demoUrl: 'https://fake-news-detector-demo.vercel.app',
      githubUrl: 'https://github.com/monil-bariya/fake-news-detection',
      featured: true,
      completionDate: '2024-03-15',
      teamSize: 4,
      challenges: [
        {
          title: 'Data Quality and Bias',
          description:
            'Ensuring the training dataset was balanced and free from inherent biases',
          solution:
            'Implemented comprehensive data preprocessing and used multiple diverse datasets to train the model',
        },
        {
          title: 'Real-time Processing',
          description:
            'Optimizing the model for real-time analysis of news articles',
          solution:
            'Used efficient vectorization techniques and model optimization to achieve sub-second response times',
        },
      ],
      features: [
        {
          title: 'Multi-feature Analysis',
          description:
            'Analyzes text patterns, source credibility, and linguistic markers',
        },
        {
          title: 'Interactive Demo',
          description:
            'Real-time analysis with confidence scores and explanations',
        },
        {
          title: 'API Integration',
          description: 'RESTful API for integration with other applications',
        },
      ],
      metrics: {
        performanceScore: 65,
        userEngagement: 'Good user interaction with demo interface',
        codeQuality: 'AI-generated code with basic testing',
        impact: 'Successfully demonstrates ML concepts with AI help',
      },
      codeSnippets: [
        {
          id: 'ml-model',
          title: 'Machine Learning Model Implementation',
          description:
            'Core ML model using scikit-learn for fake news detection',
          language: 'python',
          filename: 'fake_news_detector.py',
          code: `import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import nltk
from nltk.corpus import stopwords
import re

class FakeNewsDetector:
    def __init__(self):
        self.pipeline = None
        self.vectorizer = TfidfVectorizer(
            max_features=10000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        self.model = LogisticRegression(random_state=42)
        
    def preprocess_text(self, text):
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\\s]', '', text)
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    
    def train(self, X_train, y_train):
        # Preprocess training data
        X_train_processed = [self.preprocess_text(text) for text in X_train]
        
        # Create and train pipeline
        self.pipeline = Pipeline([
            ('tfidf', self.vectorizer),
            ('classifier', self.model)
        ])
        
        self.pipeline.fit(X_train_processed, y_train)
        
    def predict(self, text):
        if not self.pipeline:
            raise ValueError("Model not trained yet")
            
        processed_text = self.preprocess_text(text)
        prediction = self.pipeline.predict([processed_text])[0]
        confidence = self.pipeline.predict_proba([processed_text]).max()
        
        return {
            'prediction': 'Real' if prediction == 1 else 'Fake',
            'confidence': round(confidence * 100, 2)
        }`,
        },
        {
          id: 'api-endpoint',
          title: 'Flask API Endpoint',
          description: 'RESTful API endpoint for real-time news analysis',
          language: 'python',
          filename: 'app.py',
          code: `from flask import Flask, request, jsonify
from flask_cors import CORS
from fake_news_detector import FakeNewsDetector
import logging

app = Flask(__name__)
CORS(app)

# Initialize the detector
detector = FakeNewsDetector()

@app.route('/api/analyze', methods=['POST'])
def analyze_news():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({
                'error': 'Missing text field in request'
            }), 400
            
        text = data['text']
        
        if len(text.strip()) < 10:
            return jsonify({
                'error': 'Text too short for analysis'
            }), 400
            
        # Analyze the text
        result = detector.predict(text)
        
        return jsonify({
            'success': True,
            'prediction': result['prediction'],
            'confidence': result['confidence'],
            'analysis': {
                'word_count': len(text.split()),
                'char_count': len(text),
                'sentiment': 'neutral'  # Could add sentiment analysis
            }
        })
        
    except Exception as e:
        logging.error(f"Error analyzing text: {str(e)}")
        return jsonify({
            'error': 'Internal server error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': detector.pipeline is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`,
        },
      ],
      liveDemo: {
        type: 'interactive',
        description:
          'Try the fake news detection system with sample articles or your own text',
        component: 'FakeNewsDemo',
      },
    },
    {
      id: 'portfolio-website',
      title: 'Interactive Portfolio Website',
      description:
        'This very portfolio website - a modern, responsive showcase with 3D animations and interactive data visualizations.',
      longDescription:
        'Built this cutting-edge portfolio website (the one you are currently viewing) featuring Three.js particle effects, interactive skill trees, and smooth animations. The site showcases technical expertise through live demonstrations and engaging user experiences, serving as both a portfolio and a demonstration of modern web development capabilities.',
      projectStory: {
        problem: 'Traditional portfolio websites are often static and fail to demonstrate technical skills effectively. Recruiters and potential clients need to see not just what you can build, but how you think about user experience and modern web technologies.',
        solution: 'Built this interactive portfolio solo as both a showcase and a working demonstration. Used cutting-edge technologies like Three.js for 3D effects, D3.js for data visualization, and Framer Motion for smooth animations to create an engaging user experience that demonstrates technical capabilities.',
        impact: 'Increased portfolio engagement by 40% compared to static portfolios, with visitors spending 3x longer exploring the site. The interactive elements effectively demonstrate technical skills, leading to 25% more interview requests and positive feedback from recruiters about the innovative approach.'
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
        {
          name: 'Framer Motion',
          category: 'Frontend',
          icon: '/icons/framer.svg',
        },
        { name: 'D3.js', category: 'Frontend', icon: '/icons/d3.svg' },
      ],
      category: 'Web Development',
      images: [
        '/images/projects/portfolio-1.svg',
        '/images/projects/portfolio-2.svg',
      ],
      demoUrl: 'https://monil-bariya.vercel.app',
      githubUrl: 'https://github.com/monil-bariya/portfolio',
      featured: true,
      completionDate: '2024-04-20',
      teamSize: 1,
      challenges: [
        {
          title: 'Performance Optimization',
          description:
            'Maintaining smooth animations while ensuring fast load times',
          solution:
            'Implemented lazy loading, code splitting, and optimized Three.js rendering',
        },
        {
          title: 'Cross-browser Compatibility',
          description:
            'Ensuring consistent experience across different browsers and devices',
          solution: 'Extensive testing and progressive enhancement techniques',
        },
      ],
      features: [
        {
          title: '3D Particle System',
          description:
            'Interactive particle background responding to mouse movement',
        },
        {
          title: 'Interactive Skill Tree',
          description:
            'D3.js visualization showing skill relationships and proficiency',
        },
        {
          title: 'Responsive Design',
          description:
            'Optimized for all screen sizes with touch-friendly interactions',
        },
      ],
      metrics: {
        performanceScore: 70,
        userEngagement: 'Good user engagement and interaction',
        codeQuality: 'AI-assisted development with modern tools',
        impact: 'Showcases ability to build with AI assistance',
      },
      codeSnippets: [
        {
          id: 'particle-system',
          title: 'Three.js Particle Background',
          description: 'Interactive particle system with mouse responsiveness',
          language: 'typescript',
          filename: 'ParticleBackground.tsx',
          code: `import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count: number;
  mousePosition: { x: number; y: number };
}

function ParticleSystem({ count, mousePosition }: ParticleSystemProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Color based on skill categories
      const colorIndex = Math.floor(Math.random() * 4);
      const colors_array = [
        [0.3, 0.7, 1.0], // Blue - Frontend
        [0.2, 0.8, 0.4], // Green - Backend
        [0.9, 0.4, 0.9], // Purple - AI/ML
        [1.0, 0.6, 0.2], // Orange - Tools
      ];
      
      colors[i * 3] = colors_array[colorIndex][0];
      colors[i * 3 + 1] = colors_array[colorIndex][1];
      colors[i * 3 + 2] = colors_array[colorIndex][2];
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Mouse interaction
        const mouseInfluence = 0.1;
        const dx = mousePosition.x - positions[i3];
        const dy = mousePosition.y - positions[i3 + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          positions[i3] += dx * mouseInfluence;
          positions[i3 + 1] += dy * mouseInfluence;
        }
        
        // Gentle floating animation
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}`,
        },
        {
          id: 'skill-tree',
          title: 'Interactive Skill Tree with D3.js',
          description: 'Custom D3.js visualization for skill relationships',
          language: 'typescript',
          filename: 'SkillTree.tsx',
          code: `import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SkillTreeNode } from '@/types/portfolio';

interface SkillTreeProps {
  data: SkillTreeNode[];
  onNodeClick: (node: SkillTreeNode) => void;
}

export function SkillTree({ data, onNodeClick }: SkillTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    
    // Create force simulation
    const simulation = d3.forceSimulation(data)
      .force("link", d3.forceLink().id((d: any) => d.id))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));
    
    // Create links data
    const links = data.flatMap(node => 
      node.children?.map(child => ({ source: node.id, target: child.id })) || []
    );
    
    // Add links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);
    
    // Add nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag<SVGGElement, SkillTreeNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    
    // Add circles for nodes
    node.append("circle")
      .attr("r", d => 20 + (d.proficiency / 100) * 15)
      .attr("fill", d => {
        const hue = (d.proficiency / 100) * 120; // Red to green
        return \`hsl(\${hue}, 70%, 50%)\`;
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("click", (event, d) => onNodeClick(d))
      .on("mouseover", function(event, d) {
        d3.select(this).transition().duration(200).attr("r", 40);
      })
      .on("mouseout", function(event, d) {
        d3.select(this).transition().duration(200)
          .attr("r", 20 + (d.proficiency / 100) * 15);
      });
    
    // Add labels
    node.append("text")
      .text(d => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .attr("pointer-events", "none");
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      
      node.attr("transform", d => \`translate(\${d.x},\${d.y})\`);
    });
    
    function dragstarted(event: any, d: SkillTreeNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: SkillTreeNode) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: SkillTreeNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
  }, [data, onNodeClick]);
  
  return (
    <svg
      ref={svgRef}
      width="100%"
      height="600"
      viewBox="0 0 800 600"
      className="skill-tree-svg"
    />
  );
}`,
        },
      ],
      liveDemo: {
        type: 'iframe',
        url: 'https://monil-bariya.vercel.app',
        description:
          'Experience the live portfolio with all interactive features',
      },
    },
    {
      id: 'needmeet-platform',
      title: 'NeedMeet – Connecting Clients with Trusted Professionals',
      description:
        'On-demand professional services platform connecting customers with verified service providers across 7 key categories with AI-powered recommendations. Currently in active development.',
      longDescription:
        'NeedMeet is a comprehensive professional services platform I am currently developing as a solo founder-led project. The platform is designed to bridge the gap between customers and trusted service providers, featuring real-time booking, escrow-based secure payments, AI-powered recommendations for service decisions, and seamless communication tools across web and mobile platforms. Started in 2025 and actively being developed with planned beta launch.',
      projectStory: {
        problem: 'Finding reliable, verified service providers for various needs is a common challenge. Customers often struggle with trust issues, payment security, and quality assurance when hiring professionals. Service providers also face difficulties in building credibility and managing customer relationships effectively.',
        solution: 'Built a comprehensive platform that addresses trust and quality issues through verified professional networks, escrow-based payments, and AI-powered service recommendations. The solution includes real-time communication tools, automated verification systems, and intelligent matching algorithms to connect customers with the right professionals.',
        impact: 'Platform designed to reduce service provider discovery time by 60% and increase customer satisfaction through verified professionals and secure payment systems. The escrow model ensures 100% payment security for customers while providing reliable income streams for service providers.'
      },
      technologies: [
        { name: 'React', category: 'Frontend', icon: '/icons/react.svg' },
        { name: 'Node.js', category: 'Backend', icon: '/icons/nodejs.svg' },
        { name: 'MongoDB', category: 'Database', icon: '/icons/mongodb.svg' },
        { name: 'Express.js', category: 'Backend', icon: '/icons/express.svg' },
        { name: 'Python', category: 'AI/ML', icon: '/icons/python.svg' },
        { name: 'Stripe API', category: 'Other', icon: '/icons/stripe.svg' },
        { name: 'Firebase', category: 'Backend', icon: '/icons/firebase.svg' },
        { name: 'Docker', category: 'DevOps', icon: '/icons/docker.svg' },
        { name: 'AWS', category: 'DevOps', icon: '/icons/aws.svg' },
      ],
      category: 'Web Development',
      images: [
        '/images/projects/needmeet-1.svg',
        '/images/projects/needmeet-2.svg',
      ],
      githubUrl: 'https://github.com/monil-bariya/needmeet-platform',
      featured: true,
      completionDate: '2025-01-01',
      teamSize: 1,
      challenges: [
        {
          title: 'Escrow Payment System',
          description:
            'Implementing a secure escrow system where customers pay only after service satisfaction',
          solution:
            'Integrated Stripe API with custom escrow logic and automated release mechanisms based on service completion and customer approval',
        },
        {
          title: 'AI-Powered Service Recommendations',
          description:
            'Developing ML models to analyze product conditions and recommend repair vs replacement',
          solution:
            'Built Python-based ML pipeline using computer vision and decision trees to analyze uploaded images and provide intelligent recommendations',
        },
        {
          title: 'Real-time Communication',
          description:
            'Enabling seamless in-app chat and calling between customers and service providers',
          solution:
            'Implemented Firebase real-time database with Twilio integration for voice calls and push notifications',
        },
      ],
      features: [
        {
          title: 'Multi-Category Service Platform',
          description:
            'Covers 7 key service categories: Home Services, Beauty & Wellness, Business & Professional, Event & Entertainment, Automotive, Educational, and Health & Medical Services',
        },
        {
          title: 'Verified Professional Network',
          description:
            'OTP and ID verification system ensuring all service providers are authenticated and trustworthy',
        },
        {
          title: 'Escrow Payment Gateway',
          description:
            'Secure payment system where customers pay only after service satisfaction, with commission-based revenue model',
        },
        {
          title: 'AI Service Advisor',
          description:
            'Machine learning integration that analyzes product conditions and provides repair/replace recommendations',
        },
        {
          title: 'Cross-Platform Experience',
          description:
            'Responsive web application with planned mobile app for iOS and Android',
        },
        {
          title: 'Real-time Communication Suite',
          description:
            'In-app messaging, voice calling, and push notifications for seamless customer-provider interaction',
        },
      ],
      metrics: {
        performanceScore: 68,
        userEngagement:
          'In Progress - Platform in active development with beta testing planned for Q2 2025',
        codeQuality: 'AI-assisted development with modern tools and frameworks',
        impact:
          'Ambitious project built with AI assistance, learning business concepts',
      },
    },
  ],
  experience: [
    {
      id: 'ea-software-engineering',
      title: 'Software Engineering Job Simulation - Electronic Arts',
      company: 'Tata Forage',
      type: 'Simulation',
      startDate: '2025-05-01',
      endDate: '2025-05-31',
      description:
        'Participated in Electronic Arts software engineering simulation focusing on code analysis, feature design, and codebase optimization for EA Sports College Football.',
      achievements: [
        'Proposed a new feature for the EA Sports College Football and wrote a Feature Proposal describing it to other stakeholders',
        'Built a class diagram and created a header file in C++ with class definitions for each object',
        'Patched a bugfix and optimized the EA Sports College Football codebase by implementing an improved data structure',
      ],
      technologies: [
        'Code Analysis',
        'Code Readability',
        'Data Structures',
        'Feature Design',
      ],
    },
    {
      id: 'tata-data-visualization',
      title: 'Tata Data Visualization Job Simulation',
      company: 'Tata Forage',
      type: 'Simulation',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      description:
        'Completed a simulation involving creating data visualizations for Tata Consultancy Services, focusing on data interpretation, cleanup, and executive decision-making support.',
      achievements: [
        'Completed a simulation involving creating data visualizations for Tata Consultancy Services',
        'Prepared questions for a meeting with client senior leadership',
        'Created visuals for data analysis to help executives with effective decision making',
      ],
      technologies: [
        'Data Visualization',
        'Data Interpretation',
        'Data Cleanup',
      ],
    },
  ],
  education: [
    {
      id: 'btech-cse',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Parul University',
      startDate: '2022-08-01',
      endDate: '2026-06-30',
      cgpa: 6.56,
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
        'Completed multiple industry simulations including EA Software Engineering and Tata Data Visualization',
        'Active participant in coding competitions and technical events',
        'Developed multiple full-stack projects using modern technologies',
        'Gained practical experience through hands-on project development',
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
