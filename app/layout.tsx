import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bibliothèque · Autafrika Buildathon",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="mx-auto flex max-w-4xl gap-6 px-4 py-4 text-sm font-medium">
            <Link href="/">Accueil</Link>
            <Link href="/books">Livres</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
