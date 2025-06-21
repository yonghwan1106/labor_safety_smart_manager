// 대시보드 모듈
window.DashboardModule = {
    charts: {},
    mockData: null,

    init() {
        this.mockData = this.generateMockData();
        this.renderDashboard();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    },

    // 독립적인 mockData 생성 함수
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
    },

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
    },

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
    },

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
    },

    renderDashboard() {
        const content = document.getElementById('dashboard-content');
        content.innerHTML = this.generateDashboardHTML();
        
        // 차트 초기화는 DOM이 렌더링된 후에
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    },

    generateDashboardHTML() {
        const data = this.mockData;
        
        return `
            <!-- 상단 통계 카드들 -->
            <div class="row mb-4">
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="stat-card ${this.getSafetyIndexClass(data.safetyIndex)}">
                        <div class="stat-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="stat-value">${data.safetyIndex}</div>
                        <div class="stat-label">오늘의 안전지수</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="stat-card ${data.accidents === 0 ? 'success' : 'danger'}">
                        <div class="stat-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-value">${data.accidents}</div>
                        <div class="stat-label">금일 사고 건수</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="stat-card info">
                        <div class="stat-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <div class="stat-value">${data.inspections}</div>
                        <div class="stat-label">완료된 점검</div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="stat-card warning">
                        <div class="stat-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="stat-value">${data.trainingCompletion}%</div>
                        <div class="stat-label">교육 이수율</div>
                    </div>
                </div>
            </div>

            <!-- 주요 알림 및 액션 아이템 -->
            <div class="row mb-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-bell me-2"></i>긴급 알림 및 액션 아이템
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateAlerts()}
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-clock me-2"></i>오늘의 일정
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateTodaySchedule()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 차트 영역 -->
            <div class="row mb-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-line me-2"></i>주간 안전 동향
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="safetyTrendChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-exclamation-circle me-2"></i>위험 영역 분포
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="riskDistributionChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 최근 활동 및 빠른 액션 -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-history me-2"></i>최근 활동
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateRecentActivities()}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-bolt me-2"></i>빠른 액션
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateQuickActions()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getSafetyIndexClass(index) {
        if (index >= 90) return 'success';
        if (index >= 80) return 'info';
        if (index >= 70) return 'warning';
        return 'danger';
    },

    generateAlerts() {
        const alerts = [
            {
                type: 'danger',
                icon: 'exclamation-triangle',
                title: '화학물질 보관고 환기 시설 점검 필요',
                time: '15분 전',
                action: 'QR코드 스캔하여 점검하기'
            },
            {
                type: 'warning',
                icon: 'hard-hat',
                title: '3층 작업장 안전모 미착용 감지',
                time: '32분 전',
                action: '현장 지도 및 교육 실시'
            },
            {
                type: 'success',
                icon: 'check-circle',
                title: '전기 설비 안전 점검 완료',
                time: '1시간 전',
                action: '점검 결과 확인'
            }
        ];

        return alerts.map(alert => `
            <div class="alert alert-${alert.type} d-flex align-items-center mb-2">
                <i class="fas fa-${alert.icon} me-3"></i>
                <div class="flex-grow-1">
                    <strong>${alert.title}</strong>
                    <div class="small text-muted">${alert.time}</div>
                </div>
                <button class="btn btn-sm btn-outline-${alert.type}">
                    ${alert.action}
                </button>
            </div>
        `).join('');
    },

    generateTodaySchedule() {
        const schedules = [
            { time: '09:00', task: '작업장 안전 점검', status: 'completed' },
            { time: '11:00', task: '화학물질 보관 점검', status: 'pending' },
            { time: '14:00', task: '신입사원 안전교육', status: 'pending' },
            { time: '16:00', task: '월간 안전회의', status: 'pending' }
        ];

        return schedules.map(schedule => `
            <div class="d-flex align-items-center mb-3">
                <div class="me-3">
                    <span class="badge ${schedule.status === 'completed' ? 'bg-success' : 'bg-secondary'}">
                        ${schedule.time}
                    </span>
                </div>
                <div class="flex-grow-1">
                    <div class="${schedule.status === 'completed' ? 'text-decoration-line-through text-muted' : ''}">
                        ${schedule.task}
                    </div>
                </div>
                <div>
                    <i class="fas fa-${schedule.status === 'completed' ? 'check text-success' : 'clock text-warning'}"></i>
                </div>
            </div>
        `).join('');
    },

    generateRecentActivities() {
        const activities = [
            { time: '08:45', user: '김철수', action: '전기설비 점검 완료', type: 'inspection' },
            { time: '08:30', user: '이영희', action: '안전교육 이수 완료', type: 'education' },
            { time: '08:15', user: '박민수', action: '위험 상황 신고', type: 'report' },
            { time: '08:00', user: '시스템', action: 'AI 위험 예측 업데이트', type: 'system' }
        ];

        return activities.map(activity => `
            <div class="d-flex align-items-center mb-3">
                <div class="me-3">
                    <i class="fas fa-${this.getActivityIcon(activity.type)} text-${this.getActivityColor(activity.type)}"></i>
                </div>
                <div class="flex-grow-1">
                    <div><strong>${activity.user}</strong> ${activity.action}</div>
                    <small class="text-muted">${activity.time}</small>
                </div>
            </div>
        `).join('');
    },

    getActivityIcon(type) {
        const icons = {
            'inspection': 'clipboard-check',
            'education': 'graduation-cap',
            'report': 'exclamation-triangle',
            'system': 'robot'
        };
        return icons[type] || 'circle';
    },

    getActivityColor(type) {
        const colors = {
            'inspection': 'primary',
            'education': 'success',
            'report': 'warning',
            'system': 'info'
        };
        return colors[type] || 'secondary';
    },

    generateQuickActions() {
        const actions = [
            { icon: 'qrcode', title: 'QR 점검 시작', desc: '현장 안전 점검 수행' },
            { icon: 'brain', title: 'AI 위험 분석', desc: '실시간 위험 예측 확인' },
            { icon: 'graduation-cap', title: '교육 자료', desc: '안전 교육 콘텐츠 확인' },
            { icon: 'file-alt', title: '보고서 생성', desc: '안전 현황 보고서 작성' }
        ];

        return actions.map(action => `
            <div class="d-grid gap-2 mb-2">
                <button class="btn btn-outline-primary text-start quick-action-btn" data-action="${action.icon}">
                    <i class="fas fa-${action.icon} me-3"></i>
                    <div>
                        <strong>${action.title}</strong>
                        <div class="small text-muted">${action.desc}</div>
                    </div>
                </button>
            </div>
        `).join('');
    },

    initializeCharts() {
        this.createSafetyTrendChart();
        this.createRiskDistributionChart();
    },

    createSafetyTrendChart() {
        const ctx = document.getElementById('safetyTrendChart');
        if (!ctx) return;

        const data = this.mockData.chartData;
        
        this.charts.safetyTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: '안전지수',
                        data: data.map(d => d.safetyIndex),
                        borderColor: '#1e88e5',
                        backgroundColor: 'rgba(30, 136, 229, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: '사고 건수',
                        data: data.map(d => d.accidents),
                        borderColor: '#f44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    },

    createRiskDistributionChart() {
        const ctx = document.getElementById('riskDistributionChart');
        if (!ctx) return;

        this.charts.riskDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['낮음', '보통', '높음', '매우높음'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#c2185b'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    setupEventListeners() {
        // 빠른 액션 버튼 이벤트
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-action-btn')) {
                const action = e.target.closest('.quick-action-btn').getAttribute('data-action');
                this.handleQuickAction(action);
            }
        });
    },

    handleQuickAction(action) {
        switch(action) {
            case 'qrcode':
                this.loadModule('mobile-inspection');
                break;
            case 'brain':
                this.loadModule('risk-prediction');
                break;
            case 'graduation-cap':
                this.loadModule('education');
                break;
            case 'file-alt':
                this.generateReport();
                break;
        }
    },

    // 모듈 로드 함수 (SafetyPlatform이 없어도 작동)
    loadModule(moduleName) {
        // 사이드바 메뉴 업데이트
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-module') === moduleName) {
                item.classList.add('active');
            }
        });

        // 모듈 변경
        const modules = document.querySelectorAll('.module-content');
        modules.forEach(module => {
            module.classList.remove('active');
        });

        const targetModule = document.getElementById(`${moduleName}-module`);
        if (targetModule) {
            targetModule.classList.add('active');
        }
    },

    // 독립적인 알림 함수
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
    },

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
    },

    // 알림 타입별 아이콘
    getIconForType(type) {
        const icons = {
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'danger': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    },

    generateReport() {
        this.showNotification('안전 현황 보고서 생성이 시작되었습니다.', 'info');
        
        setTimeout(() => {
            this.showNotification('보고서가 성공적으로 생성되었습니다.', 'success');
        }, 2000);
    },

    startRealTimeUpdates() {
        // 30초마다 데이터 업데이트 시뮬레이션
        setInterval(() => {
            // 현재 대시보드가 활성화되어 있는지 확인
            const dashboardModule = document.getElementById('dashboard-module');
            if (dashboardModule && dashboardModule.classList.contains('active')) {
                this.updateRealTimeData();
            }
        }, 30000);
    },

    updateRealTimeData() {
        // 안전지수 업데이트
        const safetyIndexElement = document.querySelector('.stat-card .stat-value');
        if (safetyIndexElement) {
            const newIndex = Math.floor(Math.random() * 10) + 85;
            safetyIndexElement.textContent = newIndex;
            
            // 변화 효과
            safetyIndexElement.parentElement.classList.add('highlight');
            setTimeout(() => {
                safetyIndexElement.parentElement.classList.remove('highlight');
            }, 2000);
        }
    },

    destroy() {
        // 차트 정리
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
};
