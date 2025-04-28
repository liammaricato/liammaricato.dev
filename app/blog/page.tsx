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

export default async function BlogPage() {
  const posts = await getPosts();
  console.log('Posts fetched successfully, rendering', posts.length, 'posts');

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 lg:px-16">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
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
    </div>
  );
}

