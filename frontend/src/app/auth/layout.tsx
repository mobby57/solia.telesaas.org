// ...existing code...
import { AuthProvider } from "@/context/AuthContext";
// ...existing code...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}