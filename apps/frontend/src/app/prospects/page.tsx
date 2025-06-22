'use client';

import { useEffect, useState } from 'react';

interface Prospect {
  id: string;
  name: string;
  email: string;
  status: string;
}

export default function ProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProspects() {
      try {
        const res = await fetch('/api/prospects', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setProspects(data);
        } else {
          setError('Failed to load prospects');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchProspects();
  }, []);

  if (loading) {
    return <div>Loading prospects...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Prospects</h1>
      {prospects.length === 0 ? (
        <p>No prospects found.</p>
      ) : (
        <ul className="space-y-4">
          {prospects.map((prospect) => (
            <li key={prospect.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{prospect.name}</h2>
              <p>Email: {prospect.email}</p>
              <p className="mt-2 text-sm text-gray-600">Status: {prospect.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
