import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Mentorious - AI Interview Platform",
  description: "Prepare for your next job interview with AI-powered mock interviews. Get instant feedback and improve your skills.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
      <Toaster/>
      {children}</body>
    </html>
    </ClerkProvider>
  );
}
