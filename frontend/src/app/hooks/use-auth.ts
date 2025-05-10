// frontend/src/hooks/use-auth.ts
"use client";

import { useAuthContext } from "@/providers/auth-provider";

export function useAuth() {
  return useAuthContext();
}