"use client";

import { useEffect } from "react";

interface SectionObserverProps {
  sectionIds: string[];
}

export function SectionObserver({ sectionIds }: SectionObserverProps) {
  useEffect(() => {
    // Don't run on server
    if (typeof window === "undefined") return;

    const options = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    let isUpdating = false;

    const updateHash = (hash: string) => {
      if (isUpdating) return;
      isUpdating = true;

      // Update URL without scrolling
      const newUrl = hash
        ? `${window.location.pathname}#${hash}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);

      setTimeout(() => {
        isUpdating = false;
      }, 100);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          // Update URL hash when section comes into view
          if (sectionId) {
            updateHash(sectionId);
          }
        }
      });
    }, options);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle initial hash on page load
    if (window.location.hash) {
      const hash = window.location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return null; // This component doesn't render anything
}
