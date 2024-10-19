import { useState, useEffect } from "react";

interface UserFormProps {
  addUser: (user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }) => void;
  editingUser: {
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null;
  updateUser: (user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }) => void;
}

export default function UserForm({
  addUser,
  editingUser,
  updateUser,
}: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Effect to populate form fields if editingUser is not null
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      id: editingUser ? editingUser.id : Math.floor(Math.random() * 10000),
      name,
      email,
      phone,
    };

    if (editingUser) {
      updateUser(newUser);
    } else {
      addUser(newUser);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editingUser ? "Edit User" : "Add User"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
