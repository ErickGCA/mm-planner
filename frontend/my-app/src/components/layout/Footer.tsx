import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
          <a href="/auth/login">
          <img src="/footer-xicoria.webp" alt="Xicoria" className={styles.logoImage} />
          <div className={styles.titleBox}>
            <img src="/logo-mm.png" alt="Logo Travel Planner" className={styles.title} />
          </div>
          </a>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Links Úteis</h4>
            <ul className={styles.links}>
              <li><a href="/auth/login" className={styles.link}>Instagram</a></li>
              <li><a href="/auth/register" className={styles.link}>Site Oficial</a></li>
              <li><a href="/dashboard" className={styles.link}>Linkedin</a></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Contato</h4>
            <ul className={styles.links}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                contato@lojasmm.com
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}>📱</span>
                +55 (42) 99164-2325
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 MM Planner. Todos os direitos reservados.
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