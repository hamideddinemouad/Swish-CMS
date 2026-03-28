import type { Metadata } from "next";
import styles from "./layout.module.css";
import StorProvider from "@/redux/StoreProvider";
import { Footer } from "@/app/(public)/shared/Footer";
import { Header } from "@/app/(public)/shared/Header";

export const metadata: Metadata = {
  title: "Swish CMS",
  description: "A clean, product-led marketing surface for Swish CMS.",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <StorProvider>
    <Header />
    <div className={styles.wrapper}> {children}</div>
    <Footer />
    </StorProvider>
    </>
  );
}
