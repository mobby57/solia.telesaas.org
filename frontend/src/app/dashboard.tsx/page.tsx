"use client";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.replace("/auth/login");
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur le dashboard</h1>
      <p>Connecté en tant que <span className="font-mono">{user?.email}</span></p>
    </div>
  );
}