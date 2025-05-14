// 애니메이션 및 시각적 효과 개선을 위한 스크립트

// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 스크롤 효과
    const navbar = document.querySelector('.navbar');
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 스크롤 기반 애니메이션 요소들 확인
        checkScrollAnimations();
    });
    
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // 아이콘 변경 (hamburger <-> X)
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 네비게이션 링크 클릭 시 스무스 스크롤
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 모바일 메뉴가 열려있으면 닫기
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 부드러운 스크롤 애니메이션
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 현재 스크롤 위치에 따라 활성화된 네비게이션 링크 표시
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
    
    // 스크롤 시 활성 네비게이션 링크 업데이트
    window.addEventListener('scroll', updateActiveNavLink);
    
    // 스크롤 애니메이션 관련 요소들
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    // 페이지 로드 시 초기 애니메이션 체크
    setTimeout(function() {
        checkScrollAnimations();
        updateActiveNavLink();
    }, 100);
    
    // 스크롤 위치에 따른 요소들의 애니메이션 트리거
    function checkScrollAnimations() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // 화면의 80% 지점에서 트리거
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // 히어로 섹션 요소들 애니메이션
    animateHeroElements();
    
    function animateHeroElements() {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroText = document.querySelector('.hero-content p');
        const heroButtons = document.querySelector('.cta-buttons');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroTitle) {
            heroTitle.classList.add('animate-fade-in-up');
            heroTitle.style.animationDelay = '0.2s';
        }
        
        if (heroText) {
            heroText.classList.add('animate-fade-in-up');
            heroText.style.animationDelay = '0.4s';
        }
        
        if (heroButtons) {
            heroButtons.classList.add('animate-fade-in-up');
            heroButtons.style.animationDelay = '0.6s';
        }
        
        if (heroImage) {
            heroImage.classList.add('animate-fade-in');
            heroImage.style.animationDelay = '0.8s';
        }
    }
    
    // 3D 틸트 효과 (디바이스 모형과 카드에 적용)
    const tiltElements = document.querySelectorAll('.card-3d, .mockup-device, .feature-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', tiltEffect);
        element.addEventListener('mouseleave', resetTilt);
    });
    
    function tiltEffect(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 중앙을 0으로 하는 -1 ~ 1 값으로 변환
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        // 틸트 강도
        const tiltAmount = 5;
        
        // 요소 회전
        this.style.transform = `perspective(1000px) rotateY(${xPercent * tiltAmount}deg) rotateX(${yPercent * -tiltAmount}deg) translateZ(10px)`;
    }
    
    function resetTilt() {
        // 클래스에 따라 다른 원상복구 효과 적용
        if (this.classList.contains('mockup-device')) {
            this.style.transform = 'translateY(0)';
        } else if (this.classList.contains('feature-card')) {
            this.style.transform = 'translateY(0)';
        } else {
            this.style.transform = 'none';
        }
    }
    
    // 카운트업 애니메이션 (통계 카드)
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateCounters() {
        statValues.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            
            // 뷰포트에 들어왔을 때만 애니메이션 실행
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (!stat.classList.contains('counted')) {
                    stat.classList.add('counted');
                    
                    const finalValue = stat.textContent;
                    let startValue = 0;
                    let duration = 2000; // 2초 동안 진행
                    let startTime = null;
                    
                    // 숫자에서 기호를 분리
                    const numericValue = parseFloat(finalValue.replace(/[^\d.-]/g, ''));
                    const prefix = finalValue.charAt(0) === '+' || finalValue.charAt(0) === '-' 
                                 ? finalValue.charAt(0) 
                                 : '';
                    const suffix = finalValue.replace(prefix + Math.abs(numericValue), '');
                    
                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentValue = Math.floor(progress * Math.abs(numericValue));
                        
                        stat.textContent = `${prefix}${currentValue}${suffix}`;
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = finalValue; // 최종값 정확히 설정
                        }
                    }
                    
                    window.requestAnimationFrame(updateCounter);
                }
            }
        });
    }
    
    // 스크롤 시 카운터 애니메이션 체크
    window.addEventListener('scroll', animateCounters);
    // 초기 로드 시 화면에 보이는 카운터 애니메이션
    setTimeout(animateCounters, 500);
    
    // 데모 탭 전환 효과 개선
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoImages = document.querySelectorAll('.demo-img');
    const demoScreen = document.getElementById('demo-screen');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 활성 탭 및 이미지 업데이트
            demoTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            
            // 화면 전환 애니메이션
            demoScreen.style.opacity = '0';
            demoScreen.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                // 이미지 변경
                demoImages.forEach(img => {
                    img.style.display = 'none';
                });
                document.getElementById(tabId + '-img').style.display = 'block';
                
                // 재등장 애니메이션
                demoScreen.style.opacity = '1';
                demoScreen.style.transform = 'translateY(0)';
            }, 300);
        });
    });
    
    // 패럴랙스 효과
    const parallaxElements = document.querySelectorAll('.hero, .cta-section');
    
    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrollTop = window.scrollY;
            const elementTop = element.offsetTop;
            const distanceFromTop = elementTop - scrollTop;
            
            // 화면에 보이는 경우에만 패럴랙스 효과 적용
            if (distanceFromTop < window.innerHeight && distanceFromTop + element.offsetHeight > 0) {
                const parallaxBg = element.querySelector(':scope > *:first-child');
                if (parallaxBg) {
                    const speed = 0.5; // 패럴랙스 속도
                    const yPos = -(distanceFromTop * speed);
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });
    
    // 부드러운 팝업 효과 
    function setupPopupEffects() {
        const popupElements = document.querySelectorAll('.info-item, .stat-card, .feature-card, .benefit-card, .data-card');
        
        popupElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            // 각 요소마다 약간의 딜레이를 두고 나타남
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    // 페이지 로드 시 팝업 효과 실행
    setTimeout(setupPopupEffects, 500);
    
    // 아이콘 애니메이션
    function setupIconAnimations() {
        const icons = document.querySelectorAll('.feature-icon, .benefit-icon, .info-icon, .scenario-icon, .stat-icon');
        
        icons.forEach(icon => {
            // 아이콘에 마우스 오버 시 회전 효과
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    setupIconAnimations();
    
    // 타이핑 애니메이션 효과 (Subheader 텍스트)
    function typeWriterEffect(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // 히어로 섹션의 서브 텍스트에 타이핑 효과 적용
    const heroSubtext = document.querySelector('.hero-content p');
    if (heroSubtext) {
        const originalText = heroSubtext.textContent;
        setTimeout(() => {
            heroSubtext.textContent = '';
            typeWriterEffect(heroSubtext, originalText, 30);
        }, 1000);
    }
    
    // 버튼 리플 효과
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.top = y + 'px';
            ripple.style.left = x + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // CSS에 대응하는 스타일 추가
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);
});