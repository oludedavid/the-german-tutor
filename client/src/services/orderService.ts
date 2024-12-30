import { ICart, ICartItem, IOrder } from "@/types";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

class OrderService {
  private token: string;
  private ownerId: string;
  private cartId: string;
  private totalAmount: number;
  private orderPayload: IOrder;
  private cartPayload: ICart;
  private orderStatus: string;
  private paymentStatus: string;
  private paymentMethod: string;

  constructor(
    ownerId: string,
    cartId: string,
    cartItems: ICartItem[],
    totalAmount: number,
    token: string,
    orderStatus: string = "pending",
    paymentStatus: string = "pending",
    paymentMethod: string = "paypal"
  ) {
    if (!ownerId || !cartId || !cartItems || !totalAmount || !token) {
      throw new Error("Invalid parameters provided to OrderService.");
    }

    this.ownerId = ownerId;
    this.cartId = cartId;
    this.totalAmount = totalAmount;
    this.token = token;
    this.paymentMethod = paymentMethod;
    this.orderStatus = orderStatus as "pending" | "success" | "canceled";
    this.paymentStatus = paymentStatus;

    this.cartPayload = {
      owner: this.ownerId,
      courses: cartItems,
    };

    this.orderPayload = {
      ownerId: this.ownerId,
      cartId: this.cartId,
      totalAmount: this.totalAmount,
      orderStatus: this.orderStatus as "pending" | "success" | "canceled",
      paymentMethod: this.paymentMethod as "paypal" | "paystack",
      paymentStatus: this.paymentStatus as "pending" | "completed" | "failed",
    };
  }

  async sendCartToApi() {
    try {
      const response = await axios.post(`${API_URL}/cart`, this.cartPayload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error sending cart:", error);
      throw error;
    }
  }

  async createOrder() {
    try {
      const response = await axios.post(
        `${API_URL}/orders`,
        this.orderPayload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async checkout() {
    try {
      console.log("Starting checkout process...");
      const cartResponse = await this.sendCartToApi();
      console.log("Cart successfully sent to API:", cartResponse);

      const orderResponse = await this.createOrder();
      console.log("Order successfully created:", orderResponse);

      console.log("Checkout process completed successfully.");
      return { cartResponse, orderResponse };
    } catch (error) {
      console.error("Error during checkout process:", error);
      throw error;
    }
  }
}

export default OrderService;
