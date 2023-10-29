const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema, GraphQLSchema } = require("graphql");
const port = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
