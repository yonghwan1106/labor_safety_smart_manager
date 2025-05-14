// 시각적 효과가 개선된 시각화 스크립트

// 데모 콘텐츠 업데이트 함수
function updateDemoContent(tabId) {
    const demoScreen = document.getElementById('demo-screen');
    const demoTitle = document.getElementById('demo-title');
    const demoDesc = document.getElementById('demo-desc');
    
    // 탭패널 속성 업데이트
    demoScreen.setAttribute('aria-labelledby', 'tab-' + tabId);
    demoScreen.setAttribute('data-tab', tabId);
    
    // 탭 ID에 따라 적절한 내용으로 업데이트
    switch(tabId) {
        case 'dashboard':
            demoScreen.innerHTML = createDashboardSvg();
            demoTitle.textContent = '안전 대시보드';
            demoDesc.textContent = '종합적인 안전 현황과 우선 조치 항목을 한눈에 확인할 수 있는 메인 대시보드입니다. 오늘의 안전 지수, 주요 알림, 점검 일정 등을 제공합니다.';
            break;
        case 'assessment':
            demoScreen.innerHTML = createAssessmentSvg();
            demoTitle.textContent = '스마트 안전진단';
            demoDesc.textContent = '사업장 특성에 맞는 맞춤형 위험성평가를 제공합니다. 업종, 규모, 공정에 따른 특화된 체크리스트와 단계별 개선 로드맵을 확인할 수 있습니다.';
            break;
        case 'inspection':
            demoScreen.innerHTML = createInspectionSvg();
            demoTitle.textContent = '현장점검 매니저';
            demoDesc.textContent = '모바일 기반 현장 점검 체크리스트와 QR코드 스캔을 통한 설비별 안전 정보 및 점검 이력 관리 기능을 제공합니다.';
            break;
        case 'education':
            demoScreen.innerHTML = createEducationSvg();
            demoTitle.textContent = '안전교육 도우미';
            demoDesc.textContent = '업종별, 직무별 맞춤형 안전교육 자료와 교육 이력 관리 기능을 제공합니다. 짧은 영상과 인포그래픽 등 현장 친화적인 콘텐츠를 활용할 수 있습니다.';
            break;
        case 'investment':
            demoScreen.innerHTML = createInvestmentSvg();
            demoTitle.textContent = '안전투자 최적화';
            demoDesc.textContent = '위험도 기반 안전 투자 우선순위 추천과 정부 지원 사업 정보를 맞춤 제공합니다. 투자 대비 효과 분석을 통해 효율적인 안전 예산 활용을 지원합니다.';
            break;
    }
    
    // SVG 요소 애니메이션 효과 추가
    animateSvgElements();
}

