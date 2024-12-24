"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center">
      <div className="bg-transparent h-screen w-full lg:w-5/12 px-8 pt-8">
        <div className="w-full h-full flex flex-col items-center gap-12 lg:gap-24">
          <p className="w-full font-bold text-center text-xl p-3">
            The German Tutor
          </p>
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <h2 className="text-center text-2xl font-bold w-full text-foreground">
              Already Signed Up?
            </h2>
            <p className="w-full text-center text-base font-light text-foreground px-7">
              Unlock your German fluency! Join our online bootcamp and master
              levels A1 to B2 with ease.
            </p>

            <Button className="w-1/3 border-none bg-gray-200 rounded-2xl">
              Login
            </Button>
            <div className="w-full h-96 flex justify-center items-center">
              <Image
                src={`/images/register1.png`}
                width={300}
                height={300}
                alt="Illustration-register"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-11/12 h-screen lg:px-8 lg:pt-8">
        <div className="bg-[#5368C51C] w-full h-full flex flex-col items-center  lg:justify-start lg:pt-24 ">
          <div className="w-full lg:w-7/12 p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-start">Create an Account</h1>
            <p className="text-start text-gray-600 mb-6">
              Welcome! Sign up with us today.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="w-full flex justify-start items-center h-12 rounded-sm px-2 py-2  border border-gray-300">
                        <Image
                          src={`/images/fullname-logo.png`}
                          width={20}
                          height={20}
                          alt="Illustration-register"
                          className=""
                        />
                        <FormControl className="border-none w-full  focus-visible:ring-0 focus-visible:ring-offset-0">
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <div className="w-full flex justify-start items-center h-12 rounded-sm px-2 py-2 border border-gray-300">
                        <Image
                          src={`/images/email-logo.png`}
                          width={20}
                          height={20}
                          alt="Email logo"
                          className=""
                        />
                        <FormControl className="border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0">
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="w-full flex justify-start items-center h-12 rounded-sm px-2 py-2 border border-gray-300">
                        <Image
                          src={`/images/password-logo.png`}
                          width={20}
                          height={20}
                          alt="Password logo"
                          className=""
                        />
                        <FormControl className="border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0">
                          <Input
                            type="password"
                            placeholder="Your password"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-400 text-white"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
