"use client";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Cookies from "universal-cookie";
import { QueryDatabase } from "@/helper/queryDatabase";
import { useCartStore } from "@/app/store/_store/useCartStore";
import usePersistStore from "@/helper/usePersistStore";
import { decodeJwtToken } from "@/helper/decodeJwtToken";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const store = usePersistStore(useCartStore, (state) => state);
  const setCartOwnerId = store?.assignCartOwner;

  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const queryDatabase = new QueryDatabase(
      "http://localhost:5001/auth/login",
      "",
      "",
      values
    );

    try {
      const response = await queryDatabase.addDataToDatabase();
      if (response.error) {
        throw new Error(response.message);
      }

      toast({
        variant: "default",
        title: `Login was Successful: ${response.message}`,
        description: "You can now log in to your account.",
      });

      const cookies = new Cookies();
      cookies.set("TOKEN", response.data?.token, {
        path: "/",
      });

      const token = cookies.get("TOKEN");

      const decodedToken = decodeJwtToken(token);

      if (decodedToken?.decodedJwtToken?.sub) {
        setCartOwnerId?.(decodedToken.decodedJwtToken.sub);
        store?.setLoginStatus(true);
      } else {
        throw new Error("Invalid token. Could not extract user ID.");
      }

      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: `Please try again later. ${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center">
      {/* Left Section */}
      <div className="bg-transparent h-screen w-full lg:w-5/12 px-8 pt-8">
        <div className="w-full h-full flex flex-col items-center gap-12 lg:gap-24">
          <p className="w-full font-bold text-center text-xl p-3">
            The German Tutor
          </p>
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <h2 className="text-center text-2xl font-bold w-full text-foreground">
              Looking to join us?
            </h2>
            <p className="w-full text-center text-base font-light text-foreground px-7">
              Want to be part of the best German learning community? Sign up
              below and start your journey toward fluency today!
            </p>
            <Button className="w-1/3">
              <Link
                href="/register"
                className="w-full border-none rounded-2xl"
                aria-label="Navigate to registration page"
              >
                Sign Up
              </Link>
            </Button>
            <div className="w-full h-96 flex justify-center items-center">
              <Image
                src="/images/login1.png"
                width={300}
                height={300}
                alt="Illustration of registration process"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-11/12 h-auto lg:px-8 lg:pt-8">
        <div className=" w-full h-4/5 flex flex-col items-center p-8 lg:justify-start lg:pt-24 border-t-2">
          <div className="w-full lg:w-7/12 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-start">
              Login to your Account
            </h1>
            <p className="text-start text-gray-600 mb-6">
              Welcome back! Please log in to continue.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <FieldWithIcon
                  label="Email Address"
                  name="email"
                  form={form}
                  placeholder="you@example.com"
                  iconSrc="/images/email-logo.png"
                  type="email"
                  ariaLabel="Email input field"
                />

                {/* Password Field */}
                <FieldWithIcon
                  label="Password"
                  name="password"
                  form={form}
                  placeholder="Your password"
                  iconSrc="/images/password-logo.png"
                  type="password"
                  ariaLabel="Password input field"
                />

                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-400 text-white"
                  disabled={isSubmitting}
                  aria-label="Submit login form"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldWithIcon({
  label,
  name,
  form,
  placeholder,
  iconSrc,
  type = "text",
  ariaLabel,
}: {
  label: string;
  name: keyof z.infer<typeof formSchema>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  placeholder: string;
  iconSrc: string;
  type?: string;
  ariaLabel: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="w-full flex justify-start items-center h-12 rounded-sm px-2 py-2 border border-gray-300">
            <Image
              priority
              src={iconSrc}
              width={20}
              height={20}
              alt={`${label} icon`}
            />
            <FormControl className="border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0">
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                aria-label={ariaLabel} // Ensure aria-label is passed here
              />
            </FormControl>
          </div>
          <FormMessage className="text-red-300" />
        </FormItem>
      )}
    />
  );
}
