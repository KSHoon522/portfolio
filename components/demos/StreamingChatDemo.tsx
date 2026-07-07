"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 실시간 스트리밍 채팅 — 개인 AI 채팅 프로젝트 실제 코드 기반
 *
 * 사용자·AI 메시지(플로우 스텝 블록, 후속 질문)와 입력 박스 구조,
 * rAF 기반 타이핑 훅을 실제 구현에서 이식.
 * 실제로는 SSE 수신 → 스토어 누적 → 타이핑 애니메이션 — 여기서는 수신만 시뮬레이션.
 */

type FlowStep = { label: string; durationMs: number };

const REPLY =
  "안녕하세요! 응답은 SSE로 수신한 내용을 누적한 뒤 requestAnimationFrame으로 잘라 그리는 타이핑 애니메이션으로 표시됩니다.\n\n위 플로우 블록을 펼치면 단계별 소요 시간을 확인할 수 있고, 아래 후속 질문을 누르면 대화가 이어집니다.";

const FLOW_SEQUENCE = ["문서 검색 중", "RAG 검색 중", "응답 생성 중"];
const FOLLOWS = ["타이핑 애니메이션은 어떻게 구현했나요?", "SSE와 WebSocket은 어떻게 나눠 썼나요?"];

// 원본 MessagesContainer.tsx 의 useTypingEffect 이식 (rAF, 프레임당 4자)
const TYPING_CHARS_PER_FRAME = 4;

function useTypingEffect(fullContent: string, active: boolean, onComplete: () => void) {
  const [displayed, setDisplayed] = useState("");
  const lengthRef = useRef(0);
  const rafRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!active) return;
    lengthRef.current = 0;
    const animate = () => {
      const target = fullContent.length;
      if (lengthRef.current < target) {
        lengthRef.current = Math.min(lengthRef.current + TYPING_CHARS_PER_FRAME, target);
        setDisplayed(fullContent.slice(0, lengthRef.current));
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onCompleteRef.current();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [fullContent, active]);

  return displayed;
}

type Message = { id: number; role: "user" | "assistant"; text: string };
type Phase = "idle" | "accumulating" | "typing" | "complete";

export default function StreamingChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [flowStatus, setFlowStatus] = useState("");
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [flowExpanded, setFlowExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const streaming = phase === "accumulating" || phase === "typing";
  const typed = useTypingEffect(REPLY, phase === "typing", () => setPhase("complete"));

  // 컨테이너 내부만 스크롤 — scrollIntoView는 페이지 전체를 끌고 가므로 사용하지 않음
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typed, flowStatus, phase]);

  useEffect(() => () => timeouts.current.forEach(clearTimeout), []);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: content }]);
    setFlowSteps([]);
    setFlowExpanded(false);
    setPhase("accumulating");

    // 플로우 스텝 시뮬레이션 (실제로는 SSE status 이벤트)
    FLOW_SEQUENCE.forEach((label, i) => {
      timeouts.current.push(
        setTimeout(() => {
          setFlowStatus(label);
          setFlowSteps((s) => [...s, { label, durationMs: 400 + Math.random() * 900 }]);
        }, 500 * (i + 1)),
      );
    });
    // COMPLETE 이벤트 → 타이핑 단계 진입 (원본 phase 흐름 동일)
    timeouts.current.push(setTimeout(() => setPhase("typing"), 500 * FLOW_SEQUENCE.length + 700));
  };

  const showAgentBlock = streaming || phase === "complete";
  const agentText = phase === "complete" ? REPLY : typed;

  return (
    <div className="mx-auto flex h-[480px] max-w-2xl flex-col rounded-xl border border-border bg-bg">
      {/* 메시지 목록 — 실제 구현의 컨테이너 구조 */}
      <div ref={listRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="flex flex-col gap-6 min-w-0">
          {messages.length === 0 && (
            <p className="mt-16 text-center text-sm text-muted">
              무엇이든 입력해 보세요 — SSE 수신 → 누적 → 타이핑 애니메이션 순서로 렌더링됩니다
            </p>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="group/user-message flex w-full flex-col items-end gap-2">
              <div className="rounded-3xl bg-gray-100 px-5 py-2 dark:bg-gray-800">{msg.text}</div>
            </div>
          ))}

          {/* AgentMessage — 아바타 + 모델명 + 플로우 블록 + 본문 + 후속 질문 */}
          {showAgentBlock && (
            <div className="group/agent-message flex w-full min-w-0 gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                AI
              </div>
              <div className="flex w-full min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <div className="text-lg font-medium">Assistant</div>
                </div>

                {/* 플로우 스텝 블록 (원본 showFlowBlock) */}
                {flowSteps.length > 0 && (
                  <div className="overflow-hidden rounded border border-border bg-card/50 text-sm">
                    <div
                      className="flex min-h-[40px] cursor-pointer items-center justify-between gap-2 px-3 py-2"
                      onClick={() => setFlowExpanded(!flowExpanded)}
                    >
                      <span className={`flex-1 font-medium text-muted ${phase === "accumulating" ? "animate-pulse" : ""}`}>
                        {phase === "accumulating" ? flowStatus : "응답 완료"}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`text-muted transition-transform ${flowExpanded ? "rotate-180" : ""}`}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                    {flowExpanded && (
                      <div className="flex flex-col gap-1.5 border-t border-border/80 bg-bg/50 px-3 py-2">
                        {flowSteps.map((step, i) => (
                          <div key={i} className="flex justify-between gap-2 text-xs text-muted">
                            <span>{step.label}</span>
                            <span className="tabular-nums">{(step.durationMs / 1000).toFixed(1)}s</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 본문 (타이핑 중이면 커서 표시) */}
                <div className="flex flex-col gap-4 whitespace-pre-wrap text-sm leading-relaxed">
                  {agentText}
                  {streaming && <span className="-mt-4 animate-pulse text-muted">▋</span>}
                </div>

                {/* 후속 질문 (원본 follows) */}
                {phase === "complete" && (
                  <div className="mt-2 flex flex-col gap-1">
                    {FOLLOWS.map((f) => (
                      <button
                        key={f}
                        onClick={() => send(f)}
                        className="flex w-full cursor-pointer items-center gap-2 px-1.5 py-1.5 text-left text-sm text-muted transition hover:text-text"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 5v6a4 4 0 0 0 4 4h12m0 0-4-4m4 4-4 4" />
                        </svg>
                        <p>{f}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ChatInput — 원본 rounded-3xl 입력 박스 구조 */}
      <div className="p-3">
        <div className="flex w-full flex-col gap-0 rounded-3xl border border-border bg-card p-2 shadow-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="메시지를 입력하세요"
            className="max-h-[200px] min-h-[40px] w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted"
          />
          <div className="flex w-full items-center gap-1">
            <div className="flex min-w-0 flex-1 items-center gap-1">
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg" aria-label="도구 선택">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg" aria-label="파일 첨부">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
              </button>
            </div>
            <button
              onClick={() => send()}
              disabled={streaming || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label={streaming ? "중지" : "전송"}
            >
              {streaming ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="1.5" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19V5m-7 7 7-7 7 7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
