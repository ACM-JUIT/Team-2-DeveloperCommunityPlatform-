import dbConnect from '../../../lib/dbConnect';
import Comment from '../../../models/Comment';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  const comments = await Comment.find({}).sort({
    createdAt: -1
  });

  return NextResponse.json(comments);
}

export async function POST(request) {
  await dbConnect();

  const body = await request.json();
  const comment = new Comment(body);

  await comment.save();

  return NextResponse.json(comment, {
    status: 201
  });
}