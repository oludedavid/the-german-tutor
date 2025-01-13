"use client";

import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import Auth from "@/helper/fetchData/auth";

export default function Logout() {
  const { toast } = useToast();

  const handleLogout = async () => {
    const auth = new Auth();
    auth.logout();

    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      variant: "default",
    });
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
