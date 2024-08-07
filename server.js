import app from "./app.js";
const port = process.env.port || 5010;

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${server.address().port}`);
});
