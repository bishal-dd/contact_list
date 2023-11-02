const graphql = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLID } = graphql;
const ContactType = require("../TypeDefinition/ContactType");
const { Contact } = require("../../models");

const updateContact = {
  type: ContactType,
  args: {
    id: { type: GraphQLID }, // Assuming you have an ID field for each contact
    contact_name: { type: GraphQLString },
    contact_email: { type: GraphQLString },
    contact_number: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    console.log(args.id);
    try {
      // First, find the contact you want to update by its ID
      const contact = await Contact.findByPk(args.id);

      if (!contact) {
        throw new Error("Contact not found");
      }

      // Update the contact's fields if they are provided in the args
      if (args.contact_name) {
        contact.contact_name = args.contact_name;
      }

      if (args.contact_email) {
        contact.contact_email = args.contact_email;
      }

      if (args.contact_number) {
        contact.contact_number = args.contact_number;
      }

      // Save the updated contact
      await contact.save();

      return contact;
    } catch (err) {
      throw new Error("Failed to update contact: " + err.message);
    }
  },
};

module.exports = updateContact;
