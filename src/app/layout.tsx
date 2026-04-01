import type { Metadata } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from '../components/NavbarWrapper';

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Amanah Suci",
  description: "Junior Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${dmSans.variable} antialiased bg-[#0f0f0f] text-white`}>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}