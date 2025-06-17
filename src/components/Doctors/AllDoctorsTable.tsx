"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  id: string;
  name: string;
  email: string;
  subscriptionPlan: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
}

export default function AllDoctorsTable() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "https://medicare-pro-backend.vercel.app/api/doctors"
        );
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto overflow-x-auto mt-10">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Subscription</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{doctor.name}</td>
              <td className="px-4 py-2">{doctor.email}</td>
              <td className="px-4 py-2">{doctor.subscriptionPlan}</td>
              <td className="px-4 py-2">{doctor.startDate}</td>
              <td className="px-4 py-2">{doctor.endDate}</td>
              <td className="px-4 py-2 capitalize">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    doctor.status === "active"
                      ? "bg-green-100 text-green-800"
                      : doctor.status === "expired"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {doctor.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
