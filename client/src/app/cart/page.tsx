"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "@/components/ui/customUI/cart";
import Cookies from "universal-cookie";
import Link from "next/link";

interface CartItem {
  courseOfferedId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface CartType {
  owner: {
    _id: string;
    fullName: string;
    email: string;
    isVerified: boolean;
    role: string;
    courseEnrolled: string[];
    courseTaught: string[];
    __v: number;
  };
  courses: CartItem[];
  totalPrice: number;
}

export default function CartPage() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const ownerId = cookies.get("USERID");
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ownerId && token) {
      axios
        .get(`/api/cart`, {
          params: { ownerId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const cartData = response.data?.data;
          setCart(cartData);
          setLoading(false);
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message ||
            "Something went wrong. Please try again later.";
          console.error("Error fetching cart:", err);
          setError(errorMessage);
          setLoading(false);
        });
    } else {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
    }
  }, [ownerId, token]);

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center">
        <div className="loader"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-red-500 p-8">{error}</p>
        <Link
          href="/login"
          className="w-1/3 px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400"
          aria-label="Redirect to login page"
        >
          Login
        </Link>
      </div>
    );
  }

  if (!cart || cart.courses.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <p>Your cart is empty! Start adding courses.</p>
        <Link
          href="/courses"
          className="w-1/3 px-4 py-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-400"
          aria-label="Redirect to courses page"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Cart cart={cart} />
    </div>
  );
}
