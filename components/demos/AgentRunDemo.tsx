"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AI 에이전트 실행 UI — AI 에이전트 플랫폼 실제 코드 기반
 *
 * 스트림 상태 타입(TurnState)과 이벤트 리듀서, 작업 과정 카드·도구 호출
 * 카드 구조를 실제 구현에서 이식. 실제로는 OpenAI Responses API 형식의
 * SSE 스트림을 수신 — 여기서는 동일한 이벤트 시퀀스를 타이머로 재생.
 */

// ── 실제 구현의 타입·리듀서 (이식) ────────────────────────────────
interface ToolCallView {
  id: string;
  callId?: string;
  name: string;
  arguments: string;
  result?: string;
}

type MessagePart =
  | { kind: "text"; channel: "reasoning" | "answer"; text: string }
  | { kind: "tool"; id: string };

interface TurnState {
  status: "idle" | "streaming" | "done" | "error";
  text: string;
  toolCalls: ToolCallView[];
  parts: MessagePart[];
}

type StreamEvent = {
  type: string;
  delta?: string;
  item?: { type: string; id?: string; call_id?: string; name?: string; arguments?: string };
  call_id?: string;
  output?: string;
};

const initialTurn: TurnState = { status: "idle", text: "", toolCalls: [], parts: [] };

function appendText(
  parts: MessagePart[],
  delta: string,
  channel: "reasoning" | "answer",
): MessagePart[] {
  const last = parts[parts.length - 1];
  if (last && last.kind === "text" && last.channel === channel) {
    return [...parts.slice(0, -1), { ...last, text: last.text + delta }];
  }
  return [...parts, { kind: "text", channel, text: delta }];
}

function applyResponseEvent(turn: TurnState, evt: StreamEvent): TurnState {
  const type = evt.type ?? "";

  if (type === "response.created" || type === "response.in_progress") {
    return { ...turn, status: "streaming" };
  }
  if (type.endsWith("reasoning_text.delta") && typeof evt.delta === "string") {
    return { ...turn, status: "streaming", parts: appendText(turn.parts, evt.delta, "reasoning") };
  }
  if (type.endsWith("output_text.delta") && typeof evt.delta === "string") {
    return {
      ...turn,
      status: "streaming",
      text: turn.text + evt.delta,
      parts: appendText(turn.parts, evt.delta, "answer"),
    };
  }
  if (type === "response.output_item.added" && evt.item?.type === "function_call") {
    const id = evt.item.id ?? evt.item.call_id ?? `tool-${turn.toolCalls.length}`;
    const tc: ToolCallView = {
      id,
      callId: evt.item.call_id,
      name: evt.item.name ?? "tool",
      arguments: evt.item.arguments ?? "",
    };
    return { ...turn, toolCalls: [...turn.toolCalls, tc], parts: [...turn.parts, { kind: "tool", id }] };
  }
  if (type === "response.function_result.complete" && typeof evt.output === "string") {
    const cid = evt.call_id;
    return {
      ...turn,
      toolCalls: turn.toolCalls.map((tc) =>
        cid && (tc.callId === cid || tc.id === cid) ? { ...tc, result: evt.output as string } : tc,
      ),
    };
  }
  if (type === "response.completed" || type === "response.done") {
    return { ...turn, status: "done" };
  }
  return turn;
}

// ── 시뮬레이션용 SSE 이벤트 시퀀스 ────────────────────────────────
const SCRIPT: { delay: number; evt: StreamEvent }[] = [
  { delay: 300, evt: { type: "response.created" } },
  ...["요청을 분석합니다. ", "워크스페이스에서 관련 파일을 찾은 뒤 ", "요약을 생성해야 합니다."].map(
    (d) => ({ delay: 220, evt: { type: "response.reasoning_text.delta", delta: d } }),
  ),
  {
    delay: 500,
    evt: {
      type: "response.output_item.added",
      item: {
        type: "function_call",
        call_id: "call_1",
        name: "workspace.search_files",
        arguments: '{ "query": "주간 보고", "limit": 5 }',
      },
    },
  },
  {
    delay: 1200,
    evt: {
      type: "response.function_result.complete",
      call_id: "call_1",
      output: '{ "files": ["weekly-report-0629.md", "weekly-report-0706.md"] }',
    },
  },
  ...["두 개의 주간 보고 파일을 찾았습니다.\n\n", "**요약**: 지난주 대비 ", "프론트엔드 마이그레이션 진행률이 ", "68% → 82%로 상승했고, ", "남은 작업은 인증 화면 이관과 ", "E2E 테스트 안정화입니다."].map(
    (d) => ({ delay: 180, evt: { type: "response.output_text.delta", delta: d } }),
  ),
  { delay: 300, evt: { type: "response.completed" } },
];

