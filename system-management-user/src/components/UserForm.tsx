import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UserFormProps {
  addUser: (user: User) => void;
  editingUser: User | null;
  updateUser: (user: User) => void;
  isDarkMode: boolean;
}

export default function UserForm({
  addUser,
  editingUser,
  updateUser,
  isDarkMode,
}: UserFormProps) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormValues({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      });
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      id: editingUser ? editingUser.id : Date.now(),
      ...formValues,
    };

    editingUser ? updateUser(newUser) : addUser(newUser);
    setFormValues({ name: "", email: "", phone: "" });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editingUser ? "Edit User" : "Add User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg dark:bg-gray-900">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={formValues.name}
            onChange={handleChange}
            required
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={formValues.email}
            onChange={handleChange}
            required
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            value={formValues.phone}
            onChange={handleChange}
            required
            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-black py-3 px-6 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition ease-in-out">
          {editingUser ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
