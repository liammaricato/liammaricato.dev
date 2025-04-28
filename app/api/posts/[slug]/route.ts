import { NextResponse } from "next/server";
import { getPost } from "@/lib/postsHelper";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    params = await params
    const post = await getPost(params.slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
