const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const ContactType = new GraphQLObjectType({
  name: "Contact",
  fields: () => ({
    contact_name: { type: GraphQLString },
    contact_number: { type: GraphQLInt },
    contact_email: { type: GraphQLString },
    userId: { type: GraphQLInt }, // This is the foreign key
  }),
});

module.exports = ContactType;
