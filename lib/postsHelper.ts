import { getGithubShaTree, getGithubBlob, GithubTreeItem } from "./githubHelper";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let postsCache: CacheItem<Post[]> | null = null;

// Cache configuration
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Post {
  slug: string;
  title: string;
  content: string;
  imageUrl: string | null;
}

async function getPosts(): Promise<Post[]> {
  const posts = await getCachedPosts();

  const parsedPosts = posts.map((post) => {
    if (post.content.length > 400) {
      post.content = post.content.substring(0, 400) + '...';
    }

    return post;
  })

  return parsedPosts;
}

async function getPost(slug: string): Promise<Post | null> {
  const posts = await getCachedPosts();

  // Try to find the post with the exact slug first
  let post = posts.find((p) => p.slug === slug);
  
  // If not found, try to find it by normalizing both the input slug and post slugs
  if (!post) {
    const normalizedInputSlug = slug.replace(/\s+/g, '-');
    post = posts.find((p) => p.slug === normalizedInputSlug);
  }
  
  return post || null;
}

async function getCachedPosts(): Promise<Post[]> {
  // Check if cache is valid
  if (postsCache && Date.now() - postsCache.timestamp < CACHE_DURATION) {
    console.log("Using cached posts");
    return postsCache.data;
  }

  const posts = await getPostsData();

  // Update cache
  postsCache = {
    data: posts,
    timestamp: Date.now(),
  };

  return posts;
}

async function getPostsData(): Promise<Post[]> {
  const tree = await getGithubShaTree();

  const postsData = await Promise.all(
    tree.map((item: GithubTreeItem) => getPostData(item))
  );

  const posts = postsData.filter((post: Post | null) => post !== null)
                         .map((post: Post) => parsePost(post));

  return posts;
}

function parsePost(post: Post): Post {
  const titleMatch = post.content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    post.title = titleMatch[1];
  }

  // TODO: Add image url to post
  // const imageMatch = post.content.match(/^!\[.*\]\((.*)\)/);
  // if (imageMatch) {
  //   post.imageUrl = imageMatch[1];
  // }
  
  return post;
} 

async function getPostData(item: GithubTreeItem): Promise<Post | null> {
  const postTitle = item.path.replace("posts/", "").replace(".mdx", "");
  if (!postTitle || !item.path.startsWith("posts/")) {
    return null;
  }

  const postContent = await getGithubBlob(item.sha);

  const content = Buffer.from(postContent.content, 'base64').toString('utf-8');
  const slug = postSlug(postTitle);

  const post = {
    title: postTitle,
    content: content,
    imageUrl: null,
    slug: slug
  }

  return post;
}

function postSlug(title: string) {
  return title.replace(/\s+/g, '-');
}

// Function to manually invalidate cache if needed
function invalidateCache(): void {
  postsCache = null;
}

export { getPosts, getPost, invalidateCache };
export type { Post };
