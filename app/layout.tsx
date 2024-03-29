import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Nav/NavBar";
import { ThemeProvider } from "@/provider/theme-provider";
import CustomSessionProvider from "@/provider/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cartopia",
  description: "The utopia of e-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <div className="p-4">{children}</div>
          </ThemeProvider>
        </CustomSessionProvider>
      </body>
    </html>
  );
}
