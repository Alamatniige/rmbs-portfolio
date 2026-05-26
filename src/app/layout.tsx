import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import AppToaster from "@/components/app-toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rmbs. | Ruiz Miguel B. Sapio",
  description:
    "Portfolio website of Ruiz Miguel B. Sapio, a software developer with a passion for building web, desktop, and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full scroll-smooth antialiased font-sans",
        dmSans.variable,
        syne.variable,
        geistMono.variable
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
