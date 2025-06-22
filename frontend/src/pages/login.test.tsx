import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './login';
import { AuthProvider, useAuth } from '../context/AuthProvider';
import { useRouter } from 'next/router';

jest.mock('next/router', () => {
  const pushMock = jest.fn();
  return {
    useRouter: () => ({
      push: pushMock,
    }),
    __esModule: true,
    pushMock,
  };
});

jest.mock('../context/AuthProvider', () => {
  const originalModule = jest.requireActual('../context/AuthProvider');
  return {
    __esModule: true,
    ...originalModule,
    useAuth: jest.fn(),
  };
});

describe('Login Page', () => {
  const { pushMock } = require('next/router');

  beforeEach(() => {
    pushMock.mockClear();
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockRejectedValue(new Error('Login failed')),
      register: jest.fn(),
      logout: jest.fn(),
      user: null,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error on failed login', async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  test('redirects on successful login', async () => {
    (useAuth as jest.Mock).mockReturnValueOnce({
      login: jest.fn().mockResolvedValue(undefined),
      register: jest.fn(),
      logout: jest.fn(),
      user: null,
      loading: false,
    });

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });
});
