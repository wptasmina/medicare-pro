"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type AdminSignupData = {
  name: string;
  email: string;
  password: string;
  // accessCode?: string; // Optional security feature
};

export default function AdminSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignupData>();

  const onSubmit = (data: AdminSignupData) => {
    console.log("Admin Signup Data:", data);
    // You would send this to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto my-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-center mb-6">Admin Registration</h2>

      <label className="block mb-2">Full Name</label>
      <input
        type="text"
        {...register("name", { required: "Full name is required" })}
        className="w-full border px-4 py-2 rounded mb-2"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <label className="block mb-2">Email</label>
      <input
        type="email"
        {...register("email", { required: "Email is required" })}
        className="w-full border px-4 py-2 rounded mb-2"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <label className="block mb-2">Password</label>
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          className="w-full border px-4 py-2 pr-10 rounded"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      {/* Optional: Access Code */}
      {/* <label className="block mb-2">Admin Access Code</label>
      <input
        type="text"
        {...register("accessCode")}
        className="w-full border px-4 py-2 rounded mb-4"
      /> */}

      <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 cursor-pointer">
        Register as Admin
      </button>
    </form>
  );
}
