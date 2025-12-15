"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/firebase/auth";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Items", href: "/items" },
    { label: "Health", href: "/health" },
    ...(user
      ? [{ label: "Logout", onClick: logout }]
      : [
          { label: "Login", href: "/login" },
          { label: "Sign Up", href: "/register" },
        ]),
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Mobile Hamburger */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Left side title */}
          <Typography
            variant="h6"
            component={Link}
            href="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            MyApp
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {menuItems.map((item) =>
              item.href ? (
                <Button
                  key={item.label}
                  color="inherit"
                  component={Link}
                  href={item.href}
                >
                  {item.label}
                </Button>
              ) : (
                <Button key={item.label} color="inherit" onClick={item.onClick}>
                  {item.label}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={item.href ? Link : "button"}
                href={item.href}
                onClick={item.onClick}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}
