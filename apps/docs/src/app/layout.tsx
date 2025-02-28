import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DashboardRouterProvider from "@/components/Nav/DashboardRouterContext";
import Navbar from "@/components/Nav/DashboardNav";
import DarkModeProvider from "@/components/DarkModeStuff";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudySail Docs",
  description: "StudySail official documentation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <DarkModeProvider>
        <body className={inter.className}>
          <DashboardRouterProvider>
            <Navbar documents={[]}>{children}</Navbar>
          </DashboardRouterProvider>
        </body>
      </DarkModeProvider>
    </html>
  );
}
