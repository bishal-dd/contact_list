import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../state/atoms/userState";
import { useRecoilState } from "recoil";
import { contactState } from "../../state/atoms/contactState";

const EditModal = ({ isOpen, closeModal, contact, contact_id }) => {
  const user = useRecoilValue(userState);
  const [editedContact, setEditedContact] = useState(contact);

  console.log(contact_id);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
  };

  // Function to save the edited contact
  const handleSaveEdit = async () => {
    // Construct your GraphQL query
    const query = `
      mutation UpdateContact($id: Int!, $contact_name: String!, $contact_email: String!, $contact_number: Int!) {
        updateContact(id: $id, contact_name: $contact_name, contact_email: $contact_email, contact_number: $contact_number) {
          contact_name
          contact_email
          contact_number
        }
      }
    `;
    const variables = {
      id: editedContact.id,
      contact_name: editedContact.contact_name,
      contact_email: editedContact.contact_email,
      contact_number: parseInt(editedContact.contact_number),
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
      const { updateContact } = data;
      updateContact(updateContact); // Update the contact in the parent component
      closeModal(); // Close the modal
      toast.success("Contact updated successfully!");
    } catch (error) {
      // Handle the error here
      console.error("error:", error);
    }
  };

  return (
    <div>
      {isOpen && contact && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 opacity-50"></div>
          <div className="relative bg-white w-1/3 p-4 rounded-md shadow-lg">
            <div className="flex justify-end">
              <button
                className="text-gray-600 hover:text-red-600"
                onClick={closeModal}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
            <form>
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
                onClick={handleSaveEdit}
              >
                Update Contact
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
