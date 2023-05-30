import { defineCollection, z } from "astro:content";
import tags from "src/data/tags";

export const collections = {
 Blog: defineCollection({
  schema: z.object({
   title: z.string().max(90),
   desc: z.string().max(160).optional(),
   datePublished: z.date(),
   dateModified: z.date().optional(),
   poster: z.string().optional(),
   category: z.enum(tags),
  //  category: z.array(tags),
   author: z.string(),
   draft: z.boolean().optional(),
  }),
 }),
};
