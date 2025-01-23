// app/layout.tsx
import { Geist } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Header from "@/components/Header"; // Importujemy Header
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Korepetycje Elbląg",
  description: "Znajdź swojego idealnego nauczyciela",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

// Funkcja asynchroniczna do pobierania danych użytkownika
async function getUserData() {
  const supabase = createClient();
  const { data } = await (await supabase).auth.getUser();
  return data?.user || null;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getUserData();  // Pobieramy dane użytkownika

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main>
          <HeroUIProvider>
            {/* Przekazujemy dane użytkownika do Header */}
            <Header user={user} />
            <div>{children}</div>
          </HeroUIProvider>
        </main>
      </body>
    </html>
  );
}
