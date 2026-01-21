import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export function GET() {
  return NextResponse.json({ posts: getAllPosts() });
}
