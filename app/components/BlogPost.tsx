import { Post } from "@/lib/postsHelper";
import { serialize } from 'next-mdx-remote/serialize';
import MDXContent from './MDXContent';

const REVALIDATE_TIME = parseInt(process.env.REVALIDATE_TIME || "3600");

async function getPost(slug: string): Promise<Post> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`;
    const res = await fetch(apiUrl, {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getPost:', error);
    throw error;
  }
}

export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getPost(slug);
  const mdxSource = await serialize(post.content);

  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      <div className="max-w-[1024px] w-full">
        <MDXContent source={mdxSource} />
      </div>
    </div>
  );
} 