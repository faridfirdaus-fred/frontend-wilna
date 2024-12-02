"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/app/dashboard/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return token ? <Dashboard /> : null;
}
