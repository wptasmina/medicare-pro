"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// All 15 subscription options
const subscriptionOptions = [
  // Monthly Plans
  { value: "monthly-basic", label: "Monthly Basic – $5 (30 days)" },
  { value: "monthly-standard", label: "Monthly Standard – $9 (30 days)" },
  { value: "monthly-premium", label: "Monthly Premium – $12 (30 days)" },
  { value: "monthly-pro", label: "Monthly Pro – $15 (30 days)" },
  { value: "monthly-unlimited", label: "Monthly Unlimited – $20 (30 days)" },

  // Yearly Plans
  { value: "yearly-basic", label: "Yearly Basic – $49 (365 days)" },
  { value: "yearly-standard", label: "Yearly Standard – $79 (365 days)" },
  { value: "yearly-premium", label: "Yearly Premium – $99 (365 days)" },
  { value: "yearly-pro", label: "Yearly Pro – $129 (365 days)" },
  { value: "yearly-unlimited", label: "Yearly Unlimited – $149 (365 days)" },

  // Daily Plans
  { value: "daily-basic", label: "Daily Basic – $1 (1 day)" },
  { value: "daily-standard", label: "Daily Standard – $2 (1 day)" },
  { value: "daily-premium", label: "Daily Premium – $3 (1 day)" },
  { value: "daily-pro", label: "Daily Pro – $4 (1 day)" },
  { value: "daily-unlimited", label: "Daily Unlimited – $5 (1 day)" },
];

// Zod schema using union of string literals
const AddDoctorSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  specialization: z.string().min(2, "Specialization is required"),
  subscriptionPlan: z.enum([
    "monthly-basic",
    "monthly-standard",
    "monthly-premium",
    "monthly-pro",
    "monthly-unlimited",
    "yearly-basic",
    "yearly-standard",
    "yearly-premium",
    "yearly-pro",
    "yearly-unlimited",
    "daily-basic",
    "daily-standard",
    "daily-premium",
    "daily-pro",
    "daily-unlimited",
  ], {
    required_error: "Subscription plan is required",
  }),
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
      toast.error(
        error.response?.data?.message || "Something went wrong.",
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

      {/* Subscription Plan */}
      <div className="mb-4">
        <label className="block mb-1">Subscription Plan</label>
        <select
          {...register("subscriptionPlan")}
          defaultValue=""
          className="w-full border px-4 py-2 rounded"
        >
          <option value="" disabled>Select a plan</option>
          {subscriptionOptions.map((plan) => (
            <option key={plan.value} value={plan.value}>
              {plan.label}
            </option>
          ))}
        </select>
        {errors.subscriptionPlan && (
          <p className="text-red-500 text-sm mt-1">{errors.subscriptionPlan.message}</p>
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
