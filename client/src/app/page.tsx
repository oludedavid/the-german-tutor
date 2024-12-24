import { cookies } from "next/headers";
import { JwtPayload, jwtDecode } from "jwt-decode";
import Logout from "@/components/ui/customUI/logout";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DecodedToken extends JwtPayload {
  email?: string;
  sub?: string;
}

export default async function Home() {
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
    ? `Welcome back User: ${decodedToken.email || "N/A"}, ID: ${
        decodedToken.sub || "N/A"
      }`
    : "Join our community.";

  return (
    <div className="w-screen">
      <p className="w-full text-center py-10 text-4xl font-bold ">
        {displayMessage}
      </p>
      <div className="w-full flex flex-col justify-center items-center gap-4 p-4">
        <p className="w-full text-center text-base font-light">
          Der German Tutor ist immer da für Sie.
        </p>
        <p className="w-full text-center">Eine Ausgezeichnet Efahrugen.</p>
      </div>
      {decodedToken ? (
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <Logout />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <Button className="w-1/3 flex justify-center">
            <Link
              href="/login"
              className="w-full border-none rounded-2xl"
              aria-label="Login button"
            >
              Login
            </Link>
          </Button>
          <Button className="w-1/3 flex justify-center">
            <Link
              href="/register"
              className="w-full border-none rounded-2xl"
              aria-label="Register button"
            >
              Register
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
