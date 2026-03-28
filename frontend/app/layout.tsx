import type { Metadata } from "next";
import "./globals.css";

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

          {children}

      </body>
    </html>
  );
}
