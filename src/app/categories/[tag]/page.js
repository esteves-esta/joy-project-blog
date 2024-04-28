import React from "react";
import styles from "../../homepage.module.css";
import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: params.tag,
  };
}

async function Home({ params }) {
  const blogPostList = await getBlogPostList();
  let categoryPostList = [];
  try {
    blogPostList.forEach((post) => {
      if (post.tags && post.tags.includes(params.tag))
        categoryPostList.push(post);
    });
  } catch (error) {
    notFound();
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Post from category <b>{params.tag}</b>:{" "}
        <span>{categoryPostList.length} posts</span>
      </h1>

      {categoryPostList.length > 0 &&
        categoryPostList.map(({ slug, title, abstract, publishedOn, tags }) => (
          <BlogSummaryCard
            key={slug}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
            tags={tags}
          />
        ))}
    </div>
  );
}

export default Home;
