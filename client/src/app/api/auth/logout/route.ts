import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

// Get Handler for User Logout
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  const apiResponse = await axios.get("http://localhost:5001/auth/logout");
  console.log("Backend Response:", apiResponse.data);
  return NextResponse.json({ status: 201 });
}
