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

const useFormValues = (
  initialState: { name: string; email: string; phone: string },
  editingUser: User | null
) => {
  const [formValues, setFormValues] = useState(initialState);

  useEffect(() => {
    if (editingUser) {
      setFormValues({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      });
    } else {
      setFormValues(initialState);
    }
  }, [editingUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return { formValues, setFormValues, handleChange };
};

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  isDarkMode,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={`Enter ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      required
      className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      }`}
    />
  </div>
);

export default function UserForm({
  addUser,
  editingUser,
  updateUser,
  isDarkMode,
}: UserFormProps) {
  const initialState = { name: "", email: "", phone: "" };
  const { formValues, setFormValues, handleChange } = useFormValues(
    initialState,
    editingUser
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      id: editingUser ? editingUser.id : Date.now(),
      ...formValues,
    };

    editingUser ? updateUser(newUser) : addUser(newUser);
    setFormValues(initialState); // Reset form
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {editingUser ? "Edit User" : "Add User"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-md rounded-lg dark:bg-gray-900">
        {/* Input fields using the reusable InputField component */}
        <InputField
          id="name"
          label="Name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
          isDarkMode={isDarkMode}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          isDarkMode={isDarkMode}
        />
        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={formValues.phone}
          onChange={handleChange}
          isDarkMode={isDarkMode}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-black py-3 px-6 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition ease-in-out">
          {editingUser ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
