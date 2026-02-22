import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mozenith - AI Control Platform",
  description:
    "Enterprise-grade AI orchestration and automation platform for managing intelligent workflows.",
  keywords: ["AI", "automation", "orchestration", "enterprise", "platform"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