// SVG 요소 애니메이션 함수
function animateSvgElements() {
    // 개별 요소 애니메이션을 적용하기 위한 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes slideInLeft { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes rotateIn { from { transform: rotate(-90deg); opacity: 0; } to { transform: rotate(0); opacity: 1; } }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        
        .svg-animate-fade { animation: fadeIn 0.8s forwards; }
        .svg-animate-scale { animation: scaleIn 0.6s forwards; }
        .svg-animate-left { animation: slideInLeft 0.8s forwards; }
        .svg-animate-right { animation: slideInRight 0.8s forwards; }
        .svg-animate-up { animation: slideInUp 0.8s forwards; }
        .svg-animate-rotate { animation: rotateIn 0.8s forwards; }
        .svg-animate-pulse { animation: pulse 2s infinite; }
    `;
    document.head.appendChild(style);
    
    // SVG 요소에 애니메이션 클래스 적용
    setTimeout(() => {
        const svgElements = document.querySelectorAll('#demo-screen svg *');
        svgElements.forEach((element, index) => {
            // 요소 타입에 따라 다른 애니메이션 적용
            if (element.tagName === 'rect' && element.getAttribute('width') > 100) {
                element.classList.add('svg-animate-fade');
                element.style.animationDelay = (index * 0.05) + 's';
            } else if (element.tagName === 'circle') {
                element.classList.add('svg-animate-scale');
                element.style.animationDelay = (index * 0.08) + 's';
            } else if (element.tagName === 'text') {
                element.classList.add('svg-animate-fade');
                element.style.animationDelay = (index * 0.03) + 's';
            } else if (element.tagName === 'path') {
                element.classList.add('svg-animate-left');
                element.style.animationDelay = (index * 0.04) + 's';
            }
        });
    }, 100);
}

// 대시보드 SVG 생성 함수
function createDashboardSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- 배경 패턴 -->
            <defs>
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#f8fafc" />
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1" />
                </pattern>
                
                <linearGradient id="safety-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#43a047" />
                    <stop offset="100%" stop-color="#2e7d32" />
                </linearGradient>
                
                <linearGradient id="warning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffa000" />
                    <stop offset="100%" stop-color="#ff8f00" />
                </linearGradient>
                
                <linearGradient id="danger-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e53935" />
                    <stop offset="100%" stop-color="#c62828" />
                </linearGradient>
                
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <!-- 그림자 효과 -->
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <!-- 발광 효과 -->
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="0" y="0" width="800" height="500" fill="url(#grid-pattern)" />
            
            <!-- 상단 헤더 -->
            <rect x="0" y="0" width="800" height="60" fill="url(#primary-gradient)" rx="0" />
            <text x="20" y="38" font-size="24" font-weight="600" fill="#fff">안전 대시보드</text>
            <text x="770" y="38" font-size="16" fill="#fff" text-anchor="end">2025.05.14</text>
            
            <!-- 안전 지수 패널 -->
            <rect x="20" y="80" width="240" height="180" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="110" font-size="18" font-weight="600" fill="#333">오늘의 안전 지수</text>
            <line x1="40" y1="120" x2="220" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 안전 지수 게이지 -->
            <circle cx="140" cy="170" r="60" stroke="#f5f7fa" stroke-width="10" fill="none" />
            <circle cx="140" cy="170" r="60" stroke="url(#safety-gradient)" stroke-width="10" fill="none" stroke-dasharray="310 380" stroke-linecap="round" />
            <text x="140" y="165" text-anchor="middle" font-size="36" font-weight="700" fill="#333">85</text>
            <text x="140" y="195" text-anchor="middle" font-size="16" fill="#666" letter-spacing="1px">양호</text>
            
            <!-- 우선 조치 항목 패널 -->
            <rect x="280" y="80" width="500" height="180" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="300" y="110" font-size="18" font-weight="600" fill="#333">우선 조치 항목</text>
            <line x1="300" y1="120" x2="760" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 우선 조치 항목 리스트 -->
            <rect x="300" y="140" width="440" height="30" rx="6" fill="#ffebee" />
            <circle cx="320" cy="155" r="8" fill="url(#danger-gradient)" />
            <text x="340" y="159" font-size="14" fill="#e53935" font-weight="500">전기설비 누전 위험: 작업장 B구역 - 높음</text>
            
            <rect x="300" y="180" width="440" height="30" rx="6" fill="#fff8e1" />
            <circle cx="320" cy="195" r="8" fill="url(#warning-gradient)" />
            <text x="340" y="199" font-size="14" fill="#ffa000" font-weight="500">지게차 안전벨트 미착용 발견: 물류창고 - 중간</text>
            
            <rect x="300" y="220" width="440" height="30" rx="6" fill="#e8f5e9" />
            <circle cx="320" cy="235" r="8" fill="url(#safety-gradient)" />
            <text x="340" y="239" font-size="14" fill="#43a047" font-weight="500">소화기 점검 일정: 오늘 17:00 - 낮음</text>
            
            <!-- 안전 활동 현황 패널 -->
            <rect x="20" y="280" width="380" height="200" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="310" font-size="18" font-weight="600" fill="#333">안전 활동 현황</text>
            <line x1="40" y1="320" x2="360" y2="320" stroke="#eee" stroke-width="1" />
            
            <!-- 그래프 -->
            <line x1="40" y1="430" x2="360" y2="430" stroke="#ddd" />
            <line x1="40" y1="330" x2="40" y2="430" stroke="#ddd" />
            
            <!-- 바 차트 - 그라데이션 적용 -->
            <rect x="70" y="370" width="40" height="60" rx="4" fill="url(#primary-gradient)" opacity="0.8" />
            <rect x="130" y="350" width="40" height="80" rx="4" fill="url(#primary-gradient)" opacity="0.9" />
            <rect x="190" y="390" width="40" height="40" rx="4" fill="url(#primary-gradient)" opacity="0.7" />
            <rect x="250" y="340" width="40" height="90" rx="4" fill="url(#primary-gradient)" />
            <rect x="310" y="380" width="40" height="50" rx="4" fill="url(#primary-gradient)" opacity="0.85" />
            
            <text x="90" y="450" text-anchor="middle" font-size="12" fill="#666">월</text>
            <text x="150" y="450" text-anchor="middle" font-size="12" fill="#666">화</text>
            <text x="210" y="450" text-anchor="middle" font-size="12" fill="#666">수</text>
            <text x="270" y="450" text-anchor="middle" font-size="12" fill="#666">목</text>
            <text x="330" y="450" text-anchor="middle" font-size="12" fill="#666">금</text>
            
            <!-- 알림 및 일정 패널 -->
            <rect x="420" y="280" width="360" height="200" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="440" y="310" font-size="18" font-weight="600" fill="#333">알림 및 일정</text>
            <line x1="440" y1="320" x2="760" y2="320" stroke="#eee" stroke-width="1" />
            
            <!-- 일정 항목 -->
            <rect x="440" y="335" width="16" height="16" rx="8" fill="#1e88e5" />
            <text x="466" y="348" font-size="14" fill="#333">10:00 안전 점검: 작업장 A구역</text>
            <line x1="440" y1="365" x2="760" y2="365" stroke="#eee" stroke-width="1" />
            
            <rect x="440" y="375" width="16" height="16" rx="8" fill="#ffa000" />
            <text x="466" y="388" font-size="14" fill="#333">13:30 안전교육: 화재 대응 훈련</text>
            <line x1="440" y1="405" x2="760" y2="405" stroke="#eee" stroke-width="1" />
            
            <rect x="440" y="415" width="16" height="16" rx="8" fill="#e53935" />
            <text x="466" y="428" font-size="14" fill="#333">15:00 안전 조치 마감: 전기설비 점검</text>
            <line x1="440" y1="445" x2="760" y2="445" stroke="#eee" stroke-width="1" />
            
            <rect x="440" y="455" width="16" height="16" rx="8" fill="#43a047" />
            <text x="466" y="468" font-size="14" fill="#333">내일 근로감독관 방문 예정</text>
            
            <!-- 오늘의 날씨 미니 위젯 (새로운 요소) -->
            <rect x="700" y="125" width="60" height="60" rx="30" fill="#bbdefb" filter="url(#glow)" />
            <circle cx="730" cy="145" r="12" fill="#fff" />
            <circle cx="742" cy="145" r="8" fill="#fff" />
            <text x="730" y="170" text-anchor="middle" font-size="12" fill="#1565c0" font-weight="500">맑음</text>
            <text x="730" y="185" text-anchor="middle" font-size="11" fill="#333">26°C</text>
        </svg>
    `;
}

