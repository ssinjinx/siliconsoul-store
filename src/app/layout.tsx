import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
          className={`${geistSans.variable} ${geistMono.variable} antialiased circuit-bg`}
        >
          <nav className="lime-border bg-black/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-50">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
              <a href="/" className="text-xl font-bold lime-glow">Silicon Soul</a>
              <div className="flex items-center gap-6">
                <a href="/products" className="text-lime-400 hover:text-lime-300 transition">Products</a>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-lime-400 hover:text-lime-300 transition">Sign In</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </nav>
          <footer className="lime-border bg-black/80 px-6 py-8 mt-auto">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-lime-400/60 text-sm">
              <p>&copy; {new Date().getFullYear()} Silicon Soul. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-lime-400 transition">Privacy Policy</a>
                <a href="/terms" className="hover:text-lime-400 transition">Terms of Service</a>
              </div>
            </div>
          </footer>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
