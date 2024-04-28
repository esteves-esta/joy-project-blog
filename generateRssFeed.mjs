import helper from "./src/helpers/file-helpers-raw.mjs";
import RSS from "rss";
import constants from "./src/constants.mjs";

const FEED_PATH = "/public/rss.xml";

async function createRssFeed() {
  const feed = new RSS({
    title: constants.BLOG_TITLE,
    description: constants.BLOG_DESCRIPTION,
    feed_url: "http://localhost:3000/rss.xml",
    site_url: "http://localhost:3000",
    image_url: "http://localhost:3000/favicon.ico",
    managingEditor: "esteves-esta",
    webMaster: "esteves-esta",
    copyright: "2024 esteves-esta",
    language: "en",
    // categories: ["Category 1", "Category 2", "Category 3"],
    // pubDate: "May 20, 2012 04:00:00 GMT",
    // ttl: "60",
  });

  await getFeedPosts(feed);

  helper.writeFile(
    FEED_PATH,
    feed.xml()
  );
}

async function getFeedPosts(feed) {
  const posts = await helper.getBlogPostListRaw();

  posts.forEach(({ title, slug, abstract, publishedOn, tags}) => {
    feed.item({
      title: title,
      description: abstract,
      url: `http://localhost:3000/${slug}`, // link to the item
      guid: slug, // optional - defaults to url
      date: publishedOn,
      categories: tags
    });
  });
}

await createRssFeed();
