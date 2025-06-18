"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Assistant {
  name: string;
  email: string;
  permissions: {
    patients: boolean;
    appointments: boolean;
    schedule: boolean;
  };
}

export default function AllAssistantsTable() {
  const [assistant, setAssistant] = useState<Assistant>({
    name: "ailinator",
    email: "medicare@exampul.com",
    permissions: {
      patients: true,
      appointments: false,
      schedule: false,
    },
  });

  const [formData, setFormData] = useState(assistant);
  const [open, setOpen] = useState(false); // ✅ Dialog control

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    if (name in formData.permissions) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAssistant(formData); // Update data
    setOpen(false); // ✅ Close dialog
    toast.success("Assistant updated successfully!"); // ✅ Show toast
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Assistants</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Permissions</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-3">{assistant.name}</td>
              <td className="px-4 py-3">{assistant.email}</td>
              <td className="px-4 py-3 space-y-1">
                <div className="flex items-center gap-1">
                  Manage Patients:
                  <span className="text-xl">
                    {assistant.permissions.patients ? "✅" : "❌"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  Manage Appointments:
                  <span className="text-xl">
                    {assistant.permissions.appointments ? "✅" : "❌"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  Manage Schedule:
                  <span className="text-xl">
                    {assistant.permissions.schedule ? "✅" : "❌"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 space-x-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Assistant</DialogTitle>
                      <DialogDescription>
                        Modify the assistant’s details below.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <label className="block font-medium">Name</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border px-3 py-2 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border px-3 py-2 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">
                          Permissions
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="patients"
                              checked={formData.permissions.patients}
                              onChange={handleChange}
                            />
                            Manage Patients
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="appointments"
                              checked={formData.permissions.appointments}
                              onChange={handleChange}
                            />
                            Manage Appointments
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="schedule"
                              checked={formData.permissions.schedule}
                              onChange={handleChange}
                            />
                            Manage Schedule
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Update Assistant
                      </button>
                    </form>
                  </DialogContent>
                </Dialog>

                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
