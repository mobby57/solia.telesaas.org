'use client';

import { useEffect, useState } from 'react';

interface Mission {
  id: string;
  title: string;
  description: string;
  status: string;
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMissions() {
      try {
        const res = await fetch('/api/missions', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setMissions(data);
        } else {
          setError('Failed to load missions');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchMissions();
  }, []);

  if (loading) {
    return <div>Loading missions...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Missions</h1>
      {missions.length === 0 ? (
        <p>No missions found.</p>
      ) : (
        <ul className="space-y-4">
          {missions.map((mission) => (
            <li key={mission.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{mission.title}</h2>
              <p>{mission.description}</p>
              <p className="mt-2 text-sm text-gray-600">Status: {mission.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
