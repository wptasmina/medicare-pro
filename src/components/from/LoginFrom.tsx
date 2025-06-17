"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    toast.success("Login successful!", { position: "top-right" });
    reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto p-6 my-10 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
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

      {/* Password */}
      <div className="mb-5">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
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
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>

         <p className="mt-6 text-sm text-center cursor-pointer">
          New to <span className="font-bold">Medicare</span>? Click here to
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/admin"}>
            Register as a admin
          </Link>
          or
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/doctor"}>
            Join as a doctor 
          </Link> 
            Or
          <Link className="text-[#022dbb] font-bold ml-1" href={"/signup/assistants"}>
            Register as a Assistants
          </Link>
          .
        </p>
    </form>
  );
}