// ── 실제 구현의 작업 과정 카드 / 도구 호출 카드 구조 (이식) ──────────
function ToolChip({ tc }: { tc: ToolCallView }) {
  return (
    <details className="rounded border border-border bg-bg/60 text-xs">
      <summary className="flex cursor-pointer list-none items-center gap-1.5 px-2 py-1.5 [&::-webkit-details-marker]:hidden">
        {/* wrench icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted">
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2.1-2.1 2.9-2.7Z" />
        </svg>
        <span className="truncate font-mono font-medium">{tc.name}</span>
        <span className="ml-auto shrink-0 text-[11px] text-muted">
          {tc.result != null ? "완료" : "실행 중"}
        </span>
      </summary>
      <div className="border-t border-border px-2 py-1.5">
        <p className="mb-1 text-[10px] uppercase tracking-wide text-muted">arguments</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11px]">{tc.arguments}</pre>
        {tc.result && (
          <>
            <p className="mb-1 mt-2 text-[10px] uppercase tracking-wide text-muted">result</p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11px]">{tc.result}</pre>
          </>
        )}
      </div>
    </details>
  );
}

function ProcessCard({ turn }: { turn: TurnState }) {
  const [override, setOverride] = useState<boolean | null>(null);
  const pending = turn.status === "streaming";
  const open = override ?? pending;

  const items = turn.parts
    .filter((p) => (p.kind === "text" && p.channel === "reasoning") || p.kind === "tool")
    .map((p, i) => {
      if (p.kind === "text") {
        return (
          <p key={i} className="text-xs leading-relaxed text-muted">
            {p.text}
          </p>
        );
      }
      const tc = turn.toolCalls.find((t) => t.id === p.id);
      return tc ? <ToolChip key={p.id} tc={tc} /> : null;
    });

  if (items.length === 0) return null;

  return (
    <div
      className={`max-w-[720px] border-l-2 py-0.5 pl-4 transition-colors ${
        open ? "border-accent" : "border-border"
      }`}
    >
      <button
        type="button"
        onClick={() => setOverride(!open)}
        className="flex items-center gap-2.5 text-muted"
      >
        <span className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${pending ? "animate-pulse" : ""}`}>
          작업 과정{open ? "" : " 보기"}
        </span>
        {turn.toolCalls.length > 0 && (
          <span className="rounded-full bg-accent-soft px-1.5 font-mono text-[10px] text-accent">
            도구 {turn.toolCalls.length}
          </span>
        )}
      </button>
      {open && <div className="flex flex-col gap-2.5 pt-3">{items}</div>}
    </div>
  );
}

// ── 데모 본체 ─────────────────────────────────────────────────────
export default function AgentRunDemo() {
  const [turn, setTurn] = useState<TurnState>(initialTurn);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setTurn({ ...initialTurn, status: "streaming" });
    let at = 0;
    for (const { delay, evt } of SCRIPT) {
      at += delay;
      timeouts.current.push(setTimeout(() => setTurn((t) => applyResponseEvent(t, evt)), at));
    }
  };

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const answer = turn.parts.filter((p) => p.kind === "text" && p.channel === "answer");

  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={run}
          disabled={turn.status === "streaming"}
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {turn.status === "streaming" ? "실행 중…" : "에이전트 실행"}
        </button>
        <span className="text-xs text-muted">
          "지난 주간 보고 요약해줘" 요청의 SSE 이벤트 시퀀스를 재생합니다
        </span>
      </div>

      {turn.status === "idle" ? (
        <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted">
          실행하면 추론 → 도구 호출 → 응답 스트리밍 과정이 표시됩니다
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <ProcessCard turn={turn} />
          {answer.length > 0 && (
            <div className="max-w-[720px] whitespace-pre-wrap text-sm leading-relaxed">
              {answer.map((p, i) =>
                p.kind === "text"
                  ? p.text.split("**").map((seg, j) => (j % 2 ? <b key={`${i}-${j}`}>{seg}</b> : seg))
                  : null,
              )}
              {turn.status === "streaming" && <span className="animate-pulse text-muted">▋</span>}
            </div>
          )}
          {turn.status === "done" && (
            <p className="font-mono text-[11px] text-muted">response.completed</p>
          )}
        </div>
      )}
    </div>
  );
}
