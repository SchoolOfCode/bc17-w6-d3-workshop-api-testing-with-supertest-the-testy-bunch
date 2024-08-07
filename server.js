import app from "./app.js";
const port = process.env.PORT || 5010;

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${server.address().port}`);
});
