const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const ContactType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    contact_name: { type: GraphQLString },
    contact_number: { type: GraphQLInt },
    contact_email: { type: GraphQLString },
    userId: { type: GraphQLID }, // This is the foreign key
  }),
});

module.exports = ContactType;
