'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Package, Shield, Zap, BarChart3, Cpu, ChevronUp, Instagram, Github } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import styles from './page.module.css';
import { useEffect, useState, useMemo } from 'react';
import { sendEmail, isEmailJSConfigured } from '@/lib/emailjs';



export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로딩 상태 관리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 0.5초 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);
  


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!contactForm.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    
    if (!contactForm.subject.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!contactForm.message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // EmailJS 설정 확인
      if (!isEmailJSConfigured()) {
        alert('이메일 서비스가 설정되지 않았습니다. 관리자에게 문의해주세요.');
        return;
      }
      
      // 메일 전송 데이터 준비
      const emailData = {
        from_email: contactForm.email,
        subject: contactForm.subject,
        message: contactForm.message,
        from_name: contactForm.email.split('@')[0], // 이메일의 앞부분을 이름으로 사용
      };
      
      // 메일 전송
      const success = await sendEmail(emailData);
      
      if (success) {
        alert('메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.');
        
        // 폼 리셋
        setContactForm({
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
      
    } catch (error) {
      console.error('Email submission error:', error);
      alert('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    // 이미지 보호 기능
    const preventImageActions = () => {
      // 우클릭 방지
      const preventContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        return false;
      };

      // 드래그 방지
      const preventDragStart = (e: DragEvent) => {
        e.preventDefault();
        return false;
      };

      // 키보드 단축키 방지
      const preventKeyboardShortcuts = (e: KeyboardEvent) => {
        // Ctrl+S (저장), Ctrl+A (전체선택), Ctrl+C (복사), Ctrl+V (붙여넣기)
        if (e.ctrlKey && (e.key === 's' || e.key === 'a' || e.key === 'c' || e.key === 'v')) {
          e.preventDefault();
          return false;
        }
        // F12 (개발자 도구), Ctrl+Shift+I (개발자 도구)
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          return false;
        }
        // Ctrl+U (소스 보기)
        if (e.ctrlKey && e.key === 'u') {
          e.preventDefault();
          return false;
        }
        // Ctrl+Shift+J (콘솔)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
          e.preventDefault();
          return false;
        }
      };

      // 인쇄 방지
      const preventPrint = () => {
        window.addEventListener('beforeprint', (e) => {
          e.preventDefault();
          return false;
        });
      };

      // 이벤트 리스너 등록
      document.addEventListener('contextmenu', preventContextMenu);
      document.addEventListener('dragstart', preventDragStart);
      document.addEventListener('keydown', preventKeyboardShortcuts);
      
      // 모든 이미지에 추가 보호 적용
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        img.addEventListener('contextmenu', preventContextMenu);
        img.addEventListener('dragstart', preventDragStart);
        img.addEventListener('selectstart', (e) => e.preventDefault());
        (img.style as CSSStyleDeclaration & { webkitUserSelect: string; webkitUserDrag: string; webkitTouchCallout: string }).webkitUserSelect = 'none';
        (img.style as CSSStyleDeclaration & { webkitUserSelect: string; webkitUserDrag: string; webkitTouchCallout: string }).webkitUserDrag = 'none';
        (img.style as CSSStyleDeclaration & { webkitTouchCallout: string }).webkitTouchCallout = 'none';
      });

      // 인쇄 방지 시작
      preventPrint();

      // 클리너 함수 반환
      return () => {
        document.removeEventListener('contextmenu', preventContextMenu);
        document.removeEventListener('dragstart', preventDragStart);
        document.removeEventListener('keydown', preventKeyboardShortcuts);
      };
    };

    const cleanup = preventImageActions();
    return cleanup;
  }, []);

  const softwareProducts = [
    {
      title: "Cloud Bridge",
      description: "원클릭으로 쉽고 빠르게 클라우드 인프라를 구축하고 관리할 수 있는 서비스입니다.",

      buttonText: "자세히 보기"
    },
    {
      title: "AgentBox",
      description: "다양한 분야의 전문가 AI 에이전트를 마켓 플레이스로 제공합니다.",
      buttonText: "자세히 보기"
    },
    {
      title: "Medora",
      description: "AI가 건강 상태를 진단하고, 나만을 위한 루틴을 설계해주는 스마트 헬스 코치 앱입니다.",
      buttonText: "자세히 보기"
    },
    {
      title: "Signeo",
      description: "계약서를 업로드하면 AI가 요약하고 위험 조항을 알려주는 스마트 계약서 관리 서비스입니다.",
      buttonText: "자세히 보기"
    }
    
  ];



  const containerVariants = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };



  // 로딩 스피너 컴포넌트
  const LoadingSpinner = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      <p className={styles.loadingText}>페이지를 로드하는 중...</p>
    </div>
  );

  // 유성 효과 컴포넌트
  const Meteors = () => (
    <div className={styles.meteors}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={styles.meteor} />
      ))}
    </div>
  );

  // 행성 효과 컴포넌트
  const Planets = () => (
    <div className={styles.planets}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={styles.planet} />
      ))}
    </div>
  );

  // 우주 먼지 효과 컴포넌트
  const SpaceDust = () => (
    <div className={styles.spaceDust} />
  );

  // 별자리 효과 컴포넌트 (자연스러운 불규칙 위치)
  const StarField = () => {
    const stars = useMemo(() => {
      const starPositions: { left: number; top: number; size: number; id: number; delay: number; duration: number; floatX: number; floatY: number }[] = [];
      
      // 화면을 여러 구역으로 나누어 자연스러운 분포 생성
      
             for (let i = 0; i < 80; i++) {
        let left: number, top: number, attempts = 0;
        
        do {
          // 각 셀 내에서 무작위 위치 생성 (격자 방지)
          const baseX = (Math.random() * 100);
          const baseY = (Math.random() * 100);
          
          // 추가적인 노이즈와 오프셋 적용
          const noiseX = (Math.random() - 0.5) * 20;
          const noiseY = (Math.random() - 0.5) * 20;
          
          left = Math.max(2, Math.min(98, baseX + noiseX));
          top = Math.max(2, Math.min(98, baseY + noiseY));
          
          attempts++;
        } while (attempts < 10 && starPositions.some(star => 
          Math.abs(star.left - left) < 8 && Math.abs(star.top - top) < 8
        ));
        
        // 별 크기 가중치 (작은 별이 더 많이)
        const sizeWeight = Math.random();
        let size;
        if (sizeWeight < 0.7) {
          size = 1; // 70% 확률로 작은 별
        } else if (sizeWeight < 0.95) {
          size = 2; // 25% 확률로 중간 별
        } else {
          size = 3; // 5% 확률로 큰 별
        }
        
        starPositions.push({
          id: i,
          left,
          top,
          delay: Math.random() * 4,
          duration: 2 + Math.random() * 5,
          size,
          floatX: (Math.random() - 0.5) * 25,
          floatY: (Math.random() - 0.5) * 15,
        });
      }
      
      return starPositions;
    }, []);

    return (
      <div className={styles.starField}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className={styles.star}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.5, 0.8],
              x: [0, star.floatX, -star.floatX, 0],
              y: [0, star.floatY, -star.floatY, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  };

  // 로딩 중일 때 스피너 표시
  if (isLoading) {
    return (
      <main className={styles.main}>
        <LoadingSpinner />
      </main>
    );
  }

  // 구조화 데이터 (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BINY',
    alternateName: '비니',
    description: 'BINY는 혁신적인 클라우드 및 AI 소프트웨어 솔루션을 제공하는 기업입니다.',
    url: 'https://biny.cloud',
    logo: 'https://biny.cloud/assets/images/logo.png',
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'biny.global@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Korean', 'English']
    },
    sameAs: [
      'https://instagram.com/biny_.official',
      'https://github.com/biny-Products'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'BINY 제품 및 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'BINY Cloud Platform',
            description: '클라우드 기반 통합 관리 플랫폼으로 확장 가능한 인프라 솔루션을 제공합니다.',
            applicationCategory: 'Cloud Platform'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'BINY AI Analytics',
            description: '인공지능 기반 데이터 분석 도구로 비즈니스 인사이트를 제공합니다.',
            applicationCategory: 'Analytics'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'BINY Security Suite',
            description: '포괄적인 보안 솔루션으로 기업 데이터를 안전하게 보호합니다.',
            applicationCategory: 'Security'
          }
        }
      ]
    }
  };

      return (
      <main className={styles.main}>
        {/* 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* 우주 배경 효과들 */}
        <SpaceDust />
        <Planets />
        <Meteors />
        <StarField />
        
        <Navigation />
      
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section id="home" className={styles.heroSection}>
          {/* Enhanced 3D Particles */}
          <div className={styles.particles}>
            {Array.from({ length: 40 }).map((_, i) => {
              const colors = [
                'rgba(59, 130, 246, 0.4)',
                'rgba(139, 92, 246, 0.4)',
                'rgba(16, 185, 129, 0.4)',
                'rgba(244, 63, 94, 0.4)',
                'rgba(245, 158, 11, 0.4)'
              ];
              const colorIndex = i % colors.length;
              const particleColor = colors[colorIndex];
              const size = 2 + (i % 4);
              const xMovement = 200 + (i * 10);
              const yMovement = 150 + (i * 8);
              const zMovement = 100 + (i * 5);
              
              return (
                <motion.div
                  key={i}
                  className={styles.particle}
                  style={{
                    background: particleColor,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: `0 0 ${size * 2}px ${particleColor}`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0], 
                    scale: [0, 1, 0],
                    x: [0, xMovement, -xMovement],
                    y: [0, yMovement, -yMovement],
                    z: [0, zMovement, -zMovement],
                    rotateX: [0, 180, 360],
                    rotateY: [0, 270, 540],
                    rotateZ: [0, 360, 720],
                  }}
                  transition={{
                    duration: 6 + (i % 4),
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

          {/* Company Logo */}
          <motion.div className={styles.logoContainer} variants={itemVariants}>
            <div className={styles.logo}>
              <Image
                src="/assets/images/logo.png"
                alt="BINY Logo"
                width={160}
                height={48}
                className={styles.logoImage}
              />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1 className={styles.mainTitle} variants={itemVariants}>
            클라우드 & AI 소프트웨어 플랫폼
          </motion.h1>

          {/* Subtitle */}
          <motion.p className={styles.subtitle} variants={itemVariants}>
            비니(BINY)의 혁신적인 클라우드 및 AI 소프트웨어 제품으로<br />
            기업의 디지털 전환을 가속화하세요.
          </motion.p>

          {/* Key Benefits */}
          <motion.div className={styles.benefits} variants={itemVariants}>
            <div className={styles.benefitItem}>
              <Package className={styles.benefitIcon} />
              <span>즉시 사용 가능한 제품</span>
            </div>
            <div className={styles.benefitItem}>
              <Zap className={styles.benefitIcon} />
              <span>빠른 도입 및 확장</span>
            </div>
            <div className={styles.benefitItem}>
              <Shield className={styles.benefitIcon} />
              <span>검증된 안정성</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className={styles.scrollIndicator}
            variants={itemVariants}
            animate={{ 
              y: [0, 10, 0],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <ChevronDown size={32} />
            <span>더 많은 정보 보기</span>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className={styles.aboutSection}>
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>About Us</motion.h2>
          <motion.p className={styles.sectionDescription} variants={itemVariants}>
            우리는 혁신적인 클라우드 및 AI 기술로 비즈니스의 디지털 전환을 가속화하는 소프트웨어 회사입니다.
          </motion.p>
          
          {/* Mission & Vision */}
          <motion.div className={styles.missionVision} variants={itemVariants}>
            <div className={styles.missionCard}>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className={styles.cardDescription}>
                혁신적인 클라우드 및 AI 기술로 비즈니스의 디지털 전환을 가속화하여 고객의 성공을 돕습니다.
              </p>
            </div>
            <div className={styles.visionCard}>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className={styles.cardDescription}>
                모든 기업이 쉽게 접근할 수 있는 스마트 솔루션 생태계를 구축하여 미래의 비즈니스 환경을 선도합니다.
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div className={styles.coreValues} variants={itemVariants}>
            <h3 className={styles.subsectionTitle}>Core Values</h3>
            <div className={styles.valuesGrid}>
              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <Zap className={styles.iconSvg} />
                </div>
                <h4 className={styles.valueTitle}>혁신</h4>
                <p className={styles.valueDescription}>최신 기술을 활용한 혁신적인 솔루션 개발</p>
              </motion.div>
              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <Shield className={styles.iconSvg} />
                </div>
                <h4 className={styles.valueTitle}>신뢰</h4>
                <p className={styles.valueDescription}>안정적이고 보안이 강화된 플랫폼 제공</p>
              </motion.div>
              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <BarChart3 className={styles.iconSvg} />
                </div>
                <h4 className={styles.valueTitle}>성장</h4>
                <p className={styles.valueDescription}>고객과 함께 성장하는 파트너십 구축</p>
              </motion.div>
              <motion.div className={styles.valueCard} variants={itemVariants}>
                <div className={styles.valueIcon}>
                  <Cpu className={styles.iconSvg} />
                </div>
                <h4 className={styles.valueTitle}>효율</h4>
                <p className={styles.valueDescription}>업무 프로세스 최적화를 통한 생산성 향상</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Stats */}
          <motion.div className={styles.companyStats} variants={itemVariants}>
            <h3 className={styles.subsectionTitle}>Company Stats</h3>
            <div className={styles.statsGrid}>
              <motion.div className={styles.statCard} variants={itemVariants}>
                <div className={styles.statNumber}>2025</div>
                <div className={styles.statLabel}>설립 연도</div>
              </motion.div>
              <motion.div className={styles.statCard} variants={itemVariants}>
                <div className={styles.statNumber}>2</div>
                <div className={styles.statLabel}>개발 제품</div>
              </motion.div>
              <motion.div className={styles.statCard} variants={itemVariants}>
                <div className={styles.statNumber}>0</div>
                <div className={styles.statLabel}>고객사</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div className={styles.teamSection} variants={itemVariants}>
            <h3 className={styles.subsectionTitle}>Our Team</h3>
            <div className={styles.teamGrid}>
              <motion.div className={styles.teamCard} variants={itemVariants}>
                <div className={styles.teamAvatar}>
                  <Image
                    src="/assets/images/team/CEO_img.jpeg"
                    alt="이석빈 CEO"
                    width={100}
                    height={100}
                    className={styles.avatarImage}
                  />
                </div>
                <h4 className={styles.teamName}>이석빈</h4>
                <p className={styles.teamRole}>CEO & DevOps</p>
                <p className={styles.teamDescription}>
                  소프트웨어 개발 경험을 바탕으로 혁신적인 기술을 선도합니다.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section id="products" className={styles.productsSection}>
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>Our Products</motion.h2>
          <motion.div className={styles.productsGrid} variants={itemVariants}>
            <div className={styles.productsSlider}>
              {/* 원본 카드들 */}
              {softwareProducts.map((product) => (
                <motion.div
                  key={`original-${product.title}`}
                  className={styles.productCard}
                  variants={itemVariants}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.productImageContainer}>
                    <div className={styles.productImagePlaceholder}>
                      <Package className={styles.productIcon} />
                    </div>
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productDescription}>{product.description}</p>
                    <button className={styles.productButton}>
                      {product.buttonText}
                      <ArrowRight className={styles.buttonIcon} />
                    </button>
                  </div>
                </motion.div>
              ))}
              {/* 복제된 카드들 (무한 루프용) */}
              {softwareProducts.map((product) => (
                <motion.div
                  key={`duplicate-${product.title}`}
                  className={styles.productCard}
                  variants={itemVariants}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.productImageContainer}>
                    <div className={styles.productImagePlaceholder}>
                      <Package className={styles.productIcon} />
                    </div>
                  </div>
                  <div className={styles.productContent}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productDescription}>{product.description}</p>
                    <button className={styles.productButton}>
                      {product.buttonText}
                      <ArrowRight className={styles.buttonIcon} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>



        {/* Contact Section */}
        <section id="contact" className={styles.contactSection}>
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>Contact Us</motion.h2>
          <motion.p className={styles.sectionDescription} variants={itemVariants}>
            문의사항이나 궁금한 점이 있으시면 언제든지 연락주세요.
          </motion.p>
          <motion.form className={styles.contactForm} variants={itemVariants} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="이메일 주소"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                className={styles.formInput}
                placeholder="제목"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                className={styles.formTextarea}
                placeholder="내용"
                rows={6}
                required
              />
            </div>
            

            
            <button 
              type="submit" 
              className={`${styles.submitButton} clickable`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '전송 중...' : '메시지 보내기'}
            </button>
          </motion.form>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <motion.div className={styles.footerLeft} variants={itemVariants}>
              <div className={styles.companyInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>대표자 :</span>
                  <span className={styles.infoValue}>이석빈</span>
                </div>
                <div className={styles.infoRow}>

                  <span className={styles.infoValue}>부산광역시 금정구 오시게로 2, 마스코타 오피스텔 1007호</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>TEL :</span>
                  <span className={styles.infoValue}>+82 10-2337-3816</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>E-MAIL :</span>
                  <span className={styles.infoValue}>biny.global@gmail.com</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className={styles.footerRight} variants={itemVariants}>
              <div className={styles.footerLogo}>
                <div className={styles.logoContainer}>
                  <div className={styles.logoWithName}>
                    <Image
                      src="/assets/images/logo.png"
                      alt="BINY Logo"
                      width={160}
                      height={48}
                      className={styles.footerLogoImage}
                    />
                    <span className={styles.companyName}>BINY</span>
                  </div>
                  <div className={styles.socialButtons}>
                    <motion.a
                      href="https://instagram.com/biny_.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className={styles.socialIcon} />
                    </motion.a>
                    <motion.a
                      href="https://github.com/biny-Products"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialButton}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className={styles.socialIcon} />
                    </motion.a>
                  </div>
                </div>
                <div className={styles.footerCopyright}>
                  <p>&copy;BINY Co., Ltd All rights reserved.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <motion.button
            className={`${styles.scrollToTop} clickable`}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </motion.div>
    </main>
  );
}
