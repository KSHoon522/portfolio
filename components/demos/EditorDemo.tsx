"use client";

import { useRef, useState } from "react";

/**
 * AI 보도자료 에디터 — 생성형 AI 업무 플랫폼 실제 코드 기반
 *
 * 툴바 · 첨삭 모드 토글 · 영문번역 · 수정 중 오버레이 · AI 프롬프트 바
 * 구조를 실제 구현에서 색상까지 그대로 이식.
 * 실제 구현은 TipTap(StarterKit + TextStyle + Color + FontSize) —
 * 데모는 contentEditable 로 대체하고 AI API 호출은 시뮬레이션.
 * 실서비스 색상을 유지하기 위해 라이트 고정 스타일.
 */

const ORIGIN_HTML =
  "<h1>공항 이용객 편의 서비스 확대</h1><h2>AI 안내 로봇 시범 운영 개시</h2><p>공항공사는 이용객 편의 향상을 위해 AI 안내 로봇을 여객터미널에 시범 배치한다고 밝혔다. 로봇은 다국어 길안내와 항공편 정보를 제공한다.</p>";

const REVISED_HTML =
  "<h1>공항 이용객 편의 서비스 대폭 확대</h1><h2>AI 안내 로봇 시범 운영 개시… 다국어 안내 지원</h2><p>공항공사는 이용객 편의를 한층 높이기 위해 AI 안내 로봇을 여객터미널에 시범 배치한다고 밝혔다. 로봇은 <strong>다국어 길안내와 실시간 항공편 정보</strong>를 제공하며, 시범 운영 결과를 토대로 배치를 확대할 계획이다.</p>";

const EN_HTML =
  "<h1>Airport Expands Passenger Convenience Services</h1><h2>Pilot Operation of AI Guide Robots Begins</h2><p>The airport authority announced the pilot deployment of AI guide robots in passenger terminals to enhance convenience. The robots provide <strong>multilingual wayfinding and real-time flight information</strong>.</p>";

const FONT_SIZES = [
  { name: "작게", value: "14px" },
  { name: "보통", value: "16px" },
  { name: "크게", value: "18px" },
  { name: "매우크게", value: "20px" },
];

const COLORS = [
  { name: "기본", value: "#000000" },
  { name: "빨강", value: "#ff0000" },
  { name: "파랑", value: "#0000ff" },
  { name: "초록", value: "#008000" },
];

