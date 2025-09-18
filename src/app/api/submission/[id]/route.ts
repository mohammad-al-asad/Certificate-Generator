import dbConnect from "@/app/lib/mongodb";
import submissionModel from "@/app/model/submission";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const submission = await submissionModel.findById((await params).id);

    return NextResponse.json(submission);
  } catch (error) {
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}
