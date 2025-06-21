// 지능형 안전 교육 시스템 모듈
window.EducationModule = {
    currentCourse: null,
    educationData: null,
    progressInterval: null,

    init() {
        this.generateEducationData();
        this.renderEducationInterface();
        this.setupEventListeners();
    },

    generateEducationData() {
        this.educationData = {
            userProfile: {
                name: '김철수',
                position: '안전관리자',
                department: '제조부',
                experience: '5년',
                completedCourses: 24,
                totalHours: 156,
                lastEducation: '2024-06-15',
                certificates: ['산업안전기사', '화학안전관리자']
            },
            availableCourses: [
                {
                    id: 'course_001',
                    title: '전기안전 기초과정',
                    category: '전기안전',
                    level: 'beginner',
                    duration: 45,
                    progress: 100,
                    status: 'completed',
                    rating: 4.8,
                    description: '전기작업 시 필요한 기본 안전수칙과 절차',
                    modules: [
                        { name: '전기의 기초 이론', duration: 15, completed: true },
                        { name: '전기 재해 사례', duration: 15, completed: true },
                        { name: '안전작업 절차', duration: 15, completed: true }
                    ],
                    certificate: true,
                    mandatory: true,
                    dueDate: '2024-07-01'
                },
                {
                    id: 'course_002',
                    title: '화학물질 취급 안전교육',
                    category: '화학안전',
                    level: 'intermediate',
                    duration: 60,
                    progress: 67,
                    status: 'in_progress',
                    rating: 4.6,
                    description: '화학물질의 안전한 취급과 보관 방법',
                    modules: [
                        { name: 'MSDS 이해하기', duration: 20, completed: true },
                        { name: '개인보호구 착용법', duration: 20, completed: true },
                        { name: '응급처치 요령', duration: 20, completed: false }
                    ],
                    certificate: true,
                    mandatory: true,
                    dueDate: '2024-06-30'
                },
                {
                    id: 'course_003',
                    title: 'AI 기반 위험예측 시스템 활용',
                    category: '스마트안전',
                    level: 'advanced',
                    duration: 30,
                    progress: 0,
                    status: 'not_started',
                    rating: 4.9,
                    description: '최신 AI 기술을 활용한 산업안전 관리 방법',
                    modules: [
                        { name: 'AI 위험예측 이해', duration: 10, completed: false },
                        { name: '데이터 분석 활용법', duration: 10, completed: false },
                        { name: '실무 적용 사례', duration: 10, completed: false }
                    ],
                    certificate: false,
                    mandatory: false,
                    dueDate: null,
                    isNew: true
                },
                {
                    id: 'course_004',
                    title: '기계안전 점검 실무',
                    category: '기계안전',
                    level: 'intermediate',
                    duration: 40,
                    progress: 25,
                    status: 'in_progress',
                    rating: 4.5,
                    description: '기계설비의 안전점검 절차와 실무',
                    modules: [
                        { name: '기계안전 기초', duration: 15, completed: true },
                        { name: '점검 체크리스트', duration: 15, completed: false },
                        { name: '이상징후 판단', duration: 10, completed: false }
                    ],
                    certificate: true,
                    mandatory: true,
                    dueDate: '2024-07-15'
                },
                {
                    id: 'course_005',
                    title: '작업환경 관리 및 측정',
                    category: '작업환경',
                    level: 'advanced',
                    duration: 50,
                    progress: 0,
                    status: 'not_started',
                    rating: 4.4,
                    description: '작업환경의 위험요소 관리와 측정 방법',
                    modules: [
                        { name: '작업환경 평가', duration: 20, completed: false },
                        { name: '측정 장비 사용법', duration: 15, completed: false },
                        { name: '개선 방안 수립', duration: 15, completed: false }
                    ],
                    certificate: true,
                    mandatory: false,
                    dueDate: null
                }
            ],
            statistics: {
                totalCourses: 5,
                completedCourses: 1,
                inProgressCourses: 2,
                totalHours: 225,
                completedHours: 45,
                certificationRate: 85,
                averageScore: 92
            },
            recentActivities: [
                { date: '2024-06-21 09:30', activity: '화학물질 취급 안전교육 진도 67% 달성', type: 'progress' },
                { date: '2024-06-20 14:15', activity: '전기안전 기초과정 이수 완료', type: 'completion' },
                { date: '2024-06-19 11:20', activity: '기계안전 점검 실무 과정 시작', type: 'start' },
                { date: '2024-06-18 16:45', activity: '월간 안전교육 계획 수립', type: 'planning' }
            ]
        };
    },

    renderEducationInterface() {
        const content = document.getElementById('education-content');
        content.innerHTML = this.generateEducationHTML();
    },

    generateEducationHTML() {
        const data = this.educationData;
        
        return `
            <!-- 사용자 프로필 및 통계 -->
            <div class="row mb-4">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">
                                <i class="fas fa-user-graduate me-2"></i>
                                교육 프로필
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateUserProfile()}
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-chart-pie me-2"></i>
                                교육 현황 통계
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateEducationStats()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 진행 중인 교육 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-play-circle me-2"></i>
                                진행 중인 교육
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateInProgressCourses()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 추천 교육 과정 -->
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">
                                <i class="fas fa-lightbulb me-2"></i>
                                맞춤형 추천 교육
                            </h5>
                            <div class="btn-group" role="group">
                                <button class="btn btn-outline-primary btn-sm filter-btn active" data-filter="all">전체</button>
                                <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="mandatory">필수</button>
                                <button class="btn btn-outline-primary btn-sm filter-btn" data-filter="recommended">추천</button>
                            </div>
                        </div>
                        <div class="card-body">
                            ${this.generateCourseGrid()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 최근 활동 및 성취 -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">
                                <i class="fas fa-history me-2"></i>
                                최근 교육 활동
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
                                <i class="fas fa-trophy me-2"></i>
                                성취 현황
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.generateAchievements()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateUserProfile() {
        const profile = this.educationData.userProfile;
        
        return `
            <div class="text-center mb-3">
                <div class="user-avatar bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style="width: 80px; height: 80px; font-size: 2rem;">
                    ${profile.name.charAt(0)}
                </div>
                <h6 class="mt-2 mb-0">${profile.name}</h6>
                <small class="text-muted">${profile.position} | ${profile.department}</small>
            </div>
            
            <div class="profile-stats">
                <div class="row text-center">
                    <div class="col-6">
                        <div class="stat-item">
                            <div class="h5 text-success mb-0">${profile.completedCourses}</div>
                            <small class="text-muted">완료한 과정</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="stat-item">
                            <div class="h5 text-info mb-0">${profile.totalHours}h</div>
                            <small class="text-muted">총 이수시간</small>
                        </div>
                    </div>
                </div>
                
                <hr class="my-3">
                
                <div class="profile-details">
                    <div class="mb-2">
                        <strong>경력:</strong> ${profile.experience}
                    </div>
                    <div class="mb-2">
                        <strong>보유 자격:</strong>
                        <div class="mt-1">
                            ${profile.certificates.map(cert => 
                                `<span class="badge bg-primary me-1">${cert}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div>
                        <strong>마지막 교육:</strong> ${profile.lastEducation}
                    </div>
                </div>
            </div>
        `;
    },

    generateEducationStats() {
        const stats = this.educationData.statistics;
        
        return `
            <div class="row">
                <div class="col-md-3 text-center">
                    <div class="stat-card-mini">
                        <div class="stat-value text-primary">${stats.completedCourses}/${stats.totalCourses}</div>
                        <div class="stat-label">완료 과정</div>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-primary" 
                                 style="width: ${(stats.completedCourses / stats.totalCourses) * 100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card-mini">
                        <div class="stat-value text-success">${stats.completedHours}h</div>
                        <div class="stat-label">이수 시간</div>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-success" 
                                 style="width: ${(stats.completedHours / stats.totalHours) * 100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card-mini">
                        <div class="stat-value text-warning">${stats.certificationRate}%</div>
                        <div class="stat-label">자격증 취득률</div>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-warning" style="width: ${stats.certificationRate}%"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 text-center">
                    <div class="stat-card-mini">
                        <div class="stat-value text-info">${stats.averageScore}점</div>
                        <div class="stat-label">평균 점수</div>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-info" style="width: ${stats.averageScore}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    generateInProgressCourses() {
        const inProgressCourses = this.educationData.availableCourses
            .filter(course => course.status === 'in_progress');
        
        if (inProgressCourses.length === 0) {
            return `
                <div class="text-center text-muted py-4">
                    <i class="fas fa-graduation-cap fa-3x mb-3"></i>
                    <p>현재 진행 중인 교육이 없습니다.</p>
                    <button class="btn btn-primary">새 교육 시작하기</button>
                </div>
            `;
        }
        
        return inProgressCourses.map(course => `
            <div class="progress-course-card mb-3 p-3 border rounded">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h6 class="mb-1">${course.title}</h6>
                        <small class="text-muted">${course.category} • ${course.duration}분</small>
                        ${course.dueDate ? `<div class="mt-1"><small class="text-warning">마감: ${course.dueDate}</small></div>` : ''}
                    </div>
                    <div class="col-md-4">
                        <div class="progress-info">
                            <div class="d-flex justify-content-between mb-1">
                                <small>진도율</small>
                                <small>${course.progress}%</small>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" style="width: ${course.progress}%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <button class="btn btn-success btn-sm continue-course" data-course-id="${course.id}">
                            <i class="fas fa-play me-1"></i>계속하기
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    generateCourseGrid() {
        const courses = this.educationData.availableCourses;
        
        return `
            <div class="course-grid">
                <div class="row">
                    ${courses.map(course => `
                        <div class="col-lg-6 mb-4 course-item" data-category="${course.category}" 
                             data-mandatory="${course.mandatory}" data-status="${course.status}">
                            <div class="card course-card h-100">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <h6 class="card-title mb-0">${course.title}</h6>
                                        <div class="course-badges">
                                            ${course.isNew ? '<span class="badge bg-success">NEW</span>' : ''}
                                            ${course.mandatory ? '<span class="badge bg-warning">필수</span>' : ''}
                                            ${course.certificate ? '<span class="badge bg-info">수료증</span>' : ''}
                                        </div>
                                    </div>
                                    
                                    <p class="card-text text-muted small">${course.description}</p>
                                    
                                    <div class="course-meta mb-3">
                                        <div class="row text-center">
                                            <div class="col-4">
                                                <small class="text-muted">시간</small>
                                                <div class="fw-bold">${course.duration}분</div>
                                            </div>
                                            <div class="col-4">
                                                <small class="text-muted">난이도</small>
                                                <div class="fw-bold">${this.getLevelText(course.level)}</div>
                                            </div>
                                            <div class="col-4">
                                                <small class="text-muted">평점</small>
                                                <div class="fw-bold">
                                                    <i class="fas fa-star text-warning"></i> ${course.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    ${course.progress > 0 ? `
                                        <div class="progress mb-3" style="height: 6px;">
                                            <div class="progress-bar" style="width: ${course.progress}%"></div>
                                        </div>
                                        <small class="text-muted">진도: ${course.progress}%</small>
                                    ` : ''}
                                    
                                    <div class="d-grid">
                                        <button class="btn ${this.getCourseButtonClass(course.status)} course-action" 
                                                data-course-id="${course.id}" data-action="${this.getCourseAction(course.status)}">
                                            <i class="fas fa-${this.getCourseButtonIcon(course.status)} me-1"></i>
                                            ${this.getCourseButtonText(course.status)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    generateRecentActivities() {
        const activities = this.educationData.recentActivities;
        
        return activities.map(activity => `
            <div class="activity-item d-flex align-items-start mb-3">
                <div class="activity-icon me-3">
                    <i class="fas fa-${this.getActivityIcon(activity.type)} text-${this.getActivityColor(activity.type)}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="activity-content">${activity.activity}</div>
                    <small class="text-muted">${activity.date}</small>
                </div>
            </div>
        `).join('');
    },

    generateAchievements() {
        const achievements = [
            { icon: 'trophy', title: '교육 마니아', desc: '10개 이상 과정 완료', achieved: true },
            { icon: 'medal', title: '완벽주의자', desc: '평균 90점 이상', achieved: true },
            { icon: 'star', title: '신속 이수', desc: '일주일 내 과정 완료', achieved: false },
            { icon: 'certificate', title: '자격증 수집가', desc: '5개 이상 자격증 취득', achieved: false }
        ];
        
        return achievements.map(achievement => `
            <div class="achievement-item d-flex align-items-center mb-3 p-2 rounded ${achievement.achieved ? 'bg-light' : ''}">
                <div class="achievement-icon me-3">
                    <i class="fas fa-${achievement.icon} fa-2x text-${achievement.achieved ? 'warning' : 'muted'}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold ${achievement.achieved ? '' : 'text-muted'}">${achievement.title}</div>
                    <small class="text-muted">${achievement.desc}</small>
                </div>
                ${achievement.achieved ? '<i class="fas fa-check text-success"></i>' : ''}
            </div>
        `).join('');
    },

    getLevelText(level) {
        const texts = {
            'beginner': '초급',
            'intermediate': '중급',
            'advanced': '고급'
        };
        return texts[level] || '기타';
    },

    getCourseButtonClass(status) {
        const classes = {
            'completed': 'btn-success',
            'in_progress': 'btn-warning',
            'not_started': 'btn-primary'
        };
        return classes[status] || 'btn-secondary';
    },

    getCourseButtonIcon(status) {
        const icons = {
            'completed': 'check',
            'in_progress': 'play',
            'not_started': 'play'
        };
        return icons[status] || 'question';
    },

    getCourseButtonText(status) {
        const texts = {
            'completed': '재수강',
            'in_progress': '계속하기',
            'not_started': '시작하기'
        };
        return texts[status] || '보기';
    },

    getCourseAction(status) {
        const actions = {
            'completed': 'restart',
            'in_progress': 'continue',
            'not_started': 'start'
        };
        return actions[status] || 'view';
    },

    getActivityIcon(type) {
        const icons = {
            'progress': 'chart-line',
            'completion': 'check-circle',
            'start': 'play-circle',
            'planning': 'calendar-alt'
        };
        return icons[type] || 'circle';
    },

    getActivityColor(type) {
        const colors = {
            'progress': 'info',
            'completion': 'success',
            'start': 'primary',
            'planning': 'warning'
        };
        return colors[type] || 'secondary';
    },

    setupEventListeners() {
        // 과정 액션 버튼
        document.addEventListener('click', (e) => {
            if (e.target.closest('.course-action')) {
                const courseId = e.target.closest('.course-action').getAttribute('data-course-id');
                const action = e.target.closest('.course-action').getAttribute('data-action');
                this.handleCourseAction(courseId, action);
            }
            
            if (e.target.closest('.continue-course')) {
                const courseId = e.target.closest('.continue-course').getAttribute('data-course-id');
                this.handleCourseAction(courseId, 'continue');
            }
            
            if (e.target.closest('.filter-btn')) {
                const filter = e.target.closest('.filter-btn').getAttribute('data-filter');
                this.applyFilter(filter);
            }
        });
    },

    handleCourseAction(courseId, action) {
        const course = this.educationData.availableCourses.find(c => c.id === courseId);
        if (!course) return;

        switch(action) {
            case 'start':
                this.startCourse(course);
                break;
            case 'continue':
                this.continueCourse(course);
                break;
            case 'restart':
                this.restartCourse(course);
                break;
        }
    },

    startCourse(course) {
        this.currentCourse = course;
        this.showCourseModal(course, 'start');
    },

    continueCourse(course) {
        this.currentCourse = course;
        this.showCourseModal(course, 'continue');
    },

    restartCourse(course) {
        this.currentCourse = course;
        this.showCourseModal(course, 'restart');
    },

    showCourseModal(course, mode) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${course.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${this.generateCourseModalContent(course, mode)}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-primary" id="start-learning">
                            ${mode === 'start' ? '학습 시작' : '학습 계속'}
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();

        // 학습 시작 버튼 이벤트
        modal.querySelector('#start-learning').addEventListener('click', () => {
            this.startLearningSession(course);
            bsModal.hide();
        });

        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    generateCourseModalContent(course, mode) {
        return `
            <div class="course-modal-content">
                <div class="course-info mb-4">
                    <div class="row">
                        <div class="col-md-8">
                            <p class="course-description">${course.description}</p>
                            <div class="course-details">
                                <div class="row">
                                    <div class="col-6">
                                        <strong>소요시간:</strong> ${course.duration}분
                                    </div>
                                    <div class="col-6">
                                        <strong>난이도:</strong> ${this.getLevelText(course.level)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-center">
                            <div class="course-progress">
                                <div class="h4">${course.progress}%</div>
                                <div class="progress">
                                    <div class="progress-bar" style="width: ${course.progress}%"></div>
                                </div>
                                <small class="text-muted">진도율</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="course-modules">
                    <h6>학습 모듈</h6>
                    <div class="modules-list">
                        ${course.modules.map((module, index) => `
                            <div class="module-item d-flex align-items-center mb-2 p-2 border rounded">
                                <div class="module-number me-3">
                                    <span class="badge ${module.completed ? 'bg-success' : 'bg-secondary'} rounded-pill">
                                        ${index + 1}
                                    </span>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="module-title">${module.name}</div>
                                    <small class="text-muted">${module.duration}분</small>
                                </div>
                                <div class="module-status">
                                    <i class="fas fa-${module.completed ? 'check text-success' : 'play text-primary'}"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    },

    startLearningSession(course) {
        window.SafetyPlatform.showNotification(
            `${course.title} 학습을 시작합니다.`, 
            'success'
        );
        
        // 학습 진행 시뮬레이션
        this.simulateLearningProgress(course);
    },

    simulateLearningProgress(course) {
        const progressStep = Math.floor(Math.random() * 15) + 10; // 10-25% 진행
        const newProgress = Math.min(100, course.progress + progressStep);
        
        course.progress = newProgress;
        
        if (newProgress >= 100) {
            course.status = 'completed';
            window.SafetyPlatform.showNotification(
                `축하합니다! ${course.title} 과정을 완료했습니다.`, 
                'success'
            );
        } else {
            course.status = 'in_progress';
            window.SafetyPlatform.showNotification(
                `진도가 ${newProgress}%로 업데이트되었습니다.`, 
                'info'
            );
        }
        
        // UI 업데이트
        this.renderEducationInterface();
    },

    applyFilter(filter) {
        // 필터 버튼 활성화 상태 변경
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // 과정 카드 필터링
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach(item => {
            let show = true;
            
            if (filter === 'mandatory') {
                show = item.getAttribute('data-mandatory') === 'true';
            } else if (filter === 'recommended') {
                show = item.getAttribute('data-mandatory') === 'false';
            }
            
            item.style.display = show ? 'block' : 'none';
        });
    },

    destroy() {
        // 정리 작업
        this.currentCourse = null;
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
};
