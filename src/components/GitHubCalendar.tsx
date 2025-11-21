'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubCalendarProps {
  username: string;
}

export default function GitHubCalendar({ username }: GitHubCalendarProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();
        const contributionData: ContributionDay[] = [];

        // Process the last 12 weeks of contributions
        data.contributions.slice(-84).forEach((week: any) => {
          week.days.forEach((day: any) => {
            contributionData.push({
              date: day.date,
              count: day.count,
              level: day.level,
            });
          });
        });

        setContributions(contributionData);
      } catch (err) {
        setError('Unable to load contribution graph');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchContributions();
  }, [username]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-white/5';
      case 1:
        return 'bg-accent-cyan/20';
      case 2:
        return 'bg-accent-cyan/40';
      case 3:
        return 'bg-accent-cyan/60';
      case 4:
        return 'bg-accent-cyan/80';
      default:
        return 'bg-white/5';
    }
  };

  // Don't render anything if loading or error - just hide the component
  if (loading || error || contributions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-text-secondary">
          Recent GitHub Activity
        </h4>
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-1.5">
        {contributions.map((day, index) => (
          <motion.div
            key={`${day.date}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.002 }}
            className={`w-full aspect-square rounded-sm ${getLevelColor(
              day.level
            )} hover:ring-2 hover:ring-accent-cyan transition-all cursor-pointer group relative`}
            title={`${day.count} contributions on ${day.date}`}
          >
            <div className="absolute hidden group-hover:block bg-background-surface text-text-primary text-xs px-2 py-1 rounded shadow-lg -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
              {day.count} on {new Date(day.date).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
