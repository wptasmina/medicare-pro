"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";
import { AxiosError } from "axios"; 

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  permissions: z.array(z.string()).nonempty("Select at least one permission"),
});

type FormValues = z.infer<typeof schema>;

interface AddAssistantFormProps {
  onAdded: () => void;
}

export default function AddAssistantForm({ onAdded }: AddAssistantFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { permissions: [] },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const res = await apiClient.post("/doctor/assistants", data);
      if (res.status === 201) {
        toast.success("Assistant added successfully");
        reset();
        onAdded(); // Notify parent component to refresh list
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again");
        router.push("/login");
      } else {
        toast.error(err.response?.data?.message || "Failed to add assistant");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Add Assistant</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Permissions</label>
        <div className="space-y-2">
          {["manage_patients", "manage_appointments", "manage_schedule"].map(
            (permission) => (
              <label key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={permission}
                  {...register("permissions")}
                />
                {permission
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
            )
          )}
        </div>
        {errors.permissions && (
          <p className="text-red-500 text-sm mt-1">{errors.permissions.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded cursor-pointer ${
          loading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {loading ? "Adding..." : "Add Assistant"}
      </button>
    </form>
  );
}
