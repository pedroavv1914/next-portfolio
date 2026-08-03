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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed right-6 bottom-6 z-50 grid size-11 cursor-pointer place-items-center border border-edge bg-coal/80 text-lime backdrop-blur-md transition-colors duration-200 hover:border-lime hover:bg-lime hover:text-coal"
        >
          ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
