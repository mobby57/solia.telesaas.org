import React from 'react';

'use client';

import { useEffect, useState } from 'react';

interface DashboardData {
  welcomeMessage: string;
  activeMissions: number;
  pendingProspects: number;
  unreadNotifications: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch('/api/dashboard', {
          credentials: 'include',
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setError('Failed to load dashboard data');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!data) {
    return <div>No dashboard data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-6">{data.welcomeMessage}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-xl font-semibold">Active Missions</h2>
          <p className="text-2xl">{data.activeMissions}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-xl font-semibold">Pending Prospects</h2>
          <p className="text-2xl">{data.pendingProspects}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-xl font-semibold">Unread Notifications</h2>
          <p className="text-2xl">{data.unreadNotifications}</p>
        </div>
      </div>
    </div>
  );
}
