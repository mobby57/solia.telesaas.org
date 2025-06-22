import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { FormField } from '../components/ui/FormField';
import { Checkbox } from '../components/ui/Checkbox';
import { Select } from '../components/ui/Select';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';

export default function TestPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShowToast = () => {
    setToastMessage('This is a success toast!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">UI Components Test</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">FormField</h2>
        <FormField label="Name" placeholder="Enter your name" />
        <FormField label="Email" type="email" placeholder="Enter your email" error="Invalid email" />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Checkbox</h2>
        <Checkbox label="Accept terms" />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select</h2>
        <Select
          label="Choose option"
          options={[
            { value: '', label: 'Select...' },
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
          ]}
        />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Button & Spinner</h2>
        <Button onClick={() => setLoading(!loading)} disabled={loading}>
          {loading ? <Spinner /> : 'Click me'}
        </Button>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Test Modal">
          <p>This is a modal content.</p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Toast</h2>
        <Button onClick={handleShowToast}>Show Toast</Button>
        {toastMessage && <Toast message={toastMessage} />}
      </section>
    </main>
  );
}
