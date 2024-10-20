import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function Dashboard({ users }: { users: User[] }) {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    usersLastWeek: 0,
  });

  useEffect(() => {
    calculateUserStats();
  }, [users]);

  const calculateUserStats = () => {
    const totalUsers = users.length;
    const usersLastWeek = users.filter((user) => {
      const createdAt = new Date(user.id);
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return createdAt > lastWeek;
    }).length;

    setUserStats({ totalUsers, usersLastWeek });
  };

  const chartData = {
    labels: ["Total Users", "Users Added Last Week"],
    datasets: [
      {
        label: "User Stats",
        data: [userStats.totalUsers, userStats.usersLastWeek],
        backgroundColor: ["#4caf50", "#2196f3"],
        borderColor: ["#4caf50", "#2196f3"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-20 mb-4">User Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Total Users</h3>
          <Bar data={chartData} />
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            User Activity Over Time
          </h3>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
}
