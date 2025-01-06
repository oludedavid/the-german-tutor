"use client";

import Cookies from "universal-cookie";
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
          ? `Welcome back, ${userData.userName}`
          : "Join our community today."}
      </p>
      <div className="w-full text-center">
        <p className="text-base font-light">
          Der German Tutor ist immer da für Sie.
        </p>
        <p>Eine Ausgezeichnet Erfahrung.</p>
      </div>
    </div>
  );
};

export default Home;
