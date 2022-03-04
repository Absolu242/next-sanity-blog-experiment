import sanityClient from '@sanity/client';


export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-08-31',
  token:process.env.NEXT_PUBLIC_SANITY_API_TOKEN
});