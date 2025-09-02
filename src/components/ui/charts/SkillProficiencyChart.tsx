'use client';

import { useEffect, useRef } from 'react';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';
import { SkillCategory } from '@/types/portfolio';
import { motion } from 'framer-motion';
import '@/lib/chartConfig'; // Import to register Chart.js components

interface SkillProficiencyChartProps {
  skills: SkillCategory[];
  type: 'radar' | 'doughnut' | 'bar';
  className?: string;
}

// Realistic Skills for AI Tool User - Someone who builds with AI assistance but limited coding knowledge
const skillProficiencyData = {
  // Programming Languages - Basic understanding, AI does the heavy lifting
  Python: {
    proficiency: 45,
    experience: 'AI tools help me build',
    projects: 8,
  },
  Java: { proficiency: 40, experience: 'AI tools help me build', projects: 6 },
  'C++': { proficiency: 35, experience: 'AI tools help me build', projects: 4 },
  HTML: { proficiency: 60, experience: 'Copy-paste + AI help', projects: 12 },
  CSS: { proficiency: 55, experience: 'Copy-paste + AI help', projects: 12 },
  JavaScript: {
    proficiency: 40,
    experience: 'AI tools help me build',
    projects: 10,
  },
  TypeScript: {
    proficiency: 35,
    experience: 'AI tools help me build',
    projects: 6,
  },

  // Frameworks & Libraries - AI generates most code
  Flask: {
    proficiency: 45,
    experience: 'AI generates code for me',
    projects: 5,
  },
  React: {
    proficiency: 50,
    experience: 'AI generates code for me',
    projects: 8,
  },
  'Next.js': {
    proficiency: 48,
    experience: 'AI generates code for me',
    projects: 4,
  },
  'Node.js': {
    proficiency: 42,
    experience: 'AI generates code for me',
    projects: 5,
  },
  'Tailwind CSS': {
    proficiency: 65,
    experience: 'Copy classes + AI help',
    projects: 7,
  },

  // Databases & Backend - Basic setup with AI help
  MongoDB: { proficiency: 40, experience: 'AI helps with setup', projects: 4 },
  SQL: { proficiency: 45, experience: 'AI writes queries for me', projects: 5 },
  'REST APIs': {
    proficiency: 42,
    experience: 'AI generates API code',
    projects: 8,
  },

  // Data & Analytics - Strongest area with hands-on experience
  'Power BI': { proficiency: 85, experience: 'Hands-on 2+ years', projects: 6 },
  'Data Analysis': {
    proficiency: 75,
    experience: 'Good with tools',
    projects: 7,
  },
  'Machine Learning': {
    proficiency: 50,
    experience: 'AI helps implement',
    projects: 4,
  },
  Pandas: { proficiency: 45, experience: 'AI writes code for me', projects: 5 },
  NumPy: { proficiency: 40, experience: 'AI writes code for me', projects: 4 },

  // Development Tools - High proficiency with AI-powered tools
  'VS Code': {
    proficiency: 80,
    experience: 'Daily use 2+ years',
    projects: 15,
  },
  Git: {
    proficiency: 60,
    experience: 'Basic commands + AI help',
    projects: 12,
  },
  'IntelliJ IDEA': {
    proficiency: 70,
    experience: 'AI-powered features',
    projects: 6,
  },
  Cursor: {
    proficiency: 95,
    experience: 'Daily use - my main tool',
    projects: 8,
  },
  'Kiro IDE': {
    proficiency: 90,
    experience: 'Daily use - love it',
    projects: 5,
  },
  Docker: { proficiency: 35, experience: 'AI helps with setup', projects: 3 },
  AWS: { proficiency: 30, experience: 'AI guides deployment', projects: 2 },

  // Core CS Concepts - Academic knowledge, AI helps apply
  'Data Structure': {
    proficiency: 60,
    experience: 'Academic + AI explains',
    projects: 10,
  },
  Algorithms: {
    proficiency: 55,
    experience: 'Academic + AI explains',
    projects: 8,
  },
  'System Design': {
    proficiency: 45,
    experience: 'AI helps me understand',
    projects: 3,
  },
  'Database Design': {
    proficiency: 50,
    experience: 'AI guides design',
    projects: 5,
  },

  // Frontend & Design - Good eye for design, AI implements
  'Frontend Design': {
    proficiency: 80,
    experience: 'Good design sense',
    projects: 10,
  },
  'UI/UX Principles': {
    proficiency: 75,
    experience: 'Natural design eye',
    projects: 8,
  },
  'Responsive Design': {
    proficiency: 70,
    experience: 'AI handles implementation',
    projects: 11,
  },

  // Project & Problem Solving - Strong natural abilities
  'Project Planning': {
    proficiency: 85,
    experience: 'Natural organizer',
    projects: 15,
  },
  'Problem Solving': {
    proficiency: 90,
    experience: 'Strong logical thinking',
    projects: 15,
  },
  'Learning New Tools': {
    proficiency: 95,
    experience: 'Quick to adapt',
    projects: 15,
  },
  'AI Tool Usage': {
    proficiency: 95,
    experience: 'Expert at using AI tools',
    projects: 15,
  },

  // Soft Skills - Natural strengths
  Collaboration: {
    proficiency: 85,
    experience: 'Good team player',
    projects: 15,
  },
  'Critical Thinking': {
    proficiency: 88,
    experience: 'Strong analytical mind',
    projects: 12,
  },
  'Creative Thinking': {
    proficiency: 92,
    experience: 'Natural creativity',
    projects: 10,
  },
  Communication: {
    proficiency: 80,
    experience: 'Clear communicator',
    projects: 12,
  },
  'Time Management': {
    proficiency: 82,
    experience: 'Well organized',
    projects: 15,
  },
  Adaptability: {
    proficiency: 95,
    experience: 'Quick to learn new tools',
    projects: 12,
  },
};

