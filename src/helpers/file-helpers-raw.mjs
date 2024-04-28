import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export const getBlogPostListRaw = async () => {
  const fileNames = await readDirectory("/content");

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(`/content/${fileName}`);

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) => (p1.publishedOn < p2.publishedOn ? 1 : -1));
};

export function readFile(localPath) {
  return fs.readFile(path.join(process.cwd(), localPath), "utf8");
}

function readDirectory(localPath) {
  return fs.readdir(path.join(process.cwd(), localPath));
}

const writeFile = (localPath, content) => {
  return fs.writeFile(path.join(process.cwd(), localPath), content, {
    encoding: "utf8",
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  writeFile,
  getBlogPostListRaw,
};
