import express from "express";
import { users } from "../data/users.mjs";
import error from "../utilities/error.mjs";
let router = express.Router();


// @route: GET api/users
// @description: Gets all users
// @access: Public
router.get("/", (req, res) => {
  const links = [
    {
      href: "users/:id",
      rel: ":id",
      type: "GET",
    },
  ];

  res.json({ users, links });
});

export default router;
