import type { APIRoute } from 'astro';
import { rssTools } from '../lib/rss';

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(await rssTools(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
