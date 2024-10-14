// Imports
import express from "express";
import { users } from "../data/users.mjs";
import error from "../utilities/error.mjs";
let router = express.Router();

// @route:  GET api/users
// @description:    Gets all users
// @access:    Public
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

// @route: POST api/users
// @description: Add new user to database
// @access: Public
router.post("/", (req, res, next) => {
  // Within the POST request route, we create a new
  // user with the data given by the client.
  // We should also do some more robust validation here,
  // but this is just an example for now.
  if (req.body.name && req.body.username && req.body.email) {
    // body has name, email and username, continue...
    if (users.find((u) => u.username == req.body.username))
      next(error(409, "Username already taken"));

    // Create a new user with data
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user); // Push new user to database
    res.json(users[users.length - 1]); // Respond with new user info
  } else next(error(400, "Insufficient Data")); // use send error
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

// @route: PATCH api/users/:id
// @description: Update specific user
// @access: Public
router.patch("/:id", (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

// @route:  DELETE api/users/:id
// @desc    Delete one user
// @access: Public
router.delete("/:id", (req, res, next) => {
  // The DELETE request route simply removes a resource.
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

export default router;
