import { create } from "zustand";
import { ICourse } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";

// State types
interface States {
  cartOwner?: string;
  cartItems: ICourse[];
  totalItems: number;
  totalPrice: number;
  isLoggedIn: boolean;
}

// Action types
interface Actions {
  addItemToCart: (item: ICourse) => void;
  setCartItems: (items: ICourse[]) => void;
  removeItemFromCart: (item: ICourse) => void;
  assignCartOwner: (userId: string) => void;
  setLoginStatus: (status: boolean) => void;
}

// useCountStore
export const useCartStore = create(
  persist<States & Actions>(
    (set, get) => ({
      // States
      cartOwner: undefined,
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      isLoggedIn: false,

      // Actions
      addItemToCart: (item: ICourse) => {
        const cartItems = get().cartItems;
        const existingItem = cartItems.find(
          (cartItem) => cartItem._id === item._id
        );

        if (existingItem) {
          const updatedCart = cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 }
              : cartItem
          );
          set((state) => ({
            cartItems: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            cartItems: [...cartItems, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      setCartItems: (items: ICourse[]) => {
        const totalItems = items.reduce(
          (acc, item) => acc + (item.quantity ?? 1),
          0
        );
        const totalPrice = items.reduce(
          (acc, item) => acc + item.price * (item.quantity ?? 1),
          0
        );
        set(() => ({
          cartItems: items,
          totalItems,
          totalPrice,
        }));
      },

      removeItemFromCart: (item: ICourse) => {
        const cartItems = get().cartItems;
        const updatedCart = cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        );
        const removedItem = cartItems.find(
          (cartItem) => cartItem._id === item._id
        );

        set((state) => ({
          cartItems: updatedCart,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - (removedItem ? removedItem.price : 0),
        }));
      },

      assignCartOwner: (userId: string) => {
        set(() => ({
          cartOwner: userId,
        }));
      },

      setLoginStatus: (status: boolean) => {
        set(() => ({
          isLoggedIn: status,
        }));
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
