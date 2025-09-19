import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "./lib/edgestore";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certificate-Generator",
  description: "Download your certificate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-indigo-100 py-8">
          <Head>
            <title>Certificate Generator</title>
            <meta
              name="description"
              content="Generate your certificate with QR code"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold text-center text-indigo-800 mb-2">
              Certificate Generator
            </h1>
            <p className="text-center text-indigo-600 mb-8">
              Create your personalized certificate with QR code verification
            </p>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </main>

          <footer className="mt-12 text-center text-indigo-700">
            <p>
              © {new Date().getFullYear()} Certificate Generator. All rights
              reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
