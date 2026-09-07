export type Project = {
  title: string;
  period: string;
  org: string;
  role: string;
  tech: string[];
  points: string[];
  /** components/demos 레지스트리의 데모 id — 있으면 /showcase/{id} 상세 페이지로 연결 */
  demoId?: string;
  /** GitHub 등 외부 링크 */
  link?: string;
};

export const workProjects: Project[] = [
  {
    title: "AI 에이전트 플랫폼",
    period: "2026.03 ~ 재직중",
    org: "로이드케이",
    role: "프론트엔드 전담 / 인증·권한 백엔드 · 인프라 일부",
    tech: [
      "Next.js",
      "TypeScript",
      "Python (Gateway)",
      "WebSocket",
      "SSE",
      "PostgreSQL",
      "Podman · Docker",
      "Traefik",
    ],
    points: [
      "게이트웨이가 BFF 역할을 흡수하는 단일 인증 구조 설계 — HttpOnly 쿠키로 토큰 비노출, 프론트 코드 무변경으로 전환",
      "역할 기반 접근 제어(RBAC) 설계·구현 — 경로별 권한 강제(default-deny), 다중 역할, 역할·권한 매트릭스 관리 UI, 대화 열람 사유 필수화",
      "보안·운영 기능 풀스택 구현 — 로그인 실패 잠금·IP 허용목록·비밀번호 정책·세션 유휴 타임아웃, append-only 감사 로그, 대화 열람 PII 3단계 마스킹",
      "실시간 AI 채팅 UI 고도화 — SSE 도구 호출·추론 채널 스트리밍 표시, Human-in-the-Loop 승인 카드, 응답 중 메시지 대기열, 드래그앤드롭 첨부·파서 폴백 체인",
      "스트리밍 성능 개선 — SSE 델타 rAF 배칭·마크다운 메모이제이션·디버그 로그 비반응형 분리로 저사양 PC 렌더 버벅임 해소",
      "PostgreSQL 계정 스키마 재설계 — 분리 계획서 작성 후 계정·권한·설정 원장 테이블 신설, 운영 중 4단계 점진 마이그레이션 수행",
      "서버 신뢰성·자원 관리 — 외부 호출 timeout/retry/circuit breaker 래퍼, 유휴 샌드박스 GC, 사용자별 동시 실행 상한, 토큰 사용량 집계 API",
      "OAuth·MCP·Slack 연동 — 사용자별 OAuth 자격증명, MCP Registry 검색·서버 관리, Slack Events API(멘션·DM → 에이전트 실행·승인 버튼)",
      "사용자 앱·관리자 앱 2개로 프론트 분리, Dockerfile·compose·Traefik 라우팅 구성, git 변경 감지 배포 스크립트, 한/영 i18n 인프라 구축",
      "MAF DevUI 임시 프론트를 Next.js로 점진 이관 완료 후 DevUI 빌드 제거",
    ],
    demoId: "agent-run",
  },
  {
    title: "인천국제공항공사(IIAC) 생성형 AI 업무 플랫폼",
    period: "2025",
    org: "로이드케이 (고객사: 인천국제공항공사)",
    role: "프론트엔드 개발",
    tech: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TipTap",
      "Zod",
    ],
    points: [
      "스마트 뉴스 — AI 보도자료 작성·첨삭, 부정보도 모니터링, SNS 댓글 분석 기능 구현",
      "회의록 자동화(STT·자막) · 리포트 생성 · 대시보드 데이터 시각화 화면 구현",
      "TipTap 리치 텍스트 에디터 기반 문서 작성 인터페이스 구축",
    ],
    demoId: "editor",
  },
  {
    title: "인천국제공항공사(IIAC) 관리자 대시보드",
    period: "2025",
    org: "로이드케이 (고객사: 인천국제공항공사)",
    role: "프론트엔드 개발",
    tech: ["Next.js 15", "React 19", "TypeScript", "MUI", "Tanstack Query", "Zustand"],
    points: [
      "글로벌·부서·검색·AI 등 역할별 관리자 화면 및 권한 분리 구현",
      "Tanstack Query·Zustand로 서버·클라이언트 상태를 관리해 복잡한 관리자 화면의 데이터 흐름 단순화",
      "TypeScript 제네릭 기반 공통 테이블 컴포넌트를 설계해 17개 관리 화면에서 재사용 — 렌더 프롭·필터 주입·서버 페이지네이션 모드 지원",
    ],
    demoId: "admin-table",
  },
  {
    title: "교육용 비디오 스트리밍 플랫폼 ‘포커스팡(FocusPang)’",
    period: "2025.01 ~ 2025.04",
    org: "쓰리알이노베이션",
    role: "프론트엔드 개발",
    tech: ["React", "JavaScript", "WebSocket", "HTML5/CSS3"],
    points: [
      "AI 기반 교육용 비디오 스트리밍 플랫폼의 프론트엔드 화면 설계 및 개발",
      "교사용 시간표 관리·수업 추가 UI 및 실시간 강의(포커스타임) 화면 구현",
      "WebSocket 기반 학생 접속·상태 실시간 모니터링 UI 구현",
    ],
    demoId: "timetable",
  },
  {
    title: "QR 테이블링 시스템 / Admin 솔루션",
    period: "2023.11 ~ 2024.11",
    org: "아이시프트",
    role: "프론트엔드 개발",
    tech: ["React", "JavaScript", "Tailwind CSS", "Storybook", "Jest"],
    points: [
      "QR 코드 기반 테이블 주문 시스템의 사용자·관리자 프론트엔드 개발 — 모바일 반응형·터치 UI 포함",
      "Storybook·Jest 도입 — 컴포넌트 상태를 동료와 공유·검증하며 협업 효율 향상",
      "Admin 솔루션 대시보드 및 관리 화면 컴포넌트 구현",
    ],
  },
];

