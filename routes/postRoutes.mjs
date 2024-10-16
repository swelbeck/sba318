// Imports
import express from "express";
import { posts } from "../data/posts.mjs";
import error from "../utilities/error.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { posts });
});

// @route:  GET api/posts
// @description:    Gets all posts
// @access:     Public
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

// @route:  POST api/posts
// @desc    Creates one post
// @access: Public
router.post("/", (req, res, next) => {
  //If has all needed data, create new post
  // Within the POST request route, we create a new
  // post with the data given by the client.
  if (req.body.userId && req.body.date && req.body.title && req.body.content) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      userId: req.body.userId,
      date: req.body.date,
      title: req.body.title,
      content: req.body.content,
    };

    posts.push(post);
    res.json(posts[posts.length - 1]);
  } else next(error(400, "Insuffient Data")); // Else send error
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

// @route:  GET api/posts/:id
// @desc    Gets posts by userId or date
// @access: Public
router.get("/", (req, res) => {
  const { userId, date } = req.query;
  let filteredPosts = posts;

  if (userId) {
    filteredPosts = filteredPosts.filter((post) => post.userId == userId);
  }

  if (date) {
    filteredPosts = filteredPosts.filter((post) => post.date == date);
  }

  res.json(filteredPosts);
});

// @route:  PATCH api/posts/:id
// @desc    Updates one post
// @access: Public
router.patch("/:id", (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing post in the database.
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

// @route:  DELETE api/posts/:id
// @desc    Delete one post
// @access: Public
router.delete("/:id", (req, res, next) => {
  // The DELETE request route simply removes a resource.
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      posts.splice(i, 1);
      return true;
    }
  });

  if (post) res.json(post);
  else next();
});

export default router;