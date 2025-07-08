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
      backgroundColor: '#ffffff'
    }}>
      <div style={{ 
        textAlign: 'center', 
        color: 'white',
        animation: 'fadeIn 0.5s ease-in'
      }}>
        <img src="/logo-mm.png" alt="Logo" style={{ width: '300px', height: '300px' }} />
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