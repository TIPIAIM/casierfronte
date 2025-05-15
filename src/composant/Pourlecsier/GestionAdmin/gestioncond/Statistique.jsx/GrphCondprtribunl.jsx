import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  darkBlue: "#003566",
  lightBg: "#F2E9DC",
};

const PageContainer = styled.div`
 
 // background: ${colors.lightBg};
 // min-height: 100vh;
`;

const ChartContainer = styled.div`
  max-width: 0 auto;
  margin: 0 auto;
  //background: ${colors.white};
  border-radius: 12px;

  //box-shadow: 0 4px 20px rgba(0, 43, 91, 0.1);
`;



function Condamnationsprtribunl() {
  const [records, setRecords] = useState([]);
  const [tribunalData, setTribunalData] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(  `${import.meta.env.VITE_b}/criminal`);
        if (response.data.success) {
          setRecords(response.data.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const counts = {};
    records.forEach((rec) => {
      const tribunal = rec.courtsTribunaux || "Inconnu";
      counts[tribunal] = (counts[tribunal] || 0) + 1;
    });

    const chartData = Object.entries(counts).map(([name, value]) => ({ name, value }));
    setTribunalData(chartData);
  }, [records]);

  const chartColors = ["#003566", "#F2C94C", "#1A4D2E", "#FF9F1C", "#EF476F", "#118AB2"];

  return (
    <>
     
      <PageContainer>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={tribunalData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill={colors.primary}
                label
              >
                {tribunalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={1}
                iconType="circle"
                formatter={(value, entry) => <span style={{ color: colors.primary }}>{value}</span>}
              
               />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </PageContainer>
    </>
  );
}

export default Condamnationsprtribunl;
