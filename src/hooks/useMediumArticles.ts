'use client';

import { useEffect, useState } from 'react';

export interface MediumArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  readTime?: string;
  thumbnail?: string;
}

export function useMediumArticles(username: string, limit: number = 6) {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();

        if (data.status !== 'ok') {
          throw new Error('Invalid RSS feed');
        }

        const formattedArticles: MediumArticle[] = data.items
          .slice(0, limit)
          .map((item: any, index: number) => {
            // Extract read time from description if available
            const readTimeMatch = item.description?.match(/(\d+)\s*min\s*read/i);
            const readTime = readTimeMatch ? `${readTimeMatch[1]} min read` : undefined;

            // Clean description (remove HTML tags)
            const cleanDescription = item.description
              ?.replace(/<[^>]*>/g, '')
              .substring(0, 150)
              .trim() + '...';

            // Format date
            const publishedDate = new Date(item.pubDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            });

            return {
              id: item.guid || `medium-${index}`,
              title: item.title,
              description: cleanDescription || item.title,
              url: item.link,
              publishedDate,
              readTime,
              thumbnail: item.thumbnail,
            };
          });

        setArticles(formattedArticles);
      } catch (err) {
        setError('Unable to load latest articles');
        console.error('Error fetching Medium articles:', err);

        // Fallback to empty array instead of breaking the page
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [username, limit]);

  return { articles, loading, error };
}
