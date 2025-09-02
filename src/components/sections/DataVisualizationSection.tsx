'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Calendar, TrendingUp } from 'lucide-react';
import {
  ProjectMetricsChart,
  SkillProficiencyChart,
  ActivityCalendar,
} from '@/components/ui/charts';

interface DataVisualizationSectionProps {
  data: {
    projects: any[];
  };
}

type ChartType = 'metrics' | 'skills' | 'activity' | 'overview';

export function DataVisualizationSection({
  data,
}: DataVisualizationSectionProps) {
  const [activeChart, setActiveChart] = useState<ChartType>('overview');

  const chartOptions = [
    {
      id: 'overview' as ChartType,
      label: 'Overview',
      icon: TrendingUp,
      description: 'Key metrics and statistics',
    },
    {
      id: 'metrics' as ChartType,
      label: 'Project Metrics',
      icon: BarChart3,
      description: 'Performance scores and impact',
    },
    {
      id: 'skills' as ChartType,
      label: 'Skill Proficiency',
      icon: PieChart,
      description: 'Technical skill levels',
    },
    {
      id: 'activity' as ChartType,
      label: 'Activity Timeline',
      icon: Calendar,
      description: 'Development activity calendar',
    },
  ];

  const stats = {
    totalProjects: data.projects.length,
    featuredProjects: data.projects.filter(p => p.featured).length,
    totalSkills: data.projects.reduce(
      (sum, project) => sum + project.skills.length,
      0
    ),
    certifications: data.projects.filter(p => p.certifications).length,
    avgPerformance: Math.round(
      data.projects
        .filter(p => p.metrics?.performanceScore)
        .reduce((sum, p) => sum + (p.metrics?.performanceScore || 0), 0) /
        data.projects.filter(p => p.metrics?.performanceScore).length
    ),
  };

  return (
    <section
      id="data-visualization"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Data Insights & Analytics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive visualizations showcasing project metrics, skill
            proficiency, and development activity patterns
          </p>
        </motion.div>

        {/* Chart Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {chartOptions.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setActiveChart(option.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${
                    activeChart === option.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                  }
                `}
              >
                <Icon size={20} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Chart Content */}
        <div className="min-h-[600px]">
          {activeChart === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Stats Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6">
                    Portfolio Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">
                        {stats.totalProjects}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Projects
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {stats.featuredProjects}
                      </div>
                      <div className="text-sm text-gray-600">
                        Featured Projects
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        {stats.totalSkills}
                      </div>
                      <div className="text-sm text-gray-600">
                        Technical Skills
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">
                        {stats.certifications}
                      </div>
                      <div className="text-sm text-gray-600">
                        Certifications
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Performance Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Average Performance Score
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {stats.avgPerformance}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.avgPerformance}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      Based on{' '}
                      {
                        data.projects.filter(p => p.metrics?.performanceScore)
                          .length
                      }{' '}
                      evaluated projects
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Charts */}
              <div className="space-y-6">
                <div className="w-full max-w-md mx-auto">
                  <SkillProficiencyChart
                    skills={data.projects.reduce(
                      (acc, project) => acc.concat(project.skills),
                      []
                    )}
                    type="doughnut"
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeChart === 'metrics' && (
            <motion.div
              key="metrics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              <ProjectMetricsChart projects={data.projects} type="bar" />
              <ProjectMetricsChart projects={data.projects} type="radar" />
            </motion.div>
          )}

          {activeChart === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Top row - Category overview */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SkillProficiencyChart
                  skills={data.projects.reduce(
                    (acc, project) => acc.concat(project.skills),
                    []
                  )}
                  type="doughnut"
                />
                <SkillProficiencyChart
                  skills={data.projects.reduce(
                    (acc, project) => acc.concat(project.skills),
                    []
                  )}
                  type="radar"
                />
              </div>

              {/* Bottom row - Individual skills */}
              <div className="w-full">
                <SkillProficiencyChart
                  skills={data.projects.reduce(
                    (acc, project) => acc.concat(project.skills),
                    []
                  )}
                  type="bar"
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {activeChart === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ActivityCalendar
                projects={data.projects}
                experience={[]}
                certifications={[]}
              />
            </motion.div>
          )}
        </div>

        {/* Chart Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {
              chartOptions.find(option => option.id === activeChart)
                ?.description
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
