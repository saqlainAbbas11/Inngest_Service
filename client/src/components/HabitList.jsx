import API from "../api";

export default function HabitList({ habits, refresh }) {
  const handleLog = async (id) => {
    await API.post(`/habits/${id}/log`);
    refresh();
  };

  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit._id} className="mb-2 p-2 border rounded flex justify-between">
          <div>
            <strong>{habit.name}</strong><br />
            Logs: {habit.logs.length}
          </div>
          <button
            onClick={() => handleLog(habit._id)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Mark Done
          </button>
        </li>
      ))}
    </ul>
  );
}
