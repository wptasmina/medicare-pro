"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DoctorFormValues = {
  name: string;
  email: string;
  specialization: string;
  password: string;
};

export default function DoctorSignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DoctorFormValues>();

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data: DoctorFormValues) => {
    console.log("Doctor Form Submitted:", data);
    toast.success("Doctor registered successfully!", { position: "top-right" });
    reset(); // clear form fields
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 my-10 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium mb-1">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter full name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Specialization */}
      <div className="mb-4">
        <label htmlFor="specialization" className="block font-medium mb-1">Specialization</label>
        <input
          id="specialization"
          type="text"
          placeholder="e.g. Cardiologist"
          {...register("specialization", { required: "Specialization is required" })}
          className="w-full px-4 py-2 border rounded"
        />
        {errors.specialization && (
          <p className="text-sm text-red-500 mt-1">{errors.specialization.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded pr-10"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register as Doctor
      </button>
    </form>
  );
}
