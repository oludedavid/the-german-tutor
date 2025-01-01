import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/custom-components/nav-bar";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning={true} className="light" lang="en">
      <head></head>
      <body className="font-sans antialiased w-screen ">
        <NavBar />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
