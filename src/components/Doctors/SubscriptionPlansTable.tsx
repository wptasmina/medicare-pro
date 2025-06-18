"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSubscriptionForm from "./AddSubscriptionForm";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number; 
  isDefault: boolean;
  isActive: boolean;
  features: string[];
}

export default function SubscriptionPlansTable() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("https://medicare-pro-backend.vercel.app/api/plans");
        setPlans(res.data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 bg-gray-100 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subscription Plan Management</h2>

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              + Add New Plan
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <AddSubscriptionForm onSuccess={() => location.reload()} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-center">Default</th>
              <th className="px-4 py-2 text-center">Active</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{plan.name}</td>
                <td className="px-4 py-2">${plan.price}</td>
                <td className="px-4 py-2">{plan.duration}</td>
                <td className="px-4 py-2 text-center">
                  {plan.isDefault ? (
                    <span className="text-green-600 text-xl">✔</span>
                  ) : (
                    <span className="text-red-600 text-xl">✖</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  {plan.isActive ? (
                    <span className="inline-block w-4 h-4 bg-green-500 rounded-full" />
                  ) : (
                    <span className="inline-block w-4 h-4 bg-gray-400 rounded-full" />
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="text-blue-600 hover:underline mr-3"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Subscription Plan</DialogTitle>
                        <DialogDescription>
                          Update the plan details below.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedPlan && (
                        <AddSubscriptionForm
                          plan={selectedPlan}
                          onSuccess={() => location.reload()}
                        />
                      )}
                    </DialogContent>
                  </Dialog>

                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {plans.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No subscription plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
