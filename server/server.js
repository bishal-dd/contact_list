const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const db = require("./models");
const schema = require("./api/graphql");

const port = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // You can add context data here if needed
  },
  cache: "bounded",
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

db.sequelize.sync().then(() => {
  startServer();
});
