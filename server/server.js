const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema, GraphQLSchema } = require("graphql");
const { expressjwt: jwt } = require("express-jwt");
const db = require("./models");
const port = 8080;
const schema = require("./schemas/index");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

app.use(
  "/graphql",
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // Algorithm used to sign the token
  }).unless({
    path: ["/graphql", "/contact", "/sign_up"], // Add routes that don't require authentication
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
