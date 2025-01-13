/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Cookies from "universal-cookie";
const cookies = new Cookies();

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectRoute(WrappedComponent: any) {
  return function WithAuth(props: any) {
    const token = cookies.get("TOKEN");
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [router, token]);

    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
