'use client';

import { useEffect, useState } from 'react';

interface Document {
  id: string;
  title: string;
  description: string;
  uploadedAt: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const res = await fetch('/api/documents', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        } else {
          setError('Failed to load documents');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Documents</h1>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold">{doc.title}</h2>
              <p>{doc.description}</p>
              <p className="mt-2 text-sm text-gray-600">Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