// 안전진단 SVG 생성 함수 (개선)
function createAssessmentSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#f8fafc" />
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1" />
                </pattern>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <filter id="inset-shadow">
                    <feOffset dx="0" dy="1" />
                    <feGaussianBlur stdDeviation="1" result="offset-blur" />
                    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                    <feFlood flood-color="#0c4a6e" flood-opacity="0.2" result="color" />
                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="0" y="0" width="800" height="500" fill="url(#grid-pattern)" />
            
            <!-- 상단 헤더 -->
            <rect x="0" y="0" width="800" height="60" fill="url(#primary-gradient)" rx="0" />
            <text x="20" y="38" font-size="24" font-weight="600" fill="#fff">스마트 안전진단</text>
            <text x="770" y="38" font-size="16" fill="#fff" text-anchor="end">2025.05.14</text>
            
            <!-- 사업장 정보 패널 -->
            <rect x="20" y="80" width="760" height="110" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="110" font-size="18" font-weight="600" fill="#333">사업장 정보</text>
            <line x1="40" y1="120" x2="760" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 사업장 정보 데이터 - 아이콘 추가 -->
            <circle cx="55" cy="150" r="12" fill="#e3f2fd" />
            <text x="55" y="155" text-anchor="middle" font-size="12" fill="#1565c0">🏭</text>
            <text x="75" y="155" font-size="14" fill="#333" font-weight="500">업종: </text>
            <text x="120" y="155" font-size="14" fill="#666">제조업 (금속가공)</text>
            
            <circle cx="265" cy="150" r="12" fill="#e3f2fd" />
            <text x="265" y="155" text-anchor="middle" font-size="12" fill="#1565c0">👥</text>
            <text x="285" y="155" font-size="14" fill="#333" font-weight="500">규모: </text>
            <text x="330" y="155" font-size="14" fill="#666">30인</text>
            
            <circle cx="415" cy="150" r="12" fill="#fff8e1" />
            <text x="415" y="155" text-anchor="middle" font-size="12" fill="#ff8f00">⚠️</text>
            <text x="435" y="155" font-size="14" fill="#333" font-weight="500">위험등급: </text>
            <text x="500" y="155" font-size="14" fill="#666">중간</text>
            
            <circle cx="615" cy="150" r="12" fill="#e8f5e9" />
            <text x="615" y="155" text-anchor="middle" font-size="12" fill="#2e7d32">📅</text>
            <text x="635" y="155" font-size="14" fill="#333" font-weight="500">최근 진단: </text>
            <text x="710" y="155" font-size="14" fill="#666">2025-04-01</text>
            
            <!-- 위험성평가 체크리스트 -->
            <rect x="20" y="210" width="760" height="270" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="240" font-size="18" font-weight="600" fill="#333">맞춤형 위험성평가 체크리스트</text>
            <line x1="40" y1="250" x2="760" y2="250" stroke="#eee" stroke-width="1" />
            
            <!-- 체크리스트 항목들 - 인터랙티브 효과 추가 -->
            <rect x="40" y="265" width="720" height="40" rx="6" fill="#e3f2fd" />
            <text x="60" y="290" font-size="14" fill="#333">1. 프레스 및 전단기 안전장치 작동 상태</text>
            <circle cx="720" cy="285" r="16" stroke="#1e88e5" stroke-width="2" fill="#fff" filter="url(#inset-shadow)" />
            <circle cx="720" cy="285" r="8" fill="#1e88e5" />
            <text x="680" y="290" font-size="12" fill="#1e88e5" text-anchor="end">완료</text>
            
            <rect x="40" y="315" width="720" height="40" rx="6" fill="#e3f2fd" />
            <text x="60" y="340" font-size="14" fill="#333">2. 작업자 보호구(안전화, 안전장갑) 착용 상태</text>
            <circle cx="720" cy="335" r="16" stroke="#1e88e5" stroke-width="2" fill="#fff" filter="url(#inset-shadow)" />
            <circle cx="720" cy="335" r="8" fill="#1e88e5" />
            <text x="680" y="340" font-size="12" fill="#1e88e5" text-anchor="end">완료</text>
            
            <rect x="40" y="365" width="720" height="40" rx="6" fill="#f5f7fa" />
            <text x="60" y="390" font-size="14" fill="#333">3. 전기 설비 접지 및 누전차단기 설치 상태</text>
            <circle cx="720" cy="385" r="16" stroke="#1e88e5" stroke-width="2" fill="#fff" filter="url(#inset-shadow)" />
            <text x="680" y="390" font-size="12" fill="#64b5f6" text-anchor="end">대기중</text>
            
            <rect x="40" y="415" width="720" height="40" rx="6" fill="#e3f2fd" />
            <text x="60" y="440" font-size="14" fill="#333">4. 화재 감지 및 소화 설비 점검 상태</text>
            <circle cx="720" cy="435" r="16" stroke="#1e88e5" stroke-width="2" fill="#fff" filter="url(#inset-shadow)" />
            <circle cx="720" cy="435" r="8" fill="#1e88e5" />
            <text x="680" y="440" font-size="12" fill="#1e88e5" text-anchor="end">완료</text>
            
            <!-- 하단 진행 상태 및 버튼 -->
            <rect x="20" y="490" width="760" height="10" rx="5" fill="#e3f2fd" />
            <rect x="20" y="490" width="570" height="10" rx="5" fill="url(#primary-gradient)" />
            <text x="400" y="480" text-anchor="middle" font-size="12" fill="#1565c0">75% 완료</text>
        </svg>
    `;
}

// 현장점검 SVG 생성 함수 (개선)
function createInspectionSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <linearGradient id="success-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#43a047" />
                    <stop offset="100%" stop-color="#2e7d32" />
                </linearGradient>
                
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#f8fafc" />
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1" />
                </pattern>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <!-- 스캔 애니메이션 효과 -->
                <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" stop-opacity="0" />
                    <stop offset="50%" stop-color="#1e88e5" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#1e88e5" stop-opacity="0" />
                    <animate attributeName="y1" from="0%" to="100%" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" from="100%" to="200%" dur="2s" repeatCount="indefinite" />
                </linearGradient>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="0" y="0" width="800" height="500" fill="url(#grid-pattern)" />
            
            <!-- 상단 헤더 -->
            <rect x="0" y="0" width="800" height="60" fill="url(#primary-gradient)" rx="0" />
            <text x="20" y="38" font-size="24" font-weight="600" fill="#fff">현장점검 매니저</text>
            <text x="770" y="38" font-size="16" fill="#fff" text-anchor="end">2025.05.14</text>
            
            <!-- QR 코드 스캔 화면 -->
            <rect x="20" y="80" width="360" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="110" font-size="18" font-weight="600" fill="#333">QR코드 스캔</text>
            <line x1="40" y1="120" x2="340" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- QR 스캔 영역 -->
            <rect x="70" y="130" width="260" height="260" rx="8" stroke="#bbdefb" stroke-width="2" stroke-dasharray="10,5" fill="#f9f9f9" />
            <rect x="70" y="130" width="260" height="260" rx="8" fill="url(#scan-gradient)" />
            
            <!-- 스캔 가이드 -->
            <rect x="170" y="260" width="60" height="5" rx="2" fill="#1e88e5" />
            <rect x="197.5" y="232.5" width="5" height="60" rx="2" fill="#1e88e5" />
            
            <!-- 스캔 텍스트 -->
            <text x="200" y="310" text-anchor="middle" font-size="14" fill="#666" font-weight="500">설비 QR코드를 스캔하세요</text>
            <rect x="120" y="350" width="160" height="40" rx="20" fill="url(#primary-gradient)" filter="url(#shadow)" />
            <text x="200" y="375" text-anchor="middle" font-size="16" fill="#fff" font-weight="500">스캔하기</text>
            
            <!-- 스캔 히스토리 -->
            <text x="40" y="410" font-size="14" fill="#333" font-weight="500">최근 스캔 기록</text>
            <text x="40" y="435" font-size="12" fill="#666">14:30 - 용접기 #A103 (정상)</text>
            <text x="40" y="455" font-size="12" fill="#666">11:15 - 컨베이어 #B205 (주의)</text>
            
            <!-- 설비 정보 및 점검 체크리스트 -->
            <rect x="400" y="80" width="380" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="420" y="110" font-size="18" font-weight="600" fill="#333">설비 정보</text>
            <line x1="420" y1="120" x2="760" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 설비 정보 데이터 -->
            <rect x="420" y="135" width="100" height="100" rx="8" fill="#e3f2fd" />
            <text x="470" y="195" text-anchor="middle" font-size="40" fill="#1565c0">🔧</text>
            
            <text x="535" y="150" font-size="14" fill="#333" font-weight="500">ID: </text>
            <text x="555" y="150" font-size="14" fill="#666">EQ-2023-0042</text>
            
            <text x="535" y="175" font-size="14" fill="#333" font-weight="500">명칭: </text>
            <text x="570" y="175" font-size="14" fill="#666">CNC 밀링머신</text>
            
            <text x="535" y="200" font-size="14" fill="#333" font-weight="500">위치: </text>
            <text x="570" y="200" font-size="14" fill="#666">제조라인 A</text>
            
            <text x="535" y="225" font-size="14" fill="#333" font-weight="500">최근 점검: </text>
            <text x="610" y="225" font-size="14" fill="#666">2025-04-15</text>
            
            <!-- 점검 체크리스트 -->
            <text x="420" y="270" font-size="18" font-weight="600" fill="#333">점검 체크리스트</text>
            <line x1="420" y1="280" x2="760" y2="280" stroke="#eee" stroke-width="1" />
            
            <!-- 체크리스트 항목 -->
            <rect x="420" y="295" width="340" height="35" rx="6" fill="#f5f7fa" />
            <text x="450" y="318" font-size="14" fill="#333">안전 가드 설치 상태</text>
            <circle cx="730" cy="312" r="12" stroke="#1e88e5" stroke-width="2" fill="#fff" />
            
            <rect x="420" y="340" width="340" height="35" rx="6" fill="#f5f7fa" />
            <text x="450" y="363" font-size="14" fill="#333">비상 정지 버튼 작동 상태</text>
            <circle cx="730" cy="357" r="12" stroke="#1e88e5" stroke-width="2" fill="#fff" />
            
            <rect x="420" y="385" width="340" height="35" rx="6" fill="#f5f7fa" />
            <text x="450" y="408" font-size="14" fill="#333">작업 영역 조명 상태</text>
            <circle cx="730" cy="402" r="12" stroke="#1e88e5" stroke-width="2" fill="#fff" />
            
            <!-- 완료 버튼 -->
            <rect x="420" y="440" width="160" height="40" rx="20" fill="url(#success-gradient)" filter="url(#shadow)" />
            <text x="500" y="465" text-anchor="middle" font-size="16" fill="#fff" font-weight="500">점검 완료</text>
            
            <!-- 기록 저장 버튼 -->
            <rect x="600" y="440" width="160" height="40" rx="20" fill="#fff" stroke="#1e88e5" stroke-width="2" />
            <text x="680" y="465" text-anchor="middle" font-size="16" fill="#1e88e5" font-weight="500">기록 저장</text>
        </svg>
    `;
}

