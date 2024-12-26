import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning={true} className="dark" lang="en">
      <head></head>
      <body className="font-sans antialiased">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
