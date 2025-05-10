import BlogPost from "@/app/components/BlogPost";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return <BlogPost slug={slug} />;
}
