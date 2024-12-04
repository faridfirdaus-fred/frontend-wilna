// client/src/app/layout.tsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";
import DashboardWrapper from "./dashboardWrapper";
import { usePathname } from "next/navigation";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          {isLoginPage ? (
            children
          ) : (
            <DashboardWrapper>{children}</DashboardWrapper>
          )}
        </ClientProvider>
      </body>
    </html>
  );
}
