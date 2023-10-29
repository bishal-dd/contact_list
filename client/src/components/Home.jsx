import React from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons from a library like Font Awesome

const contacts = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
  },
  // Add more contact data as needed
];

const Home = () => {
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
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
