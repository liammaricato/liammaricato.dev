import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const PATH = process.env.GITHUB_PATH;

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

interface GithubTreeItem {
  path: string;
  sha: string;
  type: string;
  url: string;
}

interface GithubBlob {
  content: string;
  encoding: string;
  sha: string;
  size: number;
  url: string;
}

interface GithubResponse<T> {
  status: number;
  data: T;
}

async function getPosts(): Promise<Post[]> {
  const posts = await getCachedPosts();

  const parsedPosts = posts.map((post) => {
    if (post.content.length > 400) {
      post.content = post.content.substring(0, 400) + '...';
    }

    const titleMatch = post.content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      post.title = titleMatch[1];
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

  const posts = await Promise.all(
    tree.map((item: GithubTreeItem) => getPostData(item))
  );

  return posts.filter((post: Post | null) => post !== null);
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

async function getGithubShaTree(): Promise<GithubTreeItem[]> {
  console.log('Fetching tree for path: ', PATH);

  const response = await githubRequest<{ tree: GithubTreeItem[] }>('GET /repos/{owner}/{repo}/git/trees/{path}?recursive=1', {
    owner: OWNER,
    repo: REPO,
    path: 'main',
  });

  if (response.status !== 200) {
    throw new Error('Failed to get github tree: ' + response.status);
  }

  return response.data.tree;
}

async function getGithubBlob(sha: string): Promise<GithubBlob> {
  console.log('Fetching blob for sha: ', sha);
  
  const response = await githubRequest<GithubBlob>('GET /repos/{owner}/{repo}/git/blobs/{sha}', {
    owner: OWNER,
    repo: REPO,
    sha: sha,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json'
    }
  });

  if (response.status !== 200) {
    throw new Error('Failed to get github blob: ' + response.status);
  }

  return response.data;
}

async function githubRequest<T>(path: string, params: Record<string, unknown>): Promise<GithubResponse<T>> {
  const response = await octokit.request(path, {
    ...params,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
      'Accept': 'application/vnd.github+json'
    }
  });

  return response;
}

// Function to manually invalidate cache if needed
function invalidateCache(): void {
  postsCache = null;
}

export { getPosts, getPost, invalidateCache };
