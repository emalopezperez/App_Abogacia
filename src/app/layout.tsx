import type { Metadata } from "next";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/shared/theme-provider";
import {
  Playfair_Display,
  Source_Sans_3 as Source_Sans_Pro,
} from "next/font/google";

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-playfair",
//   weight: ["400", "700"],
// });

// Configure Source Sans Pro font
const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Abogacia",
  description: "Abogacia app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${sourceSans.variable}`}>
        <body className="h-screen font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