// 안전교육 SVG 생성 함수 (개선)
function createEducationSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffa000" />
                    <stop offset="100%" stop-color="#ff8f00" />
                </linearGradient>
                
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#f8fafc" />
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1" />
                </pattern>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <!-- 동영상 play 버튼 효과 -->
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                <clipPath id="progress-clip">
                    <rect x="310" y="420" width="300" height="20" rx="10" />
                </clipPath>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="0" y="0" width="800" height="500" fill="url(#grid-pattern)" />
            
            <!-- 상단 헤더 -->
            <rect x="0" y="0" width="800" height="60" fill="url(#primary-gradient)" rx="0" />
            <text x="20" y="38" font-size="24" font-weight="600" fill="#fff">안전교육 도우미</text>
            <text x="770" y="38" font-size="16" fill="#fff" text-anchor="end">2025.05.14</text>
            
            <!-- 교육 콘텐츠 카탈로그 -->
            <rect x="20" y="80" width="240" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="110" font-size="18" font-weight="600" fill="#333">교육 콘텐츠</text>
            <line x1="40" y1="120" x2="220" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 카테고리 목록 -->
            <rect x="30" y="140" width="220" height="45" rx="6" fill="#bbdefb" />
            <circle cx="50" cy="162" r="12" fill="#1e88e5" />
            <text x="50" cy="162" text-anchor="middle" font-size="12" fill="#fff">🔥</text>
            <text x="70" y="167" font-size="14" fill="#1565c0" font-weight="500">화재 예방 및 대응</text>
            
            <rect x="30" y="195" width="220" height="45" rx="6" fill="#f5f7fa" />
            <circle cx="50" cy="217" r="12" fill="#64b5f6" />
            <text x="50" cy="217" text-anchor="middle" font-size="12" fill="#fff">⚙️</text>
            <text x="70" y="222" font-size="14" fill="#333">기계 설비 안전</text>
            
            <rect x="30" y="250" width="220" height="45" rx="6" fill="#f5f7fa" />
            <circle cx="50" cy="272" r="12" fill="#64b5f6" />
            <text x="50" cy="272" text-anchor="middle" font-size="12" fill="#fff">⚡</text>
            <text x="70" y="277" font-size="14" fill="#333">전기 안전</text>
            
            <rect x="30" y="305" width="220" height="45" rx="6" fill="#f5f7fa" />
            <circle cx="50" cy="327" r="12" fill="#64b5f6" />
            <text x="50" cy="327" text-anchor="middle" font-size="12" fill="#fff">🩹</text>
            <text x="70" y="332" font-size="14" fill="#333">응급 처치</text>
            
            <rect x="30" y="360" width="220" height="45" rx="6" fill="#f5f7fa" />
            <circle cx="50" cy="382" r="12" fill="#64b5f6" />
            <text x="50" cy="382" text-anchor="middle" font-size="12" fill="#fff">🌫️</text>
            <text x="70" y="387" font-size="14" fill="#333">작업 환경 유해 요인</text>
            
            <rect x="30" y="415" width="220" height="45" rx="6" fill="#f5f7fa" />
            <circle cx="50" cy="437" r="12" fill="#64b5f6" />
            <text x="50" cy="437" text-anchor="middle" font-size="12" fill="#fff">🥽</text>
            <text x="70" y="442" font-size="14" fill="#333">보호구 착용 방법</text>
            
            <!-- 교육 콘텐츠 뷰어 -->
            <rect x="280" y="80" width="500" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="300" y="110" font-size="18" font-weight="600" fill="#333">화재 예방 및 대응 교육</text>
            <line x1="300" y1="120" x2="760" y2="120" stroke="#eee" stroke-width="1" />
            
            <!-- 신뢰도 배지 -->
            <rect x="660" y="95" width="100" height="20" rx="10" fill="#e8f5e9" />
            <text x="710" y="110" text-anchor="middle" font-size="12" fill="#2e7d32">공단 인증 콘텐츠</text>
            
            <!-- 비디오 플레이어 모양 - 3D 효과 적용 -->
            <rect x="300" y="140" width="460" height="260" rx="8" fill="#000" />
            <rect x="310" y="150" width="440" height="240" rx="4" fill="#333" />
            <rect x="320" y="160" width="420" height="220" rx="2" fill="#111" />
            
            <!-- 플레이 버튼 -->
            <circle cx="530" cy="270" r="40" fill="#fff" opacity="0.7" filter="url(#glow)">
                <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <polygon points="520,250 520,290 550,270" fill="#000" />
            
            <!-- 비디오 정보 -->
            <text x="300" y="390" font-size="16" fill="#333" font-weight="500">화재 발생 시 대피 요령 및 소화기 사용 방법</text>
            <text x="300" y="415" font-size="14" fill="#666">화재 발생 시 대피 요령 및 소화기 사용 방법에 대한 교육 영상입니다. 모든 작업자는 반드시 시청해야 합니다.</text>
            
            <!-- 비디오 컨트롤 -->
            <rect x="300" y="440" width="460" height="40" fill="#f5f7fa" rx="8" />
            <rect x="310" y="450" width="300" height="20" rx="10" fill="#ddd" />
            <rect x="310" y="450" width="150" height="20" rx="10" fill="url(#primary-gradient)" clip-path="url(#progress-clip)" />
            <circle cx="460" cy="460" r="12" fill="#fff" stroke="#1e88e5" stroke-width="2" />
            <text x="650" y="465" text-anchor="middle" font-size="14" fill="#333">05:23 / 10:45</text>
            
            <!-- 컨트롤 버튼 -->
            <circle cx="330" cy="460" r="12" fill="#f5f7fa" stroke="#1e88e5" stroke-width="1" />
            <polygon points="325,455 325,465 338,460" fill="#1e88e5" />
            
            <circle cx="370" cy="460" r="12" fill="#f5f7fa" stroke="#1e88e5" stroke-width="1" />
            <rect x="366" y="455" width="3" height="10" fill="#1e88e5" />
            <rect x="371" y="455" width="3" height="10" fill="#1e88e5" />
            
            <circle cx="410" cy="460" r="12" fill="#f5f7fa" stroke="#1e88e5" stroke-width="1" />
            <rect x="405" y="455" width="10" height="10" fill="#1e88e5" />
        </svg>
    `;
}

// 안전투자 SVG 생성 함수 (개선)
function createInvestmentSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <linearGradient id="secondary-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffa000" />
                    <stop offset="100%" stop-color="#ff8f00" />
                </linearGradient>
                
                <linearGradient id="success-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#43a047" />
                    <stop offset="100%" stop-color="#2e7d32" />
                </linearGradient>
                
                <linearGradient id="danger-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#e53935" />
                    <stop offset="100%" stop-color="#c62828" />
                </linearGradient>
                
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="#f8fafc" />
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="1" />
                </pattern>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="0" y="0" width="800" height="500" fill="url(#grid-pattern)" />
            
            <!-- 상단 헤더 -->
            <rect x="0" y="0" width="800" height="60" fill="url(#primary-gradient)" rx="0" />
            <text x="20" y="38" font-size="24" font-weight="600" fill="#fff">안전투자 최적화</text>
            <text x="770" y="38" font-size="16" fill="#fff" text-anchor="end">2025.05.14</text>
            
            <!-- 투자 매트릭스 -->
            <rect x="20" y="80" width="460" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="40" y="110" font-size="18" font-weight="600" fill="#333">안전 투자 우선순위 매트릭스</text>
            <line x1="40" y1="125" x2="460" y2="125" stroke="#eee" stroke-width="1" />
            
            <!-- 매트릭스 축 및 그리드 -->
            <line x1="70" y1="410" x2="430" y2="410" stroke="#333" stroke-width="2" />
            <line x1="70" y1="410" x2="70" y2="150" stroke="#333" stroke-width="2" />
            
            <!-- 그리드 라인 -->
            <line x1="70" y1="340" x2="430" y2="340" stroke="#eee" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="70" y1="270" x2="430" y2="270" stroke="#eee" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="70" y1="200" x2="430" y2="200" stroke="#eee" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="190" y1="410" x2="190" y2="150" stroke="#eee" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="310" y1="410" x2="310" y2="150" stroke="#eee" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- 매트릭스 라벨 -->
            <text x="250" y="440" text-anchor="middle" font-size="14" fill="#333" font-weight="500">투자 비용</text>
            <text x="35" y="280" transform="rotate(-90 35 280)" text-anchor="middle" font-size="14" fill="#333" font-weight="500">안전 효과</text>
            
            <!-- 매트릭스 항목들 - 3D 효과 및 그라디언트 적용 -->
            <circle cx="120" cy="200" r="35" fill="#e8f5e9" stroke="url(#success-gradient)" stroke-width="3" filter="url(#shadow)">
                <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="120" y="195" text-anchor="middle" font-size="14" fill="#2e7d32" font-weight="500">전기 안전</text>
            <text x="120" y="215" text-anchor="middle" font-size="12" fill="#666">ROI: 250%</text>
            
            <circle cx="200" cy="300" r="25" fill="#fff8e1" stroke="url(#secondary-gradient)" stroke-width="3" filter="url(#shadow)">
                <animate attributeName="r" values="25;27;25" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="200" y="295" text-anchor="middle" font-size="14" fill="#ff8f00" font-weight="500">안전 가드</text>
            <text x="200" y="315" text-anchor="middle" font-size="12" fill="#666">ROI: 180%</text>
            
            <circle cx="320" cy="250" r="40" fill="#ffebee" stroke="url(#danger-gradient)" stroke-width="3" filter="url(#shadow)">
                <animate attributeName="r" values="40;43;40" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="320" y="245" text-anchor="middle" font-size="14" fill="#c62828" font-weight="500">환기 시스템</text>
            <text x="320" y="265" text-anchor="middle" font-size="12" fill="#666">ROI: 130%</text>
            
            <circle cx="390" cy="350" r="20" fill="#f5f7fa" stroke="#546e7a" stroke-width="3" filter="url(#shadow)">
                <animate attributeName="r" values="20;22;20" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="390" y="345" text-anchor="middle" font-size="14" fill="#546e7a" font-weight="500">조명 시설</text>
            <text x="390" y="365" text-anchor="middle" font-size="12" fill="#666">ROI: 90%</text>
            
            <!-- 추천 지원사업 -->
            <rect x="500" y="80" width="280" height="400" rx="12" fill="#fff" stroke="#ddd" filter="url(#shadow)" />
            <text x="520" y="110" font-size="18" font-weight="600" fill="#333">추천 지원사업</text>
            <line x1="520" y1="125" x2="760" y2="125" stroke="#eee" stroke-width="1" />
            
            <!-- 지원사업 항목들 - 향상된 카드 디자인 -->
            <rect x="520" y="140" width="240" height="80" rx="8" fill="#e3f2fd" filter="url(#shadow)" />
            <rect x="520" y="140" width="8" height="80" fill="url(#primary-gradient)" rx="4 0 0 4" />
            <text x="540" y="165" font-size="16" fill="#1565c0" font-weight="500">클린사업장 조성 지원</text>
            <text x="540" y="185" font-size="14" fill="#546e7a">안전 설비 구입 비용 70% 지원</text>
            <text x="540" y="205" font-size="12" fill="#64b5f6">신청 마감: 2025-06-30</text>
            
            <rect x="520" y="230" width="240" height="80" rx="8" fill="#f5f7fa" filter="url(#shadow)" />
            <rect x="520" y="230" width="8" height="80" fill="#546e7a" rx="4 0 0 4" />
            <text x="540" y="255" font-size="16" fill="#333" font-weight="500">안전보건 교육 지원금</text>
            <text x="540" y="275" font-size="14" fill="#546e7a">안전교육 실시 비용 80% 지원</text>
            <text x="540" y="295" font-size="12" fill="#78909c">신청 마감: 2025-07-15</text>
            
            <rect x="520" y="320" width="240" height="80" rx="8" fill="#f5f7fa" filter="url(#shadow)" />
            <rect x="520" y="320" width="8" height="80" fill="#43a047" rx="4 0 0 4" />
            <text x="540" y="345" font-size="16" fill="#333" font-weight="500">위험성 평가 인증 지원</text>
            <text x="540" y="365" font-size="14" fill="#546e7a">컨설팅 비용 전액 지원</text>
            <text x="540" y="385" font-size="12" fill="#78909c">신청 마감: 2025-08-10</text>
            
            <rect x="520" y="410" width="240" height="70" rx="8" fill="#f5f7fa" filter="url(#shadow)" />
            <rect x="520" y="410" width="8" height="70" fill="#ffa000" rx="4 0 0 4" />
            <text x="540" y="435" font-size="16" fill="#333" font-weight="500">위험 기계 교체 지원</text>
            <text x="540" y="455" font-size="14" fill="#546e7a">노후 설비 교체 비용 50% 지원</text>
            <text x="540" y="472" font-size="12" fill="#78909c">상시 신청 가능</text>
        </svg>
    `;
}

