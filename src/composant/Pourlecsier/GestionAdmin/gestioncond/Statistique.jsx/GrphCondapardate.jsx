import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Loader2 } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Styles
const ChartWrapper = styled.div`
  max-width:100%;
 
  background: #ffffff;
  border-radius: 1px;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
 
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  color: #c53030;
  text-align: center;
  background-color: #ffe5e5;
  border-radius: 1px;
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

  const dateData = records.reduce((acc, record) => {
    if (!record.dateCondamnations) return acc;
    const dateStr = new Date(record.dateCondamnations).toLocaleDateString("fr-FR");
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {});

  const sortedDates = Object.keys(dateData).sort((a, b) => new Date(a) - new Date(b));

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
       label: "Nombre de condamnations",
        data: sortedDates.map((date) => dateData[date]),
        backgroundColor: "#002B5B",
        borderColor: "#003566",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      }
     
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Nombre d'enregistrements",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Dates de condamnation",
        },
      },
    },
  };

  if (loading) {
    return (
      <LoaderContainer>
        <Loader2 className="animate-spin" size={32} />
      </LoaderContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <ChartWrapper>
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  );
};

export default CondemnationChart;
