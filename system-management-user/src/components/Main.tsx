// src/components/Main.tsx
"use client";

import { useState, useEffect } from "react";
import UserForm from "@/components/UserForm";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Main() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.slice(0, 5)));
  }, []);

  const addUser = (newUser: User) => {
    if (users.some((user) => user.email === newUser.email)) {
      alert("A user with this email already exists.");
      return;
    }
    setUsers([newUser, ...users]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const deleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const filteredAndSortedUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100"
      }`}>
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          User Management System
        </h1>
        <div className="flex justify-between mb-10">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <UserForm
          addUser={addUser}
          editingUser={editingUser}
          updateUser={updateUser}
          isDarkMode={isDarkMode}
        />

        <h2 className="text-2xl font-bold mt-20 mb-4">Users</h2>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          />
          <div className="space-x-2">
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}>
              Sort A-Z
            </button>
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-4 py-2 rounded-lg ${
                sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}>
              Sort Z-A
            </button>
          </div>
        </div>

        <table className="min-w-full bg-white dark:bg-gray-800 border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-gray-700 dark:text-gray-300">
                Name
              </th>
              <th className="py-3 px-4 border-b text-gray-700 dark:text-gray-300">
                Email
              </th>
              <th className="py-3 px-4 border-b text-gray-700 dark:text-gray-300">
                Phone
              </th>
              <th className="py-3 px-4 border-b text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-3 px-4 border-b text-gray-900 dark:text-gray-300">
                    {user.name}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-900 dark:text-gray-300">
                    {user.phone}
                  </td>
                  <td className="py-3 px-4 border-b space-x-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-4 px-4 text-center text-gray-500 dark:text-gray-300">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Dashboard users={users} />
      </div>
    </div>
  );
}
