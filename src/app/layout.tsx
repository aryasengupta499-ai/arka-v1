import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ModalProvider } from "@/lib/modal-context";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={inter.variable}>
      <body className="bg-brand-black text-white antialiased min-h-screen">
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
        </ModalProvider>
      </body>
      
    </html>
  );
}