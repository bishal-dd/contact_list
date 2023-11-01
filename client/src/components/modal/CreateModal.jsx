import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atoms/userState";
import { useRecoilState } from "recoil";
import { contactState } from "../../state/atoms/contactState";

const CreateModal = ({ isOpen, closeModal }) => {
  const user = useRecoilValue(userState);
  const [newContact, setNewContact] = useState({
    contact_name: "",
    contact_email: "",
    contact_number: 0,
  });
  const [contacts, setContacts] = useRecoilState(contactState);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  // Function to save the new contact
  const handleSaveContact = async (e) => {
    e.preventDefault();

    // Construct your GraphQL query
    const query = `
      mutation CreateContact($contact_name: String!, $contact_email: String!, $contact_number: Int!, $userId: Int!) {
        createContact(contact_name: $contact_name, contact_email: $contact_email, contact_number: $contact_number, userId: $userId) {
          contact_name
          contact_email
          contact_number
          userId
        }
      }
    `;
    const variables = {
      contact_name: newContact.contact_name,
      contact_email: newContact.contact_email,
      contact_number: parseInt(newContact.contact_number),
      userId: parseInt(user.userId),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GRAPHQL_URL}`,
        {
          query,
          variables,
        }
      );
      const { data } = response.data;
      const { createContact } = data;
      closeModal(); // Close the modal
      setContacts([...contacts, createContact]);
      toast.success("Contact added successfully!");
    } catch (error) {
      // Handle the error here
      console.error("error:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative bg-white w-1/3 p-4 rounded-md shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-gray-600 hover:text-red-600"
                onClick={closeModal}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Create Contact</h2>
            <form onSubmit={handleSaveContact}>
              {/* Input fields for creating a new contact */}
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
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                type="submit"
              >
                Save Contact
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModal;
