'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #292a2c 0%, #421e66 100%)'
    }}>
      <div style={{ 
        textAlign: 'center', 
        color: 'white',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>✈️</h1>
        <p>Redirecionando...</p>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}