import { NextResponse } from "next/server";
import { invalidateCache } from "@/lib/postsHelper";

export async function POST() {
  try {
    // Invalidate the cache
    invalidateCache();
    
    return NextResponse.json({ 
      success: true, 
      message: "Cache refreshed successfully" 
    });
  } catch (error) {
    console.error("Error refreshing cache:", error);
    return NextResponse.json(
      { error: "Failed to refresh cache" },
      { status: 500 }
    );
  }
} 