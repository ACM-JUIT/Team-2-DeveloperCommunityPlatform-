import dbConnect from '../../../../lib/dbConnect';
import Post from '../../../../models/Post';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();

  const post = await Post.findById(params.id);

  if (!post) {
    return NextResponse.json(
      { message: 'Post not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

export async function DELETE(request, { params }) {
  await dbConnect();

  await Post.findByIdAndDelete(params.id);

  return NextResponse.json({
    message: 'Post deleted successfully'
  });
}