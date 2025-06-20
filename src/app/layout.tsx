import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import WebGPUBackground from "@/components/WebGPUBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Basel Anaya | AI Engineer",
  description: "AI Engineer at Deriv passionate about AI in Medicine & Robotics. Specializing in LLMs, Vision-Language Models, and RAG Systems.",
  keywords: ["AI Engineer", "Machine Learning", "LLM", "Vision-Language Models", "RAG Systems", "Medical AI"],
  authors: [{ name: "Basel Anaya" }],
  creator: "Basel Anaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Force dark mode immediately to prevent flash
                const html = document.documentElement;
                const body = document.body;
                
                // Ensure dark mode is maintained
                html.classList.add('dark');
                body.classList.add('dark');
                
                // Set CSS custom properties
                html.style.setProperty('--background', '#0a0a0a');
                html.style.setProperty('--foreground', '#ffffff');
                
                // Remove light theme classes if any
                html.classList.remove('light');
                body.classList.remove('light');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans dark`}>
        <WebGPUBackground />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
