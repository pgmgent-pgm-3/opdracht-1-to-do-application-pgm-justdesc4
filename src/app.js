import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/hello-world", (request, response) => {
  response.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
