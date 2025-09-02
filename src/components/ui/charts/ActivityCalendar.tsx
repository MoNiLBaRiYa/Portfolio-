'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project, Experience, Certification } from '@/types/portfolio';

interface ActivityCalendarProps {
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  className?: string;
}

interface ActivityData {
  date: string;
  count: number;
  level: number; // 0-4 for intensity
  activities: Array<{
    type: 'project' | 'experience' | 'certification';
    title: string;
    id: string;
  }>;
}

export function ActivityCalendar({
  projects,
  experience,
  certifications,
  className = '',
}: ActivityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Generate activity data for the past year
  const activityData = useMemo(() => {
    const data: { [key: string]: ActivityData } = {};
    const today = new Date();
    const oneYearAgo = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );

    // Initialize all dates with empty activity
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      data[dateStr] = {
        date: dateStr,
        count: 0,
        level: 0,
        activities: [],
      };
    }

    // Add project activities
    projects.forEach(project => {
      const completionDate = new Date(project.completionDate);
      const dateStr = completionDate.toISOString().split('T')[0];

      if (data[dateStr]) {
        data[dateStr].activities.push({
          type: 'project',
          title: project.title,
          id: project.id,
        });
        data[dateStr].count += 3; // Projects have higher weight
      }

      // Add development period (simulate commits over time)
      const startDate = new Date(completionDate);
      startDate.setMonth(startDate.getMonth() - 2); // Assume 2 months development

      for (
        let d = new Date(startDate);
        d <= completionDate;
        d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 1)
      ) {
        const devDateStr = d.toISOString().split('T')[0];
        if (data[devDateStr] && Math.random() > 0.3) {
          // 70% chance of activity
          data[devDateStr].count += 1;
        }
      }
    });

    // Add experience activities
    experience.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : today;

      // Add activity throughout the experience period
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + Math.floor(Math.random() * 7) + 1)
      ) {
        const dateStr = d.toISOString().split('T')[0];
        if (data[dateStr] && Math.random() > 0.4) {
          // 60% chance of activity
          data[dateStr].activities.push({
            type: 'experience',
            title: exp.title,
            id: exp.id,
          });
          data[dateStr].count += 2;
        }
      }
    });

    // Add certification activities
    certifications.forEach(cert => {
      const certDate = new Date(cert.date);
      const dateStr = certDate.toISOString().split('T')[0];

      if (data[dateStr]) {
        data[dateStr].activities.push({
          type: 'certification',
          title: cert.title,
          id: cert.id,
        });
        data[dateStr].count += 2;
      }
    });

    // Calculate activity levels (0-4)
    const maxCount = Math.max(...Object.values(data).map(d => d.count));
    Object.values(data).forEach(day => {
      if (day.count === 0) day.level = 0;
      else if (day.count <= maxCount * 0.25) day.level = 1;
      else if (day.count <= maxCount * 0.5) day.level = 2;
      else if (day.count <= maxCount * 0.75) day.level = 3;
      else day.level = 4;
    });

    return data;
  }, [projects, experience, certifications]);

  // Get weeks for display
  const weeks = useMemo(() => {
    const today = new Date();
    const oneYearAgo = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );

    // Start from the first Sunday
    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      currentWeek.push(new Date(d));

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, []);

  const getActivityColor = (level: number) => {
    const colors = [
      'bg-gray-100', // No activity
      'bg-green-200', // Low activity
      'bg-green-400', // Medium activity
      'bg-green-600', // High activity
      'bg-green-800', // Very high activity
    ];
    return colors[level] || colors[0];
  };

  const getActivityTitle = (date: string) => {
    const activity = activityData[date];
    if (!activity || activity.count === 0) return 'No activity';

    const activities = activity.activities;
    if (activities.length === 0) return `${activity.count} contributions`;

    return `${activity.count} contributions: ${activities.map(a => a.title).join(', ')}`;
  };

  const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Activity Timeline
        </h3>
        <p className="text-sm text-gray-600">
          GitHub-style contribution calendar showing project development,
          certifications, and experience activities
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            <div className="w-8"></div> {/* Space for day labels */}
            {weeks.map((week, weekIndex) => {
              const firstDay = week[0];
              const isFirstWeekOfMonth = firstDay.getDate() <= 7;
              return (
                <div
                  key={weekIndex}
                  className="w-3 text-xs text-gray-500 text-center"
                >
                  {isFirstWeekOfMonth && weekIndex % 4 === 0
                    ? monthLabels[firstDay.getMonth()]
                    : ''}
                </div>
              );
            })}
          </div>

          {/* Day labels and calendar */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col mr-2">
              {dayLabels.map((day, index) => (
                <div
                  key={day}
                  className="h-3 mb-1 text-xs text-gray-500 flex items-center"
                >
                  {index % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="flex">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col mr-1">
                  {week.map((date, dayIndex) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const activity = activityData[dateStr];
                    const isSelected = selectedDate === dateStr;
                    const isHovered = hoveredDate === dateStr;

                    return (
                      <motion.div
                        key={dateStr}
                        className={`
                          w-3 h-3 mb-1 rounded-sm cursor-pointer border border-gray-200
                          ${getActivityColor(activity?.level || 0)}
                          ${isSelected ? 'ring-2 ring-blue-500' : ''}
                          ${isHovered ? 'ring-1 ring-gray-400' : ''}
                        `}
                        title={getActivityTitle(dateStr)}
                        onClick={() =>
                          setSelectedDate(isSelected ? null : dateStr)
                        }
                        onMouseEnter={() => setHoveredDate(dateStr)}
                        onMouseLeave={() => setHoveredDate(null)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm border border-gray-200 ${getActivityColor(level)}`}
            />
          ))}
          <span>More</span>
        </div>

        <div className="text-xs text-gray-500">
          {Object.values(activityData).reduce((sum, day) => sum + day.count, 0)}{' '}
          contributions in the last year
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && activityData[selectedDate] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="font-semibold text-sm text-gray-800 mb-2">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h4>

          {activityData[selectedDate].activities.length > 0 ? (
            <div className="space-y-2">
              {activityData[selectedDate].activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className={`
                    w-2 h-2 rounded-full
                    ${
                      activity.type === 'project'
                        ? 'bg-blue-500'
                        : activity.type === 'experience'
                          ? 'bg-green-500'
                          : 'bg-purple-500'
                    }
                  `}
                  />
                  <span className="text-xs text-gray-700">
                    <span className="font-medium capitalize">
                      {activity.type}:
                    </span>{' '}
                    {activity.title}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-600">
              {activityData[selectedDate].count} contributions on this day
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
