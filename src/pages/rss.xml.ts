import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  // ambil semua postingan dari collection `posts`
  const posts = await getCollection("posts");

  return rss({
    title: "Hilmy Haidar Blog",
    description:
      "I write about the web, programming, and sometimes my life experiences. Enjoy reading!",
    site: context.site, // otomatis ambil base URL dari astro.config.mjs
    stylesheet: "/rss/pretty-feed-v3.xsl", // opsional, kalau mau styling di browser
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description, // pastikan di frontmatter md ada `excerpt`
      link: `/blog/${post.data.slug}`,
    })),
  });
}
