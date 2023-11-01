import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state/atoms/userState";
import { useRecoilState } from "recoil";
import { contactState } from "../state/atoms/contactState";
import CreateModal from "./modal/CreateModal";
import EditModal from "./modal/EditModal";

const Home = () => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contacts, setContacts] = useRecoilState(contactState);
  const [editedContact, setEditedContact] = useState(null);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setEditedContact(contact);
    setIsEditModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Construct your GraphQL query
      const query = `
    query GetAllContact($userId: Int!) {
      getAllContact(userId: $userId){
        contact_name
        contact_email
        contact_number
        userId
        id
      }
    }
  `;
      const variables = {
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
        const { getAllContact } = data;
        setContacts(getAllContact);
        //
      } catch (error) {
        // Handle the error here
        console.error("error:", error);
      }
    };
    fetchData();
  }, [setContacts, user.userId]);

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

        {/* Use the CreateContactModal component here */}
        <CreateModal isOpen={isModalOpen} closeModal={closeModal} />
        {/* ... */}
        <EditModal
          isOpen={isEditModalOpen}
          closeModal={closeModal}
          contact={editedContact}
        />
      </div>

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
            {contacts && contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <tr
                  key={contact.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border-r border-b border-gray-300 py-2 p-3">
                    {contact.contact_name}
                  </td>
                  <td className="border-r border-b border-gray-300 py-2 p-3">
                    {contact.contact_email}
                  </td>
                  <td className="border-r border-b border-gray-300 py-2 p-3">
                    {contact.contact_number}
                  </td>
                  <td className="border-r border-b border-gray-300 py-2 p-3">
                    <div className="flex">
                      <button
                        className="mr-2 text-blue-500 p-2 hover-bg-blue-100"
                        onClick={() => openEditModal(contact)}
                      >
                        <FaEdit /> {/* Edit icon */}
                      </button>
                      <button className="text-red-500 p-2 hover-bg-red-100">
                        <FaTrash /> {/* Trash icon */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={4}>No contacts available</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
