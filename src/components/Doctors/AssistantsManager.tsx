"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "@/lib/axios";
import AddAssistantForm from "./AddAssistantForm";
import AssistantsList from "./AssistantsList";

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

export default function AssistantsManager() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);

  const fetchAssistants = async () => {
    try {
      const res = await apiClient.get("/doctor/assistants");
      setAssistants(res.data.assistants || res.data);
    } catch {
      toast.error("Failed to fetch assistants");
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const handleAssistantAdded = () => {
    fetchAssistants();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <AddAssistantForm onAdded={handleAssistantAdded} />

      <h2 className="mt-10 mb-4 text-xl font-semibold">Assistants List</h2>

      <AssistantsList assistants={assistants} />
    </div>
  );
}
