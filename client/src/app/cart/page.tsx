"use client";

import { useCartStore } from "@/app/store/_store/useCartStore";
import usePersistStore from "@/helper/usePersistStore";
import CartItem from "@/components/custom-components/cartItem";
import Link from "next/link";

export default function CartPage() {
  const store = usePersistStore(useCartStore, (state) => state);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {store?.cartItems?.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">
            Your cart is empty. Start adding items!
          </p>
          <Link className="bg-blue-500 p-2 my-3" href={`/courses`}>
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
              Total ({store?.totalItems ?? 0} item
              {(store?.totalItems ?? 0) > 1 ? "s" : ""}
              ): ${store?.totalPrice?.toFixed(2) ?? 0.0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
