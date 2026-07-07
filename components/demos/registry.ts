import type { ComponentType } from "react";
import EditorDemo from "./EditorDemo";
import AdminTableDemo from "./AdminTableDemo";
import StreamingChatDemo from "./StreamingChatDemo";
import AgentRunDemo from "./AgentRunDemo";
import TimetableDemo from "./TimetableDemo";
import LiveClassDemo from "./LiveClassDemo";

/**
 * UI Showcase 데모 레지스트리
 *
 * 새 데모 추가:
 * 1. components/demos/ 에 컴포넌트 생성 ("use client" 필수, 외부 API 의존 없이 동작)
 * 2. 아래 배열에 항목 추가 → /showcase/{id} 상세 페이지 자동 생성
 * 3. (선택) data/projects.ts 의 관련 프로젝트에 demoId 연결
 */
export type Demo = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  /** 상세 페이지에 표시할 구현 포인트 */
  details: string[];
  /** 관련 프로젝트 */
  related?: string;
  component: ComponentType;
};

export const demos: Demo[] = [
  {
    id: "streaming-chat",
    title: "실시간 스트리밍 채팅",
    description:
      "OpenWebUI를 참고해 Next.js로 직접 재구현한 AI 채팅 인터페이스 — 토큰 스트리밍 렌더링과 타이핑 애니메이션",
    tech: ["Next.js", "React", "SSE", "requestAnimationFrame"],
    details: [
      "SSE 누적 → 타이핑의 3단계 phase(accumulating → typing → complete) 상태 흐름",
      "requestAnimationFrame으로 프레임당 4자씩 슬라이스 렌더링하는 타이핑 애니메이션",
      "플로우 스텝 블록(단계별 소요 시간) · 후속 질문(follow-ups) · 자동 스크롤",
      "스트리밍 중 입력 잠금 및 전송/중지 버튼 전환",
    ],
    related: "개인 프로젝트 — AI 채팅 인터페이스 (Next.js 재구현)",
    component: StreamingChatDemo,
  },
  {
    id: "agent-run",
    title: "AI 에이전트 실행",
    description:
      "추론 → 도구 호출 → 응답이 스트림 순서대로 표시되는 AI 에이전트 실행 화면",
    tech: ["Next.js", "SSE", "Zustand 패턴", "OpenAI Responses API"],
    details: [
      "OpenAI Responses API 형식의 스트림 이벤트를 순수 리듀서로 처리하는 상태 설계",
      "reasoning delta → function_call → 결과 수신 → answer delta 순의 이벤트 시퀀스 렌더링",
      "작업 과정 접기/펼치기 카드 · 도구 호출 상세(arguments/result) 카드",
      "WebSocket 양방향 RPC + SSE 알림 채널 분리 · BFF 패턴 인증 구조와 함께 동작",
    ],
    related: "AI 에이전트 플랫폼",
    component: AgentRunDemo,
  },
  {
    id: "editor",
    title: "AI 보도자료 에디터",
    description:
      "AI로 보도자료를 작성·첨삭하는 문서 에디터 — 첨삭 모드, 영문번역, 자연어 수정 요청",
    tech: ["Next.js 15", "TipTap", "shadcn/ui", "Tailwind CSS"],
    details: [
      "서식·글자 크기·색상 툴바 — 읽기전용 모드에서는 서식 도구 비활성화",
      "첨삭 모드 토글 · 영문번역 ↔ 원문보기 전환 · 수정 중 로딩 오버레이",
      "하단 AI 프롬프트 바에서 자연어로 수정 요청 → 본문에 첨삭 반영",
      "TipTap(StarterKit · TextStyle · Color · FontSize) 기반 에디터 구성",
    ],
    related: "생성형 AI 업무 플랫폼 — 스마트 뉴스",
    component: EditorDemo,
  },
  {
    id: "admin-table",
    title: "어드민 작업 관리 테이블",
    description:
      "검색 · 멀티셀렉트 필터 · 필터 칩 · 페이지네이션을 갖춘 관리자 작업 관리 테이블",
    tech: ["Next.js 15", "MUI", "TypeScript"],
    details: [
      "멀티셀렉트 필터의 선택 표시 로직('All' / 'N selected')",
      "필터 칩 · 결과 건수 · 초기화 UX",
      "필터 변경 시 페이지 리셋 등 파생 상태 간 일관성 유지",
      "MUI 기반 관리자 화면의 테이블 카드 구성",
    ],
    related: "관리자 대시보드",
    component: AdminTableDemo,
  },
  {
    id: "timetable",
    title: "시간표 관리 UI",
    description:
      "요일 × 교시 그리드에 수업을 배치·삭제하는 교사용 시간표 관리 화면",
    tech: ["React", "CSS Grid", "인터랙션 설계"],
    details: [
      "과목 팔레트 선택 → 셀 클릭 배치, 재클릭 삭제의 직관적 편집 플로우",
      "CSS Grid 기반 요일 × 교시 레이아웃",
      "교사용 시간표 관리·수업 추가 화면으로 구현",
    ],
    related: "교육용 비디오 스트리밍 플랫폼",
    component: TimetableDemo,
  },
  {
    id: "live-class",
    title: "실시간 수업 세션",
    description:
      "학생 접속과 집중 상태를 실시간으로 모니터링하는 수업 세션 화면",
    tech: ["React", "WebSocket", "실시간 상태 동기화"],
    details: [
      "학생 입장(join)·상태 변경(status) 이벤트 수신에 따른 실시간 목록 갱신",
      "세션 타이머 · 집중/자리비움/이탈 상태 뱃지 · 집계 표시",
      "WebSocket으로 학생 접속·화면 상태를 실시간 수신해 교사 화면에 표시",
    ],
    related: "교육용 비디오 스트리밍 플랫폼",
    component: LiveClassDemo,
  },
];
