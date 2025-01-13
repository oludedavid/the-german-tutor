import { jwtDecode } from "jwt-decode";
import { ICustomJwtPayload } from "@/types";

/**
 * Decodes a JWT token and returns the decoded payload.
 * @param token - The JWT token to decode.
 * @returns The decoded token payload or null if decoding fails.
 */
export const decodeJwtToken = (token: string): ICustomJwtPayload | null => {
  try {
    const decodedJwtToken = jwtDecode<ICustomJwtPayload>(token);
    return decodedJwtToken;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
