import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
