import { z, defineCollection } from 'astro:content';

const bandCollection = defineCollection({
  type: 'content',
  schema: z.object({
    bandName: z.string(),
    fan: z.string(),
    genre: z.string()
  })
});

export const collection = {
  'band': bandCollection
};