import BlogPosts from '../components/BlogPosts';

export default function BlogPage() {
  return (
    <div className="w-full flex flex-col items-center px-4 py-8 lg:px-16">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <BlogPosts />
    </div>
  );
}

