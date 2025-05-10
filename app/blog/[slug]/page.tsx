import BlogPost from "@/app/components/BlogPost";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: { slug: string } }) {
  return <BlogPost params={Promise.resolve(params)} />;
}
