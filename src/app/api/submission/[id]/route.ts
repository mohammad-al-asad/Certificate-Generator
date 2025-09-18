import dbConnect from "@/app/lib/mongodb";
import submissionModel from "@/app/model/submission";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    dbConnect()
    const submission = await submissionModel.findById(params.id);
    
    return NextResponse.json(submission);
  } catch (error) {
    return NextResponse.json({ error: "There was an error" }, { status: 500 });
  }
}
