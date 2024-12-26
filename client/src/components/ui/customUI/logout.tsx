"use client";

import { Button } from "../button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Cookies from "universal-cookie";

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    if (!token) {
      toast({
        title: "Already Logged Out",
        description: "You are not logged in.",
        variant: "default",
      });
      router.push("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5001/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        cookies.remove("TOKEN", { path: "/" });
        cookies.remove("USERID", { path: "/" });

        toast({
          title: "Logout Successful",
          description: "You have been logged out successfully.",
          variant: "default",
        });

        router.push("/login");
      } else {
        console.error("Failed to log out. Server response:", response.status);

        toast({
          title: "Logout Failed",
          description: `Server responded with status: ${response.status}. Please try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);

      toast({
        title: "An Error Occurred",
        description: `Unable to log out. ${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      aria-label="Log out from the application"
      className="w-full bg-red-500 hover:bg-red-400 text-white"
      role="button"
    >
      Logout
    </Button>
  );
}
