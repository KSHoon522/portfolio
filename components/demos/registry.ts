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
  /** 상세 페이지에 표시할 구현 포인트 (caseStudy가 있으면 '기술 노트'로 표시) */
  details: string[];
  /** 관련 프로젝트 */
  related?: string;
  /** 케이스 스터디 — 문제 정의 → 접근 → 결과 → 배움 서사 */
  caseStudy?: {
    problem: string;
    approach: string;
    result: string;
    learned: string;
  };
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
    related: "사내 사이드 프로젝트 — AI 채팅 인터페이스 (Next.js 재구현)",
    caseStudy: {
      problem:
        "실무에서 AI 응답 스트리밍 UI를 다루면서, 잘 만들어진 오픈소스 채팅 UI(OpenWebUI)는 이 문제를 어떻게 풀었는지 궁금했습니다. 다만 Svelte로 작성되어 있어 코드를 그대로 가져올 수 없었고, “프레임워크가 달라도 UX는 이식할 수 있는가”를 확인하고 싶었습니다.",
      approach:
        "코드 이식이 아니라 동작 분석을 택했습니다. 화면과 네트워크 동작을 관찰해 명세로 옮긴 뒤 — SSE 수신과 렌더링을 분리해 수신은 누적하고 표시는 requestAnimationFrame 타이핑으로 따라가게 하는 구조 — 제 주력 스택인 Next.js로 처음부터 구현했습니다. 플로우 단계 표시, 후속 질문, 자동 스크롤, 스트리밍 중 입력 잠금 같은 UX 요소도 같은 방식으로 재구현했습니다.",
      result:
        "채팅 인터페이스 전체를 Next.js로 재구현했고, 여기서 얻은 스트리밍 처리 감각은 실무 AI 플랫폼의 응답 UI에도 그대로 쓰였습니다. 이 데모는 그 프로젝트의 화면 중 핵심인 수신→타이핑 파이프라인을 재현한 것입니다.",
      learned:
        "낯선 코드베이스는 코드가 아니라 동작부터 읽어야 한다는 것, 그리고 프레임워크가 달라도 좋은 UX 패턴은 명세화하면 이식된다는 것을 배웠습니다.",
    },
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
    caseStudy: {
      problem:
        "사용자 PC의 브라우저·로컬 자원을 직접 쓰는 AI 에이전트 플랫폼을 만드는 프로젝트였습니다. 초기에는 MAF DevUI로 급히 세운 임시 화면과 복잡한 라우팅·인증 구조가 있었고, 인증 토큰이 브라우저에 노출될 수 있는 구조, 서버가 클라이언트의 도구를 호출해야 하는 특수한 실시간 요구까지 겹쳐 있었습니다.",
      approach:
        "세 방향으로 풀었습니다. 인증은 “창구를 하나로 모으면 보안과 복잡도를 동시에 잡는다”는 가설로 게이트웨이가 BFF 역할을 흡수하는 구조 + HttpOnly 쿠키를 설계해 토큰이 브라우저 JS에 노출되는 지점을 없앴습니다. 실시간은 성격에 따라 채널을 분리해 서버→클라이언트 도구 호출은 WebSocket 양방향 RPC로, 알림·응답 스트리밍은 SSE로 나눴습니다. 레거시 화면은 새 컨벤션을 먼저 세운 뒤 서비스 중단 없이 화면 단위로 점진 이관했고, 권한(RBAC)은 백엔드 API의 default-deny 접근 제어부터 관리 UI까지 직접 구현했습니다.",
      result:
        "인증 구조는 프론트 코드 변경 없이 이전됐고, DevUI 기반 화면은 새 Next.js 아키텍처로 전면 이관됐습니다. 이 데모는 그 플랫폼의 여러 화면 중 에이전트 실행 화면 하나 — 스트림 이벤트(추론→도구 호출→응답)를 순수 리듀서로 처리해 작업 과정을 펼쳐 보여주는 부분을 재현한 것입니다.",
      learned:
        "좋은 아키텍처 결정은 프론트 코드를 지켜준다는 것(구조를 갈아타도 화면 코드는 무변경), 그리고 이벤트 기반 UI는 상태 변화를 순수 함수로 다루면 복잡해도 예측 가능하다는 것을 배웠습니다.",
    },
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
    caseStudy: {
      problem:
        "공공기관의 생성형 AI 업무 플랫폼 프론트엔드 전반을 개발하는 프로젝트였습니다. AI 보도자료 작성·첨삭, 부정보도 모니터링, SNS 댓글 분석, 회의록 자동화(STT), 리포트·대시보드까지 화면 폭이 넓었는데, 그중 문서 작성은 “AI가 만든 초안을 사람이 다듬는” 흐름이라 단순 텍스트 입력으로는 부족했습니다. 서식·문서 구조를 유지하면서 AI 수정 요청과 사람의 편집이 한 화면에서 오가야 했습니다.",
      approach:
        "에디터를 상태 기계로 보고 설계했습니다. TipTap(ProseMirror) 기반으로 문서 모델을 구조화하고, AI 응답(마크다운)을 문서 모델로 안전하게 변환하는 계층을 뒀습니다. 읽기전용과 첨삭 모드를 분리해 서식 도구가 모드에 따라 활성화되게 했고, 번역은 원문·번역본을 오가는 토글로, 폼·응답 검증은 Zod 스키마로 처리했습니다.",
      result:
        "작성→AI 첨삭→번역→미리보기→다운로드로 이어지는 문서 플로우가 출시되어 고객사에 납품됐습니다. 이 데모는 그 플랫폼의 여러 화면 중 에디터 화면 하나 — 모드 전환과 자연어 수정 요청 UX를 재현한 것입니다.",
      learned:
        "에디터는 기능 목록이 아니라 상태 기계라는 것 — 모드·selection·비동기 응답이 얽히는 지점을 명시적으로 관리해야 무너지지 않는다는 것을 배웠습니다. 툴바 클릭 시 포커스 유지 같은 디테일이 체감 품질을 결정한다는 것도요.",
    },
    component: EditorDemo,
  },
  {
    id: "admin-table",
    title: "어드민 작업 관리 테이블",
    description:
      "검색 · 멀티셀렉트 필터 · 필터 칩 · 페이지네이션을 갖춘 관리자 작업 관리 테이블",
    tech: ["Next.js 15", "MUI", "TypeScript"],
    details: [
      "실무에서는 TypeScript 제네릭 공통 컴포넌트(GenericTableCard<T, F>)로 구현 — renderRow 렌더 프롭, 필터 로직 주입, 툴바·필터결과 슬롯",
      "클라이언트/서버 페이지네이션을 같은 인터페이스로 전환하는 serverMode 설계",
      "멀티셀렉트 필터의 선택 표시 로직('All' / 'N selected'), 필터 칩 · 결과 건수 · 초기화 UX",
      "필터 변경 시 페이지 리셋 등 파생 상태 간 일관성 유지",
    ],
    related: "관리자 대시보드",
    caseStudy: {
      problem:
        "관리자 대시보드에는 사용자 관리, 스케줄러, 색인 관리 등 성격이 다른 관리 화면이 수십 개 필요했고, 전부 “검색·필터·정렬·선택·페이지네이션이 달린 테이블”이라는 같은 뼈대를 공유했습니다. 화면마다 테이블을 따로 구현하면 코드 중복은 물론 동작(필터 시 페이지 리셋, 선택 상태, 빈 데이터 처리)이 화면마다 미묘하게 어긋나는 문제가 보였습니다. 여기에 역할별 권한에 따라 보이는 화면까지 달라야 했습니다.",
      approach:
        "“화면마다 다른 것과 같은 것을 분리해, 같은 것은 한 번만 구현한다”는 가설로 TypeScript 제네릭 기반 공통 컴포넌트 GenericTableCard<T, F>를 직접 설계했습니다. 도메인마다 달라지는 부분은 밖에서 주입받고(renderRow 렌더 프롭, applyFilter 필터 로직, 툴바·필터결과 슬롯), 공통 동작(정렬·선택·페이지네이션·상태 탭·빈 상태)은 컴포넌트가 흡수했습니다. 데이터 규모에 따라 클라이언트/서버 페이지네이션을 전환하는 serverMode도 같은 인터페이스로 제공했고, 서버 상태는 TanStack Query, 화면 상태는 Zustand로 소유자를 나눴습니다.",
      result:
        "이 공통 컴포넌트 하나가 17개 관리 화면에서 재사용됐고, 새 관리 화면을 추가할 때는 행 렌더러와 필터 로직만 작성하면 되는 구조가 됐습니다. 날짜 범위 피커, 대시보드 카드, 데이터 그리드 등 다른 커스텀 컴포넌트도 같은 원칙으로 만들어 화면 전반의 동작 일관성을 확보했습니다. 이 데모는 그 공통 테이블의 상태 설계를 샘플 데이터로 재현한 것입니다.",
      learned:
        "재사용 컴포넌트의 핵심은 “무엇을 흡수하고 무엇을 열어둘 것인가”라는 추상화 경계 설계라는 것을 배웠습니다. 경계를 잘못 잡으면 옵션만 늘어난 괴물이 되는데, 렌더 프롭과 슬롯으로 변화를 밖으로 밀어내는 방식이 제네릭 컴포넌트를 오래 살게 한다는 감각을 이 프로젝트에서 얻었습니다.",
    },
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
    caseStudy: {
      problem:
        "AI 기반 교육용 비디오 스트리밍 플랫폼에서 교사용 화면 전반을 담당했습니다. 교사가 수업을 운영하는 데 필요한 도구 — 시간표 구성, 수업 추가, 실시간 강의 진행 — 를 개발이 익숙하지 않은 사용자도 헤매지 않고 쓸 수 있게 만드는 것이 과제였습니다.",
      approach:
        "교사의 실제 업무 흐름(학기 초 시간표 구성 → 매일의 수업 진행)을 따라 화면을 설계했습니다. 시간표는 요일×교시 그리드에서 클릭만으로 배치·삭제가 되는 직관적 편집을 목표로 했고, 상태가 복잡해지지 않도록 편집 동작을 최소 단위(선택→배치, 재클릭→삭제)로 제한했습니다.",
      result:
        "교사용 시간표 관리·수업 추가 UI가 실시간 강의(포커스타임) 화면과 함께 서비스에 반영됐습니다. 원본 코드는 보유하고 있지 않아, 이 데모는 실제 서비스 화면을 기준으로 그 편집 인터랙션을 재구성한 것입니다.",
      learned:
        "개발자가 아닌 사용자를 위한 화면은 기능을 늘리는 것보다 동작을 줄이는 것이 답이라는 것 — 인터랙션의 최소 단위를 정하는 일이 UX 설계의 시작이라는 것을 배웠습니다.",
    },
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
    caseStudy: {
      problem:
        "같은 교육 플랫폼의 실시간 강의 기능(포커스타임)에서, 교사가 원격 수업 중 학생들의 접속과 집중 상태를 한 화면에서 파악해야 했습니다. 수십 명의 상태가 계속 바뀌는 화면이라, 갱신이 늦으면 신뢰를 잃고 너무 잦으면 화면이 어지러워지는 균형 문제가 있었습니다.",
      approach:
        "WebSocket으로 학생 입장(join)·상태 변경(status) 이벤트를 수신해 목록을 실시간 갱신하는 구조로 만들었습니다. 상태는 집중/자리비움/이탈 같은 소수의 범주로 단순화해 교사가 한눈에 읽을 수 있게 했고, 개별 학생의 변화는 뱃지로, 전체 현황은 집계로 분리해 보여줬습니다.",
      result:
        "실시간 강의 화면이 서비스에 반영되어 교사가 수업 중 학생 상태를 모니터링할 수 있게 됐습니다. 원본 코드는 보유하고 있지 않아, 이 데모는 그 화면의 이벤트 수신 구조를 시뮬레이션으로 재구성한 것입니다.",
      learned:
        "실시간 UI의 품질은 수신 기술보다 정보 설계에서 갈린다는 것 — 이벤트를 그대로 뿌리는 게 아니라 사용자가 읽을 수 있는 단위(범주·집계)로 변환하는 층이 필요하다는 것을 배웠습니다.",
    },
    component: LiveClassDemo,
  },
];
