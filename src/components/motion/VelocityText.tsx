'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  wrap,
} from 'framer-motion';

/**
 * Scroll hızına göre yön ve hız değiştiren kinetik metin şeridi.
 * Sayfa hızlı kaydırıldığında metin hızlanır; yön scroll yönüne göre değişir.
 */
export function VelocityRow({
  children,
  baseVelocity = 4,
  className,
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className={`flex whitespace-nowrap ${className ?? ''}`} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="block shrink-0 pe-12">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
