// 모바일 안전 점검 도구 모듈
window.MobileInspectionModule = {
    currentInspection: null,
    qrScannerActive: false,
    equipmentDatabase: null,

    init() {
        this.initializeEquipmentDatabase();
        this.renderMobileInterface();
        this.setupEventListeners();
    },

    initializeEquipmentDatabase() {
        this.equipmentDatabase = {
            'QR001': {
                id: 'QR001',
                name: '전기 배전반 #1',
                location: '제조동 1층 서쪽',
                type: '전기설비',
                installDate: '2022-03-15',
                lastInspection: '2024-06-18',
                nextInspection: '2024-06-25',
                status: 'normal',
                riskLevel: 'medium',
                checkpoints: [
                    { id: 1, item: '절연체 상태 확인', required: true, lastCheck: 'pass' },
                    { id: 2, item: '접지선 연결 상태', required: true, lastCheck: 'pass' },
                    { id: 3, item: '외관 손상 여부', required: true, lastCheck: 'pass' },
                    { id: 4, item: '온도 이상 유무', required: true, lastCheck: 'fail' },
                    { id: 5, item: '누전차단기 동작', required: true, lastCheck: 'pass' }
                ],
                maintenanceHistory: [
                    { date: '2024-06-15', type: '정기점검', result: '이상없음', inspector: '김철수' },
                    { date: '2024-05-20', type: '긴급수리', result: '절연체 교체', inspector: '박영희' }
                ],
                specifications: {
                    voltage: '440V',
                    current: '200A',
                    manufacturer: '한국전기',
                    model: 'KE-2024'
                }
            },
            'QR002': {
                id: 'QR002',
                name: '공작기계 #5',
                location: '제조동 2층 중앙',
                type: '기계장치',
                installDate: '2021-08-10',
                lastInspection: '2024-06-20',
                nextInspection: '2024-07-05',
                status: 'warning',
                riskLevel: 'high',
                checkpoints: [
                    { id: 1, item: '안전장치 동작 확인', required: true, lastCheck: 'pass' },
                    { id: 2, item: '윤활 상태 점검', required: true, lastCheck: 'fail' },
                    { id: 3, item: '이상 진동 여부', required: true, lastCheck: 'warning' },
                    { id: 4, item: '비상정지 버튼 테스트', required: true, lastCheck: 'pass' },
                    { id: 5, item: '보호구 착용 확인', required: true, lastCheck: 'pass' }
                ],
                maintenanceHistory: [
                    { date: '2024-06-20', type: '정기점검', result: '윤활 필요', inspector: '이민수' },
                    { date: '2024-06-01', type: '예방정비', result: '벨트 교체', inspector: '김철수' }
                ],
                specifications: {
                    power: '15kW',
                    rpm: '1800',
                    manufacturer: '대한기계',
                    model: 'DH-1500'
                }
            },
            'QR003': {
                id: 'QR003',
                name: '화학물질 보관고 A',
                location: '화학동 1층 북쪽',
                type: '화학물질',
                installDate: '2023-01-20',
                lastInspection: '2024-06-19',
                nextInspection: '2024-06-22',
                status: 'critical',
                riskLevel: 'critical',
                checkpoints: [
                    { id: 1, item: '환기 시설 동작', required: true, lastCheck: 'fail' },
                    { id: 2, item: '온도 관리 상태', required: true, lastCheck: 'warning' },
                    { id: 3, item: '누출 감지 센서', required: true, lastCheck: 'pass' },
                    { id: 4, item: 'MSDS 비치 확인', required: true, lastCheck: 'pass' },
                    { id: 5, item: '비상세척 시설', required: true, lastCheck: 'pass' }
                ],
                maintenanceHistory: [
                    { date: '2024-06-19', type: '긴급점검', result: '환기팬 고장', inspector: '최수진' },
                    { date: '2024-06-10', type: '정기점검', result: '이상없음', inspector: '박민호' }
                ],
                specifications: {
                    capacity: '500L',
                    ventilation: '50CMH',
                    manufacturer: '안전화학',
                    model: 'SC-500'
                }
            }
        };
    },

    renderMobileInterface() {
        const content = document.getElementById('mobile-inspection-content');
        content.innerHTML = this.generateMobileHTML();
    },

    generateMobileHTML() {
        return `
            <div class="mobile-inspection-container">
                <!-- QR 스캔 섹션 -->
                <div class="row mb-4">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header bg-primary text-white">
                                <h5 class="mb-0">
                                    <i class="fas fa-qrcode me-2"></i>
                                    QR코드 스캔 점검
                                </h5>
                            </div>
                            <div class="card-body">
                                <div id="qr-scanner-area" class="qr-scanner text-center">
                                    <i class="fas fa-qrcode fa-3x text-muted mb-3"></i>
                                    <h6>QR코드를 스캔하여 점검을 시작하세요</h6>
                                    <p class="text-muted">설비에 부착된 QR코드를 스캔하면<br>해당 설비의 점검 항목이 자동으로 표시됩니다</p>
                                    <button class="btn btn-primary" id="start-qr-scan">
                                        <i class="fas fa-camera me-2"></i>QR 스캔 시작
                                    </button>
                                </div>
                                
                                <!-- 빠른 점검 버튼들 -->
                                <div class="mt-4">
                                    <h6>빠른 점검</h6>
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-outline-primary quick-check-btn" data-qr="QR001">
                                            <i class="fas fa-bolt me-2"></i>전기 배전반 #1
                                        </button>
                                        <button class="btn btn-outline-warning quick-check-btn" data-qr="QR002">
                                            <i class="fas fa-cog me-2"></i>공작기계 #5
                                        </button>
                                        <button class="btn btn-outline-danger quick-check-btn" data-qr="QR003">
                                            <i class="fas fa-flask me-2"></i>화학물질 보관고 A
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <i class="fas fa-list me-2"></i>
                                    오늘의 점검 일정
                                </h5>
                            </div>
                            <div class="card-body">
                                ${this.generateTodayInspections()}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 점검 인터페이스 (QR 스캔 후 표시) -->
                <div id="inspection-interface" class="inspection-interface" style="display: none;">
                    <!-- 여기에 점검 인터페이스가 동적으로 로드됩니다 -->
                </div>

                <!-- 점검 통계 -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <i class="fas fa-chart-bar me-2"></i>
                                    점검 현황 통계
                                </h5>
                            </div>
                            <div class="card-body">
                                ${this.generateInspectionStats()}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 점검 이력 -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <i class="fas fa-history me-2"></i>
                                    최근 점검 이력
                                </h5>
                            </div>
                            <div class="card-body">
                                ${this.generateInspectionHistory()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateTodayInspections() {
        const inspections = [
            { time: '09:00', equipment: '전기 배전반 #1', status: 'completed', type: 'routine' },
            { time: '11:00', equipment: '공작기계 #5', status: 'pending', type: 'urgent' },
            { time: '14:00', equipment: '화학물질 보관고 A', status: 'pending', type: 'critical' },
            { time: '16:00', equipment: '크레인 #2', status: 'scheduled', type: 'routine' }
        ];

        return inspections.map(inspection => `
            <div class="inspection-schedule-item d-flex align-items-center mb-3 p-2 border rounded">
                <div class="me-3">
                    <span class="badge ${this.getStatusBadgeClass(inspection.status)}">
                        ${inspection.time}
                    </span>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold">${inspection.equipment}</div>
                    <small class="text-muted">${this.getInspectionTypeText(inspection.type)}</small>
                </div>
                <div>
                    <i class="fas fa-${this.getStatusIcon(inspection.status)} text-${this.getStatusColor(inspection.status)}"></i>
                </div>
            </div>
        `).join('');
    },

    generateInspectionStats() {
        return `
            <div class="row">
                <div class="col-md-3 text-center">
                    <div class="stat-item">
                        <div class="h3 text-success">87%</div>
                        <div class="text-muted">완료율</div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-item">
                        <div class="h3 text-primary">24</div>
                        <div class="text-muted">오늘 점검</div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-item">
                        <div class="h3 text-warning">3</div>
                        <div class="text-muted">이상 발견</div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-item">
                        <div class="h3 text-info">156</div>
                        <div class="text-muted">이번 주</div>
                    </div>
                </div>
            </div>
        `;
    },

    generateInspectionHistory() {
        const history = [
            { date: '2024-06-21 09:15', equipment: '전기 배전반 #1', inspector: '김철수', result: 'pass', issues: 0 },
            { date: '2024-06-21 08:45', equipment: '크레인 #2', inspector: '이영희', result: 'warning', issues: 1 },
            { date: '2024-06-20 16:30', equipment: '화학물질 보관고 A', inspector: '최수진', result: 'fail', issues: 2 },
            { date: '2024-06-20 14:20', equipment: '공작기계 #5', inspector: '박민수', result: 'pass', issues: 0 },
            { date: '2024-06-20 11:10', equipment: '압축기 #3', inspector: '김철수', result: 'warning', issues: 1 }
        ];

        return `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>일시</th>
                            <th>설비명</th>
                            <th>점검자</th>
                            <th>결과</th>
                            <th>이슈</th>
                            <th>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${history.map(item => `
                            <tr>
                                <td>${item.date}</td>
                                <td>${item.equipment}</td>
                                <td>${item.inspector}</td>
                                <td>
                                    <span class="badge bg-${this.getResultColor(item.result)}">
                                        ${this.getResultText(item.result)}
                                    </span>
                                </td>
                                <td>
                                    ${item.issues > 0 ? 
                                        `<span class="text-warning">${item.issues}건</span>` : 
                                        '<span class="text-success">없음</span>'
                                    }
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary view-inspection-detail" 
                                            data-date="${item.date}" data-equipment="${item.equipment}">
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

    getStatusBadgeClass(status) {
        const classes = {
            'completed': 'bg-success',
            'pending': 'bg-warning',
            'scheduled': 'bg-info',
            'overdue': 'bg-danger'
        };
        return classes[status] || 'bg-secondary';
    },

    getStatusIcon(status) {
        const icons = {
            'completed': 'check',
            'pending': 'clock',
            'scheduled': 'calendar',
            'overdue': 'exclamation-triangle'
        };
        return icons[status] || 'question';
    },

    getStatusColor(status) {
        const colors = {
            'completed': 'success',
            'pending': 'warning',
            'scheduled': 'info',
            'overdue': 'danger'
        };
        return colors[status] || 'secondary';
    },

    getInspectionTypeText(type) {
        const texts = {
            'routine': '정기 점검',
            'urgent': '긴급 점검',
            'critical': '특별 점검',
            'maintenance': '보수 점검'
        };
        return texts[type] || '일반 점검';
    },

    getResultColor(result) {
        const colors = {
            'pass': 'success',
            'warning': 'warning',
            'fail': 'danger'
        };
        return colors[result] || 'secondary';
    },

    getResultText(result) {
        const texts = {
            'pass': '양호',
            'warning': '주의',
            'fail': '불량'
        };
        return texts[result] || '알수없음';
    },

    setupEventListeners() {
        // QR 스캔 시작 버튼
        document.addEventListener('click', (e) => {
            if (e.target.closest('#start-qr-scan')) {
                this.startQRScan();
            }
            
            if (e.target.closest('.quick-check-btn')) {
                const qrCode = e.target.closest('.quick-check-btn').getAttribute('data-qr');
                this.simulateQRScan(qrCode);
            }
            
            if (e.target.closest('.view-inspection-detail')) {
                const date = e.target.closest('.view-inspection-detail').getAttribute('data-date');
                const equipment = e.target.closest('.view-inspection-detail').getAttribute('data-equipment');
                this.showInspectionDetail(date, equipment);
            }
        });
    },

    startQRScan() {
        const scannerArea = document.getElementById('qr-scanner-area');
        const startButton = document.getElementById('start-qr-scan');
        
        // QR 스캔 UI 변경
        scannerArea.classList.add('scanning');
        scannerArea.innerHTML = `
            <div class="qr-scanning-animation">
                <i class="fas fa-camera fa-3x text-primary mb-3"></i>
                <h6>QR코드를 카메라에 비춰주세요</h6>
                <div class="scanning-line"></div>
                <div class="mt-3">
                    <button class="btn btn-secondary" id="cancel-scan">취소</button>
                    <button class="btn btn-success ms-2" id="simulate-scan">스캔 시뮬레이션</button>
                </div>
            </div>
        `;

        // 3초 후 자동으로 QR001 스캔 시뮬레이션
        setTimeout(() => {
            if (this.qrScannerActive) {
                this.simulateQRScan('QR001');
            }
        }, 3000);

        this.qrScannerActive = true;

        // 스캔 시뮬레이션 버튼 이벤트
        document.getElementById('simulate-scan').addEventListener('click', () => {
            this.simulateQRScan('QR001');
        });

        // 취소 버튼 이벤트
        document.getElementById('cancel-scan').addEventListener('click', () => {
            this.cancelQRScan();
        });
    },

    simulateQRScan(qrCode) {
        this.qrScannerActive = false;
        const equipment = this.equipmentDatabase[qrCode];
        
        if (!equipment) {
            window.SafetyPlatform.showNotification('인식되지 않는 QR코드입니다.', 'warning');
            this.resetQRScanner();
            return;
        }

        window.SafetyPlatform.showNotification(
            `${equipment.name} QR코드가 인식되었습니다.`, 
            'success'
        );

        this.loadInspectionInterface(equipment);
    },

    cancelQRScan() {
        this.qrScannerActive = false;
        this.resetQRScanner();
    },

    resetQRScanner() {
        const scannerArea = document.getElementById('qr-scanner-area');
        scannerArea.classList.remove('scanning');
        scannerArea.innerHTML = `
            <i class="fas fa-qrcode fa-3x text-muted mb-3"></i>
            <h6>QR코드를 스캔하여 점검을 시작하세요</h6>
            <p class="text-muted">설비에 부착된 QR코드를 스캔하면<br>해당 설비의 점검 항목이 자동으로 표시됩니다</p>
            <button class="btn btn-primary" id="start-qr-scan">
                <i class="fas fa-camera me-2"></i>QR 스캔 시작
            </button>
        `;
    },

    loadInspectionInterface(equipment) {
        this.currentInspection = {
            equipment: equipment,
            startTime: new Date(),
            inspector: '김철수',
            checkResults: {}
        };

        const interfaceContainer = document.getElementById('inspection-interface');
        interfaceContainer.style.display = 'block';
        interfaceContainer.innerHTML = this.generateInspectionInterfaceHTML(equipment);

        // 스크롤 애니메이션
        interfaceContainer.scrollIntoView({ behavior: 'smooth' });
    },

    generateInspectionInterfaceHTML(equipment) {
        return `
            <div class="card border-primary">
                <div class="card-header bg-primary text-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">
                            <i class="fas fa-clipboard-check me-2"></i>
                            ${equipment.name} 안전 점검
                        </h5>
                        <span class="badge bg-${this.getRiskBadgeColor(equipment.riskLevel)}">
                            ${this.getRiskLevelText(equipment.riskLevel)}
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <!-- 설비 정보 -->
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <h6><i class="fas fa-info-circle me-2"></i>설비 정보</h6>
                            <ul class="list-unstyled">
                                <li><strong>위치:</strong> ${equipment.location}</li>
                                <li><strong>타입:</strong> ${equipment.type}</li>
                                <li><strong>마지막 점검:</strong> ${equipment.lastInspection}</li>
                                <li><strong>다음 점검:</strong> ${equipment.nextInspection}</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6><i class="fas fa-wrench me-2"></i>사양 정보</h6>
                            <ul class="list-unstyled">
                                ${Object.entries(equipment.specifications).map(([key, value]) => 
                                    `<li><strong>${key}:</strong> ${value}</li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- 점검 항목 -->
                    <div class="inspection-checklist">
                        <h6><i class="fas fa-list-check me-2"></i>점검 항목</h6>
                        <div class="checklist-container">
                            ${equipment.checkpoints.map((checkpoint, index) => `
                                <div class="checklist-item mb-3 p-3 border rounded">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div class="flex-grow-1">
                                            <div class="fw-bold mb-2">
                                                ${checkpoint.item}
                                                ${checkpoint.required ? '<span class="text-danger">*</span>' : ''}
                                            </div>
                                            <div class="btn-group" role="group">
                                                <input type="radio" class="btn-check" name="check_${checkpoint.id}" 
                                                       id="pass_${checkpoint.id}" value="pass">
                                                <label class="btn btn-outline-success" for="pass_${checkpoint.id}">
                                                    <i class="fas fa-check me-1"></i>양호
                                                </label>
                                                
                                                <input type="radio" class="btn-check" name="check_${checkpoint.id}" 
                                                       id="warning_${checkpoint.id}" value="warning">
                                                <label class="btn btn-outline-warning" for="warning_${checkpoint.id}">
                                                    <i class="fas fa-exclamation-triangle me-1"></i>주의
                                                </label>
                                                
                                                <input type="radio" class="btn-check" name="check_${checkpoint.id}" 
                                                       id="fail_${checkpoint.id}" value="fail">
                                                <label class="btn btn-outline-danger" for="fail_${checkpoint.id}">
                                                    <i class="fas fa-times me-1"></i>불량
                                                </label>
                                            </div>
                                        </div>
                                        <div class="ms-3">
                                            <small class="text-muted">
                                                이전: <span class="badge bg-${this.getResultColor(checkpoint.lastCheck)}">
                                                    ${this.getResultText(checkpoint.lastCheck)}
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <textarea class="form-control form-control-sm" 
                                                  placeholder="특이사항이나 상세 내용을 입력하세요..."
                                                  id="notes_${checkpoint.id}" rows="2"></textarea>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 종합 평가 -->
                    <div class="inspection-summary mt-4">
                        <h6><i class="fas fa-clipboard-list me-2"></i>종합 평가</h6>
                        <div class="row">
                            <div class="col-md-6">
                                <label class="form-label">전체 평가</label>
                                <select class="form-select" id="overall-rating">
                                    <option value="">평가를 선택하세요</option>
                                    <option value="excellent">매우 양호</option>
                                    <option value="good">양호</option>
                                    <option value="fair">보통</option>
                                    <option value="poor">불량</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">다음 점검 권장일</label>
                                <input type="date" class="form-control" id="next-inspection-date">
                            </div>
                        </div>
                        <div class="mt-3">
                            <label class="form-label">종합 의견</label>
                            <textarea class="form-control" id="overall-notes" rows="3" 
                                      placeholder="점검 결과에 대한 종합적인 의견을 입력하세요..."></textarea>
                        </div>
                    </div>

                    <!-- 액션 버튼 -->
                    <div class="d-flex justify-content-between mt-4">
                        <button class="btn btn-secondary" id="cancel-inspection">
                            <i class="fas fa-times me-2"></i>점검 취소
                        </button>
                        <div>
                            <button class="btn btn-warning me-2" id="save-draft">
                                <i class="fas fa-save me-2"></i>임시 저장
                            </button>
                            <button class="btn btn-success" id="complete-inspection">
                                <i class="fas fa-check me-2"></i>점검 완료
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    getRiskBadgeColor(riskLevel) {
        const colors = {
            'low': 'success',
            'medium': 'warning',
            'high': 'danger',
            'critical': 'dark'
        };
        return colors[riskLevel] || 'secondary';
    },

    getRiskLevelText(riskLevel) {
        const texts = {
            'low': '낮음',
            'medium': '보통',
            'high': '높음',
            'critical': '매우높음'
        };
        return texts[riskLevel] || '알수없음';
    },

    showInspectionDetail(date, equipment) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">점검 상세 결과</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>점검 정보</h6>
                        <ul>
                            <li><strong>일시:</strong> ${date}</li>
                            <li><strong>설비:</strong> ${equipment}</li>
                            <li><strong>점검자:</strong> 김철수</li>
                        </ul>
                        <hr>
                        <h6>점검 결과</h6>
                        <p>상세한 점검 결과 정보가 여기에 표시됩니다...</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary">보고서 출력</button>
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

    destroy() {
        // 정리 작업
        this.currentInspection = null;
        this.qrScannerActive = false;
    }
};
