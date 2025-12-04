import { NextResponse } from "next/server";

interface MediumArticle {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedDate: string;
  readTime?: string;
  tags: string[];
  platform: "Medium";
}

// Parse Medium RSS feed
async function parseMediumRSS(username: string): Promise<MediumArticle[]> {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const xmlText = await response.text();

    // Parse XML using regex (simple parsing for RSS)
    const items: MediumArticle[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];

      // Extract title
      const titleMatch = /<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(
        itemContent,
      );
      const title = titleMatch ? titleMatch[1] : "";

      // Extract link
      const linkMatch = /<link>(.*?)<\/link>/.exec(itemContent);
      const url = linkMatch ? linkMatch[1] : "";

      // Extract guid for unique ID
      const guidMatch = /<guid.*?>(.*?)<\/guid>/.exec(itemContent);
      const id = guidMatch ? guidMatch[1].split("/p/")[1] || guidMatch[1] : "";

      // Extract pubDate
      const pubDateMatch = /<pubDate>(.*?)<\/pubDate>/.exec(itemContent);
      const publishedDate = pubDateMatch ? pubDateMatch[1] : "";

      // Extract categories (tags)
      const tags: string[] = [];
      const categoryRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
      let categoryMatch;
      while ((categoryMatch = categoryRegex.exec(itemContent)) !== null) {
        tags.push(categoryMatch[1]);
      }

      // Extract content for excerpt
      const contentMatch =
        /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(
          itemContent,
        );
      let excerpt = "";
      if (contentMatch) {
        // Remove HTML tags and get first 150 characters
        const content = contentMatch[1]
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        excerpt = content.substring(0, 200) + "...";
      }

      // Estimate read time (rough estimate: 200 words per minute)
      const wordCount = excerpt.split(/\s+/).length * 10; // Multiply by 10 as excerpt is short
      const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";

      if (title && url) {
        items.push({
          id,
          title,
          excerpt,
          url,
          publishedDate,
          readTime,
          tags: tags.slice(0, 5), // Limit to 5 tags
          platform: "Medium",
        });
      }
    }

    return items;
  } catch (error) {
    console.error("Error fetching Medium RSS:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "vpatil5212";
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const articles = await parseMediumRSS(username);

    return NextResponse.json({
      success: true,
      articles: articles.slice(0, limit),
      count: articles.length,
    });
  } catch (error) {
    console.error("Error in Medium API route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Medium articles",
        articles: [],
      },
      { status: 500 },
    );
  }
}
