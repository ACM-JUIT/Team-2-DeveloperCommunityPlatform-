import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const post = new Post(body);
  await post.save();
  return NextResponse.json(post, { status: 201 });
}
