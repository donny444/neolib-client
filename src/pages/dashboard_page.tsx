import { useEffect, useState, JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetTopCategories,
  GetReadingStatus,
  GetBooksByPages,
} from "../utils/getinsights";
import { useAuth } from "../contexts/auth_context";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage(): JSX.Element {
  const isAuthenticated = useAuth()?.isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <TopFiveCategories />
      <ReadingStatusByCategory />
      <BooksByPages />
    </>
  );
}

function TopFiveCategories(): JSX.Element {
  interface TopCategory {
    category: string;
    count: number;
  }
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<TopCategory[]>([]);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const response = await GetTopCategories();
        if (!response) {
          setError(true)
        }
        if (response?.status === 200) {
          setError(response.data.error);
        } else {
          setData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching top five book categories:", error);
      }
    };

    fetchTopCategories();
  }, []);

  const pieData = data
    ? {
        labels: data.map((item: TopCategory) => item.category),
        datasets: [
          {
            data: data.map((item: TopCategory) => item.count),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      }
    : undefined;

  return (
    <div>
      <p className="text-center">Top 5 Categories</p>
      {error && <p className="text-center text-danger">Failed to load data</p>}
      {pieData && <Pie data={pieData} />}
    </div>
  );
}

function ReadingStatusByCategory(): JSX.Element {
  interface CountOfStatus {
    category: string;
    status: number;
    count: number;
  }
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<CountOfStatus[]>([]);

  useEffect(() => {
    const fetchReadingStatus = async () => {
      try {
        const response = await GetReadingStatus();
        if (!response) {
          setError(true)
        } else {
          if (response.status === 200) {
            setError(true);
          } else {
            setData(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching reading status by category:", error);
      }
    };

    fetchReadingStatus();
  }, []);

  const verticalStackedBarData = data
    ? {
        labels: data.map((item: CountOfStatus) => item.category),
        datasets: data.map((item: CountOfStatus) => ({
          label: item.status === 1 ? "Read" : "Unread",
          data: item.count,
          stack: item.category,
          backgroundColor: item.status === 1 ? "green" : "red",
        })),
      }
    : undefined;

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Reading Status by Category" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <div>
      <p className="text-center">Reading Status by Category</p>
      {error && <p className="text-center text-danger">Failed to load data</p>}
      {verticalStackedBarData &&
        <Bar data={verticalStackedBarData} options={barOptions} />
      }
    </div>
  );
}

function BooksByPages(): JSX.Element {
  interface PageGroup {
    page_range: string;
    count: number;
  }
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<PageGroup[]>([]);

  useEffect(() => {
    const fetchBooksByPages = async () => {
      try {
        const response = await GetBooksByPages();
        if (!response) {
          setError(true)
        }
        if (response?.status === 200) {
          setError(response.data.error);
        } else {
          setData(response?.data);
        }
      } catch (error) {
        console.error("Error fetching book counts by page range:", error);
      }
    };

    fetchBooksByPages();
  }, []);

  const verticalBarData = data
    ? {
        labels: data.map((item: PageGroup) => item.page_range),
        datasets: [
          {
            label: "Books",
            data: data.map((item: PageGroup) => item.count),
            backgroundColor: "#4BC0C0",
          },
        ],
      }
    : undefined;

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Books by Page Range" },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      <p className="text-center">Books by Page Range</p>
      {error && <p className="text-center text-danger">Failed to load data</p>}
      {verticalBarData && <Bar data={verticalBarData} options={barOptions} />}
    </div>
  );
}
