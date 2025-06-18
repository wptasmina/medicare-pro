"use client";

interface Assistant {
  id: string;
  name: string;
  email: string;
  permissions: {
    manage_patients: boolean;
    manage_appointments: boolean;
    manage_schedule: boolean;
  };
}

type AssistantsListProps = {
  assistants: Assistant[];
};

export default function AssistantsList({ assistants }: AssistantsListProps) {
  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assistants.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No assistants found.
              </td>
            </tr>
          )}
          {assistants.map((assistant) => (
            <tr key={assistant.id}>
              <td className="px-6 py-4 whitespace-nowrap">{assistant.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{assistant.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {Object.entries(assistant.permissions)
                  .filter(([, value]) => value)
                  .map(([key]) =>
                    key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())
                  )
                  .join(", ") || "None"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
