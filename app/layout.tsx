import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore - allow side-effect CSS import without type declarations
import "./globals.css";
import { ContributionsProvider } from '@/components/ui/contributions-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Patil - Open Source Contributor & Software Engineer",
  description: "Portfolio of Vaibhav Patil, an open source contributor and software engineer specializing in full-stack development, machine learning, and innovative web applications.",
  keywords: ["Vaibhav Singh","vaibhav","patil","hire","engineer", "Software Engineer", "Open Source", "Full Stack Developer", "React", "Node.js", "Machine Learning"],
  authors: [{ name: "Vaibhav Patil" }],
  creator: "Vaibhav Patil",
  openGraph: {
    title: "Vaibhav Patil - Open Source Contributor & Software Engineer",
    description: "Portfolio of Vaibhav Patil, an open source contributor and software engineer specializing in full-stack development, machine learning, and innovative web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Patil - Open Source Contributor & Software Engineer",
    description: "Portfolio of Vaibhav Patil, an open source contributor and software engineer specializing in full-stack development, machine learning, and innovative web applications.",
  },
  icons:{
    icon:'./avatar.webp'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ContributionsProvider>
          {children}
        </ContributionsProvider>
      </body>
    </html>
  );
}
