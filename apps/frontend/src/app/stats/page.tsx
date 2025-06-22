'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalMissions: number;
  totalProspects: number;
  totalDonations: number;
  totalUsers: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/stats', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setError('Failed to load stats');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!stats) {
    return <div>No stats available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>
      <ul className="list-disc list-inside space-y-2">
        <li>Total Missions: {stats.totalMissions}</li>
        <li>Total Prospects: {stats.totalProspects}</li>
        <li>Total Donations: ${stats.totalDonations.toFixed(2)}</li>
        <li>Total Users: {stats.totalUsers}</li>
      </ul>
    </div>
  );
}
