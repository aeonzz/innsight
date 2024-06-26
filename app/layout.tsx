import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import QueryClientProvder from "@/components/shared/query-provider";

const playFair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playFair.className}>
        <QueryClientProvder>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </QueryClientProvder>
        <Toaster richColors />
      </body>
    </html>
  );
}
