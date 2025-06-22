export async function login(data: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { ok: false };
  }

  const result = await res.json();
  localStorage.setItem("token", result.token);
  return { ok: true };
}

export async function registerUser(data: { email: string; password: string; confirmPassword: string }) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { ok: false };
  }

  const result = await res.json();
  localStorage.setItem("token", result.token);
  return { ok: true };
}
