"use client";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "@/components/custom-components/nav-bar";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning={true} className="light" lang="en">
      <body className="font-sans antialiased w-screen ">
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <main>{children}</main>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
