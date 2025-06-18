"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Plan {
  id?: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  isDefault: boolean;
  isActive: boolean;
}

interface Props {
  plan?: Plan;
  onSuccess?: () => void;
}

export default function AddSubscriptionForm({ plan, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setPrice(plan.price.toString());
      setDuration(plan.duration.toString());
      setFeatures(plan.features || []);
      setIsDefault(plan.isDefault);
      setIsActive(plan.isActive);
    }
  }, [plan]);

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures((prev) => [...prev, trimmed]);
      setFeatureInput("");
    }
  };

  const handleDeleteFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan: Plan = {
      name,
      price: parseFloat(price),
      duration: parseInt(duration),
      features,
      isDefault,
      isActive,
    };

    try {
      if (plan?.id) {
        await axios.put(
          `https://medicare-pro-backend.vercel.app/api/plans/${plan.id}`,
          newPlan
        );
      } else {
        await axios.post(
          "/admin/plans/create",
          newPlan
        );
      }

      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit plan:", error);
      alert("Failed to submit plan. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-600">
        {plan ? "Edit Plan" : "Add New Plan"}
      </h2>

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Price ($)</label>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Duration (in days)</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Features</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="flex-grow border px-3 py-2 rounded"
            placeholder="e.g., Premium Support"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {features.length > 0 && (
          <ul className="space-y-1 text-sm text-gray-800">
            {features.map((feature, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteFeature(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={() => setIsDefault((prev) => !prev)}
          />
          Default Plan
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive((prev) => !prev)}
          />
          Active
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {plan ? "Update Plan" : "Add Subscription"}
      </button>
    </form>
  );
}
