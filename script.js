// DOM 요소 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 스크롤 이벤트
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // 스크롤 이벤트
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 현재 스크롤 위치 기반 액티브 링크 설정
        setActiveNavLink();
    });
    
    // 모바일 메뉴 토글
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
    
    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
        });
    });
    
    // 현재 스크롤 위치 기반 액티브 링크 설정 함수
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // 로고 이미지 대체 함수 제거 - 실제 이미지 사용
    
    // 데모 탭 클릭 이벤트
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoScreens = document.querySelector('#demo-screen');
    const demoTitle = document.querySelector('#demo-title');
    const demoDesc = document.querySelector('#demo-desc');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 탭 활성화
            demoTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // 탭 내용 표시
            const tabId = this.getAttribute('data-tab');
            updateDemoContent(tabId);
        });
    });
    
    // 특성 카드 마우스 호버 효과
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-detail').style.display = 'block';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-detail').style.display = 'none';
        });
    });
    
    // 초기화 함수들 호출
    initDataProcessDiagram();
    initRoadmapTimeline();
    
    // 초기 상태 설정
    setActiveNavLink();
    updateDemoContent('dashboard');
    
    // 모든 feature-detail 요소 초기 숨김 처리
    document.querySelectorAll('.feature-detail').forEach(detail => {
        detail.style.display = 'none';
    });
    
    // 탭 네비게이션 키보드 접근성
    const demoTabList = document.querySelector('.demo-tabs');
    if (demoTabList) {
        demoTabList.addEventListener('keydown', function(e) {
            // 키보드 네비게이션 처리
            const tabs = Array.from(this.querySelectorAll('[role="tab"]'));
            const index = tabs.indexOf(document.activeElement);
            
            // 왼쪽/오른쪽 화살표 처리
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                
                const dir = e.key === 'ArrowLeft' ? -1 : 1;
                let newIndex = index + dir;
                
                // 순환 네비게이션
                if (newIndex < 0) newIndex = tabs.length - 1;
                if (newIndex >= tabs.length) newIndex = 0;
                
                tabs[newIndex].focus();
                tabs[newIndex].click();
            }
            
            // 홈/엔드 키 처리
            if (e.key === 'Home' || e.key === 'End') {
                e.preventDefault();
                
                const targetIndex = e.key === 'Home' ? 0 : tabs.length - 1;
                tabs[targetIndex].focus();
                tabs[targetIndex].click();
            }
        });
    }
});

// 데이터 처리 다이어그램 초기화
function initDataProcessDiagram() {
    const diagram = document.getElementById('data-process-diagram');
    if (diagram) {
        diagram.innerHTML = `<img src="images/data-flow.svg" alt="데이터 처리 흐름도" width="100%">`;
    }
}

// 로드맵 타임라인 초기화
function initRoadmapTimeline() {
    const timeline = document.getElementById('roadmap-timeline');
    if (timeline) {
        timeline.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg">
                <!-- 타임라인 축 -->
                <line x1="50" y1="120" x2="750" y2="120" stroke="#ccc" stroke-width="4" />
                
                <!-- 단계 1: 기반 구축 -->
                <circle cx="120" cy="120" r="20" fill="#1e88e5" />
                <text x="120" y="125" text-anchor="middle" font-size="14" fill="white">1</text>
                <text x="120" y="170" text-anchor="middle" font-size="16" fill="#333">기반 구축</text>
                <text x="120" y="190" text-anchor="middle" font-size="12" fill="#666">2개월</text>
                <rect x="60" y="60" width="120" height="40" rx="5" fill="#f5f7fa" stroke="#1e88e5" />
                <text x="120" y="85" text-anchor="middle" font-size="13" fill="#333">데이터 통합 시스템</text>
                
                <!-- 단계 2: 핵심 기능 개발 -->
                <circle cx="290" cy="120" r="20" fill="#ffa000" />
                <text x="290" y="125" text-anchor="middle" font-size="14" fill="white">2</text>
                <text x="290" y="170" text-anchor="middle" font-size="16" fill="#333">핵심 기능 개발</text>
                <text x="290" y="190" text-anchor="middle" font-size="12" fill="#666">4개월</text>
                <rect x="230" y="60" width="120" height="40" rx="5" fill="#f5f7fa" stroke="#ffa000" />
                <text x="290" y="85" text-anchor="middle" font-size="13" fill="#333">모바일 앱 베타</text>
                
                <!-- 단계 3: 고도화 -->
                <circle cx="460" cy="120" r="20" fill="#43a047" />
                <text x="460" y="125" text-anchor="middle" font-size="14" fill="white">3</text>
                <text x="460" y="170" text-anchor="middle" font-size="16" fill="#333">고도화</text>
                <text x="460" y="190" text-anchor="middle" font-size="12" fill="#666">6개월</text>
                <rect x="400" y="60" width="120" height="40" rx="5" fill="#f5f7fa" stroke="#43a047" />
                <text x="460" y="85" text-anchor="middle" font-size="13" fill="#333">AI 예측 모델</text>
                
                <!-- 단계 4: 확장 -->
                <circle cx="630" cy="120" r="20" fill="#e53935" />
                <text x="630" y="125" text-anchor="middle" font-size="14" fill="white">4</text>
                <text x="630" y="170" text-anchor="middle" font-size="16" fill="#333">확장</text>
                <text x="630" y="190" text-anchor="middle" font-size="12" fill="#666">12개월</text>
                <rect x="570" y="60" width="120" height="40" rx="5" fill="#f5f7fa" stroke="#e53935" />
                <text x="630" y="85" text-anchor="middle" font-size="13" fill="#333">IoT 센서 연동</text>
            </svg>
        `;
    }
}
