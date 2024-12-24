"use client";

import { Button } from "../button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");

      if (response.status === 200 || response.status === 201) {
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
          description: `Failed to log out. Please try again. ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description: `Failed to log out. Please try again. ${error}`,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
