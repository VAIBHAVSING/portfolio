"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import {
  GitPullRequest,
  GitMerge,
  OctagonX,
  GitCommit,
  CircleDot,
} from "lucide-react";
import Image from "next/image";

interface Item {
  name: string;
  description: string;
  icon: string; // semantic key like pr-open, pr-merged, pr-closed
  color: string;
  time: string;
  url: string;
  title: string;
  repoFullName: string;
  orgName: string;
  orgAvatar?: string;
  stateLabel?: string;
}

const Notification = ({
  name,
  icon,
  color,
  time,
  url,
  title,
  repoFullName,
  orgName,
  orgAvatar,
  stateLabel,
}: Item) => {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const getIcon = (iconName: string): React.JSX.Element => {
    switch (iconName) {
      case "pr-open":
        return <GitPullRequest className="h-4 w-4" />;
      case "pr-merged":
        return <GitMerge className="h-4 w-4" />;
      case "pr-closed":
        return <OctagonX className="h-4 w-4" />;
      case "commit":
        return <GitCommit className="h-4 w-4" />;
      default:
        return <CircleDot className="h-4 w-4" />;
    }
  };

  return (
    <figure
      onClick={handleClick}
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[420px] cursor-pointer overflow-hidden rounded-xl p-3",
        "transition-all duration-200 ease-in-out hover:scale-[102%]",
        "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-md border border-border/50",
        "focus-within:ring-2 focus-within:ring-primary/40 focus:outline-none",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        {orgAvatar ? (
          <div className="relative size-10 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={orgAvatar}
              alt={orgName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
            <div
              className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center border border-background"
              style={{ backgroundColor: color }}
            >
              {getIcon(icon)}
            </div>
          </div>
        ) : (
          <div
            className="flex size-10 items-center justify-center rounded-2xl text-white font-bold"
            style={{ backgroundColor: color }}
          >
            {getIcon(icon)}
          </div>
        )}
        <div className="flex flex-col overflow-hidden flex-1">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
            {stateLabel && (
              <span
                className="ml-2 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
                style={{ backgroundColor: color + "22", color }}
              >
                {stateLabel}
              </span>
            )}
          </figcaption>
          <p className="text-sm font-normal dark:text-white/70 text-muted-foreground truncate">
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {orgName}/{repoFullName.split("/")[1] || repoFullName}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListDemo({
  notifications,
  className,
}: {
  notifications: Item[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-md flex-col gap-2 p-2 overflow-visible bg-transparent",
        className,
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
