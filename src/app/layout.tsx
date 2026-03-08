import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Silicon Soul - SaaS Store",
  description: "Premium SaaS products for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <nav className="border-b border-gray-800 bg-gray-950 px-6 py-4">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-white">Silicon Soul</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</a>
              </div>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
