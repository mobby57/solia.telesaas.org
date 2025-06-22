'use client';

import { useEffect, useState } from 'react';

interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch('/api/donations', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setDonations(data);
        } else {
          setError('Failed to load donations');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  if (loading) {
    return <div>Loading donations...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Donations</h1>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <ul className="space-y-4">
          {donations.map((donation) => (
            <li key={donation.id} className="border p-4 rounded">
              <p><strong>{donation.donorName}</strong> donated ${donation.amount.toFixed(2)}</p>
              <p className="mt-2 text-sm text-gray-600">Date: {new Date(donation.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
