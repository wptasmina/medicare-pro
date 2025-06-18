"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// Schema
const AddPlanSchema = z.object({
  name: z.string().min(2, "Plan name is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be greater than or equal to 0"),
  duration: z
    .number({ invalid_type_error: "Duration must be a number" })
    .min(1, "Duration must be at least 1"),
  type: z.enum(["daily", "monthly", "yearly"], {
    required_error: "Type is required",
  }),
});

type AddPlanFormValues = z.infer<typeof AddPlanSchema>;

export default function AddPlanForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPlanFormValues>({
    resolver: zodResolver(AddPlanSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AddPlanFormValues) => {
    try {
      setLoading(true);
      await apiClient.post("/admin/plans/create", data);
      toast.success("Plan created successfully!");
      reset();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create plan";
      toast.error(msg);
      console.error("Plan creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Create Subscription Plan</h2>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1">
          Plan Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label htmlFor="price" className="block mb-1">
          Price ($)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label htmlFor="duration" className="block mb-1">
          Duration (days)
        </label>
        <input
          id="duration"
          type="number"
          {...register("duration", { valueAsNumber: true })}
          className="w-full border px-4 py-2 rounded"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.duration.message}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="mb-6">
        <label htmlFor="type" className="block mb-1">
          Type
        </label>
        <select
          id="type"
          {...register("type")}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select type</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Creating..." : "Create Plan"}
      </button>
    </form>
  );
}
