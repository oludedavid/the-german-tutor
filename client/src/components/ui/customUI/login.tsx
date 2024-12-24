"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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
    try {
      const response = await axios.post("/api/auth/login", values);
      console.log("Backend Response:", response.data?.data);
      toast({
        variant: "default",
        title: `Login was Successful: ${response.data?.message}`,
        description: "You can now login to your account.",
      });

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
            <Button
              className="w-1/3 border-none bg-gray-200 rounded-2xl"
              aria-label="Login button"
            >
              Signup
            </Button>
            <div className="w-full h-96 flex justify-center items-center">
              <Image
                src="/images/login1.png"
                width={300}
                height={300}
                alt="Illustration of registration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-11/12 h-screen lg:px-8 lg:pt-8">
        <div className="bg-[#5368C51C] w-full h-full flex flex-col items-center lg:justify-start lg:pt-24">
          <div className="w-full lg:w-7/12 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-start">
              Login to your Account
            </h1>
            <p className="text-start text-gray-600 mb-6">Welcome back! .</p>
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
                />

                {/* Password Field */}
                <FieldWithIcon
                  label="Password"
                  name="password"
                  form={form}
                  placeholder="Your password"
                  iconSrc="/images/password-logo.png"
                  type="password"
                />

                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-400 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
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
}: {
  label: string;
  name: keyof z.infer<typeof formSchema>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  placeholder: string;
  iconSrc: string;
  type?: string;
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
              <Input type={type} placeholder={placeholder} {...field} />
            </FormControl>
          </div>
          <FormMessage className="text-red-300" />
        </FormItem>
      )}
    />
  );
}
