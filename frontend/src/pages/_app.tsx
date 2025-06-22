import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthProvider';
import MainLayout from '../components/layout/MainLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}
