import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Roots — Family History",
  description: "Exploring the Mulholland, Walker, and Freses family lines",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer style={{ textAlign: 'center', padding: '20px', fontSize: '0.75rem', color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          Roots — built with love for the family
        </footer>
      </body>
    </html>
  );
}
