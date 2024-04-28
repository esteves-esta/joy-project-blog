import React from "react";
import Link from "next/link";
import { format } from "date-fns";

import Card from "@/components/Card";

import styles from "./BlogSummaryCard.module.css";

function BlogSummaryCard({ slug, title, publishedOn, abstract, tags }) {
  const href = `/post/${slug}`;

  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn}>{humanizedDate}</time>
      <p>
        {abstract}{" "}
        <Link href={href} className={styles.continueReadingLink}>
          Continue reading <span className={styles.arrow}>→</span>
        </Link>
      </p>
      <div className={styles.tagContainer}>
        {tags &&
          tags.map((tag) => {
            const tagHref = `/categories/${tag}`;
            return (
              <Link href={tagHref} className={styles.tag} key={tag}>
                {tag}
              </Link>
            );
          })}
      </div>
    </Card>
  );
}

export default BlogSummaryCard;
