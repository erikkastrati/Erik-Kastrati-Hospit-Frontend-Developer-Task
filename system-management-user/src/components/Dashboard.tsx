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

const useUserStats = (users: User[]) => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    usersLastWeek: 0,
  });

  useEffect(() => {
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

    calculateUserStats();
  }, [users]);

  return userStats;
};

const getChartData = (userStats: {
  totalUsers: number;
  usersLastWeek: number;
}) => ({
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
});

const ChartContainer = ({
  title,
  chartType,
  data,
}: {
  title: string;
  chartType: "Bar" | "Line";
  data: any;
}) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {chartType === "Bar" ? <Bar data={data} /> : <Line data={data} />}
    </div>
  );
};

export default function Dashboard({ users }: { users: User[] }) {
  const userStats = useUserStats(users);
  const chartData = getChartData(userStats);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-20 mb-4">User Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <ChartContainer title="Total Users" chartType="Bar" data={chartData} />
        <ChartContainer
          title="User Activity Over Time"
          chartType="Line"
          data={chartData}
        />
      </div>
    </div>
  );
}
