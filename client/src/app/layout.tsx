import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your inventory effectively",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pathname: string };
}) {
  const isLoginPage = params.pathname === "/login";

  return (
    <html lang="en">
      <body className={inter.className}>
          {isLoginPage ? (
            children
          ) : (
            <DashboardWrapper>{children}</DashboardWrapper>
          )}
      </body>
    </html>
  );
}
