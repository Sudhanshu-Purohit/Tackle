import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <TanstackQueryProvider>
          <Toaster  position="top-center" richColors />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
