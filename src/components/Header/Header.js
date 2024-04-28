"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Link from 'next/link'
import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";
import Cookies from "js-cookie";
import styles from "./Header.module.css";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants.mjs";

function Header({ className, ...delegated }) {
  const [theme, setTheme] = React.useState("light");

  function handleTheme() {
    const nextTheme = theme == "light" ? "dark" : "light";
    setTheme(nextTheme);
    Cookies.set("color-theme", nextTheme, { expires: 10000 });

    const root = document.documentElement;
    root.setAttribute("data-color-theme", nextTheme);
    // document.body.setAtribute("styles", nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS);

    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link className={styles.action} href="/rss.xml">
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <button className={styles.action} onClick={handleTheme}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
