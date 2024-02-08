import express from "express";
const app = express();
//lol
app.get("/", (_req, res) => res.json({ message: "Server Up and Running!" }));
app.listen(8000, () => {
  console.log("Server Listening at PORT 8000");
});
