"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 실시간 수업 세션 UI 패턴 데모 (포커스팡 '포커스타임'에서 구현한 패턴 재구성)
 * 실무에서는 WebSocket으로 학생 접속·상태를 실시간 수신 —
 * 여기서는 서버 없이 접속·상태 변화 이벤트를 시뮬레이션.
 */
type StudentStatus = "집중" | "자리비움" | "이탈";
type Student = { id: number; name: string; status: StudentStatus };

const NAMES = ["김민준", "이서연", "박도윤", "최지우", "정하은", "강시우", "조은우", "윤서아"];

const statusStyle: Record<StudentStatus, string> = {
  집중: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  자리비움: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  이탈: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
};

export default function LiveClassDemo() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  const stop = () => {
    timers.current.forEach(clearInterval);
    timers.current = [];
    setRunning(false);
    setSeconds(0);
    setStudents([]);
  };

  const start = () => {
    setRunning(true);
    // 경과 시간
    timers.current.push(setInterval(() => setSeconds((s) => s + 1), 1000));
    // 학생 순차 입장 (WebSocket join 이벤트 시뮬레이션)
    let joined = 0;
    timers.current.push(
      setInterval(() => {
        if (joined < NAMES.length) {
          const id = joined;
          setStudents((prev) => [...prev, { id, name: NAMES[id], status: "집중" }]);
          joined += 1;
        }
      }, 900),
    );
    // 상태 변화 (status 이벤트 시뮬레이션)
    timers.current.push(
      setInterval(() => {
        setStudents((prev) => {
          if (prev.length === 0) return prev;
          const i = Math.floor(Math.random() * prev.length);
          const roll = Math.random();
          const status: StudentStatus = roll < 0.7 ? "집중" : roll < 0.9 ? "자리비움" : "이탈";
          return prev.map((s, idx) => (idx === i ? { ...s, status } : s));
        });
      }, 1500),
    );
  };

  useEffect(() => () => timers.current.forEach(clearInterval), []);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const focused = students.filter((s) => s.status === "집중").length;

  return (
    <div className="rounded-xl border border-border bg-bg p-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={running ? stop : start}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 ${
            running
              ? "bg-rose-500/15 text-rose-600 dark:text-rose-300"
              : "bg-accent text-accent-contrast"
          }`}
        >
          {running ? "수업 종료" : "수업 시작"}
        </button>
        {running && (
          <>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              진행 중 · <span className="font-mono">{mmss}</span>
            </span>
            <span className="ml-auto text-sm text-muted">
              학생 <b className="text-text">{students.length}</b>명 · 집중{" "}
              <b className="text-text">{focused}</b>명
            </span>
          </>
        )}
      </div>

      {students.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted">
          {running ? "학생 입장 대기 중…" : "수업을 시작하면 학생 접속이 시뮬레이션됩니다"}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {students.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5 text-sm"
            >
              <span>{s.name}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs ${statusStyle[s.status]}`}>
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
