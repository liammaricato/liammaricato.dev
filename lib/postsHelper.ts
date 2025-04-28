import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const repoUrl = `https://${process.env.GITHUB_TOKEN}@github.com/liammaricato/personal-blog-mdx.git`;
const contentDir = path.join(process.cwd(), "content");
const execAsync = promisify(exec);

// Cache configuration
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Post {
  filePath: string;
  slug: string;
  title: string;
  content: string;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let postsCache: CacheItem<Post[]> | null = null;
let lastCloneTime: number | null = null;

async function cloneRepository(): Promise<void> {
  try {
    // If directory exists, remove it first
    if (fs.existsSync(contentDir)) {
      // First remove all .git files that may be locked
      const gitDir = path.join(contentDir, '.git');
      if (fs.existsSync(gitDir)) {
        await execAsync(`attrib -r "${gitDir}\\*.*" /s`);
      }
      fs.rmSync(contentDir, { recursive: true, force: true });
    }
    
    fs.mkdirSync(contentDir);
    await execAsync(`git clone ${repoUrl} ${contentDir}`);
    lastCloneTime = Date.now();
  } catch (error) {
    console.error("Error cloning repository:", error);
    throw error;
  }
}

async function getPosts(): Promise<Post[]> {
  // Check if cache is valid
  if (postsCache && Date.now() - postsCache.timestamp < CACHE_DURATION) {
    console.log("Using cached posts");
    return postsCache.data;
  }

  const postsDir = path.join(contentDir, "posts");

  if (!fs.existsSync(postsDir)) {
    console.log("Cloning repository");
    await cloneRepository();
  }

  const files = fs.readdirSync(postsDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const slug = file.replace(".mdx", "").replaceAll(" ", "-");
        
        // Extract title from frontmatter or first heading
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug.replaceAll("-", " ");

        return {
          filePath,
          slug,
          title,
          content,
        };
      })
  );

  console.log("Fetched posts:", posts.length);

  // Update cache
  postsCache = {
    data: posts,
    timestamp: Date.now(),
  };

  return posts;
}

async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  // Try to find the post with the exact slug first
  let post = posts.find((p) => p.slug === slug);
  
  // If not found, try to find it by normalizing both the input slug and post slugs
  if (!post) {
    const normalizedInputSlug = slug.replace(/\s+/g, '-');
    post = posts.find((p) => p.slug === normalizedInputSlug);
  }
  
  return post || null;
}

// Function to manually invalidate cache if needed
function invalidateCache(): void {
  postsCache = null;
  lastCloneTime = null;
}

export { getPosts, getPost, invalidateCache };
