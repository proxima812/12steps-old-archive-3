import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import serviceWorker from "astrojs-service-worker";
import remarkToc from "remark-toc";

export default defineConfig({
 site: "https://s-ready.ru",
 compressHTML: true,
 integrations: [
  tailwind({
   config: {
    applyBaseStyles: false,
   },
  }),
  serviceWorker(),
  react(),
  image({
   serviceEntryPoint: "@astrojs/image/sharp",
  }),
  mdx(),
  sitemap(),
  compress({
   svg: false,
   img: false,
  }),
  robotsTxt({
   sitemap: ["https://s-ready.ru/sitemap-index.xml", "https://s-ready.ru/sitemap-0.xml"],
  }),
  partytown({
   config: {
    forward: ["dataLayer.push"],
   },
  }),
 ],
 markdown: {
  remarkPlugins: [
   [
    remarkToc,
    {
     heading: "Содержание",
    },
   ],
  ],
 },
});
