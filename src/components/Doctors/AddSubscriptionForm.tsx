"use client";

import React, { useState } from "react";

export default function AddSubscriptionForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures((prev) => [...prev, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan = {
      name,
      price: parseFloat(price),
      duration: parseInt(duration),
      features,
      isDefault,
      isActive,
    };

    console.log("Submitted Subscription Plan:", newPlan);
    // You can call your API here to POST the data
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-600">Add New Subscription Plan</h2>

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
        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="flex-grow border px-3 py-2 rounded"
            placeholder="e.g., Full Access"
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
          <ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={() => setIsDefault((prev) => !prev)}
          />
          Default Plan
        </label>
        <label className="flex items-center gap-1">
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
        Add Subscription
      </button>
    </form>
  );
}
