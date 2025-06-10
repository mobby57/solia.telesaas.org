import React from 'react';
import DynamicForm from '../components/DynamicForm';

const formFields = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'role', label: 'Role', type: 'select', options: ['Operator', 'Manager', 'Association'], required: true },
];

const FormExamplePage: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Example Dynamic Form</h1>
      <DynamicForm fields={formFields} apiEndpoint="/api/form-submit" />
    </div>
  );
};

export default FormExamplePage;
