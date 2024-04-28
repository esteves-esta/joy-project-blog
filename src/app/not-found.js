import React from "react";

import styles from "./homepage.module.css";
import { BLOG_TITLE, BLOG_DESCRIPTION } from "@/constants.mjs";

export const metadata = {
  title: `NOT FOUND - ${BLOG_TITLE}`,
  description: BLOG_DESCRIPTION,
};

async function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>404 Not Found</h1>

      <p>This page does not exist. Please check the URL and try again.</p>
    </div>
  );
}

export default NotFound;
