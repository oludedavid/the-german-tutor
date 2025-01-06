"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Cookies from "universal-cookie";
import { useCartStore } from "@/app/store/_store/useCartStore";
import usePersistStore from "@/helper/usePersistStore";

export default function Logout() {
  const router = useRouter();
  const { toast } = useToast();
  const store = usePersistStore(useCartStore, (state) => state);

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("USERID", { path: "/" });
    store?.clearCart();
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      variant: "default",
    });
    router.push("/login");
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
