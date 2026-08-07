import type { APIRoute } from 'astro';
import { rssGuides } from '../lib/rss';

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(await rssGuides(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
