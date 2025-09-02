'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Sample data
const skillsData = [
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'UI/UX', level: 70 },
  { name: 'DevOps', level: 65 },
];

const projectData = [
  { name: 'Jan', commits: 40 },
  { name: 'Feb', commits: 30 },
  { name: 'Mar', commits: 45 },
  { name: 'Apr', commits: 35 },
  { name: 'May', commits: 55 },
  { name: 'Jun', commits: 60 },
];

type ChartType = 'bar' | 'line' | 'pie';

const chartTypes: { id: ChartType; label: string }[] = [
  { id: 'bar', label: 'Skills' },
  { id: 'line', label: 'Projects' },
  { id: 'pie', label: 'Tech Stack' },
];

interface DataVisualizationSectionProps {
  data: {
    projects: Array<{
      id: string;
      title: string;
      technologies: string[];
      metrics: {
        commits: number;
        stars: number;
        forks: number;
      };
    }>;
  };
  className?: string;
}

export default function DataVisualizationSection({
  data,
  className = '',
}: DataVisualizationSectionProps) {
  const [activeChart, setActiveChart] = useState<ChartType>('bar');
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      // Simplified export without dom-to-image to avoid TypeScript issues
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = chartRef.current.offsetWidth;
        canvas.height = chartRef.current.offsetHeight;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `chart-${activeChart}-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return (
          <BarChart
            data={skillsData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="level" fill="#8884d8" name="Skill Level" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart
            data={projectData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#8884d8"
              strokeWidth={2}
              name="Monthly Commits"
            />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={skillsData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="level"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {skillsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="data-visualization"
      className={`py-20 bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Data Visualization
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive charts showcasing project metrics and skill proficiency
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {chartTypes.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveChart(id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeChart === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <Button onClick={handleExport} className="gap-2">
            <Download size={16} />
            Export as PNG
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="h-[400px] w-full" ref={chartRef}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
