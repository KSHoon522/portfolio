export type SkillGroup = {
  category: string;
  items: { name: string; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "React · Next.js", note: "실무 주력 · App Router" },
      { name: "TypeScript", note: "실무 전 프로젝트" },
      { name: "JavaScript (ES6+)", note: "실무 다수 프로젝트" },
      { name: "CSS · Tailwind · MUI", note: "반응형 · 디자인 시스템" },
    ],
  },
  {
    category: "상태관리 · 데이터",
    items: [
      { name: "Tanstack Query (React Query)" },
      { name: "Zustand" },
      { name: "REST API" },
    ],
  },
  {
    category: "Backend · DB",
    items: [
      { name: "Java / Spring Boot · JPA", note: "풀스택 구현 경험" },
      { name: "Python · Node (Gateway/BFF)" },
      { name: "WebSocket · SSE" },
      { name: "MariaDB · Oracle DB · PostgreSQL" },
    ],
  },
  {
    category: "테스트 · 문서화",
    items: [{ name: "Jest" }, { name: "Storybook", note: "사용 경험" }],
  },
  {
    category: "모바일",
    items: [
      { name: "모바일 반응형 · 터치 UI" },
      { name: "Flutter 앱 WebView 연동", note: "기초" },
    ],
  },
  {
    category: "AI 도구 · 협업",
    items: [
      { name: "Cursor · Claude Code · Antigravity" },
      { name: "Git · GitHub · Jira · Slack · Notion" },
      { name: "Docker · Podman · nginx" },
    ],
  },
];
