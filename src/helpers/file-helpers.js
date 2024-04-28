import matter from "gray-matter";
import React from "react";
import { getBlogPostListRaw, readFile } from "./file-helpers-raw.mjs";

export const getBlogPostList = React.cache(getBlogPostListRaw);

export const loadBlogPost = React.cache(async (slug) => {
  const rawContent = await readFile(`/content/${slug}.mdx`);

  const { data: frontmatter, content } = matter(rawContent);

  return { frontmatter, content };
});
