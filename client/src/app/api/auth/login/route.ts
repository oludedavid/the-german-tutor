import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
const { BACKEND_URL } = process.env;

export type LoginBody = {
  email: string;
  password: string;
};
export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? "";
};

export async function POST(req: NextRequest) {
  try {
    const userDetails: LoginBody = await req.json();
    const apiResponse = await axios.post(
      `${BACKEND_URL}/auth/login`,
      userDetails
    );

    const cookieStore = await cookies();
    cookieStore.set("accessToken", apiResponse.data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      sameSite: "strict",
      secure: true,
    });

    axios.interceptors.request.use(async function (config) {
      const accessToken = await getCookie("accessToken");
      if (accessToken) {
        config.headers.Cookie = `accessToken=${accessToken}`;
      }
      return config;
    });

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
