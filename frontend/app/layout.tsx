import type { Metadata } from "next";
import "./globals.css";
import StorProvider from "@/StoreProvider";
import { Footer } from "@/app/shared/Footer";
import { Header } from "@/app/shared/Header";

export const metadata: Metadata = {
  title: "Swish CMS",
  description: "A clean, product-led marketing surface for Swish CMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StorProvider>
          <Header />
          {children}
          <Footer />
        </StorProvider>
      </body>
    </html>
  );
}
