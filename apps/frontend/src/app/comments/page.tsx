'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch('/api/comments', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        } else {
          setError('Failed to load comments');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Comments</h1>
      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded">
              <p><strong>{comment.author}</strong> said:</p>
              <p>{comment.content}</p>
              <p className="mt-2 text-sm text-gray-600">Date: {new Date(comment.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
