import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
 const blog = await getCollection("Blog");
 return rss({
  stylesheet: "/rss/styles.xsl",
  title: "Мир может быть лучше",
  description:
   "Применяем духовные принципы во всех наших делах.",
  site: "https://w-12.vercel.app/",
  items: blog.map((post) => ({
   title: post.data.title,
   pubDate: post.data.pubDate,
   description: post.data.desc,
   link: `/posts/${post.slug}/`,
  })),
  customData: `<language>ru</language>`,
 });
}