export const personalProjects: Project[] = [
  {
    title: "Spring JPA 동영상 강의 홈페이지",
    period: "2023.05 ~ 2023.06",
    org: "개인/교육 프로젝트",
    role: "Front · Back-end",
    tech: ["Java", "Spring Boot", "Spring Security", "Spring JPA", "Oracle DB"],
    points: [
      "회원 관리·영상 플레이어 프론트/백엔드 구현 및 전체 UI 스타일링",
      "가입 → 수강신청 → 수강 → 강의 평가의 전체 사용자 플로우 설계",
    ],
  },
  {
    title: "Spring 기반 사내 인트라넷 (KMS)",
    period: "2023.04 ~ 2023.05",
    org: "교육 프로젝트",
    role: "Front · Back-end",
    tech: ["Spring Framework", "MyBatis", "JSP", "MariaDB"],
    points: [
      "임직원 정보 관리(가입·임시PW 발급·탈퇴) 기능 구현",
      "게시판 CRUD, 첨부파일 업로드/다운로드, 댓글·좋아요 기능 구현",
    ],
  },
  {
    title: "Carrot Market 클론 — 중고거래 플랫폼",
    period: "개인 학습 프로젝트",
    org: "GitHub",
    role: "Frontend · Full-stack 학습",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    points: [
      "중고거래 플랫폼의 상품 등록·목록·상세, 프로필 등 핵심 플로우 구현",
      "GraphQL 연동 및 AWS Amplify 배포까지 모던 웹 스택 실습",
    ],
    link: "https://github.com/KSHoon522/carrot-market",
  },
  {
    title: "Netflix 클론 — 영상 콘텐츠 브라우징 UI",
    period: "개인 학습 프로젝트",
    org: "GitHub",
    role: "Frontend 학습",
    tech: ["React", "JavaScript", "오픈 API 연동"],
    points: [
      "영화 목록·상세·검색 화면 및 캐러셀 중심의 콘텐츠 브라우징 UI 구현",
      "외부 오픈 API 연동과 반응형 레이아웃 구성 학습",
    ],
    link: "https://github.com/KSHoon522/netfilx-clone",
  },
];
