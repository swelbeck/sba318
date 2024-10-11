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