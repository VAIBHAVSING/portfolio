"use client";
import React from "react";
import MacOSDock from "@/components/ui/mac-dock";
import { DOCK_ITEMS, PERSONAL_INFO } from "@/lib/personal-data";

export const DockWrapper: React.FC = () => {
  return (
    <MacOSDock
      apps={DOCK_ITEMS.map((item) => ({
        id: item.name.toLowerCase(),
        name: item.name,
        icon: item.icon,
      }))}
      onAppClick={(appId: string) => {
        const item = DOCK_ITEMS.find((i) => i.name.toLowerCase() === appId);
        if (!item) return;
        if ("targetId" in item) {
          document
            .getElementById((item as { targetId: string }).targetId)
            ?.scrollIntoView({ behavior: "smooth" });
          return;
        }
        if ("external" in item) {
          window.open((item as { external: string }).external, "_blank");
          return;
        }
        if ("download" in item) {
          const link = document.createElement("a");
          link.href = PERSONAL_INFO.resume.path;
          link.download = PERSONAL_INFO.resume.downloadName;
          link.click();
        }
      }}
      openApps={["about"]}
    />
  );
};
