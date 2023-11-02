import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state/atoms/userState";
import { useRecoilState } from "recoil";
import { contactState } from "../state/atoms/contactState";
import CreateModal from "./modal/CreateModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useRecoilState(contactState);

  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); // Set the number of contacts per page

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
      } catch (error) {
        // Handle the error here
        console.error("error:", error);
      }
    };
    fetchData();
  }, [setContacts, user.userId]);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GRAPHQL_URL}`,
        {
          query: `
            mutation DeleteContact($id: ID!) {
              deleteContact(id: $id){
                id
              }
            }
          `,
          variables: { id: contactId },
        }
      );

      // Check the response and handle the success or error
      if (response.data.data && response.data.data.deleteContact) {
        // Contact deleted successfully, update the contact list
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.id !== contactId)
        );
        toast.success("Contact Deleted");
      } else {
        // Handle the error, show a message, or take appropriate action
        console.error("Error deleting contact.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error deleting contact:", error);
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

        {/* Use the CreateContactModal component here */}
        <CreateModal isOpen={isModalOpen} closeModal={closeModal} />
      </div>

      <div className="overflow-x-auto shadow-lg">
        <table className="min-w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border-r border-b-2 border-gray-300 text-left p-3">
                Sl. No
              </th>
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
            {currentContacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border-r border-b border-gray-300 py-2 p-3">
                  {index + 1}
                </td>
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
                    <Link
                      className="mr-2 text-blue-500 p-2 hover-bg-blue-100"
                      to={`edit/${contact.id}`}
                      state={contact}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="text-red-500 p-2 hover-bg-red-100"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } py-2 px-4 rounded-md mx-2 transition duration-300`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`${
            indexOfLastContact >= contacts.length
              ? "bg-gray-300 text-gray-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } py-2 px-4 rounded-md mx-2 transition duration-300`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastContact >= contacts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
