"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/styles/theme";
import { AuthProvider } from "@/firebase/auth";

export default function Providers({ children }: { children: ReactNode }) {
  const [darkMode] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider theme={getTheme(darkMode ? "dark" : "light")}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
