import { glob, file } from "astro/loaders";
import { z, defineCollection, reference } from "astro:content";

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
    schema: z.object({
      title: z.string().max(255, { message: "Title is too long" }),
      slug: z.string().max(255, { message: "Slug is too long" }),
      category: z.string(),
      description: z.string().max(255, { message: "Description is too long" }),
      date: z.date(),
      author: z.string(),
      draft: z.boolean(),
      relatedPosts: z.array(reference("posts")).optional(),
      tags: z.array(z.string()),
    }),
  }),

  contacts: defineCollection({
    loader: file("src/content/resumes/contacts.json"),
    schema: z.object({
      id: z.number(),
      icon: z.string(),
      body: z.string(),
    }),
  }),

  socials: defineCollection({
    loader: file("src/content/resumes/socials.json"),
    schema: z.object({
      id: z.number(),
      icon: z.string(),
      title: z.string(),
      username: z.string(),
      link: z.string(),
    }),
  }),

  educations: defineCollection({
    loader: file("src/content/resumes/educations.json"),
    schema: z.object({
      id: z.number(),
      icon: z.string(),
      title: z.string(),
      grade: z.string(),
      gpa: z.string(),
      start: z.string(),
      end: z.string(),
      resume: z.string(),
    }),
  }),

  experiences: defineCollection({
    loader: file("src/content/resumes/experiences.json"),
    schema: z.object({
      id: z.number(),
      company: z.string(),
      roles: z.array(
        z.object({
          role: z.string(),
          start: z.string(),
          end: z.string(),
          tasks: z.array(z.string()),
        })
      ),
    }),
  }),

  certificates: defineCollection({
    loader: file("src/content/resumes/certificates.json"),
    schema: z.object({
      id: z.number(),
      logo: z.string(),
      title: z.string(),
      company: z.string(),
      date: z.string(),
      link: z.string(),
    }),
  }),
};
