import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export type RegisterBody = {
  fullName: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const userDetails: RegisterBody = await req.json();
    const apiResponse = await axios.post(
      "http://localhost:5001/auth/register",
      userDetails
    );

    return NextResponse.json(
      { message: "User registered successfully", data: apiResponse.data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Error registering user. Please try again later." },
      { status: 500 }
    );
  }
}
