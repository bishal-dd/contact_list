const graphql = require("graphql");
const { GraphQLString, GraphQLInt, GraphQLID } = graphql;
const ContactType = require("../TypeDefinition/ContactType");
const { Contact } = require("../../models");

const deleteContact = {
  type: ContactType,
  args: {
    id: { type: GraphQLID }, // Assuming you have an ID field for each contact
  },
  async resolve(parent, args) {
    try {
      // First, find the contact you want to update by its ID
      const contact = await Contact.findByPk(args.id);

      if (!contact) {
        throw new Error("Contact not found");
      }

      // Update the contact's fields if they are provided in the args
      contact.isActive = false;

      // Save the updated contact
      await contact.save();

      return contact;
    } catch (err) {
      throw new Error("Failed to update contact: " + err.message);
    }
  },
};

module.exports = deleteContact;
