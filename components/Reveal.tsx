"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 스크롤 진입 시 페이드 + 슬라이드업으로 나타나는 래퍼.
 * delay로 카드 목록 등을 스태거(순차) 연출할 수 있다.
 * 사용자가 '동작 줄이기'를 켠 경우 이동 없이 페이드만 적용.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
