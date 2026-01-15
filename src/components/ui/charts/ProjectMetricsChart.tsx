'use client';

import { useEffect, useRef } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { Project } from '@/types/portfolio';
import { motion } from 'framer-motion';
import '@/lib/chartConfig'; // Import to register Chart.js components

interface ProjectMetricsChartProps {
  projects: Project[];
  type: 'bar' | 'radar';
  className?: string;
}

export function ProjectMetricsChart({
  projects,
  type,
  className = '',
}: ProjectMetricsChartProps) {
  const chartRef = useRef<any>(null);

  // Use all projects and calculate metrics
  const projectsWithMetrics = projects.map(project => ({
    ...project,
    techCount: project.technologies?.length || 0,
    teamSize: project.teamSize || 1,
    featuresCount: project.features?.length || 0,
  }));

  const chartData = {
    labels: projectsWithMetrics.map(project => {
      const title = project.title.split('–')[0].trim();
      return title.length > 20 ? title.substring(0, 17) + '...' : title;
    }),
    datasets: [
      {
        label: 'Technologies',
        data: projectsWithMetrics.map(project => project.techCount),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: type === 'bar' ? 8 : 0,
      },
      {
        label: 'Team Size',
        data: projectsWithMetrics.map(project => project.teamSize),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: type === 'bar' ? 8 : 0,
      },
      {
        label: 'Features',
        data: projectsWithMetrics.map(project => project.featuresCount),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
        borderRadius: type === 'bar' ? 8 : 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#374151',
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Project Composition Analysis',
        font: {
          family: 'Inter, sans-serif',
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        callbacks: {
          afterLabel: function (context: any) {
            const project = projectsWithMetrics[context.dataIndex];
            return [
              `Category: ${project.category}`,
              `Status: ${project.ongoing ? 'Ongoing' : 'Completed'}`,
              `Year: ${new Date(project.completionDate).getFullYear()}`,
            ];
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 15,
        bottom: 40,
        left: 15,
      },
    },
    scales:
      type === 'bar'
        ? {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(156, 163, 175, 0.2)',
              },
              ticks: {
                font: {
                  family: 'Inter, sans-serif',
                  size: 11,
                },
                color: '#6B7280',
                stepSize: 1,
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
                minRotation: 45,
              },
            },
          }
        : {
            r: {
              beginAtZero: true,
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
                display: true,
                stepSize: 1,
                font: {
                  size: 10,
                },
              },
            },
          },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.update('active');
    }
  }, [projects]);

  if (projectsWithMetrics.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg ${className}`}
      >
        <p className="text-gray-500">No projects available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-lg shadow-lg p-4 md:p-6 ${className}`}
    >
      <div className="h-72 md:h-80 lg:h-96 relative px-2 md:px-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {type === 'bar' ? (
            <Bar ref={chartRef} data={chartData} options={options} />
          ) : (
            <Radar ref={chartRef} data={chartData} options={options} />
          )}
        </div>
      </div>

      {/* Project Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {projectsWithMetrics.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 md:p-4 border border-blue-200"
          >
            <h4 className="font-semibold text-xs md:text-sm text-gray-800 mb-2 truncate">
              {project.title.split('–')[0].trim()}
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p className="flex justify-between">
                <span className="font-medium">Technologies:</span>
                <span className="text-blue-600 font-semibold">
                  {project.techCount}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Team Size:</span>
                <span className="text-green-600 font-semibold">
                  {project.teamSize === 1
                    ? 'Solo'
                    : `${project.teamSize} members`}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Features:</span>
                <span className="text-purple-600 font-semibold">
                  {project.featuresCount}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`font-semibold ${project.ongoing ? 'text-orange-600' : 'text-emerald-600'}`}
                >
                  {project.ongoing ? 'Ongoing' : 'Completed'}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
