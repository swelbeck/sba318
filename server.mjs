// SBA 318: Express Server Application - Blog
//Imports
import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import bodyParser from "body-parser";
import error from "./utilities/error.mjs";

// Create an instance of express
const app = express();
let PORT = 3000;

// Static files
app.use(express.static("styles"));

// View engines
app.set("view engine", "pug");
app.set("views", "./views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  console.log(
    `${req.method} request for '${req.url}' at ${new Date().toISOString()}`
  );
  next();
});

// Routes
app.get(`/`, (req, res) => {
  res.send(`Home Route`);
});
app.get(`/api`, (req, res) => {
  res.send(`API routes`);
});
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// // Error Handling
// app.use((req, res, next) => {
//   next(error(404, "Resource Not Found"));
// });

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
