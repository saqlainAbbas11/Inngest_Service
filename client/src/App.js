import { useEffect, useState } from "react";
import API from "./api";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Smart Habit Tracker</h1>
      <HabitForm onHabitAdded={fetchHabits} />
      <HabitList habits={habits} refresh={fetchHabits} />
    </div>
  );
}

export default App;
