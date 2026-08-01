import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlgoVerse | Interactive Engineering Learning Platform",
  description: "Learn complex computer science & engineering algorithms through real-time step-by-step visual simulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className="antialiased min-h-screen bg-background text-foreground selection:bg-indigo-500 selection:text-white"
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
