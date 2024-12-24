import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json(
      { message: "Authentication token is missing." },
      { status: 401 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return NextResponse.json(
      { message: "Server misconfiguration: JWT secret is missing." },
      { status: 500 }
    );
  }

  try {
    const actualToken = token.replace("Bearer ", "");

    const decodedToken = jwt.verify(actualToken, jwtSecret) as { sub: string };
    const ownerId = decodedToken?.sub;

    if (!ownerId) {
      return NextResponse.json(
        { message: "Invalid token: ownerId not found." },
        { status: 401 }
      );
    }

    const response = await axios.get(`http://localhost:5001/cart`, {
      params: { ownerId },
    });

    const cart = response.data;

    const totalPrice = cart.courses.reduce(
      (total: number, course: { price: number; quantity: number }) =>
        total + course.price * course.quantity,
      0
    );

    cart.totalPrice = totalPrice;

    return NextResponse.json(
      { message: "Cart fetched successfully.", data: cart },
      { status: 200 }
    );
  } catch (err) {
    let errorMessage = "An unexpected error occurred.";
    let errorStatus = 500;

    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.message || err.message || errorMessage;
      errorStatus = err.response?.status || errorStatus;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error("Error fetching cart:", err);
    return NextResponse.json(
      { message: errorMessage, error: err },
      { status: errorStatus }
    );
  }
}
