"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Auth from "@/helper/fetchData/auth";
import { useMutation } from "@tanstack/react-query";

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

export default function Register() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      const auth = new Auth();
      return auth.registerUser(values);
    },
    onSuccess: (message) => {
      toast({
        variant: "default",
        title: `Registration Successful`,
        description: message,
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: string) => {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: `Please try again later. ${error}`,
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    mutation.mutate(values);
  };

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
              Already Signed Up?
            </h2>
            <p className="w-full text-center text-base font-light text-foreground px-7">
              Unlock your German fluency! Join our online bootcamp and master
              levels A1 to B2 with ease.
            </p>
            <Button className="w-1/3">
              <Link
                href="/login"
                className="w-full border-none rounded-2xl"
                aria-label="Login button"
              >
                Sign In
              </Link>
            </Button>

            <div className="w-full h-96 flex justify-center items-center">
              <Image
                src="/images/register1.png"
                width={300}
                height={300}
                alt="Illustration of registration"
                role="img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-11/12 h-screen lg:px-8 lg:pt-8">
        <div className="w-full h-4/5 flex flex-col items-center lg:justify-start lg:pt-24">
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
                <FieldWithIcon
                  label="Full Name"
                  name="fullName"
                  form={form}
                  placeholder="Your full name"
                  iconSrc="/images/fullname-logo.png"
                  id="fullName"
                />

                {/* Email Field */}
                <FieldWithIcon
                  label="Email Address"
                  name="email"
                  form={form}
                  placeholder="you@example.com"
                  iconSrc="/images/email-logo.png"
                  type="email"
                  id="email"
                />

                {/* Password Field */}
                <FieldWithIcon
                  label="Password"
                  name="password"
                  form={form}
                  placeholder="Your password"
                  iconSrc="/images/password-logo.png"
                  type="password"
                  id="password"
                />

                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-400 text-white"
                  disabled={isSubmitting}
                  aria-live="polite"
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
  id,
}: {
  label: string;
  name: keyof z.infer<typeof formSchema>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  placeholder: string;
  iconSrc: string;
  type?: string;
  id: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <div className="w-full flex justify-start items-center h-12 rounded-sm px-2 py-2 border border-gray-300">
            <Image
              priority
              src={iconSrc}
              width={20}
              height={20}
              alt={`${label} icon`}
              role="presentation"
            />
            <FormControl className="border-none w-full focus-visible:ring-0 focus-visible:ring-offset-0">
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                {...field}
                aria-labelledby={id}
                aria-describedby={`${id}-error`}
              />
            </FormControl>
          </div>
          {fieldState?.error && (
            <FormMessage
              className="text-red-300"
              aria-live="assertive"
              id={`${id}-error`}
            />
          )}
        </FormItem>
      )}
    />
  );
}
