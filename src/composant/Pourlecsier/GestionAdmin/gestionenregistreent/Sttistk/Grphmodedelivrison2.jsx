import React, { useState, useEffect } from "react";
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
import { Loader2, Mail, Truck, Send } from "lucide-react";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  padding: 1.0rem;
  background: #ffffff;
//border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
//margin: 1rem 0;
  max-width: 800px;
`;

const ChartTitle = styled.h3`
  font-size: 1.0rem;
  color: #002b5b;
  margin-bottom: 3.0rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
 

 
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const DeliveryMethodChart2 = () => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_b}/api/demande/`,
          { withCredentials: true } // 👈 AJOUTE ÇA
        );

        if (response.data.success) {
          // Initialisation avec toutes les méthodes standardisées
          const methodCounts = {
            email: { count: 0, label: "Email", icon: <Mail size={18} /> },
            court: {
              count: 0,
              label: "Retrait au tribunal",
              icon: <Truck size={18} />,
            },
            postal: {
              count: 0,
              label: "Envoi postal",
              icon: <Send size={18} />,
            },
          };

          response.data.data.forEach((record) => {
            let method = record.deliveryMethod?.toLowerCase();

            // Normalisation des valeurs
            if (method === "mail") method = "postal"; // Convertit mail en postal

            if (method && methodCounts[method]) {
              methodCounts[method].count++;
            } else {
              console.warn("Méthode de livraison inconnue:", method);
            }
          });

          // Conversion en tableau trié par nombre décroissant
          const sortedMethods = Object.values(methodCounts).sort(
            (a, b) => b.count - a.count
          );

          setDeliveryData({
            labels: sortedMethods.map((m) => m.label),
            counts: sortedMethods.map((m) => m.count),
            icons: sortedMethods.map((m) => m.icon),
            total: response.data.data.length,
          });
        } else {
          setError("Erreur lors du chargement des données");
        }
      } catch (err) {
        console.error("Erreur API:", err.response?.data || err.message);
        setError(
          "Erreur de connexion au serveur. Veuillez réessayer plus tard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: deliveryData?.labels || [],
    datasets: [
      {
        label: "Nombre de demandes",
        data: deliveryData?.counts || [],
        backgroundColor: [
          "#1A4D2E", // Email - vert foncé
          "#002B5B", // Retrait - bleu marine
          "#F2C94C", // Postal - or
        ],
        borderColor: ["#0C3B23", "#001A3A", "#D9B43A"],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = deliveryData?.total || 1;
            const percentage = Math.round((context.parsed.x / total) * 100);
            return `${context.parsed.x} demandes (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loader2 size={32} className="animate-spin" color="#1A4D2E" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ChartContainer>
        <ChartTitle>Erreur</ChartTitle>
        <div style={{ color: "red", padding: "1rem" }}>{error}</div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>
        Répartition par mode de livraison 
        {deliveryData?.total >= 0 && (
          <span
            style={{
              fontSize: "0.7rem",
              color: "#6B7280",
              marginLeft: "0.5rem",
            }}
          >
            (Total: {deliveryData.total} demandes)
          </span>
        )}
      </ChartTitle>

      <div style={{ height: "200px" }}>
        <Bar data={chartData} options={options} />
      </div>
 
    </ChartContainer>
  );
};

export default DeliveryMethodChart2;
