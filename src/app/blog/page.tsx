import { getBlogPosts } from "@/lib/supabase/queries";
import { blogPosts as mockPosts } from "@/data/blog-posts";
import { BlogListClient } from "./blog-list-client";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogListClient posts={posts.length > 0 ? posts : mockPosts} />;
}
