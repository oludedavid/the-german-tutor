"use client";

import Cookies from "universal-cookie";
import Link from "next/link";
import Logout from "@/components/ui/customUI/logout";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Home = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isUserAvailable, setIsUserAvailable] = useState<boolean>(false);
  const cookies = new Cookies();

  useEffect(() => {
    const storedUserId = cookies.get("USERID");
    setUserId(storedUserId || null);
    setIsUserAvailable(true);
  }, []);

  if (!isUserAvailable) {
    return (
      <div className="w-screen">
        <p className="w-full text-center py-10 text-4xl font-bold ">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-screen">
      <p className="w-full text-center py-10 text-4xl font-bold ">
        {userId ? `Welcome back User: ${userId}` : "Join our community."}
      </p>
      <div className="w-full flex flex-col justify-center items-center gap-4 p-4">
        <p className="w-full text-center text-base font-light">
          Der German Tutor ist immer da für Sie.
        </p>
        <p className="w-full text-center">Eine Ausgezeichnet Efahrugen.</p>
      </div>
      {userId ? (
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <div className="w-1/3">
            <Logout />
          </div>

          <Button className="w-1/3 flex justify-center">
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
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <Button className="w-1/3 flex justify-center">
            <Link
              href="/login"
              className="w-full border-none rounded-2xl"
              aria-label="Login button"
            >
              Login
            </Link>
          </Button>
          <Button className="w-1/3 flex justify-center">
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
