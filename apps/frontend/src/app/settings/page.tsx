'use client';

import { useState, useEffect } from 'react';

interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/user/settings', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        } else {
          setError('Failed to load settings');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        setError('Failed to save settings');
      }
    } catch {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!settings) {
    return <div>No settings available.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={e => setSettings({ ...settings, emailNotifications: e.target.checked })}
            className="form-checkbox"
          />
          <span className="ml-2">Email Notifications</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={e => setSettings({ ...settings, darkMode: e.target.checked })}
            className="form-checkbox"
          />
          <span className="ml-2">Dark Mode</span>
        </label>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
