"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddAssistantSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  permissions: z.array(z.string()).nonempty("At least one permission is required"),
});

type AddAssistantFormValues = z.infer<typeof AddAssistantSchema>;

export default function AddAssistantForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddAssistantFormValues>({
    resolver: zodResolver(AddAssistantSchema),
    defaultValues: { permissions: [] },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: AddAssistantFormValues) => {
    try {
      setLoading(true);
      await axios.post("https://medicare-pro-backend.vercel.app/api/assistants", data);
      toast.success("Assistant added successfully");
      reset();
    } catch (err) {
      toast.error("Failed to add assistant");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Add Assistant</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Permissions */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Permissions</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" value="manage_patients" {...register("permissions")} />
            Manage Patients
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="manage_appointments" {...register("permissions")} />
            Manage Appointments
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" value="manage_schedule" {...register("permissions")} />
            Manage Schedule
          </label>
        </div>
        {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {loading ? "Adding..." : "Add Assistant"}
      </button>
    </form>
  );
}
