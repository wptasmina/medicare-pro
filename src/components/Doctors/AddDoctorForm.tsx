"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const AddDoctorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  specialization: z.string().min(2, "Specialization is required"),
});

type AddDoctorFormValues = z.infer<typeof AddDoctorSchema>;

export default function AddDoctorForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDoctorFormValues>({
    resolver: zodResolver(AddDoctorSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AddDoctorFormValues) => {
    try {
      setLoading(true);
      await apiClient.post("/doctors", data);
      toast.success("Doctor added successfully!");
      reset();
    } catch (err) {
  const error = err as AxiosError<{ message: string }>;
  console.error("Login error:", error);
  toast.error(
    error.response?.data?.message || "Login failed. Please try again.",
    { position: "top-right" }
  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Specialization */}
      <div className="mb-4">
        <label className="block mb-1">Specialization</label>
        <input
          type="text"
          {...register("specialization")}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.specialization && (
          <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Doctor"}
      </button>
    </form>
  );
}
