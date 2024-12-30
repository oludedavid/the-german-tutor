"use client";

import Cookies from "universal-cookie";
import Link from "next/link";
import Logout from "@/components/custom-components/logout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { decodeJwtToken } from "@/helper/decodeJwtToken";

const Home = () => {
  const [userData, setUserData] = useState<{
    userId: string | null;
    userName: string | null;
    userEmail: string | null;
  }>({
    userId: null,
    userName: null,
    userEmail: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    if (token) {
      const decoded = decodeJwtToken(token);

      if (decoded?.decodedJwtToken?.sub) {
        setUserData({
          userId: decoded.decodedJwtToken.sub,
          userName: decoded.decodedJwtToken.username || null,
          userEmail: decoded.decodedJwtToken.email || null,
        });
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen flex flex-col justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center gap-6 p-6">
      <p className="text-4xl font-bold text-center">
        {userData.userId
          ? `Welcome back, User: ${userData.userName} Email: ${userData.userEmail}`
          : "Join our community today."}
      </p>
      <div className="w-full text-center">
        <p className="text-base font-light">
          Der German Tutor ist immer da für Sie.
        </p>
        <p>Eine Ausgezeichnet Erfahrung.</p>
      </div>
      {userData.userId ? (
        <div className="flex flex-row gap-4">
          <div>
            <Logout />
          </div>
          <Button className="flex justify-center">
            <Link
              href="/cart"
              className="w-full border-none rounded-2xl"
              aria-label="Cart button"
            >
              Cart
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button className="w-full flex justify-center">
            <Link
              href="/login"
              className="w-full border-none rounded-2xl"
              aria-label="Login button"
            >
              Login
            </Link>
          </Button>
          <Button className="w-full flex justify-center">
            <Link
              href="/register"
              className="w-full border-none rounded-2xl"
              aria-label="Register button"
            >
              Register
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
