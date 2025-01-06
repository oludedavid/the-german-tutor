import { create } from "zustand";
import { ICourse } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { SecureStorageHelper } from "@/helper/secureStorage";

interface States {
  cartOwner?: string;
  cartItems: ICourse[];
  totalItems: number;
  totalPrice: number;
  isLoggedIn: boolean;
}

interface Actions {
  addItemToCart: (item: ICourse) => void;
  setCartItems: (items: ICourse[]) => void;
  removeItemFromCart: (item: ICourse) => void;
  assignCartOwner: (userId: string) => void;
  setLoginStatus: (status: boolean) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<States & Actions>(
    (set, get) => ({
      cartOwner: undefined,
      cartItems: [],
      totalItems: 0,
      totalPrice: 0,
      isLoggedIn: false,

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
          }));
        } else {
          set((state) => ({
            cartItems: [...cartItems, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
          }));
        }

        const newTotalPrice = get().cartItems.reduce(
          (acc, item) => acc + item.price * (item.quantity ?? 1),
          0
        );
        set({ totalPrice: newTotalPrice });
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
        const newTotalPrice = updatedCart.reduce(
          (acc, cartItem) => acc + cartItem.price * (cartItem.quantity ?? 1),
          0
        );
        set((state) => ({
          cartItems: updatedCart,
          totalItems: state.totalItems - 1,
          totalPrice: newTotalPrice,
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
      clearCart: () => {
        set(() => ({
          cartItems: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => ({
        getItem: (name: string): Promise<string | null> => {
          return Promise.resolve(SecureStorageHelper.getItem(name));
        },
        setItem: (name: string, value: string): Promise<void> => {
          SecureStorageHelper.setItem(name, value);
          return Promise.resolve();
        },
        removeItem: (name: string): Promise<void> => {
          SecureStorageHelper.removeItem(name);
          return Promise.resolve();
        },
      })),
    }
  )
);
