import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { message: "Token is missing from the request." },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      "http://localhost:5001/auth/verify-email",
      {
        params: { token },
      }
    );

    console.log("Verification Response:", response.data);

    return NextResponse.json(
      { message: "Email verification successful.", data: response.data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error verifying email:", err);
    return NextResponse.json(
      { message: "Failed to verify email.", err },
      { status: 500 }
    );
  }
}
