import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de filmes",
  description:
    "Catálogo de filmes com busca, detalhes e favoritos, feito com Next.js e TMDB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between p-6 pb-0">
          <Link href="/" className="text-lg font-bold">
            Catálogo de filmes
          </Link>
          <nav aria-label="Principal">
            <Link href="/favoritos" className="text-zinc-300 hover:text-white">
              ★ Favoritos
            </Link>
          </nav>
        </header>
        {children}
        <footer className="p-4 text-center">
          Este produto usa a API do TMDB, mas não é endossado nem certificado
          por ele.
        </footer>
      </body>
    </html>
  );
}
