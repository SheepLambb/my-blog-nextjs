import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export const dynamic = 'force-static';

export function GET() {
  return NextResponse.json({ posts: getAllPosts() });
}
