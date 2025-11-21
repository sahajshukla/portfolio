'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface GitHubStatsProps {
  username: string;
}

interface Stats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalCommits: number;
}

export default function GitHubStats({ username }: GitHubStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repos to calculate stars
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData = await reposResponse.json();

        const totalStars = reposData.reduce(
          (sum: number, repo: any) => sum + repo.stargazers_count,
          0
        );

        setStats({
          publicRepos: userData.public_repos || 0,
          followers: userData.followers || 0,
          totalStars,
          totalCommits: 500, // GitHub API doesn't provide total commits easily
        });
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [username]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-lg p-4 animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-2" />
            <div className="h-4 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { label: 'Public Repos', value: stats.publicRepos, icon: '📦' },
    { label: 'Total Stars', value: stats.totalStars, icon: '⭐' },
    { label: 'Followers', value: stats.followers, icon: '👥' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-lg p-3 md:p-4 text-center hover:border-accent-cyan/30 transition-all"
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <div className="text-xl md:text-2xl font-bold text-accent-cyan">
            <AnimatedCounter to={stat.value} duration={2} />
          </div>
          <div className="text-xs md:text-sm text-text-tertiary mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
