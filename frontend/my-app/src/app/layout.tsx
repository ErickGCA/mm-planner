import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Planner',
  description: 'Your personal travel planning app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Travel Planner</a></h1>
          <nav>
            <a href="/auth/login" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}>Login</a>
            <a href="/auth/register" style={{ textDecoration: 'none', color: '#007bff' }}>Register</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '20px', borderTop: '1px solid #eee', textAlign: 'center', marginTop: '50px' }}>
          © 2025 Travel Planner
        </footer>
      </body>
    </html>
  );
}