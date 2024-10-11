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

// @route: GET api/users/:id
// @description: Gets one user
// @access: Public
router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
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

  if (user) res.json({ user, links });
  else next();
});


export default router;