import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import CountUp from "react-countup";

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

  font-size: 0.1rem;

`;

const CustomLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.4rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
 
  
  background: rgba(0, 0, 0, 0.03);
  border-radius: 2px;
`;

const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
`;

const CounterItem = styled.div`
  margin: 0 25px;
  text-align: center;

`;

const CounterLabel = styled.p`
  font-size: 0.7rem;
  color: ${colors.primary};
  margin-bottom: 5px;
`;

const CounterValue = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${colors.darkBlue};
`;

const OuterLabel = styled.text`
  font-size: 0.5rem;
  fill: ${colors.darkBlue};
  font-weight: 500;
`;

function Condamnationsprtribunl() {
  const [records, setRecords] = useState([]);
  const [tribunalData, setTribunalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCondamnations, setTotalCondamnations] = useState(0);
  const [tribunauxCount, setTribunauxCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

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
    if (records.length > 0) {
      const counts = {};
      records.forEach((rec) => {
        const tribunal = rec.courtsTribunaux || "Inconnu";
        counts[tribunal] = (counts[tribunal] || 0) + 1;
      });

      const chartData = Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

      setTribunalData(chartData);
      setTotalCondamnations(records.length);
      setTribunauxCount(Object.keys(counts).length);
    }
  }, [records]);

  const chartColors = [
    "#003566", "#F2C94C", "#1A4D2E", 
    "#FF9F1C", "#EF476F", "#118AB2",
    "#7F5AF0", "#2CB67D", "#E53170"
  ];

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
    hidden: { 
      opacity: 0,
      scale: 0.7,
      rotate: -360
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 60,
        mass: 1.5,
        duration: 2
      }
    }
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    
    outerRadius,
    percent,
    
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <OuterLabel
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </OuterLabel>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: colors.white,
          padding: '10px',
          border: `1px solid ${colors.primary}`,
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          fontSize: '0.8rem'
        }}>
          <p style={{ margin: 0, color: colors.primary, fontWeight: 'bold' }}>
            {payload[0].name}
          </p>
          <p style={{ margin: 0, color: colors.darkBlue }}>
            <CountUp end={payload[0].value} duration={1.5} /> condamnations
          </p>
          <p style={{ margin: 0, color: colors.secondary, fontSize: '0.8rem' }}>
            {((payload[0].payload.percent * 100).toFixed(1))}% du total
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
        ) : tribunalData.length > 0 ? (
          <>
             
            <CounterContainer>
              <CounterItem>
                <CounterLabel>Total condamnations</CounterLabel>
                <CounterValue>
                  <CountUp end={totalCondamnations} duration={10.5} />
                </CounterValue>
              </CounterItem>
              <CounterItem>
                <CounterLabel>Tribunaux différents</CounterLabel>
                <CounterValue>
                  <CountUp end={tribunauxCount} duration={10.5} />
                </CounterValue>
              </CounterItem>
            </CounterContainer>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={pieVariants}
              style={{ height: '300px' }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tribunalData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={20}
                    paddingAngle={2}
                    fill={colors.primary}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    animationDuration={800}
                    animationEasing="ease-out"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex}
                    activeShape={{
                      fill: colors.accent,
                      stroke: colors.primary,
                      strokeWidth: 2,
                      outerRadius: 95,
                      filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2))'
                    }}
                  >
                    {tribunalData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={chartColors[index % chartColors.length]}
                        style={{
                          transition: 'all 0.3s',
                          opacity: activeIndex === null || activeIndex === index ? 1 : 0.8,
                          filter: activeIndex === index ? 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))' : 'none'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <CustomLegend>
              {tribunalData.map((entry, index) => (
                <LegendItem 
                  key={`legend-${index}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  style={{
                    backgroundColor: activeIndex === index ? 'rgba(242, 201, 76, 0.2)' : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <LegendColor color={chartColors[index % chartColors.length]} />
                  <span>
                    {entry.name} (<CountUp end={entry.value} duration={0.8} />)
                  </span>
                </LegendItem>
              ))}
            </CustomLegend>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Aucune donnée disponible
          </div>
        )}
      </ChartContainer>
    </PageContainer>
  );
}

export default Condamnationsprtribunl;