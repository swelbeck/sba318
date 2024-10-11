// SBA 318: Express Server Application - Blog
//Imports
import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import error from "./utilities/error.mjs";

// Create an instance of express
const app = express();
let PORT = 3000;


// Middleware

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Error Handling


// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});