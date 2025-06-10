import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[]; // for select fields
}

interface DynamicFormProps {
  fields: FormField[];
  apiEndpoint: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, apiEndpoint }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Submission failed');
        setLoading(false);
        return;
      }
      setSuccess('Form submitted successfully');
      setLoading(false);
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block font-semibold mb-1" htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-red-600">*</span>}
          </label>
          {field.type === 'select' && field.options ? (
            <select
              id={field.name}
              required={field.required}
              className="w-full border border-gray-300 p-2 rounded"
              onChange={(e) => handleChange(field.name, e.target.value)}
              disabled={loading}
            >
              <option value="">Select an option</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              required={field.required}
              className="w-full border border-gray-300 p-2 rounded"
              onChange={(e) => handleChange(field.name, e.target.value)}
              disabled={loading}
            />
          )}
        </div>
      ))}
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {success && <div className="text-green-600 font-semibold">{success}</div>}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default DynamicForm;
