import { GlobalProvider } from "@/GlobalContext";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Renew Ease",
  description: "An simple solution to track your subscriptions at one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <GlobalProvider>
            <Toaster />
            <Navbar />
            <div className="pt-16">{children}</div>
          </GlobalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
