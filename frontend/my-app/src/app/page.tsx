import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo ao Travel Planner!</h1>
      <p>Planeje suas viagens e rotas de forma fácil e eficiente.</p>
      <div style={{ marginTop: '30px' }}>
        <Link href="/auth/login" style={{ marginRight: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Fazer Login
        </Link>
        <Link href="/auth/register" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Registrar-se
        </Link>
      </div>
    </div>
  );
}