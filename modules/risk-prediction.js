// 스마트 위험 예측 엔진 모듈
window.RiskPredictionModule = {
    charts: {},
    predictionData: null,
    updateInterval: null,

    init() {
        this.generatePredictionData();
        this.renderPredictionInterface();
        this.setupEventListeners();
        this.startPredictionEngine();
    },

    generatePredictionData() {
        this.predictionData = {
            currentAnalysis: {
                timestamp: new Date(),
                overallRisk: Math.floor(Math.random() * 30) + 20, // 20-50%
                analyzedFactors: 847,
                dataPoints: 15420,
                accuracy: 94.7
            },
            riskFactors: [
                {
                    area: '전기설비',
                    currentRisk: 35,
                    predictedRisk: 58,
                    trend: 'increasing',
                    factors: ['습도 증가', '절연체 노화', '과부하 위험'],
                    recommendation: '즉시 절연 상태 점검 및 습도 관리 강화 필요',
                    urgency: 'high',
                    impact: 85
                },
                {
                    area: '기계장치',
                    currentRisk: 22,
                    predictedRisk: 19,
                    trend: 'decreasing',
                    factors: ['정기 점검 완료', '윤활 상태 양호'],
                    recommendation: '현재 관리 수준 유지',
                    urgency: 'low',
                    impact: 45
                },
                {
                    area: '화학물질',
                    currentRisk: 41,
                    predictedRisk: 73,
                    trend: 'critical',
                    factors: ['환기 시설 이상', '보관온도 상승', '유효기간 임박'],
                    recommendation: '긴급 환기 점검 및 보관 환경 개선 필요',
                    urgency: 'critical',
                    impact: 92
                },
                {
                    area: '작업환경',
                    currentRisk: 28,
                    predictedRisk: 31,
                    trend: 'stable',
                    factors: ['조도 적정', '소음 수준 보통'],
                    recommendation: '지속적인 모니터링 권장',
                    urgency: 'medium',
                    impact: 38
                },
                {
                    area: '개인보호구',
                    currentRisk: 15,
                    predictedRisk: 12,
                    trend: 'improving',
                    factors: ['착용률 증가', '교육 효과 확인'],
                    recommendation: '우수 사례로 타 부서 확산 검토',
                    urgency: 'low',
                    impact: 25
                }
            ],
            historicalData: this.generateHistoricalData(),
            weatherImpact: {
                temperature: 23,
                humidity: 67,
                weather: '흐림',
                riskModifier: 1.15,
                advice: '습도 상승으로 전기설비 위험 증가 예상'
            }
        };
    },

    generateHistoricalData() {
        const data = [];
        const today = new Date();
        
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            data.push({
                date: date.toISOString().split('T')[0],
                overallRisk: Math.floor(Math.random() * 40) + 20,
                electrical: Math.floor(Math.random() * 30) + 20,
                mechanical: Math.floor(Math.random() * 25) + 15,
                chemical: Math.floor(Math.random() * 35) + 25,
                environmental: Math.floor(Math.random() * 20) + 20,
                ppe: Math.floor(Math.random() * 15) + 10
            });
        }
        
        return data;
    },

    renderPredictionInterface() {
        const content = document.getElementById('risk-prediction-content');
        content.innerHTML = this.generatePredictionHTML();
        
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    },

    generatePredictionHTML() {
        const data = this.predictionData;
        
        return `
            <!-- AI 분석 현황 헤더 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card bg-gradient-primary text-white">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <h4 class="mb-2">
                                        <i class="fas fa-brain me-2"></i>
                                        AI 위험 예측 엔진 가동 중
                                    </h4>
                                    <p class="mb-0">
                                        실시간으로 ${window.PrototypeUtils.formatNumber(data.currentAnalysis.dataPoints)}개의 데이터 포인트를 분석하여 
                                        ${data.currentAnalysis.analyzedFactors}개 위험 요소를 평가합니다.
                                    </p>
                                </div>
                                <div class="col-lg-4 text-end">
                                    <div class="prediction-status">
                                        <div class="h3 mb-1">${data.currentAnalysis.accuracy}%</div>
                                        <div class="small">예측 정확도</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 종합 위험도 및 날씨 영향 -->
            <div class="row mb-4">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-area me-2"></i>
                                종합 위험도 트렌드 (30일)
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <canvas id="riskTrendChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-cloud-sun me-2"></i>
                                날씨 영향 분석
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateWeatherImpact()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 위험 요소별 상세 분석 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                위험 요소별 예측 분석
                            </h5>
                            <button class="btn btn-outline-primary btn-sm" id="refreshPredictions">
                                <i class="fas fa-sync-alt me-1"></i>재분석
                            </button>
                        </div>
                        <div class="card-body">
                            ${this.generateRiskFactorsTable()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI 예측 상세 정보 -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-robot me-2"></i>
                                AI 모델 정보
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateAIModelInfo()}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-lightbulb me-2"></i>
                                예측 기반 권장사항
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateRecommendations()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateWeatherImpact() {
        const weather = this.predictionData.weatherImpact;
        
        return `
            <div class="weather-info mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>현재 기온</span>
                    <strong>${weather.temperature}°C</strong>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>습도</span>
                    <strong>${weather.humidity}%</strong>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span>날씨</span>
                    <strong>${weather.weather}</strong>
                </div>
            </div>
            
            <div class="alert alert-warning">
                <i class="fas fa-info-circle me-2"></i>
                <strong>위험도 영향:</strong><br>
                ${weather.advice}
                <div class="mt-2">
                    <span class="badge bg-warning">위험도 +${Math.round((weather.riskModifier - 1) * 100)}%</span>
                </div>
            </div>
        `;
    },

    generateRiskFactorsTable() {
        const factors = this.predictionData.riskFactors;
        
        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>위험 영역</th>
                            <th>현재</th>
                            <th>예측</th>
                            <th>추세</th>
                            <th>영향도</th>
                            <th>긴급도</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${factors.map(factor => `
                            <tr>
                                <td>
                                    <strong>${factor.area}</strong>
                                </td>
                                <td>
                                    <span class="risk-level ${this.getRiskClass(factor.currentRisk)}">
                                        ${factor.currentRisk}%
                                    </span>
                                </td>
                                <td>
                                    <span class="risk-level ${this.getRiskClass(factor.predictedRisk)}">
                                        ${factor.predictedRisk}%
                                    </span>
                                </td>
                                <td>
                                    <i class="fas fa-${this.getTrendIcon(factor.trend)} text-${this.getTrendColor(factor.trend)}"></i>
                                    <span class="ms-1">${this.getTrendText(factor.trend)}</span>
                                </td>
                                <td>
                                    <div class="progress" style="height: 20px;">
                                        <div class="progress-bar bg-${this.getImpactColor(factor.impact)}" 
                                             style="width: ${factor.impact}%">
                                            ${factor.impact}%
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge bg-${this.getUrgencyColor(factor.urgency)}">
                                        ${this.getUrgencyText(factor.urgency)}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary view-details" 
                                            data-area="${factor.area}">
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    generateAIModelInfo() {
        return `
            <div class="ai-model-info">
                <div class="mb-3">
                    <h6><i class="fas fa-database me-2"></i>훈련 데이터셋</h6>
                    <ul class="list-unstyled ms-3">
                        <li>• 근로복지공단 산재보험 데이터 (5년간)</li>
                        <li>• 한국산업안전보건공단 사고사례 (3년간)</li>
                        <li>• 기상청 날씨 데이터 연계</li>
                        <li>• 자체 수집 센서 데이터</li>
                    </ul>
                </div>
                
                <div class="mb-3">
                    <h6><i class="fas fa-cog me-2"></i>모델 성능</h6>
                    <div class="row">
                        <div class="col-6">
                            <div class="text-center">
                                <div class="h4 text-success">94.7%</div>
                                <small>예측 정확도</small>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-center">
                                <div class="h4 text-info">87.2%</div>
                                <small>조기 감지율</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    <strong>실시간 학습:</strong> 새로운 데이터가 수집될 때마다 
                    모델이 자동으로 업데이트되어 예측 정확도가 지속적으로 향상됩니다.
                </div>
            </div>
        `;
    },

    generateRecommendations() {
        const factors = this.predictionData.riskFactors;
        const highRiskFactors = factors.filter(f => f.urgency === 'critical' || f.urgency === 'high');
        
        return `
            <div class="recommendations">
                ${highRiskFactors.map((factor, index) => `
                    <div class="recommendation-item mb-3 p-3 border rounded">
                        <div class="d-flex align-items-start">
                            <div class="me-3">
                                <span class="badge bg-${this.getUrgencyColor(factor.urgency)} rounded-pill">
                                    ${index + 1}
                                </span>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-2">${factor.area}</h6>
                                <p class="mb-2">${factor.recommendation}</p>
                                <div class="small text-muted">
                                    <strong>주요 요인:</strong> ${factor.factors.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
                
                <div class="text-center mt-3">
                    <button class="btn btn-primary" id="generateDetailedReport">
                        <i class="fas fa-file-alt me-2"></i>
                        상세 분석 보고서 생성
                    </button>
                </div>
            </div>
        `;
    },

    getRiskClass(risk) {
        if (risk >= 70) return 'critical';
        if (risk >= 50) return 'high';
        if (risk >= 30) return 'medium';
        return 'low';
    },

    getTrendIcon(trend) {
        const icons = {
            'increasing': 'arrow-up',
            'decreasing': 'arrow-down',
            'stable': 'minus',
            'critical': 'exclamation-triangle',
            'improving': 'arrow-down'
        };
        return icons[trend] || 'minus';
    },

    getTrendColor(trend) {
        const colors = {
            'increasing': 'danger',
            'decreasing': 'success',
            'stable': 'warning',
            'critical': 'danger',
            'improving': 'success'
        };
        return colors[trend] || 'secondary';
    },

    getTrendText(trend) {
        const texts = {
            'increasing': '상승',
            'decreasing': '하락',
            'stable': '안정',
            'critical': '위험',
            'improving': '개선'
        };
        return texts[trend] || '알수없음';
    },

    getUrgencyColor(urgency) {
        const colors = {
            'low': 'success',
            'medium': 'warning',
            'high': 'danger',
            'critical': 'dark'
        };
        return colors[urgency] || 'secondary';
    },

    getUrgencyText(urgency) {
        const texts = {
            'low': '낮음',
            'medium': '보통',
            'high': '높음',
            'critical': '긴급'
        };
        return texts[urgency] || '알수없음';
    },

    getImpactColor(impact) {
        if (impact >= 80) return 'danger';
        if (impact >= 60) return 'warning';
        if (impact >= 40) return 'info';
        return 'success';
    },

    initializeCharts() {
        this.createRiskTrendChart();
    },

    createRiskTrendChart() {
        const ctx = document.getElementById('riskTrendChart');
        if (!ctx) return;

        const data = this.predictionData.historicalData;
        
        this.charts.riskTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.date),
                datasets: [
                    {
                        label: '종합 위험도',
                        data: data.map(d => d.overallRisk),
                        borderColor: '#1e88e5',
                        backgroundColor: 'rgba(30, 136, 229, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 3
                    },
                    {
                        label: '전기설비',
                        data: data.map(d => d.electrical),
                        borderColor: '#f44336',
                        tension: 0.4
                    },
                    {
                        label: '화학물질',
                        data: data.map(d => d.chemical),
                        borderColor: '#ff9800',
                        tension: 0.4
                    },
                    {
                        label: '기계장치',
                        data: data.map(d => d.mechanical),
                        borderColor: '#4caf50',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: '위험도 (%)'
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
        // 재분석 버튼
        document.addEventListener('click', (e) => {
            if (e.target.closest('#refreshPredictions')) {
                this.runPredictionAnalysis();
            }
            
            if (e.target.closest('.view-details')) {
                const area = e.target.closest('.view-details').getAttribute('data-area');
                this.showAreaDetails(area);
            }
            
            if (e.target.closest('#generateDetailedReport')) {
                this.generateDetailedReport();
            }
        });
    },

    runPredictionAnalysis() {
        const button = document.getElementById('refreshPredictions');
        const originalHTML = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>분석중...';
        button.disabled = true;
        
        // 분석 시뮬레이션
        setTimeout(() => {
            this.generatePredictionData();
            this.renderPredictionInterface();
            
            window.SafetyPlatform.showNotification(
                'AI 예측 분석이 완료되었습니다.', 
                'success'
            );
            
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 3000);
    },

    showAreaDetails(area) {
        const factor = this.predictionData.riskFactors.find(f => f.area === area);
        if (!factor) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${area} 위험 분석 상세</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>현재 상태</h6>
                                <p>위험도: <span class="risk-level ${this.getRiskClass(factor.currentRisk)}">${factor.currentRisk}%</span></p>
                                <p>예측 위험도: <span class="risk-level ${this.getRiskClass(factor.predictedRisk)}">${factor.predictedRisk}%</span></p>
                                <p>추세: <i class="fas fa-${this.getTrendIcon(factor.trend)} text-${this.getTrendColor(factor.trend)}"></i> ${this.getTrendText(factor.trend)}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>위험 요인</h6>
                                <ul>
                                    ${factor.factors.map(f => `<li>${f}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <hr>
                        <h6>AI 권장사항</h6>
                        <p>${factor.recommendation}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary">점검 스케줄 등록</button>
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

    generateDetailedReport() {
        window.SafetyPlatform.showNotification(
            'AI 예측 분석 보고서 생성을 시작합니다...', 
            'info'
        );
        
        setTimeout(() => {
            window.SafetyPlatform.showNotification(
                '상세 분석 보고서가 성공적으로 생성되었습니다.', 
                'success'
            );
        }, 2500);
    },

    startPredictionEngine() {
        // 실시간 예측 업데이트 시뮬레이션
        this.updateInterval = setInterval(() => {
            if (window.SafetyPlatform.currentModule === 'risk-prediction') {
                this.updatePredictions();
            }
        }, 60000); // 1분마다 업데이트
    },

    updatePredictions() {
        // 예측 데이터 미세 조정
        this.predictionData.riskFactors.forEach(factor => {
            const variation = (Math.random() - 0.5) * 4; // ±2% 변동
            factor.predictedRisk = Math.max(0, Math.min(100, factor.predictedRisk + variation));
        });

        // UI 업데이트 (현재 모듈이 활성화된 경우에만)
        const activeModule = document.getElementById('risk-prediction-module');
        if (activeModule && activeModule.classList.contains('active')) {
            const riskCells = document.querySelectorAll('.risk-level');
            riskCells.forEach((cell, index) => {
                if (index < this.predictionData.riskFactors.length) {
                    const newRisk = Math.round(this.predictionData.riskFactors[index].predictedRisk);
                    cell.textContent = `${newRisk}%`;
                    cell.className = `risk-level ${this.getRiskClass(newRisk)}`;
                }
            });
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
