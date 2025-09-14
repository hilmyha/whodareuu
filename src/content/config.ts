import { z, defineCollection, reference } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string().max(255, { message: "Title is too long" }),
      category: z.string(),
      description: z.string().max(255, { message: "Description is too long" }),
      date: z.date(),
      author: z.string(),
      draft: z.boolean(),
      relatedPosts: z.array(reference("posts")).optional(),
      tags: z.array(z.string()),
    }),
  }),

  
};

