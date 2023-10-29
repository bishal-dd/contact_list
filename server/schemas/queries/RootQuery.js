const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const getAllUser = require("./getAllUser");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUser,
  },
});

module.exports = RootQuery;
