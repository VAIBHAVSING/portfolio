"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  url: string;
  title: string;
  repoFullName: string;
  orgName: string;
  orgAvatar?: string;
}

const Notification = ({ name, description, icon, color, time, url, title, repoFullName, orgName }: Item) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  // GitHub SVG icons
  const getIcon = (iconName: string, color: string): React.JSX.Element => {
    const iconMap: { [key: string]: React.JSX.Element } = {
      'git-pull-request': (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
        </svg>
      ),
      'git-merge': (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M5.45 5.154A4.25 4.25 0 009.25 7.5h1.378a2.251 2.251 0 11.75-1.5V5.25a.75.75 0 011.5 0v.621l.544-.544a.75.75 0 111.061 1.062L13.258 7.57a.75.75 0 010 1.061l-1.224 1.224a.75.75 0 11-1.061-1.062l.544-.543V7.5A2.25 2.25 0 019.25 5.25h-3.5a.75.75 0 00-.75.75v5.45a2.25 2.25 0 11-1.5 0V6a.75.75 0 01.75-.75z"/>
        </svg>
      ),
      'git-pull-request-closed': (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
        </svg>
      ),
      'issue-opened': (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
        </svg>
      ),
    };
    return iconMap[iconName] || (
      <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
        <circle cx="8" cy="8" r="2"/>
      </svg>
    );
  };

  return (
    <figure
      onClick={handleClick}
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // transparent styles with blur
        "bg-white/5 backdrop-blur-sm border border-white/10",
        // dark styles
        "transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl text-white font-bold"
          style={{
            backgroundColor: color,
          }}
        >
          {getIcon(icon, color)}
        </div>
        <div className="flex flex-col overflow-hidden flex-1">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60 truncate">
            {title}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {orgName}/{repoFullName.split('/')[1] || repoFullName}
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
