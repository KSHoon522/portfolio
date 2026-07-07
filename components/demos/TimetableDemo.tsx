"use client";

import { useState } from "react";

/**
 * 시간표 관리 UI 패턴 데모 (포커스팡에서 구현한 패턴 재구성)
 * 과목 선택 → 빈 교시 클릭으로 배치, 배치된 수업 클릭으로 제거.
 */
const DAYS = ["월", "화", "수", "목", "금"];
const PERIODS = 6;

type Subject = { name: string; color: string };

const SUBJECTS: Subject[] = [
  { name: "국어", color: "bg-sky-500/15 text-sky-600 dark:text-sky-300" },
  { name: "수학", color: "bg-violet-500/15 text-violet-600 dark:text-violet-300" },
  { name: "영어", color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" },
  { name: "과학", color: "bg-amber-500/15 text-amber-600 dark:text-amber-300" },
  { name: "사회", color: "bg-rose-500/15 text-rose-600 dark:text-rose-300" },
];

export default function TimetableDemo() {
  const [selected, setSelected] = useState<Subject>(SUBJECTS[0]);
  const [grid, setGrid] = useState<Record<string, Subject>>({
    "0-0": SUBJECTS[0],
    "1-2": SUBJECTS[1],
  });

  const toggleCell = (key: string) =>
    setGrid((g) => {
      const next = { ...g };
      if (next[key]) delete next[key];
      else next[key] = selected;
      return next;
    });

  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">수업 추가:</span>
        {SUBJECTS.map((s) => (
          <button
            key={s.name}
            onClick={() => setSelected(s)}
            className={`rounded-full px-3 py-1 text-xs transition-all ${s.color} ${
              selected.name === s.name
                ? "ring-2 ring-accent"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            {s.name}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted">
          빈 칸 클릭 = 배치 · 수업 클릭 = 삭제
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {DAYS.map((day) => (
          <div key={day} className="rounded-md border border-border py-1.5 text-center text-sm font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: PERIODS }).flatMap((_, period) =>
          DAYS.map((_, day) => {
            const key = `${day}-${period}`;
            const cell = grid[key];
            return (
              <button
                key={key}
                onClick={() => toggleCell(key)}
                className={`flex h-14 flex-col items-center justify-center rounded-md border text-xs transition-colors ${
                  cell
                    ? `border-transparent font-semibold ${cell.color}`
                    : "border-dashed border-border text-muted/50 hover:border-accent hover:text-accent"
                }`}
              >
                {cell ? (
                  <>
                    <span>{cell.name}</span>
                    <span className="font-mono opacity-60">{period + 1}교시</span>
                  </>
                ) : (
                  "+"
                )}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
}
