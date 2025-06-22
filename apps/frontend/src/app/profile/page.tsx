'use client';

import { useEffect, useState } from 'react';

interface UserProfile {
  email: string;
  roles: string[];
  permissions: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setError('Failed to load profile');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Email:</strong> {profile.email}</p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Roles</h2>
        <ul className="list-disc list-inside">
          {profile.roles.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Permissions</h2>
        <ul className="list-disc list-inside">
          {profile.permissions.map((perm) => (
            <li key={perm}>{perm}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
