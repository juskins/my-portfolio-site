import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Babatunde Omojuwa - Frontend Engineer & UI Architect",
  description: "Specializing in high-performance, accessible, and pixel-perfect web interfaces that bridge engineering and design.",
  keywords: ["Babatunde Omojuwa", "Frontend Engineer", "UI Architect", "React Developer", "Lagos Nigeria", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Babatunde Omojuwa" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Load Google Fonts directly in head for 100% reliability */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />

        {/* Dark mode FOUC injection prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
