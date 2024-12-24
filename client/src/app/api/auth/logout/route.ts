import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const { BACKEND_URL } = process.env;

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  const apiResponse = await axios.get(`${BACKEND_URL}/auth/logout`);
  return NextResponse.json(
    {
      status: 201,
      message: `Logout was successful ${apiResponse.data.message}`,
    },
    { status: 201 }
  );
}
