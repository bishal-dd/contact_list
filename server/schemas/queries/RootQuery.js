const graphql = require("graphql");
const { GraphQLObjectType } = graphql;
const getAllUser = require("./getAllUser");
const signInUser = require("./signInUser");
const getAllContact = require("./getAllContact");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: getAllUser,
    signInUser: signInUser,
    getAllContact: getAllContact,
  },
});

module.exports = RootQuery;
