interface Post {
  slug: string;
  title: string;
  content: string;
}

async function getPost(slug: string): Promise<Post> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`;
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
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

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <div className="container flex flex-col items-center px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose max-w-none">{post.content}</div>
    </div>
  );
}
