const { client } = require("./db");
client.connect();

const PORT = 3000 || process.env.PORT;
const express = require("express");
const server = express();

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.get("/background/:color", (req, res, next) => {
  res.send(`
    <body style="background: ${req.params.color};">
      <h1>Hello World</h1>
    </body>
  `);
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
