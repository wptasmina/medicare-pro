// utils/getUserFromCookie.ts
// import { User } from "@/types/User";

import { User } from "@/types";

export function getUserFromCookie(): User | null {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));
    if (!cookie) return null;

    const user: User = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    return user;
  } catch {
    return null;
  }
}
