import express from "express";
import { posts } from "../data/posts.mjs";
import error from "../utilities/error.mjs";
let router = express.Router();

// @route:  GET api/posts
// @desc    Gets all posts
// @access: Public
router.get("/", (req, res) => {
  const links = [
    {
      href: "posts/:id",
      rel: ":id",
      type: "GET",
    },
  ];

  res.json({ posts, links });
});

export default router;