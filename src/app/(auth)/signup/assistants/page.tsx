"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AssistantFormValues = {
  name: string;
  email: string;
  department: string;
  password: string;
};

export default function AssistantSignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssistantFormValues>();

  const onSubmit = (data: AssistantFormValues) => {
    console.log("Assistant Form Submitted:", data);
    toast.success("Assistant registered successfully!", { position: "top-right" });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 my-10 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Assistant Registration</h2>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">Full Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter full name"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      {/* Department */}
      <div className="mb-4">
        <label htmlFor="department" className="block font-medium mb-1">Department</label>
        <input
          id="department"
          type="text"
          {...register("department", { required: "Department is required" })}
          className="w-full px-4 py-2 border rounded"
          placeholder="e.g. Radiology, Reception"
        />
        {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded pr-10"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
      >
        Register as Assistant
      </button>
    </form>
  );
}
