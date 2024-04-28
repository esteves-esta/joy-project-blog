import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);
const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);
  // const titles = content.match(/#.+$/gm);
  // const tableOfContents = titles.map((i) => {
  //   let formatted = i.replaceAll(/#/gm, "");
  //   formatted = formatted.trim();
  //   i = `- [${formatted}](#${formatted
  //     .toLowerCase()
  //     .replaceAll(" ", "-")})  \n`;
  //   return i;
  // });
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>

        {/* <span>Table of Contents</span> */}
        {/* {titles && <MDXRemote source={tableOfContents.join("")} />} */}
        {/* <hr /> */}
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
