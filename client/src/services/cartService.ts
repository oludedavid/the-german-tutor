import { useCartStore } from "@/app/store/_store/useCartStore";
import { ICourse } from "@/types";
import axios from "axios";
import { decodeJwtToken } from "@/helper/decodeJwtToken";
import Cookies from "universal-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default class CartServices {
  private token: string | undefined;
  public addItemToCartState;
  public removeItemFromCartState;
  public assignCartOwnerState;
  public setLoginStatusState;
  public setCartItemsState;

  constructor() {
    this.token = new Cookies().get("TOKEN");
    this.addItemToCartState = useCartStore.getState().addItemToCart;
    this.removeItemFromCartState = useCartStore.getState().removeItemFromCart;
    this.assignCartOwnerState = useCartStore.getState().assignCartOwner;
    this.setLoginStatusState = useCartStore.getState().setLoginStatus;
    this.setCartItemsState = useCartStore.getState().setCartItems;
  }

  private getOwnerId() {
    if (this.token) {
      const decodedToken = decodeJwtToken(this.token);
      return decodedToken?.decodedJwtToken?.sub;
    }
    return null;
  }

  addItemToCart(item: ICourse) {
    const ownerId = this.getOwnerId();

    if (ownerId) {
      this.assignCartOwnerState(ownerId);
      this.addItemToCartState(item);
      return {
        message: "Item added to cart successfully.",
      };
    } else {
      this.addItemToCartState(item);
      return {
        message: "Item added to cart successfully for guest user.",
      };
    }
  }

  removeItemFromCart(item: ICourse) {
    const ownerId = this.getOwnerId();

    if (ownerId) {
      this.assignCartOwnerState(ownerId);
    }
    this.removeItemFromCartState(item);
  }

  calculateTotalPrice() {
    const cartItems = useCartStore.getState().cartItems;
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity ?? 1),
      0
    );
  }

  getTotalItems() {
    const cartItems = useCartStore.getState().cartItems;
    return cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
  }

  async addCartToDatabase() {
    const ownerId = this.getOwnerId();

    if (ownerId) {
      try {
        const cartItems = useCartStore.getState().cartItems;
        const cartData = { owner: ownerId, courses: cartItems };

        const response = await axios.post(`${API_URL}/cart`, cartData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.data) {
          alert("Cart has been saved to the database!");
        }
        alert("Cart has been saved to the database!");
        await this.fetchCartFromDatabase();
      } catch (error) {
        console.error("Error adding cart to database:", error);
        this.handleError(error);
      }
    } else {
      alert("You must be logged in to save your cart.");
    }
  }

  async fetchCartFromDatabase() {
    const ownerId = this.getOwnerId();

    if (!ownerId) {
      alert("You must be logged in to fetch your cart.");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/cart`, {
        params: { ownerId },
        headers: { Authorization: `Bearer ${this.token}` },
      });

      const updatedCart = response.data;
      this.setCartItemsState(updatedCart.courses);

      console.log(
        "Cart successfully retrieved from the database:",
        updatedCart
      );
    } catch (error) {
      console.error("Error retrieving cart from the database:", error);
      this.handleError(error);
    }
  }

  private handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 400) {
        alert("Invalid data. Please check your cart and try again.");
      } else if (status === 404) {
        alert("Cart not found. Please try again later.");
      } else if (status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("An unknown error occurred. Please try again.");
      }
    } else {
      alert("Network error. Please check your connection and try again.");
    }
  }
}
