const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const getAllUser = require("./getAllUser");
const signInUser = require("./signInUser");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUser,
    signInUser: signInUser,
  },
});

module.exports = RootQuery;
