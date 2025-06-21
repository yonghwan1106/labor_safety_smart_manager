// 프로토타입 메인 스크립트
class SafetyPlatformPrototype {
    constructor() {
        this.currentModule = 'dashboard';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadModule('dashboard');
        this.setupGlobalEvents();
    }

    // 네비게이션 설정
    setupNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 모든 메뉴 아이템 비활성화
                menuItems.forEach(mi => mi.classList.remove('active'));
                
                // 클릭된 아이템 활성화
                item.classList.add('active');
                
                // 모듈 로드
                const module = item.getAttribute('data-module');
                this.loadModule(module);
            });
        });
    }

    // 모듈 로드
    loadModule(moduleName) {
        // 모든 모듈 숨기기
        const modules = document.querySelectorAll('.module-content');
        modules.forEach(module => {
            module.classList.remove('active');
        });

        // 선택된 모듈 표시
        const targetModule = document.getElementById(`${moduleName}-module`);
        if (targetModule) {
            targetModule.classList.add('active');
            this.currentModule = moduleName;
            
            // 모듈별 초기화 함수 호출
            this.initializeModule(moduleName);
        }
    }

    // 모듈별 초기화
    initializeModule(moduleName) {
        switch(moduleName) {
            case 'dashboard':
                if (window.DashboardModule) {
                    window.DashboardModule.init();
                }
                break;
            case 'risk-prediction':
                if (window.RiskPredictionModule) {
                    window.RiskPredictionModule.init();
                }
                break;
            case 'mobile-inspection':
                if (window.MobileInspectionModule) {
                    window.MobileInspectionModule.init();
                }
                break;
            case 'education':
                if (window.EducationModule) {
                    window.EducationModule.init();
                }
                break;
            case 'data-hub':
                if (window.DataHubModule) {
                    window.DataHubModule.init();
                }
                break;
        }
    }

    // 전역 이벤트 설정
    setupGlobalEvents() {
        // 페이지 로드 시 애니메이션
        document.addEventListener('DOMContentLoaded', () => {
            this.showLoadingComplete();
        });

        // 반응형 사이드바 토글
        this.setupResponsiveSidebar();
    }

    // 로딩 완료 애니메이션
    showLoadingComplete() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.opacity = '0';
            setTimeout(() => {
                mainContent.style.transition = 'opacity 0.5s ease';
                mainContent.style.opacity = '1';
            }, 100);
        }
    }

    // 반응형 사이드바 설정
    setupResponsiveSidebar() {
        // 모바일 메뉴 토글 버튼 생성
        const navbar = document.querySelector('.navbar .container-fluid');
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'btn btn-outline-light d-lg-none';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        navbar.insertBefore(mobileToggle, navbar.firstChild);
        
        mobileToggle.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        });

        // 모바일에서 메뉴 클릭 시 사이드바 닫기
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('show');
                }
            });
        });
    }

    // 알림 표시 유틸리티
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = `
            top: 80px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.innerHTML = `
            <i class="fas fa-${this.getIconForType(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close float-end" aria-label="Close"></button>
        `;

        document.body.appendChild(notification);

        // 닫기 버튼 이벤트
        notification.querySelector('.btn-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // 자동 삭제
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
    }

    // 알림 제거
    removeNotification(notification) {
        notification.style.transition = 'all 0.3s ease';
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // 알림 타입별 아이콘
    getIconForType(type) {
        const icons = {
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'danger': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // 데이터 시뮬레이션 유틸리티
    generateMockData() {
        return {
            safetyIndex: Math.floor(Math.random() * 30) + 70, // 70-100
            accidents: Math.floor(Math.random() * 5),
            inspections: Math.floor(Math.random() * 10) + 20,
            trainingCompletion: Math.floor(Math.random() * 20) + 80,
            riskAreas: Math.floor(Math.random() * 3) + 1,
            
            // 시계열 데이터
            chartData: this.generateChartData(),
            
            // 위험 예측 데이터
            predictions: this.generatePredictionData()
        };
    }

    // 차트 데이터 생성
    generateChartData() {
        const data = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            data.push({
                date: date.toISOString().split('T')[0],
                safetyIndex: Math.floor(Math.random() * 20) + 75,
                accidents: Math.floor(Math.random() * 3),
                inspections: Math.floor(Math.random() * 5) + 3
            });
        }
        
        return data;
    }

    // 예측 데이터 생성
    generatePredictionData() {
        const areas = ['전기설비', '기계장치', '화학물질', '작업환경', '안전장비'];
        const riskLevels = ['low', 'medium', 'high', 'critical'];
        
        return areas.map(area => ({
            area: area,
            riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
            probability: Math.floor(Math.random() * 100),
            recommendation: this.getRecommendation(area)
        }));
    }

    // 권고사항 생성
    getRecommendation(area) {
        const recommendations = {
            '전기설비': '접지 및 누전차단기 점검 권장',
            '기계장치': '정기 윤활 및 안전장치 점검 필요',
            '화학물질': 'MSDS 확인 및 보호구 착용 점검',
            '작업환경': '환기 시설 및 조도 점검 권장',
            '안전장비': '안전모, 안전화 착용 상태 점검'
        };
        return recommendations[area] || '정기 점검 권장';
    }

    // 현재 시간 표시 업데이트
    updateCurrentTime() {
        const timeElements = document.querySelectorAll('.current-time');
        const now = new Date();
        const timeString = now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        timeElements.forEach(element => {
            element.textContent = timeString;
        });
    }
}

// 전역 유틸리티 함수들
window.PrototypeUtils = {
    // 숫자 포맷팅
    formatNumber: (num) => {
        return num.toLocaleString('ko-KR');
    },

    // 퍼센트 포맷팅
    formatPercent: (num) => {
        return `${num}%`;
    },

    // 날짜 포맷팅
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('ko-KR');
    },

    // 위험 레벨 색상
    getRiskLevelColor: (level) => {
        const colors = {
            'low': '#4caf50',
            'medium': '#ff9800',
            'high': '#f44336',
            'critical': '#c2185b'
        };
        return colors[level] || '#6c757d';
    },

    // 위험 레벨 한글명
    getRiskLevelText: (level) => {
        const texts = {
            'low': '낮음',
            'medium': '보통',
            'high': '높음',
            'critical': '매우높음'
        };
        return texts[level] || '알수없음';
    },

    // 랜덤 ID 생성
    generateId: () => {
        return Math.random().toString(36).substr(2, 9);
    },

    // 디바운스 함수
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// 프로토타입 초기화
document.addEventListener('DOMContentLoaded', () => {
    // SafetyPlatform 인스턴스 먼저 생성
    window.SafetyPlatform = new SafetyPlatformPrototype();
    
    // 시간 업데이트 타이머
    setInterval(() => {
        if (window.SafetyPlatform) {
            window.SafetyPlatform.updateCurrentTime();
        }
    }, 1000);
});

// 전역 스코프에 노출
window.SafetyPlatformPrototype = SafetyPlatformPrototype;
