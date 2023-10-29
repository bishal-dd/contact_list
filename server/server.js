const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema, GraphQLSchema } = require("graphql");
const db = require("./models");
const schema = require("./schemas/index");
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
