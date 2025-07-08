'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>

            <img src="/logo-mm.png" alt="Logo Travel Planner" className={styles.logoImage} />
            </Link>
        </div>



        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header; 