"use client";

import React, { useEffect, useState } from 'react';
import { AnimatedListDemo } from "@/components/ui/demo";

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
}

export function GitHubEvents() {
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);

  useEffect(() => {
    // Fetch open source contributions (PRs to repositories not owned by the user)
    const fetchOpenSourceContributions = async () => {
      try {
        // First, get user's own repositories to filter them out
        const userReposResponse = await fetch('https://api.github.com/users/VAIBHAVSING/repos?per_page=100');
        const userRepos = await userReposResponse.json();
        const userRepoNames = new Set(userRepos.map((repo: any) => repo.full_name));

        // Search for PRs created by the user
        const searchQuery = 'author:VAIBHAVSING type:pr';
        const searchResponse = await fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(searchQuery)}&sort=created&order=desc&per_page=20`);
        const searchData = await searchResponse.json();

        const formattedEvents = searchData.items
          .filter((pr: any) => {
            // Only show PRs to repositories not owned by the user (open source contributions)
            return !userRepoNames.has(pr.repository_url.replace('https://api.github.com/repos/', ''));
          })
          .slice(0, 8) // Fetch 8 events for smooth rolling effect
          .map((pr: any) => {
            const isMerged = pr.state === 'closed' && pr.pull_request?.merged;
            const isClosed = pr.state === 'closed' && !pr.pull_request?.merged;

            let name = 'Unknown event';
            let icon = '❓';
            let color = '#808080';

            if (pr.state === 'open') {
              name = 'Opened a pull request';
              icon = 'git-pull-request';
              color = '#238636'; // GitHub green
            } else if (isMerged) {
              name = 'Merged a pull request';
              icon = 'git-merge';
              color = '#8250df'; // GitHub purple for merged
            } else if (isClosed) {
              name = 'Closed a pull request';
              icon = 'git-pull-request-closed';
              color = '#da3633'; // GitHub red for closed
            }

            return {
              name,
              description: pr.title,
              time: new Date(pr.created_at).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }),
              icon,
              color,
              url: pr.html_url,
              title: pr.title,
              repoFullName: pr.repository_url.replace('https://api.github.com/repos/', ''),
              orgName: pr.repository_url.replace('https://api.github.com/repos/', '').split('/')[0],
              orgAvatar: pr.user?.avatar_url,
            };
          });

        setGithubEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching open source contributions:', error);

        // Fallback to original method if search API fails
        fetch('https://api.github.com/users/VAIBHAVSING/events/public')
          .then(response => response.json())
          .then(data => {
            const fallbackEvents = data
              .filter((event: any) => event.type === 'PullRequestEvent')
              .slice(0, 8)
              .map((event: any) => ({
                name: 'Open Source Contribution',
                description: event.payload.pull_request?.title || `PR #${event.payload.number}`,
                time: new Date(event.created_at).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }),
                icon: 'git-pull-request',
                color: '#238636',
                url: event.payload.pull_request?.html_url || '',
                title: event.payload.pull_request?.title || '',
                repoFullName: event.repo.name,
                orgName: event.repo.name.split('/')[0],
                orgAvatar: event.org?.avatar_url,
              }));
            setGithubEvents(fallbackEvents);
          })
          .catch(fallbackError => {
            console.error('Fallback method also failed:', fallbackError);
          });
      }
    };

    fetchOpenSourceContributions();
  }, []);

  return <AnimatedListDemo notifications={githubEvents} />;
}
