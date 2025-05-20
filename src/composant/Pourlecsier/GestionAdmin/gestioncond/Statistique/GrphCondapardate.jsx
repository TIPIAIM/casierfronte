import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const ChartWrapper = styled(motion.div)`
  width: 100%;
  height: 340px;
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: #f0f4f8;
  border-radius: 12px;
`;

const ErrorMessage = styled(motion.div)`
  padding: 1.5rem;
  color: #c53030;
  text-align: center;
  background-color: #ffe5e5;
  border-radius: 8px;
  margin: 1rem 0;
`;

const CondemnationChart = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_b}/criminal`);
        if (response.data.success) {
          setRecords(response.data.data);
        } else {
          setError("Erreur lors du chargement des données");
        }
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const prepareRadarData = () => {
    const monthData = records.reduce((acc, record) => {
      if (!record.dateCondamnations) return acc;
      const date = new Date(record.dateCondamnations);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {});

    const sortedMonths = Object.keys(monthData).sort((a, b) => {
      const [monthA, yearA] = a.split('/').map(Number);
      const [monthB, yearB] = b.split('/').map(Number);
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });

    const recentMonths = sortedMonths.slice(-12);

    return {
      labels: recentMonths,
      data: recentMonths.map(month => monthData[month])
    };
  };

  const { labels, data } = prepareRadarData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Condamnations par mois",
        data: data,
        backgroundColor: "rgba(26, 77, 46, 0.15)",
        borderColor: "#1A4D2E",
        borderWidth: 2,
        pointBackgroundColor: "#F2C94C",
        pointBorderColor: "#1A4D2E",
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#F2C94C",
        pointHoverBorderColor: "#002B5B",
        pointHitRadius: 10,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1A4D2E",
          font: {
            size: 12,
            weight: "bold"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          color: "#ccc"
        },
        grid: {
          color: "#eee"
        },
        pointLabels: {
          color: "#002B5B",
          font: {
            size: 10,
            weight: "bold"
          }
        },
        ticks: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        tension: 0.3,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuad",
    },
  };

  if (loading) {
    return (
      <LoaderContainer>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 size={32} />
        </motion.div>
      </LoaderContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </ErrorMessage>
    );
  }

  return (
    <ChartWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <Radar data={chartData} options={options}  height={150}/>
    </ChartWrapper>
  );
};

export default CondemnationChart;
