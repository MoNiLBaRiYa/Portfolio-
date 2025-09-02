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

  // Filter projects with metrics
  const projectsWithMetrics = projects.filter(
    project => project.metrics?.performanceScore
  );

  const chartData = {
    labels: projectsWithMetrics.map(project => project.title),
    datasets: [
      {
        label: 'Performance Score',
        data: projectsWithMetrics.map(
          project => project.metrics?.performanceScore || 0
        ),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(251, 191, 36, 1)',
        ],
        borderWidth: 2,
        borderRadius: type === 'bar' ? 8 : 0,
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
        },
      },
      title: {
        display: true,
        text: 'Project Performance Metrics',
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
          afterLabel: function (context: any) {
            const project = projectsWithMetrics[context.dataIndex];
            return [
              `Team Size: ${project.teamSize}`,
              `Category: ${project.category}`,
              `Completion: ${new Date(project.completionDate).getFullYear()}`,
            ];
          },
        },
      },
    },
    scales:
      type === 'bar'
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
                callback: function (value: any) {
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
                  size: 11,
                },
                color: '#6B7280',
                maxRotation: 45,
              },
            },
          }
        : {
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
        <p className="text-gray-500">No project metrics available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="h-64 md:h-80">
        {type === 'bar' ? (
          <Bar ref={chartRef} data={chartData} options={options} />
        ) : (
          <Radar ref={chartRef} data={chartData} options={options} />
        )}
      </div>

      {/* Project Impact Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectsWithMetrics.slice(0, 3).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <h4 className="font-semibold text-sm text-gray-800 mb-2 truncate">
              {project.title}
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <span className="font-medium">Performance:</span>{' '}
                {project.metrics?.performanceScore}%
              </p>
              <p>
                <span className="font-medium">Impact:</span>{' '}
                {project.metrics?.impact}
              </p>
              <p>
                <span className="font-medium">Quality:</span>{' '}
                {project.metrics?.codeQuality}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
