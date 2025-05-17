import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  darkBlue: "#003566",
  lightBg: "#F2E9DC",
};

const PageContainer = styled.div`
  
`;

const ChartContainer = styled(motion.div)`
   
  margin: 0 auto;
  background: ${colors.white};
  border-radius: 12px;
   
 `;
 

 
const ChartTitle = styled.h3`
  text-align: center;
  color: ${colors.primary};
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CustomLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2px;
  font-size: 0.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 1px 5px;
`;

const LegendColor = styled.div`
  width:5px;
  height:5px;
  border-radius: 3px;
  background-color: ${props => props.color};
  margin-right: 5px;
`;

function Condamnationsprtribunl() {
  const [records, setRecords] = useState([]);
  const [tribunalData, setTribunalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_b}/criminal`);
        if (response.data.success) {
          setRecords(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setIsLoading(false);
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

    const chartData = Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); // Tri par valeur décroissante

    setTribunalData(chartData);
  }, [records]);

  const chartColors = [
    "#003566", "#F2C94C", "#1A4D2E", 
    "#FF9F1C", "#EF476F", "#118AB2",
    "#7F5AF0", "#2CB67D", "#E53170"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const pieVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: colors.white,
          padding: '10px',
          border: `1px solid ${colors.primary}`,
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: 0, color: colors.primary, fontWeight: 'bold' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: 0, color: colors.darkBlue }}>
            {payload[0].value} condamnations
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <ChartContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
         
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Chargement des données...
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={tribunalData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={20}
                  fill={colors.primary}
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {tribunalData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={chartColors[index % chartColors.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <CustomLegend>
              {tribunalData.map((entry, index) => (
                <LegendItem key={`legend-${index}`}>
                  <LegendColor color={chartColors[index % chartColors.length]} />
                  <span>{entry.name}</span>
                </LegendItem>
              ))}
            </CustomLegend>
          </>
        )}
      </ChartContainer>
    </PageContainer>
  );
}

export default Condamnationsprtribunl;