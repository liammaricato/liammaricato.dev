import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  content: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    console.log('Response status:', apiUrl, res.status, res.ok);

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
}

export default async function BlogPosts() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-1 border-foreground/10"
        >
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
              {post.title}
            </h2>
          </Link>
          <p className="text-muted-foreground">
            {post.content.slice(0, 200)}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block mt-4 text-blue-600 hover:text-blue-800"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
} 