// 로드맵 타임라인 SVG 생성 함수 (새로 추가)
function createRoadmapSvg() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="10" y="10" width="780" height="280" rx="8" fill="#fff" filter="url(#shadow)" />
            
            <!-- 타임라인 -->
            <line x1="100" y1="150" x2="700" y2="150" stroke="url(#primary-gradient)" stroke-width="4" stroke-linecap="round" />
            
            <!-- Phase 1 -->
            <circle cx="150" cy="150" r="15" fill="#1e88e5" />
            <text x="150" y="120" text-anchor="middle" font-size="14" fill="#1e88e5" font-weight="600">Phase 1</text>
            <text x="150" y="190" text-anchor="middle" font-size="12" fill="#333">프로토타입 개발</text>
            <text x="150" y="210" text-anchor="middle" font-size="12" fill="#666">2025.06</text>
            
            <!-- Phase 2 -->
            <circle cx="300" cy="150" r="15" fill="#1e88e5" />
            <text x="300" y="120" text-anchor="middle" font-size="14" fill="#1e88e5" font-weight="600">Phase 2</text>
            <text x="300" y="190" text-anchor="middle" font-size="12" fill="#333">베타 테스트</text>
            <text x="300" y="210" text-anchor="middle" font-size="12" fill="#666">2025.08</text>
            
            <!-- Phase 3 -->
            <circle cx="450" cy="150" r="15" fill="#1e88e5" />
            <text x="450" y="120" text-anchor="middle" font-size="14" fill="#1e88e5" font-weight="600">Phase 3</text>
            <text x="450" y="190" text-anchor="middle" font-size="12" fill="#333">정식 출시</text>
            <text x="450" y="210" text-anchor="middle" font-size="12" fill="#666">2025.10</text>
            
            <!-- Phase 4 -->
            <circle cx="600" cy="150" r="15" fill="#1e88e5" opacity="0.5" />
            <text x="600" y="120" text-anchor="middle" font-size="14" fill="#1e88e5" font-weight="600" opacity="0.5">Phase 4</text>
            <text x="600" y="190" text-anchor="middle" font-size="12" fill="#333" opacity="0.5">기능 확장</text>
            <text x="600" y="210" text-anchor="middle" font-size="12" fill="#666" opacity="0.5">2026.01</text>
            
            <!-- 현재 위치 표시 -->
            <circle cx="300" cy="150" r="22" fill="none" stroke="#1e88e5" stroke-width="3" stroke-dasharray="5,2">
                <animate attributeName="r" values="22;25;22" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="400" y="50" text-anchor="middle" font-size="16" fill="#1e88e5" font-weight="600">현재 진행 단계: 베타 테스트</text>
        </svg>
    `;
}

// 데이터 처리 다이어그램 생성 함수 (새로 추가)
function createDataProcessDiagram() {
    return `
        <svg width="100%" height="100%" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
            <!-- 정의 -->
            <defs>
                <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1e88e5" />
                    <stop offset="100%" stop-color="#1565c0" />
                </linearGradient>
                
                <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffa000" />
                    <stop offset="100%" stop-color="#ff8f00" />
                </linearGradient>
                
                <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#43a047" />
                    <stop offset="100%" stop-color="#2e7d32" />
                </linearGradient>
                
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
                </filter>
                
                <!-- 데이터 흐름 애니메이션 -->
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#1e88e5" />
                </marker>
            </defs>
            
            <!-- 백그라운드 -->
            <rect x="10" y="10" width="680" height="180" rx="8" fill="#fff" filter="url(#shadow)" />
            
            <!-- 각 단계 -->
            <!-- 데이터 수집 -->
            <rect x="50" y="65" width="120" height="70" rx="8" fill="#e3f2fd" filter="url(#shadow)" />
            <text x="110" y="105" text-anchor="middle" font-size="14" fill="#1565c0" font-weight="600">데이터 수집</text>
            
            <!-- 데이터 처리 -->
            <rect x="220" y="65" width="120" height="70" rx="8" fill="#fff8e1" filter="url(#shadow)" />
            <text x="280" y="105" text-anchor="middle" font-size="14" fill="#ff8f00" font-weight="600">데이터 통합 가공</text>
            
            <!-- 예측 모델 -->
            <rect x="390" y="65" width="120" height="70" rx="8" fill="#e8f5e9" filter="url(#shadow)" />
            <text x="450" y="105" text-anchor="middle" font-size="14" fill="#2e7d32" font-weight="600">예측 모델 적용</text>
            
            <!-- 맞춤 정보 -->
            <rect x="560" y="65" width="120" height="70" rx="8" fill="#f3e5f5" filter="url(#shadow)" />
            <text x="620" y="105" text-anchor="middle" font-size="14" fill="#6a1b9a" font-weight="600">맞춤 정보 제공</text>
            
            <!-- 연결 화살표 -->
            <line x1="170" y1="100" x2="210" y2="100" stroke="#1e88e5" stroke-width="2" marker-end="url(#arrowhead)">
                <animate attributeName="x2" values="180;210;210" dur="2s" repeatCount="indefinite" />
            </line>
            
            <line x1="340" y1="100" x2="380" y2="100" stroke="#1e88e5" stroke-width="2" marker-end="url(#arrowhead)">
                <animate attributeName="x2" values="350;380;380" dur="2s" repeatCount="indefinite" />
            </line>
            
            <line x1="510" y1="100" x2="550" y2="100" stroke="#1e88e5" stroke-width="2" marker-end="url(#arrowhead)">
                <animate attributeName="x2" values="520;550;550" dur="2s" repeatCount="indefinite" />
            </line>
            
            <!-- 데이터 소스 표시 -->
            <text x="110" y="40" text-anchor="middle" font-size="12" fill="#546e7a">고용노동부 | 산업안전보건공단 | 근로복지공단</text>
            
            <!-- 결과 표시 -->
            <text x="620" y="160" text-anchor="middle" font-size="12" fill="#6a1b9a">중소기업 맞춤형 안전 솔루션</text>
        </svg>
    `;
}

// 페이지 로드 시 데이터 처리 다이어그램과 로드맵 추가 (새로 추가)
document.addEventListener('DOMContentLoaded', function() {
    // 데이터 처리 다이어그램 추가
    const dataProcessDiagram = document.getElementById('data-process-diagram');
    if (dataProcessDiagram) {
        dataProcessDiagram.innerHTML = createDataProcessDiagram();
    }
    
    // 로드맵 타임라인 추가
    const roadmapTimeline = document.getElementById('roadmap-timeline');
    if (roadmapTimeline) {
        roadmapTimeline.innerHTML = createRoadmapSvg();
    }
    
    // 데모 탭 이벤트 리스너
    const demoTabs = document.querySelectorAll('.demo-tab');
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            updateDemoContent(tabId);
            
            // 탭 활성화 상태 업데이트
            demoTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 초기 데모 콘텐츠 로드
    const activeTab = document.querySelector('.demo-tab.active');
    if (activeTab) {
        const tabId = activeTab.getAttribute('data-tab');
        updateDemoContent(tabId);
    }
});
