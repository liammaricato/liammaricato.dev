import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;
const PATH = process.env.GITHUB_PATH;

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

async function getGithubShaTree(): Promise<GithubTreeItem[]> {
  console.log("Fetching tree for path: ", PATH);

  const response = await githubRequest<{ tree: GithubTreeItem[] }>(
    "GET /repos/{owner}/{repo}/git/trees/{path}?recursive=1",
    {
      owner: OWNER,
      repo: REPO,
      path: "main",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to get github tree: " + response.status);
  }

  return response.data.tree;
}

async function getGithubBlob(sha: string): Promise<GithubBlob> {
  console.log("Fetching blob for sha: ", sha);

  const response = await githubRequest<GithubBlob>(
    "GET /repos/{owner}/{repo}/git/blobs/{sha}",
    {
      owner: OWNER,
      repo: REPO,
      sha: sha,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to get github blob: " + response.status);
  }

  return response.data;
}

async function githubRequest<T>(
  path: string,
  params: Record<string, unknown>
): Promise<GithubResponse<T>> {
  const response = await octokit.request(path, {
    ...params,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Accept: "application/vnd.github+json",
    },
  });

  return response;
}

export { getGithubShaTree, getGithubBlob };
export type { GithubTreeItem };
