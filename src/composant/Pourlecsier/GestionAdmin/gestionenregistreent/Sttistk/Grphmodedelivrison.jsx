import React, { useState, useEffect } from "react";
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip, 
  Legend 
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
  padding: 0.5rem;
  background: #ffffff;
//border-radius: 8px;
//box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
//margin: 1rem 0;
  max-width: 800px;
`;

const ChartTitle = styled.h3`
  font-size: 1.0rem;
  color: #002B5B;
  margin-bottom: 2.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MethodList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 1.5rem;
`;

const MethodItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #F8F9FA;
  border-radius: 6px;
  border-left: 4px solid ${props => 
    props.method === 'email' ? '#1A4D2E' : 
    props.method === 'court' ? '#002B5B' : '#F2C94C'};
`;

const MethodIcon = styled.div`
  margin-right: 1rem;
  color: ${props => 
    props.method === 'email' ? '#1A4D2E' : 
    props.method === 'court' ? '#002B5B' : '#F2C94C'};
`;

const MethodLabel = styled.div`
  flex: 1;
  font-weight: 500;
`;

const MethodValue = styled.div`
  font-weight: 600;
  color: #002B5B;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const DeliveryMethodChart = () => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_b}/api/demande/`);
        
        if (response.data.success) {
          // Initialisation avec toutes les méthodes standardisées
          const methodCounts = {
            'email': { count: 0, label: 'Email', icon: <Mail size={18} /> },
            'court': { count: 0, label: 'Tribunal', icon: <Truck size={18} /> },
            'postal': { count: 0, label: 'Postal', icon: <Send size={18} /> }
          };

          response.data.data.forEach(record => {
            let method = record.deliveryMethod?.toLowerCase();
            
            // Normalisation des valeurs
            if (method === 'mail') method = 'postal'; // Convertit mail en postal
            
            if (method && methodCounts[method]) {
              methodCounts[method].count++;
            } else {
              console.warn('Méthode de livraison inconnue:', method);
            }
          });

          // Conversion en tableau trié par nombre décroissant
          const sortedMethods = Object.values(methodCounts).sort((a, b) => b.count - a.count);

          setDeliveryData({
            labels: sortedMethods.map(m => m.label),
            counts: sortedMethods.map(m => m.count),
            icons: sortedMethods.map(m => m.icon),
            total: response.data.data.length
          });
        } else {
          setError("Erreur lors du chargement des données");
        }
      } catch (err) {
        console.error("Erreur API:", err.response?.data || err.message);
        setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
        Répartition des demandes par mode de livraison
        {deliveryData?.total >= 0 && (
          <span style={{ fontSize: '0.6rem', color: '#6B7280', marginLeft: '0.5rem' }}>
            (Total: {deliveryData.total} demandes)
          </span>
        )}
      </ChartTitle>
      
     

      <MethodList>
        {deliveryData?.labels.map((label, index) => {
          const methodKey = label === 'Email' ? 'email' : 
                          label === 'Retrait au tribunal' ? 'court' : 'postal';
          const count = deliveryData.counts[index];
          const Icon = deliveryData.icons[index];
          
          return (
            <MethodItem key={methodKey} method={methodKey}>
              <MethodIcon method={methodKey}>
                {Icon}
              </MethodIcon>
              <MethodLabel>{label}</MethodLabel>
              <MethodValue>
                {count} demandes
                {deliveryData.total > 0 && (
                  <span style={{ color: '#6B7280', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    ({Math.round((count / deliveryData.total) * 100)}%)
                  </span>
                )}
              </MethodValue>
            </MethodItem>
          );
        })}
      </MethodList>
    </ChartContainer>
  );
};

export default DeliveryMethodChart;