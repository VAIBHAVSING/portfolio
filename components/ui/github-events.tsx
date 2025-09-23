"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatedListDemo } from "@/components/ui/demo";
import { Eye, EyeOff } from 'lucide-react';
import { useContributions } from '@/components/ui/contributions-context';

interface GitHubEvent {
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
  stateLabel?: string;
}

export function GitHubEvents() {
  const { contributions, loading } = useContributions();
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);
  const [isHidden, setIsHidden] = useState(false);

  // Load hidden state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('github-notifications-hidden');
    if (saved === 'true') {
      setIsHidden(true);
    }
  }, []);

  // Save hidden state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('github-notifications-hidden', isHidden.toString());
  }, [isHidden]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  // derive events from contributions list (limit 8 for animation)
  useEffect(() => {
    if (loading) return;
    const derived = contributions.slice(0, 8).map(pr => {
      let name = 'Updated pull request';
      let icon = 'pr-updated';
      let color = '#57606a';
      let stateLabel = 'updated';
      if (pr.state === 'open') {
        name = 'Opened pull request';
        icon = 'pr-open';
        color = '#238636';
        stateLabel = 'open';
      } else if (pr.state === 'merged') {
        name = 'Merged pull request';
        icon = 'pr-merged';
        color = '#8250df';
        stateLabel = 'merged';
      } else if (pr.state === 'closed') {
        name = 'Closed pull request';
        icon = 'pr-closed';
        color = '#da3633';
        stateLabel = 'closed';
      }
      const repoFullName = pr.repo;
      const orgName = repoFullName.split('/')[0];
      return {
        name,
        description: pr.title,
        time: new Date(pr.created).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        icon,
        color,
        url: pr.url,
        title: pr.title,
        repoFullName,
        orgName,
        orgAvatar: pr.ownerAvatar,
        stateLabel,
      } as GitHubEvent;
    });
    setGithubEvents(derived);
  }, [contributions, loading]);

  return (
    <div className="relative">
      {!isHidden && <AnimatedListDemo notifications={githubEvents} />}
      <button
        onClick={toggleHidden}
        className="absolute -top-2 -right-2 w-6 h-6 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center hover:bg-background/90 transition-colors z-10"
        title={isHidden ? "Show notifications" : "Hide notifications"}
      >
        {isHidden ? (
          <Eye className="w-3 h-3 text-muted-foreground" />
        ) : (
          <EyeOff className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}
