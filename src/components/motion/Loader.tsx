'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function Loader() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Sayfada bir kez gösterilir (oturum boyunca)
    if (typeof window !== 'undefined' && sessionStorage.getItem('ulu-loaded')) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('ulu-loaded', '1');
    }, reduce ? 300 : 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-36 w-36 md:h-44 md:w-44"
          >
            <Image
              src="/logo.png"
              alt="Ulu Global Yapı"
              width={300}
              height={300}
              priority
              className="h-full w-full object-contain"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gold-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
