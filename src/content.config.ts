import { defineCollection, z } from 'astro:content';

const albumCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    releaseDate: z.date().optional(),
    rating: z.number().min(0).max(10).optional(),
    spotifyLink: z.string().url().optional(),
    imageUrl: z.string().url().optional(),
    genre: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'albums': albumCollection,
};