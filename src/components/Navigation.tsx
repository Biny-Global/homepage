'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About Us', korName: '회사소개', href: '#about' },
    { name: 'Products', korName: '제품', href: '#products' },
    { name: 'Contact Us', korName: '연락하기', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const logoVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const navVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3 }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial="initial"
      animate="animate"
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.logo}
          variants={logoVariants}
          onClick={handleLogoClick}
        >
          <Image 
            src="/assets/images/logo.png" 
            alt="Biny Logo" 
            width={40} 
            height={40} 
            priority
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Biny</span>
        </motion.div>

        <motion.ul 
          className={styles.navLinks}
          variants={navVariants}
        >
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name}
              className={styles.navItem}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3 + index * 0.1, duration: 0.5 }
              }}
            >
              <a 
                href={item.href} 
                className={styles.navLink}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  setIsOpen(false);
                }}
              >
                <span className={styles.navText}>
                  <span className={styles.engText}>{item.name}</span>
                  <span className={styles.korText}>{item.korName}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <motion.div
        className={styles.mobileMenu}
        variants={mobileMenuVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <ul className={styles.mobileNavLinks}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                x: isOpen ? 0 : 50,
                transition: { delay: index * 0.1, duration: 0.3 }
              }}
            >
              <a 
                href={item.href} 
                className={styles.mobileNavLink}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  setIsOpen(false);
                }}
              >
                <span className={styles.navText}>
                  <span className={styles.engText}>{item.name}</span>
                  <span className={styles.korText}>{item.korName}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation; 