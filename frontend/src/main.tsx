import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Solia Frontend</h1>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
