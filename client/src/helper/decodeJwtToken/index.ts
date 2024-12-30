import { jwtDecode } from "jwt-decode";
import { ICustomJwtPayload } from "@/types";

export const decodeJwtToken = (
  token: string
): { decodedJwtToken: ICustomJwtPayload } => {
  try {
    const decodedJwtToken = jwtDecode<ICustomJwtPayload>(token);
    return { decodedJwtToken };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return { decodedJwtToken: {} as ICustomJwtPayload };
  }
};
