"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function AllAssistantsTable() {
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
              <td className="px-4 py-3">ailinator</td>
              <td className="px-4 py-3">medicare@exampul.com</td>
              <td className="px-4 py-3 space-y-1">
                <div className="flex items-center gap-1">
                  Manage Patients:
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div className="flex items-center gap-1">
                  Manage Appointments:
                  <span className="text-red-600 text-xl">❌</span>
                </div>
                <div className="flex items-center gap-1">
                  Manage Schedule:
                  <span className="text-red-600 text-xl">❌</span>
                </div>
              </td>
              <td className="px-4 py-3 space-x-2">

                <button>
                  <Dialog>
                    <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">Edit</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </button>
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
