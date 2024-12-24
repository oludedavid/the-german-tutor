import { cookies } from "next/headers";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Logout from "@/components/ui/customUI/logout";
interface DecodedToken extends JwtPayload {
  email?: string;
  sub?: string;
}

export default async function Home() {
  // Retrieve cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");
  let decodedToken: DecodedToken | undefined;

  if (token?.value) {
    try {
      decodedToken = jwtDecode<DecodedToken>(token.value);
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Error decoding the token:", error);
    }
  }

  const displayMessage = decodedToken
    ? `Email: ${decodedToken.email || "N/A"}, ID: ${decodedToken.sub || "N/A"}`
    : "No valid token found.";

  return (
    <div>
      <p>{displayMessage}</p>;
      <Logout />
    </div>
  );
}
