'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import {
  ProjectMetricsChart,
  SkillProficiencyChart,
} from '@/components/ui/charts';

interface DataVisualizationSectionProps {
  data: {
    projects: any[];
    skills: any[];
    certifications: any[];
  };
}

type ChartType = 'metrics' | 'skills' | 'overview';

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
  ];

  const stats = {
    totalProjects: data.projects?.length || 0,
    featuredProjects: data.projects?.filter(p => p.featured)?.length || 0,
    ongoingProjects: data.projects?.filter(p => p.ongoing)?.length || 0,
    completedProjects: data.projects?.filter(p => !p.ongoing)?.length || 0,
    totalSkills:
      data.skills?.reduce(
        (sum, category) => sum + (category.skills?.length || 0),
        0
      ) || 0,
    certifications: data.certifications?.length || 0,
    totalTechnologies: new Set(
      data.projects?.flatMap(p => p.technologies?.map((t: any) => t.name) || [])
    ).size,
    soloProjects: data.projects?.filter(p => p.teamSize === 1)?.length || 0,
    teamProjects: data.projects?.filter(p => p.teamSize > 1)?.length || 0,
    aiProjects: data.projects?.filter(p => p.category === 'AI/ML')?.length || 0,
    webProjects:
      data.projects?.filter(p => p.category === 'Web Development')?.length || 0,
  };

  return (
    <section
      id="data-visualization"
      className="py-20 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)] relative overflow-hidden"
    >
      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--accent-primary)] rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4 glow-text">
            Data Insights &{' '}
            <span className="text-[var(--accent-secondary)]">Analytics</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
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
                className={`glass-button flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeChart === option.id ? 'active' : ''
                }`}
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
                <div className="glass-card rounded-lg p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">
                    Portfolio Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-[var(--accent-primary)] glow-text">
                        {stats.totalProjects}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Total Projects
                      </div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-[var(--accent-secondary)] glow-text">
                        {stats.featuredProjects}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Featured Projects
                      </div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-[var(--accent-primary)] glow-text">
                        {stats.totalSkills}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Technical Skills
                      </div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-[var(--accent-secondary)] glow-text">
                        {stats.certifications}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Certifications
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-lg p-6">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                    Project Distribution
                  </h3>
                  <div className="space-y-4">
                    {/* Ongoing vs Completed */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[var(--text-secondary)]">
                          Ongoing Projects
                        </span>
                        <span className="text-lg font-bold text-[var(--accent-primary)]">
                          {stats.ongoingProjects}
                        </span>
                      </div>
                      <div className="w-full glass-card rounded-full h-2">
                        <div
                          className="bg-[var(--accent-primary)] h-2 rounded-full transition-all duration-1000 glow-border"
                          style={{
                            width: `${(stats.ongoingProjects / stats.totalProjects) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-[var(--text-secondary)]">
                          Completed Projects
                        </span>
                        <span className="text-lg font-bold text-[var(--accent-secondary)]">
                          {stats.completedProjects}
                        </span>
                      </div>
                      <div className="w-full glass-card rounded-full h-2">
                        <div
                          className="bg-[var(--accent-secondary)] h-2 rounded-full transition-all duration-1000 glow-border"
                          style={{
                            width: `${(stats.completedProjects / stats.totalProjects) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Solo vs Team */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Solo Projects
                        </span>
                        <span className="text-lg font-bold text-purple-600">
                          {stats.soloProjects}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(stats.soloProjects / stats.totalProjects) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          Team Projects
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          {stats.teamProjects}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${(stats.teamProjects / stats.totalProjects) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Technology Stack
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-100 rounded-lg border-2 border-slate-300">
                      <div className="text-3xl font-bold text-slate-800">
                        {stats.totalTechnologies}
                      </div>
                      <div className="text-sm text-gray-600">
                        Technologies Used
                      </div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
                      <div className="text-3xl font-bold text-pink-700">
                        {stats.aiProjects}
                      </div>
                      <div className="text-sm text-gray-600">
                        AI/ML Projects
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Charts */}
              <div className="space-y-6">
                <div className="w-full max-w-md mx-auto">
                  <SkillProficiencyChart
                    skills={
                      data.skills?.flatMap(category => category.skills) || []
                    }
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
                  skills={
                    data.skills?.flatMap(category => category.skills) || []
                  }
                  type="doughnut"
                />
                <SkillProficiencyChart
                  skills={
                    data.skills?.flatMap(category => category.skills) || []
                  }
                  type="radar"
                />
              </div>

              {/* Bottom row - Individual skills */}
              <div className="w-full">
                <SkillProficiencyChart
                  skills={
                    data.skills?.flatMap(category => category.skills) || []
                  }
                  type="bar"
                  className="w-full"
                />
              </div>
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
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
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