export function SkillProficiencyChart({
  skills,
  type,
  className = '',
}: SkillProficiencyChartProps) {
  const chartRef = useRef<any>(null);

  // Realistic skill categorization for AI tool user
  const skillCategories = {
    'Programming Languages': {
      skills: [
        'Python',
        'Java',
        'C++',
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
      ],
      color: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgba(59, 130, 246, 1)',
    },
    'AI Tools & IDEs': {
      skills: [
        'Cursor',
        'Kiro IDE',
        'VS Code',
        'AI Tool Usage',
        'Learning New Tools',
      ],
      color: 'rgba(236, 72, 153, 0.8)',
      borderColor: 'rgba(236, 72, 153, 1)',
    },
    'Frameworks & Development': {
      skills: [
        'Flask',
        'React',
        'Next.js',
        'Node.js',
        'Tailwind CSS',
        'Git',
        'IntelliJ IDEA',
      ],
      color: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgba(16, 185, 129, 1)',
    },
    'Data & Analytics': {
      skills: [
        'Power BI',
        'Data Analysis',
        'Machine Learning',
        'Pandas',
        'NumPy',
        'MongoDB',
        'SQL',
      ],
      color: 'rgba(245, 101, 101, 0.8)',
      borderColor: 'rgba(245, 101, 101, 1)',
    },
    'Design & Planning': {
      skills: [
        'Frontend Design',
        'UI/UX Principles',
        'Responsive Design',
        'Project Planning',
      ],
      color: 'rgba(139, 92, 246, 0.8)',
      borderColor: 'rgba(139, 92, 246, 1)',
    },
    'Core Strengths': {
      skills: [
        'Problem Solving',
        'Creative Thinking',
        'Critical Thinking',
        'Adaptability',
        'Communication',
        'Time Management',
      ],
      color: 'rgba(251, 191, 36, 0.8)',
      borderColor: 'rgba(251, 191, 36, 1)',
    },
  };

  // Get skills based on chart type
  const getSkillsForVisualization = () => {
    if (type === 'radar') {
      // For radar chart, show top skills from each category
      const topSkillsPerCategory = Object.entries(skillCategories)
        .map(([category, data]) => {
          const categorySkills = data.skills
            .filter(
              name =>
                skillProficiencyData[name as keyof typeof skillProficiencyData]
            )
            .map(name => ({
              name,
              proficiency:
                skillProficiencyData[name as keyof typeof skillProficiencyData]
                  .proficiency,
              category,
              experience:
                skillProficiencyData[name as keyof typeof skillProficiencyData]
                  .experience,
              projects:
                skillProficiencyData[name as keyof typeof skillProficiencyData]
                  .projects,
            }))
            .sort((a, b) => b.proficiency - a.proficiency)
            .slice(0, 2); // Top 2 from each category
          return categorySkills;
        })
        .flat();

      return topSkillsPerCategory
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 10);
    } else if (type === 'doughnut') {
      // For doughnut chart, show category averages
      return Object.entries(skillCategories).map(([category, data]) => {
        const categorySkills = data.skills.filter(
          name =>
            skillProficiencyData[name as keyof typeof skillProficiencyData]
        );
        const avgProficiency =
          categorySkills.reduce(
            (sum, name) =>
              sum +
              skillProficiencyData[name as keyof typeof skillProficiencyData]
                .proficiency,
            0
          ) / categorySkills.length;

        return {
          name: category,
          proficiency: Math.round(avgProficiency),
          category,
          skillCount: categorySkills.length,
          color: data.color,
          borderColor: data.borderColor,
        };
      });
    } else {
      // For bar chart, show top individual skills
      return Object.entries(skillProficiencyData)
        .map(([name, data]) => ({
          name,
          proficiency: data.proficiency,
          category:
            Object.entries(skillCategories).find(([_, catData]) =>
              catData.skills.includes(name)
            )?.[0] || 'Other',
          experience: data.experience,
          projects: data.projects,
        }))
        .sort((a, b) => b.proficiency - a.proficiency)
        .slice(0, 12);
    }
  };

  const chartSkills = getSkillsForVisualization();

  const chartData =
    type === 'radar'
      ? {
          labels: chartSkills.map(skill => skill.name),
          datasets: [
            {
              label: 'Proficiency Level',
              data: chartSkills.map(skill => skill.proficiency),
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(59, 130, 246, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        }
      : type === 'doughnut'
        ? {
            labels: chartSkills.map(skill => skill.name),
            datasets: [
              {
                data: chartSkills.map(skill => skill.proficiency),
                backgroundColor: chartSkills.map(skill =>
                  'color' in skill ? skill.color : 'rgba(156, 163, 175, 0.8)'
                ),
                borderColor: chartSkills.map(skill =>
                  'borderColor' in skill
                    ? skill.borderColor
                    : 'rgba(156, 163, 175, 1)'
                ),
                borderWidth: 2,
                hoverOffset: 8,
              },
            ],
          }
        : {
            labels: chartSkills.map(skill => skill.name),
            datasets: [
              {
                label: 'Proficiency Level',
                data: chartSkills.map(skill => skill.proficiency),
                backgroundColor: chartSkills.map(skill => {
                  const category = Object.entries(skillCategories).find(
                    ([_, data]) => data.skills.includes(skill.name)
                  );
                  return category
                    ? category[1].color
                    : 'rgba(156, 163, 175, 0.8)';
                }),
                borderColor: chartSkills.map(skill => {
                  const category = Object.entries(skillCategories).find(
                    ([_, data]) => data.skills.includes(skill.name)
                  );
                  return category
                    ? category[1].borderColor
                    : 'rgba(156, 163, 175, 1)';
                }),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
              },
            ],
          };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#374151',
          usePointStyle: type === 'doughnut',
          padding: 20,
        },
      },
      title: {
        display: true,
        text:
          type === 'radar'
            ? 'Top Skills Proficiency'
            : type === 'doughnut'
              ? 'Skill Category Distribution'
              : 'Individual Skill Levels',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const skill = chartSkills[context.dataIndex];
            if (type === 'doughnut') {
              return [
                `${skill.name}: ${skill.proficiency}%`,
                `Skills in category: ${'skillCount' in skill ? skill.skillCount : skill.projects}`,
              ];
            } else {
              return [
                `${skill.name}: ${skill.proficiency}%`,
                `Experience: ${'experience' in skill ? skill.experience : 'N/A'}`,
                `Projects: ${'projects' in skill ? skill.projects : 0}`,
              ];
            }
          },
        },
      },
    },
    scales:
      type === 'radar'
        ? {
            r: {
              beginAtZero: true,
              max: 100,
              grid: {
                color: 'rgba(156, 163, 175, 0.2)',
              },
              pointLabels: {
                font: {
                  family: 'Inter, sans-serif',
                  size: 11,
                },
                color: '#374151',
              },
              ticks: {
                display: false,
              },
            },
          }
        : type === 'bar'
          ? {
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: 'rgba(156, 163, 175, 0.2)',
                },
                ticks: {
                  font: {
                    family: 'Inter, sans-serif',
                    size: 11,
                  },
                  color: '#6B7280',
                  callback: function (value: unknown) {
                    return value + '%';
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    family: 'Inter, sans-serif',
                    size: 10,
                  },
                  color: '#6B7280',
                  maxRotation: 45,
                },
              },
            }
          : {},
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && typeof chart.update === 'function') {
      chart.update('active');
    }
  }, [skills]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    >
      <div
        className={`w-full ${type === 'doughnut' ? 'h-64 max-w-sm mx-auto' : 'h-64 md:h-80'}`}
      >
        {type === 'radar' ? (
          <Radar ref={chartRef} data={chartData} options={options} />
        ) : type === 'doughnut' ? (
          <Doughnut ref={chartRef} data={chartData} options={options} />
        ) : (
          <Bar ref={chartRef} data={chartData} options={options} />
        )}
      </div>

      {/* Enhanced Skill Categories Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(skillCategories).map(([category, data], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-xs text-gray-600 font-medium">
              {category}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Skill Insights */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-sm text-gray-800 mb-3">
          {type === 'doughnut' ? 'Category Insights' : 'Top Skills Breakdown'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {chartSkills.slice(0, 6).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col bg-white rounded px-3 py-2 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700 truncate">
                  {skill.name}
                </span>
                <span className="text-xs text-blue-600 font-bold ml-1">
                  {skill.proficiency}%
                </span>
              </div>
              {type !== 'doughnut' &&
                'experience' in skill &&
                'projects' in skill && (
                  <div className="text-xs text-gray-500">
                    {skill.experience} • {skill.projects} projects
                  </div>
                )}
              {type === 'doughnut' && 'skillCount' in skill && (
                <div className="text-xs text-gray-500">
                  {skill.skillCount} skills in category
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>
          Average Proficiency:{' '}
          {Math.round(
            chartSkills.reduce((sum, skill) => sum + skill.proficiency, 0) /
              chartSkills.length
          )}
          %
        </span>
        <span>{chartSkills.length} skills displayed</span>
      </div>
    </motion.div>
  );
}
