import { NextResponse } from "next/server";
import Cookies from "universal-cookie";
import axios from "axios";

const { BACKEND_URL } = process.env;

export async function GET() {
  const cookieStore = new Cookies();
  cookieStore.remove("TOKEN");
  const apiResponse = await axios.get(`${BACKEND_URL}/auth/logout`);
  return NextResponse.json(
    {
      status: 201,
      message: `Logout was successful ${apiResponse.data.message}`,
    },
    { status: 201 }
  );
}
