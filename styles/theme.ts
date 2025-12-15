import { createTheme } from "@mui/material/styles";

export const colors = {
  light: {
    primary: "#A3D2CA",
    secondary: "#FFB6B9",
    background: "#ffffff",
    surface: "#f5f5f5",
    text: "#000000",
  },
  dark: {
    primary: "#79B0A1",
    secondary: "#FF8A80",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
  },
};

export const getTheme = (mode: "light" | "dark" = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: colors[mode].primary },
      secondary: { main: colors[mode].secondary },
      background: {
        default: colors[mode].background,
        paper: colors[mode].surface,
      },
      text: { primary: colors[mode].text },
    },
  });
