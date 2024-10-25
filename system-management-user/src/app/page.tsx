"use client";

import { useAuth } from "@/hooks/useAuth";
import Main from "@/components/Main";

export default function Home() {
  const { isLoggedIn } = useAuth(); 

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@mail.com"
                id="email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Main />;
}
