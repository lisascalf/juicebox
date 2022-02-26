const express = require("express");
const { user } = require("pg/lib/defaults");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    //
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  // read the tagname from the params
  const tagName = req.params.tagName;
  // const allPosts = await getAllPosts();

  try {
    const postsByTags = await getPostsByTagName(tagName);
    console.log(postsByTags);
    const posts = postsByTags.filter((post) => {
      return post.author.id === req.user.id || post.active;
    });
    res.send({ posts: posts });
  } catch ({ name, message }) {
    console.error({ name, message });
  }
});

module.exports = tagsRouter;
