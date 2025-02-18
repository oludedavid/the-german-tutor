"use client";

import { useCartStore } from "@/app/store/_store/useCartStore";
import usePersistStore from "@/helper/usePersistStore";
import CartItem from "@/components/custom-components/cartItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import OrderService from "@/services/orderService";
import { ICartItem } from "@/types";
import Cookies from "universal-cookie";
import fetchWithParams from "@/helper/apiHelper";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function CartPage() {
  const cookies = new Cookies();
  const storedToken = cookies.get("TOKEN");
  const store = usePersistStore(useCartStore, (state) => state);
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        if (storedToken && store?.cartOwner) {
          const data = await fetchWithParams(
            `${API_URL}/cart`,
            { ownerId: store.cartOwner },
            storedToken
          );
          setCartId(data._id);
        }
      } catch (error) {
        console.error("Error fetching cart ID:", error);
      }
    };

    fetchCartId();
  }, [storedToken, store?.cartOwner]);

  const handleCheckout = async () => {
    if (!storedToken) {
      toast({
        title: "Login Status",
        description: `You need to log in or register to proceed with checkout.`,
        duration: 3000,
      });
      router.push("/login");
      return;
    }

    if (!store?.cartItems || store.cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: `Your cart is empty. Add items before proceeding to checkout.`,
        duration: 3000,
      });
      return;
    }

    const cartItems: ICartItem[] = store.cartItems.map((course) => ({
      courseOfferedId: course._id,
      name: course.courseName,
      quantity: course.quantity,
      price: course.price,
    }));

    try {
      setIsCheckingOut(true);

      const ownerId = store.cartOwner || "";
      const totalAmount = store?.totalPrice ?? 0;
      const token = storedToken;
      const paymentMethod = "paypal";
      const paymentStatus = "pending";
      const orderStatus = "pending";

      const orderService = new OrderService(
        ownerId,
        cartId ?? "",
        cartItems,
        totalAmount,
        token,
        orderStatus,
        paymentStatus,
        paymentMethod
      );

      const { cartResponse, orderResponse } = await orderService.checkout();
      //do something witht he cartResponse and orderResponse
      console.log("Checkout successful!", { cartResponse, orderResponse });
      toast({
        title: "Checkout Status",
        description: `Checkout successful! Your order has been placed.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast({
        title: "Checkout Status",
        description: `Failed to complete checkout. Please try again.`,
        duration: 3000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="w-full px-20">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {store?.cartItems?.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            Your cart is empty. Start adding items!
          </p>
          <Link
            className="bg-blue-500 text-white px-4 py-2 my-3 inline-block"
            href={`/course`}
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {store?.cartItems?.map((course, index) => (
              <li key={index}>
                <CartItem course={course} />
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-bold">
              Total ({store?.cartItems.length ?? 0} item
              {(store?.cartItems.length ?? 0) > 1 ? "s" : ""}
              ): ${store?.totalPrice?.toFixed(2) ?? 0.0}
            </p>
          </div>

          <Button
            className={`w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded ${
              isCheckingOut ? "opacity-50 cursor-not-allowed" : "bg-blue-300"
            }`}
            onClick={handleCheckout}
            disabled={isCheckingOut || store?.cartItems?.length === 0}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </Button>
        </div>
      )}
    </div>
  );
}
