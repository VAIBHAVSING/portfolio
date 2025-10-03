"use client";

import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedList = React.memo(
  ({ className, children, delay = 2500 }: AnimatedListProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    const [paused, setPaused] = useState(false);
    useEffect(() => {
      if (childrenArray.length <= 4) return;
      if (paused) return;
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);
      return () => clearInterval(interval);
    }, [childrenArray.length, delay, paused]);

    const itemsToShow = useMemo(() => {
      if (childrenArray.length <= 4) {
        // Show all items if 4 or fewer
        return childrenArray;
      }

      // Show the 4 most recent items (newest at the end/bottom)
      const startIndex = Math.max(0, currentIndex - 3);
      const endIndex = currentIndex + 1;
      return childrenArray.slice(startIndex, endIndex);
    }, [currentIndex, childrenArray]);

    return (
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring" as const, stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
