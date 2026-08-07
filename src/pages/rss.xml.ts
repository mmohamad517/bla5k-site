import type { APIRoute } from 'astro';
import { rssAll } from '../lib/rss';

export const prerender = true;

export const GET: APIRoute = async () =>
  new Response(await rssAll(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
