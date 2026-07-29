"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-6 right-6 z-50 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-neon-500/35 bg-void/70 text-neon-300 backdrop-blur-md transition-[background,color,box-shadow] duration-300 hover:bg-neon-500 hover:text-void hover:shadow-[0_0_26px_-6px_var(--color-neon-400)]"
        >
          ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
