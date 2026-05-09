import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARKA | FinOps Control Plane",
  description: "The intelligent proxy for Generative AI infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-black text-white antialiased min-h-screen`}>
        <Navbar />
        {children}
       <Footer />
      </body>
      
    </html>
  );
}