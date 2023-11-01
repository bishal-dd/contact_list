import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../state/atoms/userState";

const Home = () => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    contact_name: "",
    contact_email: "",
    contact_number: 0,
  });
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
    },
    // Add more contact data as needed
  ]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

    console.log(variables);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GRAPHQL_URL}`,
        {
          query,
          variables,
        }
      );
      //
      toast.success("Contact added successful!");
    } catch (error) {
      // Handle the error here
      console.error("error:", error);
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center"
          onClick={openModal}
        >
          <span className="mr-2">
            <FaPlus />
          </span>
          <span>Create Contact</span>
        </button>
      </div>
      {/* Modal for creating a new contact */}
      {isModalOpen && (
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

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border-r border-b-2 border-gray-300 text-left p-3">
                Name
              </th>
              <th className="border-r border-b-2 border-gray-300 text-left p-3">
                Email
              </th>
              <th className="border-r border-b-2 border-gray-300 text-left p-3">
                Phone
              </th>
              <th className="border-r border-b-2 border-gray-300 text-left p-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border-r border-b border-gray-300 py-2 p-3">
                  {contact.name}
                </td>
                <td className="border-r border-b border-gray-300 py-2 p-3">
                  {contact.email}
                </td>
                <td className="border-r border-b border-gray-300 py-2 p-3">
                  {contact.phone}
                </td>
                <td className="border-r border-b border-gray-300 py-2 p-3">
                  <div className="flex">
                    <button className="mr-2 text-green-500 p-2 hover:bg-green-100">
                      <FaPlus /> {/* Plus icon */}
                    </button>
                    <button className="mr-2 text-blue-500 p-2 hover:bg-blue-100">
                      <FaEdit /> {/* Edit icon */}
                    </button>
                    <button className="text-red-500 p-2 hover:bg-red-100">
                      <FaTrash /> {/* Trash icon */}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
