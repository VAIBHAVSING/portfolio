import { cn } from "@/lib/utils";
import { useState } from "react";

interface BackgroundComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundComponent: React.FC<BackgroundComponentProps> = ({
  children,
  className = ""
}) => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("min-h-screen w-full relative bg-background overflow-hidden", className)}>
      {/* Soft Yellow Glow using CSS custom properties */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, var(--primary) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, var(--primary) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 40%),
            radial-gradient(circle at 10% 80%, var(--primary) 0%, transparent 50%),
            radial-gradient(circle at 90% 20%, var(--primary) 0%, transparent 50%)
          `,
          opacity: 0.35,
          mixBlendMode: "multiply",
        }}
      />

      {/* Subtle gradient overlay for better text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg, transparent 0%, rgba(var(--primary-rgb), 0.08) 30%, transparent 70%),
            linear-gradient(45deg, transparent 0%, rgba(var(--primary-rgb), 0.05) 50%, transparent 100%)
          `,
        }}
      />

      {/* Additional ambient glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(var(--primary-rgb), 0.03) 70%, transparent 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
