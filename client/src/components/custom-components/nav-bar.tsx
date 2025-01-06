"use client";
import Link from "next/link";
//import Image from "next/image";
import { usePathname } from "next/navigation";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import usePersistStore from "@/helper/usePersistStore";
import { useCartStore } from "@/app/store/_store/useCartStore";
import Logout from "./logout";

export default function NavBar() {
  const pathName = usePathname();
  const store = usePersistStore(useCartStore, (state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function getNumberOfItemsInCart() {
    return store?.cartItems.length;
  }

  function isActive(path: string) {
    return pathName === path ? "border-b-2 border-gray-900" : "";
  }

  return (
    <nav className="w-full py-6">
      <div className="w-11/12 h-16 flex justify-between items-center mx-auto p-6">
        <h1
          style={{
            fontFamily: '"Poppins", serif',
          }}
          className="w-1/2 h-8 font-extrabold text-gray-950 flex justify-center items-center tracking-wide text-4xl p-4"
        >
          TheGermanTutor
        </h1>

        <ul className="flex justify-center items-center space-x-16 font-medium">
          <li className={`text-base ${isActive("/")}`}>
            <Link href={`/`}>Home</Link>
          </li>
          <li className={`text-base  ${isActive("/about-us")}`}>
            <Link href={`/about-us`}>About</Link>
          </li>
          <li className={`text-base  ${isActive("/course")}`}>
            <Link href={`/course`}>Courses</Link>
          </li>
          <li className={`text-base ${isActive("/blog")}`}>
            <Link href={`/blog`}>Blog</Link>
          </li>
          <li className={`text-base relative`}>
            <Link className="" href={`/cart`}>
              <span className="absolute -top-2 -right-2 bg-gray-600 text-white w-4 h-4 rounded-full flex justify-center items-center">
                {getNumberOfItemsInCart()}
              </span>
              Cart
              {/* <Image
                src="/images/trolley.png"
                alt="Cart Logo"
                width={20}
                height={20}
              /> */}
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className={`text-base`}>
                <Link
                  href={`/dashboard`}
                  className="w-full bg-black text-white hover:bg-white hover:text-black hover:border transition-all p-2 rounded-lg  flex justify-center items-center"
                >
                  Dashboard
                </Link>
              </li>
              <li className={`text-base`}>
                <Logout />
              </li>
            </>
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
          )}
        </ul>
      </div>
    </nav>
  );
}
