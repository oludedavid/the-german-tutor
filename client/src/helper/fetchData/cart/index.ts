import Auth from "../auth";
import axios, { AxiosError } from "axios";
import { ICourse } from "@/types";

export default class Cart {
  private auth: Auth;
  private token;
  private decodedToken;
  private owner;

  constructor() {
    this.auth = new Auth();
    this.token = this.auth.getToken();
    this.decodedToken = this.auth.getDecodedToken();
    this.owner = this.decodedToken?.sub;
  }

  public async updateCartInDatabase(courses: ICourse[]) {
    const payload = {
      owner: this.owner,
      courses: courses.map((course) => ({
        courseOfferedId: course._id,
        name: course.courseName,
        quantity: course.quantity,
        price: course.price,
      })),
    };

    try {
      const response = await axios.patch(
        `/api/cart?ownerId=${this.owner}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      console.error(
        "Error updating cart:",
        error.message,
        " Error code: ",
        error.status
      );
      throw error;
    }
  }

  public async fetchCartFromDatabase() {
    try {
      const response = await axios.get(`/api/cart?ownerId=${this.owner}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      console.error(
        "Error fetching cart:",
        error.message,
        " Error code: ",
        error.status
      );
      throw error;
    }
  }
}
