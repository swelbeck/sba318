// Imports
import express from "express";
import { comments } from "../data/comments.mjs";
import error from "../utilities/error.mjs";
let router = express.Router();

// @route:  GET api/comments
// @desc    Gets all comments
// @access: Public
router.get("/", (req, res) => {
  const links = [
    {
      href: "comments/:id",
      rel: ":id",
      type: "GET",
    },
  ];

  res.json({ comments, links });
});

// @route:  POST api/posts
// @description:    Creates one comment
// @access: Public
router.post("/", (req, res, next) => {
  // If has all needed data, create new comment
  // Within the POST request route, we create a new
  // comment with the data given by the client.
  if (
    req.body.userId &&
    req.body.postId &&
    req.body.date &&
    req.body.content
  ) {
    const comment = {
      id: comments[comments.length - 1].id + 1,
      userId: req.body.userId,
      postId: req.body.postId,
      date: req.body.date,
      content: req.body.content,
    };

    comments.push(comment);
    res.json(comments[comments.length - 1]);
  } else next(error(400, "Insuffient Data")); // Else send error
});


// @route:  GET api/comments/:id
// @desc    Gets one comment
// @access: Public
router.get("/:id", (req, res, next) => {
  let comment = comments.find((c) => c.id == req.params.id);

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

  if (comment) res.json({ comments, links });
  else next();
});


export default router;