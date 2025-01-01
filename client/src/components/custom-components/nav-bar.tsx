"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";

export default function NavBar() {
  const pathName = usePathname();
  const cookies = new Cookies();
  const token = cookies.get("Token");

  function isActive(path: string) {
    return pathName === path ? "border-b-2 border-gray-900" : "";
  }

  function isUserLoggedIn() {
    return token ? (
      <li className={`text-base ${isActive("/dasboard")}`}>
        <Link
          href={`/dashboard`}
          className="bg-black text-white hover:bg-white hover:text-black hover:border transition-all p-2 rounded-lg w-20 flex justify-center items-center"
        >
          Profile
        </Link>
      </li>
    ) : (
      <li className="text-base">
        <div className="flex gap-10">
          <Link
            href={`/login`}
            className="bg-black text-white hover:bg-white hover:text-black hover:border transition-all p-2 rounded-lg w-20 flex justify-center items-center"
          >
            Sign In
          </Link>
          <Link
            href={`/register`}
            className="bg-black text-white hover:bg-white hover:text-black hover:border p-2 rounded-lg w-20 flex justify-center items-center"
          >
            Sign Up
          </Link>
        </div>
      </li>
    );
  }

  return (
    <nav className="w-full py-6">
      <div className="w-11/12 h-16 flex justify-between items-center mx-auto p-6">
        <h1
          style={{
            fontFamily: '"Pacifico", serif',
          }}
          className="w-1/2 h-8 italic font-normal flex justify-center items-center tracking-tight text-4xl p-4"
        >
          TheGermanTutor
        </h1>

        <ul className="flex justify-center items-center space-x-10 font-medium">
          <li className={`text-base ${isActive("/")}`}>
            <Link href={`/`}>Home</Link>
          </li>
          <li className={`text-base ${isActive("/about-us")}`}>
            <Link href={`/about-us`}>About Us</Link>
          </li>
          <li className={`text-base ${isActive("/courses")}`}>
            <Link href={`/courses`}>Courses</Link>
          </li>
          <li className={`text-base ${isActive("/blog")}`}>
            <Link href={`/blog`}>Blog</Link>
          </li>
          <li className={`text-base ${isActive("/cart")}`}>
            <Link href={`/cart`}>Cart</Link>
          </li>
          {isUserLoggedIn()}
        </ul>
      </div>
    </nav>
  );
}
