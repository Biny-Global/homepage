'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MouseFollower.module.css';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('clickable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setClickEffects(prev => [...prev, newEffect]);
      
      // 1.5초 후 효과 제거
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
      }, 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* 마우스 팔로워 */}
      <motion.div
        className={styles.mouseFollower}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* 클릭 효과들 */}
      <AnimatePresence>
        {clickEffects.map((effect) => (
          <div key={effect.id}>
            {/* 메인 링 효과 */}
            <motion.div
              className={styles.clickEffect}
              initial={{
                x: effect.x - 40,
                y: effect.y - 40,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                scale: 1.5,
                opacity: 0,
              }}
              exit={{
                scale: 2,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut',
              }}
            />
            
            {/* 내부 펄스 효과 */}
            <motion.div
              className={styles.clickPulse}
              initial={{
                x: effect.x - 20,
                y: effect.y - 20,
                scale: 0,
                opacity: 0.8,
              }}
              animate={{
                scale: 1,
                opacity: 0,
              }}
              exit={{
                scale: 1.2,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
            
            {/* 파티클 버스트 효과 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.clickParticle}
                initial={{
                  x: effect.x - 3,
                  y: effect.y - 3,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: effect.x - 3 + Math.cos(i * 45 * Math.PI / 180) * 60,
                  y: effect.y - 3 + Math.sin(i * 45 * Math.PI / 180) * 60,
                  scale: 1,
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 1.0,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </>
  );
} 