'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  roles: string[];
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/admin/users', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          setError('Failed to load users');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleAddRole() {
    if (!selectedUserId || !newRole) return;
    try {
      const res = await fetch(`/api/admin/users/${selectedUserId}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        // Refresh users list
        const updatedUsers = users.map(user =>
          user.id === selectedUserId ? { ...user, roles: [...user.roles, newRole] } : user
        );
        setUsers(updatedUsers);
        setNewRole('');
      } else {
        setError('Failed to add role');
      }
    } catch {
      setError('Network error');
    }
  }

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Admin User Management</h1>
      <div className="mb-4">
        <label htmlFor="user-select" className="block mb-1 font-semibold">Select User</label>
        <select
          id="user-select"
          value={selectedUserId || ''}
          onChange={e => setSelectedUserId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="role-input" className="block mb-1 font-semibold">Add Role</label>
        <input
          id="role-input"
          type="text"
          value={newRole}
          onChange={e => setNewRole(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter role name"
        />
      </div>
      <button
        onClick={handleAddRole}
        disabled={!selectedUserId || !newRole}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        Add Role
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Users and Roles</h2>
        <ul className="list-disc list-inside">
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.email}</strong>: {user.roles.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
