import "./globals.css";
import "./globals.scss";

// import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";



export const metadata = {
  title: 'StudySail',
  description: 'Your study material with superpowers.',
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#06b6d4" } }}>
      <html lang="en" className="notranslate" translate="no">
        <body translate="no">
          {children}
          <Analytics />
        </body>
        <Toaster />
      </html>
    </ClerkProvider>
  );
}
