import { create } from "zustand";

interface CartItem {
  courseOfferedId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Cart {
  owner: string;
  courses: CartItem[];
}

interface States {
  userId: string | null;
  cart: Cart | null;
  setUserId: (id: string) => void;
  setCart: (cart: Cart) => void;
  updateCartItem: (courseOfferedId: string, quantity: number) => void;
  addCourseToCart: (course: CartItem) => void;
  removeCourseFromCart: (courseOfferedId: string) => void;
}

export const useCartStore = create<States>((set) => ({
  userId: null,
  cart: null,
  setUserId: (id: string) => set({ userId: id }),
  setCart: (cart: Cart) => set({ cart }),
  updateCartItem: (courseOfferedId: string, quantity: number) =>
    set((state) => {
      if (state.cart) {
        const updatedCourses = state.cart.courses.map((course) =>
          course.courseOfferedId === courseOfferedId
            ? { ...course, quantity }
            : course
        );
        return { cart: { ...state.cart, courses: updatedCourses } };
      }
      return state;
    }),
  addCourseToCart: (course: CartItem) =>
    set((state) => {
      if (state.cart) {
        return {
          cart: { ...state.cart, courses: [...state.cart.courses, course] },
        };
      }
      return state;
    }),
  removeCourseFromCart: (courseOfferedId: string) =>
    set((state) => {
      if (state.cart) {
        const filteredCourses = state.cart.courses.filter(
          (course) => course.courseOfferedId !== courseOfferedId
        );
        return { cart: { ...state.cart, courses: filteredCourses } };
      }
      return state;
    }),
}));
