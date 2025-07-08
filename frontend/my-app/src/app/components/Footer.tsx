import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Travel Planner</h3>
            <p className={styles.description}>
              Planeje suas viagens de forma inteligente e eficiente. 
              Descubra novos destinos e crie rotas incríveis.
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Links Úteis</h4>
            <ul className={styles.links}>
              <li><a href="/auth/login" className={styles.link}>Entrar</a></li>
              <li><a href="/auth/register" className={styles.link}>Registrar</a></li>
              <li><a href="/dashboard" className={styles.link}>Dashboard</a></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contato</h4>
            <ul className={styles.links}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                contato@travelplanner.com
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                +55 (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Travel Planner. Todos os direitos reservados.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              📘
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              📷
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              🐦
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 