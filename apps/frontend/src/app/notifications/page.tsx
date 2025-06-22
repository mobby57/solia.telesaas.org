'use client';

import { useEffect, useState } from 'react';

interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch('/api/notifications', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        } else {
          setError('Failed to load notifications');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="border p-4 rounded">
              <p>{notification.message}</p>
              <p className="mt-2 text-sm text-gray-600">Date: {new Date(notification.date).toLocaleString()}</p>
              <p>Status: {notification.read ? 'Read' : 'Unread'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
