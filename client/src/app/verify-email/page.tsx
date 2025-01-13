"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/custom-components/spinner";
import Auth from "@/helper/fetchData/auth";
export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!token || !isMounted) return;

    const verifyEmail = async () => {
      const auth = new Auth();
      try {
        const message = await auth.verifyEmail(token);
        if (message) {
          setVerificationStatus("success");
          toast({
            variant: "default",
            title: "Email Verified",
            description: message,
          });
          router.push("/login");
        } else {
          setVerificationStatus("failed");
          toast({
            variant: "destructive",
            title: "Verification Failed",
            description: "Something went wrong. Please try again.",
          });
        }
      } catch (e) {
        console.error(e);
        setVerificationStatus("failed");
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "An error occurred. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router, toast, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen dark">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Verify Your Email
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Please wait while we verify your email. If the process takes too long,
          ensure the token is valid.
        </p>

        {loading ? (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        ) : (
          <div className="mt-6">
            {verificationStatus === "success" && (
              <p className="text-green-500 text-center">
                Your email has been successfully verified!
              </p>
            )}
            {verificationStatus === "failed" && (
              <p className="text-red-500 text-center">
                Verification failed. Please try again.
              </p>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            If you did not receive the verification email,{" "}
            <a href="/resend-email" className="text-indigo-600 hover:underline">
              click here to resend
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
