"use client";

import { useMemo, useRef, useState } from "react";

/**
 * 어드민 작업 관리 테이블 — 관리자 대시보드 실제 코드 기반
 *
 * 테이블 툴바(헤더 · 멀티셀렉트 필터 · 검색) + 필터 칩 결과 +
 * 테이블 카드(테이블 · 페이지네이션) 구조를 실제 구현에서 이식.
 * 실제 구현은 MUI + 커스텀 필터/테이블 훅 — 데모는 동일한 상태 설계를
 * useState/useMemo 로 재현하고 데이터는 샘플.
 * 실서비스 테마 재현을 위해 라이트 고정 스타일.
 */

type Task = {
  id: number;
  name: string;
  service: string;
  status: "성공" | "실행 중" | "실패" | "대기";
  lastRun: string;
};

const SERVICES = ["색인 관리", "문서 수집", "AI 분류", "리포트"];
const STATUSES: Task["status"][] = ["성공", "실행 중", "실패", "대기"];

const TASKS: Task[] = Array.from({ length: 27 }, (_, i) => ({
  id: i + 1,
  name: `배치 작업 ${String(i + 1).padStart(2, "0")}`,
  service: SERVICES[i % SERVICES.length],
  status: STATUSES[(i * 5) % 4],
  lastRun: `2026-07-0${(i % 7) + 1} 0${i % 10}:${String((i * 13) % 60).padStart(2, "0")}`,
}));

// Minimal UI 의 soft chip 스타일
const statusChip: Record<Task["status"], string> = {
  성공: "bg-[#00A76F]/16 text-[#007867]",
  "실행 중": "bg-[#00B8D9]/16 text-[#006C9C]",
  실패: "bg-[#FF5630]/16 text-[#B71D18]",
  대기: "bg-[#919EAB]/16 text-[#637381]",
};

const PAGE_SIZE = 6;

export default function AdminTableDemo() {
  // 원본 useSetState(filters) / useTable(page) 훅의 상태 설계 재현
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const onResetPage = () => setPage(1);

  const toggleService = (s: string) => {
    onResetPage();
    setServices((prev) => (prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]));
  };

  const filtered = useMemo(
    () =>
      TASKS.filter(
        (t) =>
          (services.length === 0 || services.includes(t.service)) &&
          t.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, services],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const canReset = search !== "" || services.length > 0;

  const selectLabel =
    services.length === 0
      ? ""
      : services.length === SERVICES.length
        ? "All"
        : services.length === 1
          ? services[0]
          : `${services.length} selected`;

  return (
    <div className="rounded-2xl bg-white text-[#1C252E] shadow-[0_0_2px_rgba(145,158,171,0.2),0_12px_24px_-4px_rgba(145,158,171,0.12)]">
      {/* TaskTableToolbar — 헤더 · 서비스 멀티셀렉트 · 검색 */}
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center">
        <h3 className="text-lg font-semibold">작업 관리</h3>

        <div ref={selectRef} className="relative min-w-[200px]">
          <button
            onClick={() => setSelectOpen(!selectOpen)}
            className="flex h-12 w-full items-center justify-between rounded-lg border border-[#919EAB]/32 px-3.5 text-sm hover:border-[#1C252E]"
          >
            <span className={selectLabel ? "" : "text-[#919EAB]"}>{selectLabel || "서비스"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-[#637381] transition-transform ${selectOpen ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {selectOpen && (
            <ul className="absolute z-20 mt-1 w-full rounded-lg bg-white py-1 shadow-[0_0_2px_rgba(145,158,171,0.24),-20px_20px_40px_-4px_rgba(145,158,171,0.24)]">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => toggleService(s)}
                    className="flex w-full items-center gap-2 px-2.5 py-1.5 text-sm hover:bg-[#919EAB]/8"
                  >
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded border-2 ${
                        services.includes(s) ? "border-[#00A76F] bg-[#00A76F] text-white" : "border-[#637381]"
                      }`}
                    >
                      {services.includes(s) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 13 4 4L19 7" /></svg>
                      )}
                    </span>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex h-12 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[#919EAB]/32 px-3.5 focus-within:border-[#1C252E]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#637381]">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => { onResetPage(); setSearch(e.target.value); }}
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#919EAB]"
          />
        </div>
      </div>

      {/* TaskTableFiltersResult — 필터 칩 */}
      {canReset && (
        <div className="flex flex-wrap items-center gap-2 px-5 pb-4">
          <span className="text-sm text-[#637381]">
            <b className="text-[#1C252E]">{filtered.length}</b> 건 검색됨
          </span>
          {services.map((s) => (
            <button
              key={s}
              onClick={() => toggleService(s)}
              className="flex items-center gap-1 rounded-lg bg-[#919EAB]/16 px-2 py-1 text-xs font-medium"
            >
              {s}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          ))}
          <button
            onClick={() => { setSearch(""); setServices([]); onResetPage(); }}
            className="ml-1 text-xs font-semibold text-[#FF5630]"
          >
            초기화
          </button>
        </div>
      )}

      {/* GenericTableCard — 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F4F6F8] text-left text-[13px] text-[#637381]">
              <th className="px-5 py-3.5 font-semibold">작업명</th>
              <th className="px-5 py-3.5 font-semibold">서비스</th>
              <th className="px-5 py-3.5 font-semibold">상태</th>
              <th className="px-5 py-3.5 font-semibold">최근 실행</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-dashed border-[#919EAB]/20 hover:bg-[#919EAB]/8">
                <td className="px-5 py-3.5 font-medium">{t.name}</td>
                <td className="px-5 py-3.5 text-[#637381]">{t.service}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex rounded-md px-1.5 py-0.5 text-xs font-bold ${statusChip[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs text-[#637381]">{t.lastRun}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-[#637381]">
                  검색 결과가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MUI TablePagination 스타일 푸터 */}
      <div className="flex items-center justify-end gap-4 px-5 py-3 text-sm text-[#637381]">
        <span className="text-xs">
          {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
            className="rounded-full p-1.5 hover:bg-[#919EAB]/8 disabled:opacity-30"
            aria-label="이전 페이지"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => setPage(current + 1)}
            disabled={current === pageCount}
            className="rounded-full p-1.5 hover:bg-[#919EAB]/8 disabled:opacity-30"
            aria-label="다음 페이지"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
