import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const { BACKEND_URL } = process.env;

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
    const response = await axios.get(`${BACKEND_URL}/auth/verify-email`, {
      params: { token },
    });

    return NextResponse.json(
      { message: "Email verification successful.", data: response.data },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to verify email.", err },
      { status: 500 }
    );
  }
}
