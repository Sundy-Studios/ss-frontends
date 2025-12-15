"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/firebase/auth";

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({
  children,
  redirectTo = "/",
}: PublicRouteProps) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (user) {
      router.replace(returnUrl || redirectTo);
    }
  }, [user, returnUrl, redirectTo, router]);

  if (user) {
    return null;
  }

  return <>{children}</>;
}