// 원본 툴바의 shadcn Button(variant=outline/default, h-10 w-10 p-0) 재현
function ToolButton({
  active,
  disabled,
  onAction,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onAction: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      title={label}
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();
        onAction();
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-md border text-gray-700 transition-colors disabled:opacity-40 ${
        active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function EditorDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"ko" | "en">("ko");
  const [isTranslated, setIsTranslated] = useState(false);

  const exec = (command: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, value);
  };

  const setHtml = (html: string) => {
    if (ref.current) ref.current.innerHTML = html;
  };

  // 원본 handleUpdateReport — API 호출을 타이머로 시뮬레이션
  const handleUpdateReport = () => {
    if (!inputValue.trim() || isUpdating) return;
    setIsUpdating(true);
    setTimeout(() => {
      setHtml(REVISED_HTML);
      setInputValue("");
      setIsUpdating(false);
    }, 1600);
  };

  const handleTranslate = () => {
    if (isTranslating) return;
    if (isTranslated) {
      const next = selectedLang === "ko" ? "en" : "ko";
      setSelectedLang(next);
      setHtml(next === "en" ? EN_HTML : ORIGIN_HTML);
      return;
    }
    setIsTranslating(true);
    setTimeout(() => {
      setHtml(EN_HTML);
      setIsTranslating(false);
      setIsTranslated(true);
      setSelectedLang("en");
    }, 1400);
  };

  return (
    <div className="rounded-lg bg-white text-gray-900">
      <div className="rounded-lg border border-gray-200">
        {/* 툴바 — 원본 border-b p-4 구조 */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <ToolButton label="굵게" disabled={!isEditable} onAction={() => exec("bold")}>
              <b>B</b>
            </ToolButton>
            <ToolButton label="기울임" disabled={!isEditable} onAction={() => exec("italic")}>
              <i>I</i>
            </ToolButton>
            <ToolButton label="밑줄" disabled={!isEditable} onAction={() => exec("underline")}>
              <u>U</u>
            </ToolButton>

            <div className="mx-2 h-6 w-px bg-gray-200" />

            <ToolButton label="글머리 목록" disabled={!isEditable} onAction={() => exec("insertUnorderedList")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h0m0 6h0m0 6h0" strokeLinecap="round" /></svg>
            </ToolButton>
            <ToolButton label="번호 목록" disabled={!isEditable} onAction={() => exec("insertOrderedList")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M4 18h2v-1l-2-1v-1h2" strokeLinecap="round" /></svg>
            </ToolButton>

            <div className="mx-2 h-6 w-px bg-gray-200" />

            <select
              disabled={!isEditable}
              defaultValue=""
              onChange={(e) => e.target.value && exec("fontSize", e.target.value === "14px" ? "2" : e.target.value === "16px" ? "3" : e.target.value === "18px" ? "4" : "5")}
              className="h-8 w-24 rounded-md border border-gray-200 bg-white px-2 text-xs disabled:opacity-40"
            >
              <option value="" disabled>크기</option>
              {FONT_SIZES.map((s) => (
                <option key={s.value} value={s.value}>{s.name}</option>
              ))}
            </select>
            <select
              disabled={!isEditable}
              defaultValue=""
              onChange={(e) => e.target.value && exec("foreColor", e.target.value)}
              className="h-8 w-24 rounded-md border border-gray-200 bg-white px-2 text-xs disabled:opacity-40"
            >
              <option value="" disabled>색상</option>
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 첨삭하기 / 영문번역 — 원본 색상 그대로 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditable(!isEditable)}
              className={`h-10 rounded-md border px-4 text-sm font-bold transition-colors ${
                isEditable
                  ? "border-transparent bg-[#00b569] text-white hover:bg-[#00b569]/80"
                  : "border-[#00b569] bg-white text-[#00b569] hover:border-[#00b569]/80 hover:text-[#00b569]/80"
              }`}
            >
              {isEditable ? "읽기전용" : "첨삭하기"}
            </button>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className={`h-10 rounded-md border border-[#4967FF] bg-white px-4 text-sm font-bold text-[#4967FF] transition-colors hover:border-[#4967FF]/80 hover:text-[#4967FF]/80 ${
                isTranslating ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isTranslating ? "번역 중..." : isTranslated ? (selectedLang === "ko" ? "영문번역" : "원문보기") : "영문번역"}
            </button>
          </div>
        </div>

        {/* 에디터 영역 + 수정 중 오버레이 — 원본 구조 */}
        <div className="relative flex flex-col p-4">
          {isUpdating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#148d76]" />
                <p className="text-lg font-medium text-[#148d76]">보도자료 수정 중...</p>
              </div>
            </div>
          )}
          <div
            ref={ref}
            contentEditable={isEditable}
            suppressContentEditableWarning
            className="min-h-[200px] flex-1 cursor-text rounded-md p-3 text-[15px] leading-relaxed outline-none [&_h1]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-600 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: ORIGIN_HTML }}
          />

          {/* AI 프롬프트 바 — 원본 bg-[#f4f5f6] rounded-2xl */}
          <div className="relative mt-4">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f4f5f6] p-3">
              <input
                type="text"
                placeholder="자연어로 메세지를 입력하세요 (예: 제목을 더 강조해줘)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleUpdateReport();
                  }
                }}
                className="h-10 flex-1 border-none bg-transparent px-0 text-base outline-none placeholder:text-gray-400"
              />
              <div className="flex gap-1">
                <button className="rounded-md p-2 text-gray-500 hover:bg-gray-200" aria-label="음성 입력">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" /></svg>
                </button>
                <button className="rounded-md p-2 text-gray-500 hover:bg-gray-200" aria-label="파일 첨부">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                </button>
                <button
                  onClick={handleUpdateReport}
                  disabled={isUpdating || !inputValue.trim()}
                  className="rounded-md p-2 hover:bg-gray-200 disabled:cursor-not-allowed"
                  aria-label="전송"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isUpdating || !inputValue.trim() ? "#9ca3af" : "#0B50D0"} strokeWidth="2">
                    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
