import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const userDetails: LoginBody = await req.json();
    const apiResponse = await axios.post(
      `http://localhost:5001/auth/login`,
      userDetails
    );

    return NextResponse.json(
      { message: "Login was successful", data: apiResponse.data },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        {
          message: `Login failed: ${
            error.response.data.message || "Unknown error"
          }`,
        },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { message: "Error logging in user. Please try again later." },
      { status: 500 }
    );
  }
}
