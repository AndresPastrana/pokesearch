import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Search",
  description: "Search for your favorite Pokemon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
