'use client';

import GitHubStats from './GitHubStats';
import GitHubCalendar from './GitHubCalendar';
import { useState, useEffect } from 'react';

interface GitHubSectionProps {
  username: string;
  privateRepos?: number;
}

export default function GitHubSection({ username, privateRepos }: GitHubSectionProps) {
  const [showCalendar, setShowCalendar] = useState(true);

  return (
    <div className="space-y-8">
      <GitHubStats username={username} privateRepos={privateRepos} />

      {showCalendar && (
        <div className="glass rounded-xl p-6">
          <GitHubCalendar username={username} />
        </div>
      )}
    </div>
  );
}
