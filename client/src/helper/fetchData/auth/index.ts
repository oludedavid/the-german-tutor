import axios, { AxiosError } from "axios";
import { ICustomJwtPayload, ILogin, IRegister } from "@/types";
import { decodeJwtToken } from "../../decodeJwtToken";
import Cookies from "universal-cookie";

export default class Auth {
  private apiUrl: string;
  private token: string | null = null;
  private decodedToken: ICustomJwtPayload | null = null;
  private cookie: Cookies;

  constructor() {
    this.cookie = new Cookies();
    this.apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  }

  /**
   * Registers a new user.
   * @param payload - The registration details.
   * @returns A success message.
   */
  public async registerUser(payload: IRegister): Promise<string> {
    try {
      const response = await axios.post(
        `${this.apiUrl}/auth/register`,
        payload
      );

      if (response.data) {
        return "You have been registered successfully. Please verify your email.";
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    } catch (e) {
      const error = e as AxiosError;
      console.error("Registration error:", error.message);
      return `Registration failed (${error.status}) please try again. ${error.message}`;
    }
  }

  /**
   * Verifies a user's email.
   * @param token - The email verification token.
   * @returns A success message.
   */
  public async verifyEmail(token: string | null): Promise<string> {
    if (!token) {
      throw new Error("Invalid verification token format.");
    }

    try {
      const response = await axios.get(`${this.apiUrl}/auth/verify-email`, {
        params: { token },
      });

      if (response.data) {
        return "Email successfully verified. You can now log in.";
      }
      return "Verification failed. No data returned.";
    } catch (e) {
      const error = e as AxiosError;
      console.error("Verification error:", error.message);
      if (error.response) {
        return `Verification failed. Status: ${error.status}. Message: ${error.message}`;
      }
      return `Verification failed. Error: ${error.message}`;
    }
  }

  /**
   * Logs in a user.
   * @param payload - The login details (email and password).
   * @returns A success message.
   */
  public async login(payload: ILogin): Promise<string> {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/login`, payload);

      if (response.data && response.data.token) {
        this.token = response.data.token;
        if (this.token) {
          this.cookie.set("TOKEN", this.token);
          this.decodedToken = decodeJwtToken(this.token);
        } else {
          throw new Error("Invalid token received.");
        }

        return `Login successful. Welcome Back! ${this.decodedToken?.username}`;
      } else {
        throw new Error("Login failed. Invalid credentials or user not found.");
      }
    } catch (e) {
      const error = e as AxiosError;
      console.error("Login error:", error.message);
      return `Login failed (${error.status}) please try again. ${error.message}`;
    }
  }

  public logout() {
    this.cookie.remove("TOKEN", { path: "/" });
    this.cookie.remove("USERID", { path: "/" });
    this.token = null;
    this.decodedToken = null;
    window.location.href = "/login";
  }

  /**
   * Retrieves the stored token.
   * @returns The authentication token or null if not logged in.
   */
  public getToken(): string | null {
    return this.token;
  }

  /**
   * Retrieves the decoded token payload.
   * @returns Decoded token payload or null if not logged in.
   */
  public getDecodedToken(): ICustomJwtPayload | null {
    return this.decodedToken;
  }
}
