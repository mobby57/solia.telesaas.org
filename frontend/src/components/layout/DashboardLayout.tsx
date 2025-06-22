import type { ReactNode } from "react";
import { useAuth } from "@app/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
        <span className="font-bold">Solia Dashboard</span>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <button onClick={logout} className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200">Déconnexion</button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}