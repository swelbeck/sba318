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

// @route:  GET api/posts/:id
// @desc    Gets one post
// @access: Public
router.get("/:id", (req, res, next) => {
  let post = posts.find((p) => p.id == req.params.id);

  const links = [
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "PATCH",
    },
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "DELETE",
    },
  ];

  if (post) res.json({ post, links });
  else next();
});


export default router;