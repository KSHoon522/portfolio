export type Experience = {
  company: string;
  period: string;
  team: string;
  summary: string;
};

export const experiences: Experience[] = [
  {
    company: "로이드케이",
    period: "2025.05 ~ 재직중",
    team: "AI 플랫폼 개발팀",
    summary:
      "인천국제공항공사 생성형 AI 플랫폼 · AI 에이전트 플랫폼 프론트엔드 개발, BFF·게이트웨이 아키텍처 설계 참여",
  },
  {
    company: "쓰리알이노베이션",
    period: "2025.01 ~ 2025.04",
    team: "개발팀",
    summary: "교육용 비디오 스트리밍 플랫폼 ‘포커스팡(FocusPang)’ 프론트엔드 개발",
  },
  {
    company: "아이시프트",
    period: "2023.09 ~ 2024.11",
    team: "솔루션팀",
    summary:
      "QR 테이블링 시스템 · Admin 솔루션 프론트엔드 개발 (모바일 반응형 · Storybook/Jest 도입)",
  },
  {
    company: "다큐브",
    period: "2022.04 ~ 2022.07",
    team: "기획팀",
    summary: "웹 기획 및 퍼블리싱, 홈페이지 리뉴얼",
  },
];
