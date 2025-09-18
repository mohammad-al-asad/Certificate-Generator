import dbConnect from "@/app/lib/mongodb";
import submissionModel from "@/app/model/submission";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    dbConnect();
    const body = await req.json();
    const newSubmission = new submissionModel(body);
    const data = await newSubmission.save();
    return NextResponse.json({ success: true,data});
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
