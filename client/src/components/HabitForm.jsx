import { useState } from "react";
import API from "../api";

export default function HabitForm({ onHabitAdded }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const res = await API.post("/habits", { name });
    onHabitAdded(res.data);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="New habit (e.g. Drink Water)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border mr-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
