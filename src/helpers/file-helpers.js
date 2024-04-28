import matter from "gray-matter";
import React from "react";
import { notFound } from "next/navigation";
import { getBlogPostListRaw, readFile } from "./file-helpers-raw.mjs";

export const getBlogPostList = React.cache(getBlogPostListRaw);

export const loadBlogPost = React.cache(async (slug) => {
  try {
    console.log('oiii')
    const rawContent = await readFile(`/content/${slug}.mdx`);

    const { data: frontmatter, content } = matter(rawContent);
    return { frontmatter, content };
  } catch (e) {
    notFound();
  }
});
