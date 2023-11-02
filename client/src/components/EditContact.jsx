import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { contactState } from "../state/atoms/contactState";

export default function EditContact() {
  const navigate = useNavigate();
  const locate = useLocation();
  const contact = locate.state;
  const [editedContact, setEditedContact] = useState(contact);
  // Get the contactState and its setter function
  const [contacts, setContacts] = useRecoilState(contactState);
  // Function to handle form input changes
  const handleInputChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    // Construct your GraphQL query
    const query = `
      mutation UpdateContact($id: ID!, $contact_name: String!, $contact_email: String!, $contact_number: Int!) {
        updateContact(id: $id, contact_name: $contact_name, contact_email: $contact_email, contact_number: $contact_number) {
          contact_name
          contact_email
          contact_number
          id
        }
      }
    `;
    const variables = {
      id: editedContact.id,
      contact_name: editedContact.contact_name,
      contact_email: editedContact.contact_email,
      contact_number: parseInt(editedContact.contact_number),
    };
    console.log(variables);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GRAPHQL_URL}`,
        {
          query,
          variables,
        }
      );
      const { data } = response.data;
      console.log(data);
      const updateContact = data.updateContact;

      // Find the index of the edited contact
      const index = contacts.findIndex((c) => c.id === updateContact.id);

      // Update the contactState with the edited contact
      setContacts((prevContacts) => {
        const updatedContacts = [...prevContacts];
        updatedContacts[index] = updateContact;
        return updatedContacts;
      });
      navigate("/contact");
      toast.success("Contact updated successfully!");
    } catch (error) {
      // Handle the error here
      console.error("error:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative bg-white w-1/3 p-4 rounded-md shadow-lg">
          <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
          <form onSubmit={handleSaveEdit}>
            <div className="mb-4">
              <label
                htmlFor="contact_name"
                className="block text-gray-600 mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                value={editedContact.contact_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-600 mb-2"
              >
                Email:
              </label>
              <input
                type="text"
                id="contact_email"
                name="contact_email"
                value={editedContact.contact_email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_number"
                className="block text-gray-600 mb-2"
              >
                Phone:
              </label>
              <input
                type="number"
                id="contact_number"
                name="contact_number"
                value={editedContact.contact_number}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              type="submit"
            >
              Update Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
