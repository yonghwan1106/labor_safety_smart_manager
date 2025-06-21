// 안전 데이터 통합 허브 모듈
window.DataHubModule = {
    charts: {},
    dataConnections: null,
    updateInterval: null,

    init() {
        this.generateDataConnections();
        this.renderDataHubInterface();
        this.setupEventListeners();
        this.startDataSync();
    },

    generateDataConnections() {
        this.dataConnections = {
            publicDataSources: [
                {
                    id: 'kosha',
                    name: '한국산업안전보건공단',
                    type: 'api',
                    status: 'connected',
                    lastSync: '2024-06-21 09:45:30',
                    dataTypes: ['산업재해통계', '유해위험기계목록', '안전보건법령'],
                    recordCount: 15420,
                    syncInterval: '실시간',
                    healthScore: 98
                },
                {
                    id: 'comwel',
                    name: '근로복지공단',
                    type: 'api',
                    status: 'connected',
                    lastSync: '2024-06-21 09:50:15',
                    dataTypes: ['산재보험정보', '요양승인데이터', '보험요율정보'],
                    recordCount: 23680,
                    syncInterval: '매시간',
                    healthScore: 95
                },
                {
                    id: 'moel',
                    name: '고용노동부',
                    type: 'api',
                    status: 'connected',
                    lastSync: '2024-06-21 09:30:22',
                    dataTypes: ['고용통계', '근로감독정보', '정책정보'],
                    recordCount: 8940,
                    syncInterval: '일 1회',
                    healthScore: 92
                },
                {
                    id: 'kma',
                    name: '기상청',
                    type: 'api',
                    status: 'connected',
                    lastSync: '2024-06-21 10:00:00',
                    dataTypes: ['날씨정보', '기상경보', '환경데이터'],
                    recordCount: 1250,
                    syncInterval: '10분',
                    healthScore: 99
                }
            ],
            internalSources: [
                {
                    id: 'erp',
                    name: 'ERP 시스템',
                    type: 'database',
                    status: 'connected',
                    lastSync: '2024-06-21 10:05:45',
                    dataTypes: ['직원정보', '부서별통계', '설비정보'],
                    recordCount: 5670,
                    syncInterval: '실시간',
                    healthScore: 97
                },
                {
                    id: 'iot',
                    name: 'IoT 센서 네트워크',
                    type: 'streaming',
                    status: 'connected',
                    lastSync: '2024-06-21 10:08:12',
                    dataTypes: ['온도센서', '습도센서', '진동센서', '가스센서'],
                    recordCount: 125000,
                    syncInterval: '실시간',
                    healthScore: 88
                },
                {
                    id: 'cctv',
                    name: 'CCTV 모니터링',
                    type: 'video',
                    status: 'connected',
                    lastSync: '2024-06-21 10:08:30',
                    dataTypes: ['영상데이터', 'AI분석결과', '이상행동감지'],
                    recordCount: 3400,
                    syncInterval: '실시간',
                    healthScore: 85
                }
            ],
            dataFlow: {
                totalIngested: 182360,
                processedToday: 8420,
                realTimeStreams: 4,
                batchJobs: 12,
                errorRate: 0.02,
                avgLatency: '125ms'
            },
            analytics: {
                totalQueries: 1547,
                popularDatasets: [
                    { name: '산업재해 통계', usage: 342 },
                    { name: 'IoT 센서 데이터', usage: 289 },
                    { name: '날씨 정보', usage: 156 },
                    { name: '산재보험 정보', usage: 134 }
                ],
                topUsers: [
                    { name: '김철수', queries: 89 },
                    { name: '이영희', queries: 67 },
                    { name: '박민수', queries: 45 }
                ]
            }
        };
    },

    renderDataHubInterface() {
        const content = document.getElementById('data-hub-content');
        content.innerHTML = this.generateDataHubHTML();
        
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    },

    generateDataHubHTML() {
        return `
            <!-- 데이터 플로우 개요 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card bg-gradient-info text-white">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <h4 class="mb-2">
                                        <i class="fas fa-stream me-2"></i>
                                        실시간 데이터 파이프라인 가동 중
                                    </h4>
                                    <p class="mb-0">
                                        ${this.dataConnections.publicDataSources.length + this.dataConnections.internalSources.length}개 데이터 소스에서 
                                        ${window.PrototypeUtils.formatNumber(this.dataConnections.dataFlow.totalIngested)}건의 데이터를 통합 처리하고 있습니다.
                                    </p>
                                </div>
                                <div class="col-lg-4 text-end">
                                    <div class="data-flow-status">
                                        <div class="h3 mb-1">${this.dataConnections.dataFlow.avgLatency}</div>
                                        <div class="small">평균 지연시간</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 데이터 소스 현황 -->
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-cloud me-2"></i>
                                공공데이터 연동 현황
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateDataSourceTable(this.dataConnections.publicDataSources)}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-server me-2"></i>
                                내부 시스템 연동 현황
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateDataSourceTable(this.dataConnections.internalSources)}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 데이터 플로우 통계 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-line me-2"></i>
                                데이터 처리 통계
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateDataFlowStats()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 데이터 품질 및 분석 -->
            <div class="row mb-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-area me-2"></i>
                                데이터 볼륨 추이
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="dataVolumeChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-shield-check me-2"></i>
                                데이터 품질 지표
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateDataQualityMetrics()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 인기 데이터셋 및 사용자 활동 -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-fire me-2"></i>
                                인기 데이터셋
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generatePopularDatasets()}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-users me-2"></i>
                                사용자 활동 현황
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateUserActivity()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateDataSourceTable(sources) {
        return `
            <div class="data-sources-list">
                ${sources.map(source => `
                    <div class="data-source-item mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <div class="d-flex align-items-center mb-2">
                                    <h6 class="mb-0 me-2">${source.name}</h6>
                                    <span class="badge bg-${this.getStatusColor(source.status)}">
                                        ${this.getStatusText(source.status)}
                                    </span>
                                </div>
                                <div class="data-source-details">
                                    <div class="mb-1">
                                        <small class="text-muted">데이터 타입:</small>
                                        <div class="mt-1">
                                            ${source.dataTypes.map(type => 
                                                `<span class="badge bg-light text-dark me-1">${type}</span>`
                                            ).join('')}
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <small class="text-muted">레코드 수:</small>
                                            <div class="fw-bold">${window.PrototypeUtils.formatNumber(source.recordCount)}</div>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">동기화:</small>
                                            <div class="fw-bold">${source.syncInterval}</div>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <small class="text-muted">마지막 동기화:</small>
                                        <div class="small">${source.lastSync}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-3 text-center">
                                <div class="health-score mb-2">
                                    <div class="h5 text-${this.getHealthScoreColor(source.healthScore)}">${source.healthScore}%</div>
                                    <small class="text-muted">건강도</small>
                                </div>
                                <button class="btn btn-outline-primary btn-sm" data-source="${source.id}">
                                    상세보기
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    generateDataFlowStats() {
        const flow = this.dataConnections.dataFlow;
        
        return `
            <div class="row">
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-primary">${window.PrototypeUtils.formatNumber(flow.totalIngested)}</div>
                        <div class="metric-label">총 수집 데이터</div>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-success">${window.PrototypeUtils.formatNumber(flow.processedToday)}</div>
                        <div class="metric-label">오늘 처리량</div>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-info">${flow.realTimeStreams}</div>
                        <div class="metric-label">실시간 스트림</div>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-warning">${flow.batchJobs}</div>
                        <div class="metric-label">배치 작업</div>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-success">${(100 - flow.errorRate * 100).toFixed(2)}%</div>
                        <div class="metric-label">성공률</div>
                    </div>
                </div>
                <div class="col-md-2 text-center">
                    <div class="metric-card">
                        <div class="metric-value text-primary">${flow.avgLatency}</div>
                        <div class="metric-label">평균 지연</div>
                    </div>
                </div>
            </div>
        `;
    },

    generateDataQualityMetrics() {
        const metrics = [
            { name: '완전성', value: 96.8, color: 'success' },
            { name: '정확성', value: 94.2, color: 'success' },
            { name: '일관성', value: 91.5, color: 'warning' },
            { name: '적시성', value: 98.7, color: 'success' },
            { name: '유효성', value: 93.1, color: 'info' }
        ];
        
        return metrics.map(metric => `
            <div class="quality-metric mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="fw-bold">${metric.name}</span>
                    <span class="text-${metric.color}">${metric.value}%</span>
                </div>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar bg-${metric.color}" style="width: ${metric.value}%"></div>
                </div>
            </div>
        `).join('');
    },

    generatePopularDatasets() {
        const datasets = this.dataConnections.analytics.popularDatasets;
        
        return `
            <div class="popular-datasets">
                ${datasets.map((dataset, index) => `
                    <div class="dataset-item d-flex align-items-center mb-3">
                        <div class="dataset-rank me-3">
                            <span class="badge bg-primary rounded-pill">${index + 1}</span>
                        </div>
                        <div class="flex-grow-1">
                            <div class="fw-bold">${dataset.name}</div>
                            <small class="text-muted">${dataset.usage}회 조회</small>
                        </div>
                        <div class="usage-bar">
                            <div class="progress" style="width: 100px; height: 4px;">
                                <div class="progress-bar" style="width: ${(dataset.usage / 350) * 100}%"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-3 text-center">
                <button class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-chart-bar me-1"></i>전체 통계 보기
                </button>
            </div>
        `;
    },

    generateUserActivity() {
        const users = this.dataConnections.analytics.topUsers;
        const totalQueries = this.dataConnections.analytics.totalQueries;
        
        return `
            <div class="user-activity">
                <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>총 쿼리 수</span>
                        <span class="h5 text-primary">${window.PrototypeUtils.formatNumber(totalQueries)}</span>
                    </div>
                </div>
                
                <hr>
                
                <h6>활성 사용자</h6>
                ${users.map((user, index) => `
                    <div class="user-item d-flex align-items-center mb-2">
                        <div class="user-avatar me-3">
                            <div class="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 32px; height: 32px; font-size: 0.8rem;">
                                ${user.name.charAt(0)}
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <div class="fw-bold">${user.name}</div>
                            <small class="text-muted">${user.queries}회 쿼리</small>
                        </div>
                        <div class="user-badge">
                            <span class="badge bg-light text-dark">#${index + 1}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-3 text-center">
                <button class="btn btn-outline-primary btn-sm">
                    <i class="fas fa-users me-1"></i>사용자 관리
                </button>
            </div>
        `;
    },

    getStatusColor(status) {
        const colors = {
            'connected': 'success',
            'disconnected': 'danger',
            'warning': 'warning',
            'syncing': 'info'
        };
        return colors[status] || 'secondary';
    },

    getStatusText(status) {
        const texts = {
            'connected': '연결됨',
            'disconnected': '연결안됨',
            'warning': '경고',
            'syncing': '동기화중'
        };
        return texts[status] || '알수없음';
    },

    getHealthScoreColor(score) {
        if (score >= 95) return 'success';
        if (score >= 85) return 'warning';
        return 'danger';
    },

    initializeCharts() {
        this.createDataVolumeChart();
    },

    createDataVolumeChart() {
        const ctx = document.getElementById('dataVolumeChart');
        if (!ctx) return;

        // 7일간의 데이터 볼륨 데이터 생성
        const data = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            data.push({
                date: date.toISOString().split('T')[0],
                publicData: Math.floor(Math.random() * 5000) + 10000,
                internalData: Math.floor(Math.random() * 3000) + 5000,
                iotData: Math.floor(Math.random() * 10000) + 20000
            });
        }
        
        this.charts.dataVolume = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: '공공데이터',
                        data: data.map(d => d.publicData),
                        borderColor: '#1e88e5',
                        backgroundColor: 'rgba(30, 136, 229, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: '내부시스템',
                        data: data.map(d => d.internalData),
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'IoT센서',
                        data: data.map(d => d.iotData),
                        borderColor: '#ff9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '데이터 볼륨 (건)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '날짜'
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

    setupEventListeners() {
        // 데이터 소스 상세보기
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-source]')) {
                const sourceId = e.target.closest('[data-source]').getAttribute('data-source');
                this.showSourceDetails(sourceId);
            }
        });
    },

    showSourceDetails(sourceId) {
        // 공공데이터와 내부데이터에서 소스 찾기
        const allSources = [...this.dataConnections.publicDataSources, ...this.dataConnections.internalSources];
        const source = allSources.find(s => s.id === sourceId);
        
        if (!source) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${source.name} 상세 정보</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${this.generateSourceDetailHTML(source)}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary">연결 테스트</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    generateSourceDetailHTML(source) {
        return `
            <div class="source-details">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>연결 정보</h6>
                        <ul class="list-unstyled">
                            <li><strong>타입:</strong> ${source.type}</li>
                            <li><strong>상태:</strong> 
                                <span class="badge bg-${this.getStatusColor(source.status)}">
                                    ${this.getStatusText(source.status)}
                                </span>
                            </li>
                            <li><strong>동기화 주기:</strong> ${source.syncInterval}</li>
                            <li><strong>마지막 동기화:</strong> ${source.lastSync}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h6>데이터 현황</h6>
                        <ul class="list-unstyled">
                            <li><strong>총 레코드:</strong> ${window.PrototypeUtils.formatNumber(source.recordCount)}</li>
                            <li><strong>건강도:</strong> 
                                <span class="text-${this.getHealthScoreColor(source.healthScore)}">${source.healthScore}%</span>
                            </li>
                            <li><strong>데이터 품질:</strong> 우수</li>
                        </ul>
                    </div>
                </div>
                
                <div class="mb-4">
                    <h6>제공 데이터 타입</h6>
                    <div class="data-types">
                        ${source.dataTypes.map(type => 
                            `<span class="badge bg-primary me-2 mb-2">${type}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>API 활용 정보:</strong> 이 데이터 소스는 실시간 API를 통해 연동되어 
                    최신 정보를 자동으로 수집하고 있습니다.
                </div>
            </div>
        `;
    },

    startDataSync() {
        // 실시간 데이터 동기화 시뮬레이션
        this.updateInterval = setInterval(() => {
            if (window.SafetyPlatform.currentModule === 'data-hub') {
                this.updateDataMetrics();
            }
        }, 30000); // 30초마다 업데이트
    },

    updateDataMetrics() {
        // 데이터 플로우 메트릭 업데이트
        const flow = this.dataConnections.dataFlow;
        
        flow.processedToday += Math.floor(Math.random() * 50) + 10;
        flow.totalIngested += Math.floor(Math.random() * 100) + 20;
        
        // UI 업데이트
        const processedElement = document.querySelector('.metric-card .metric-value:contains("' + flow.processedToday + '")');
        if (processedElement) {
            processedElement.textContent = window.PrototypeUtils.formatNumber(flow.processedToday);
        }
    },

    destroy() {
        // 인터벌 정리
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // 차트 정리
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
};
