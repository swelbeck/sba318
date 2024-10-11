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

export default router;