import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import styled from "styled-components";
import { Filter, Info } from "lucide-react";

// Palette de couleurs améliorée
const colors = {
  primary: "#0C2340",
  secondary: "#8B7231",
  greenDark: "#1A4D2E",
  white: "#FDFDFD",
  lightBg: "#F8F6F2",
  success: "#2E8B57",
  error: "#D32F2F",
  text: "#333333",
  border: "#D3C9B8",
  pending: "#FFA500",
  processing: "#4682B4",
  completed: "#2E8B57",
  rejected: "#D32F2F",
  info: "#5F9EA0"
};

// Styles optimisés
const Container = styled.div`
  width: 100%;
  max-width: 900px;
margin: 2rem auto;
//padding: 2rem;
  background: ${colors.white};
//border-radius: 12px;
//box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h2`
  color: ${colors.primary};
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  color: ${colors.info};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 1rem 0;
  position: relative;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.0rem;
  width: 100%;
margin-top: 1rem;
`;

const StatCard = styled.div`
  background: ${colors.white};
border-radius: 2px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 1rem;
  font-weight: 800;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${colors.text};
  font-weight: 500;
  opacity: 0.9;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const CustomTooltip = styled.div`
  background: ${colors.white};
  padding: 1rem;
  border-radius: 1px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${colors.border};
  max-width: 250px;
`;

const TooltipHeader = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TooltipContent = styled.div`
  font-size: 0.9rem;
  color: ${colors.text};
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 6px;
`;

const StatusFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
//margin-bottom: 1.5rem;
  justify-content: center;
`;

const StatusFilterButton = styled.button`
  padding: 0.5rem 1rem;
border-radius: 2px;
  border: 1px solid ${props => props.active ? props.color : colors.border};
  background: ${props => props.active ? props.color + '20' : colors.white};
  color: ${props => props.active ? props.color : colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.color + '10'};
  }
`;

function DemandeStatusChart() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    pending: true,
    processing: true,
    completed: true,
    rejected: true
  });
  const [showInfo, setShowInfo] = useState(false);

  const statusConfig = {
    pending: { label: "En attente", color: colors.pending },
    processing: { label: "En traitement", color: colors.processing },
    completed: { label: "Complété", color: colors.completed },
    rejected: { label: "Rejeté", color: colors.rejected }
  };

  useEffect(() => {
    const fetchAllDemandes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_b}/api/demande/`);
        if (!response.ok) throw new Error("Erreur de chargement des demandes");
        const data = await response.json();
        
        const sortedData = data.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setDemandes(sortedData);
        prepareChartData(sortedData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDemandes();
  }, []);

  const prepareChartData = (data) => {
    const statusCounts = data.reduce((acc, demande) => {
      acc[demande.status] = (acc[demande.status] || 0) + 1;
      return acc;
    }, { pending: 0, processing: 0, completed: 0, rejected: 0 });

    const dataForChart = Object.entries(statusConfig).map(([status, config]) => ({
      ...config,
      value: statusCounts[status],
      key: status
    }));

    setChartData(dataForChart);
  };

  const filteredChartData = chartData.filter(item => activeFilters[item.key]);

  const CustomTooltipContent = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = filteredChartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;
      
      return (
        <CustomTooltip>
          <TooltipHeader>
            <StatusIndicator color={data.color} />
            {data.label}
          </TooltipHeader>
          <TooltipContent>
            <div>{data.value} demandes</div>
            <div>{percentage}% du total filtré</div>
          </TooltipContent>
        </CustomTooltip>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    if (percent < 0.1) return null; // Masque les petits pourcentages
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="100"
        stroke="#ffffff"
        strokeWidth={2}
        strokeOpacity={0.8}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const toggleFilter = (status) => {
    setActiveFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const toggleAllFilters = (enable) => {
    const newFilters = {};
    Object.keys(activeFilters).forEach(key => {
      newFilters[key] = enable;
    });
    setActiveFilters(newFilters);
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <p>Chargement des données en cours...</p>
        </LoadingContainer>
      </Container>
    );
  }

  const totalDemandes = demandes.length;
  const filteredTotal = filteredChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Container>
      <Header>
        <ChartTitle>Analyse des statuts des demandes</ChartTitle>
        <InfoButton onClick={() => setShowInfo(!showInfo)}>
          <Info size={16} />
          Aide
        </InfoButton>
      </Header>

      {showInfo && (
        <div style={{ 
          width: '100%', 
          background: colors.lightBg, 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1.0rem',
          fontSize: '0.9rem'
        }}>
          <p>Ce tableau de bord présente la répartition des demandes par statut. Utilisez les filtres pour afficher ou masquer des statuts spécifiques.</p>
        </div>
      )}

      <StatusFilters>
        <StatusFilterButton 
          onClick={() => toggleAllFilters(true)}
          color={colors.primary}
          active={Object.values(activeFilters).every(Boolean)}
        >
          Tous
        </StatusFilterButton>
        {Object.entries(statusConfig).map(([status, config]) => (
          <StatusFilterButton
            key={status}
            onClick={() => toggleFilter(status)}
            color={config.color}
            active={activeFilters[status]}
          >
            <StatusIndicator color={config.color} />
            {config.label}
          </StatusFilterButton>
        ))}
        <StatusFilterButton 
          onClick={() => toggleAllFilters(false)}
          color={colors.error}
          active={Object.values(activeFilters).every(v => !v)}
        >
          Aucun
        </StatusFilterButton>
      </StatusFilters>

      <ChartContainer>
        {filteredChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredChartData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
                animationDuration={500}
                animationEasing="ease-out"
              >
                {filteredChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke={colors.white}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltipContent />} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value, entry, index) => {
                  const data = filteredChartData[index];
                  return (
                    <span style={{ display: 'inline-flex', alignItems: 'center', margin: '0 10px' }}>
                      <StatusIndicator color={data.color} />
                      {data.label}: {data.value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: colors.text,
            opacity: 0.7
          }}>
            Aucune donnée à afficher avec les filtres actuels
          </div>
        )}
      </ChartContainer>

      <StatsGrid>
        <StatCard>
          <StatValue>
            <Filter size={20} />
            {totalDemandes}
          </StatValue>
          <StatLabel>Total des demandes</StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>
            {filteredTotal}
            <span style={{ fontSize: '1rem', color: colors.text, opacity: 0.7 }}>
              ({totalDemandes > 0 ? Math.round((filteredTotal / totalDemandes) * 100) : 0}%)
            </span>
          </StatValue>
          <StatLabel>Demandes filtrées</StatLabel>
        </StatCard>

        {filteredChartData.map((item, index) => (
          <StatCard key={index}>
            <StatValue style={{ color: item.color }}>
              {item.value}
              <span style={{ fontSize: '1rem', color: colors.text, opacity: 0.7 }}>
                ({totalDemandes > 0 ? Math.round((item.value / totalDemandes) * 100) : 0}%)
              </span>
            </StatValue>
            <StatLabel>{item.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>
    </Container>
  );
}

export default DemandeStatusChart;