"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      router.push("/dashboard");
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      router.push("/dashboard");
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? "Register" : "Login"}
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mb-4 hover:bg-blue-700 transition duration-300"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-blue-600 p-3 rounded-lg hover:text-blue-700 transition duration-300"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
