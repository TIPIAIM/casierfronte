import React, { useEffect, useState } from "react";
import styled from "styled-components";

  
  import "react-tooltip/dist/react-tooltip.css";

  
// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
  primary: "#002B5B",
  secondary: "#F2C94C",
  success: "#1A4D2E",
  warning: "#F2C94C",
  error: "#C53030",
  background: "#F2E9DC",
  text: "#002B5B",
  textLight: "#4A5568",
  border: "#E2E8F0",
  borderDark: "#CBD5E0",
  cardBg: "#FFFFFF",
};

// Nouveaux styles pour les statistiques
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;
 
const StatCard = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-top: 4px solid ${(props) => props.color};

  h3 {
    color: ${colors.textLight};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  p {
    color: ${colors.text};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`;
// Styles
const Container = styled.div`
  max-width: 1400px;
 
  padding: 5px;
   border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

// CountUp hook for animated numbers
function useCountUp(end, duration = 50000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 5);//pour rendre ràpide le compte il àvàit 16 moi jài mis 1 pour que le compte soit rapide
    let rafId;

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);
  return count;
}

function SituationDemande() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllDemandes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_b}/api/demande`);
        if (!res.ok) {
          throw new Error(`Erreur ${res.status} lors du chargement`);
        }
        const json = await res.json();
        const sorted = (json.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setDemandes(sorted);
      } catch (err) {
        console.error("Fetch demandes error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDemandes();
  }, []);

  const stats = {
    total: demandes.length,
    pending: demandes.filter(d => d.status === "pending").length,
    processing: demandes.filter(d => d.status === "processing").length,
    completed: demandes.filter(d => d.status === "completed").length,
    rejected: demandes.filter(d => d.status === "rejected").length,
  };

  // Animated counts
  const totalCount = useCountUp(stats.total, 800);
  const pendingCount = useCountUp(stats.pending, 800);
  const processingCount = useCountUp(stats.processing, 800);
  const completedCount = useCountUp(stats.completed, 800);
  const rejectedCount = useCountUp(stats.rejected, 800);

  if (loading) return <Container>Chargement des statistiques...</Container>;
  if (error) return <Container>Erreur : {error}</Container>;

  return (
    <Container>
       <StatsContainer>
        <StatCard color={colors.blueMarine}>
          <h3>Total</h3>
          <p>{totalCount}</p>
        </StatCard>
        <StatCard color={colors.goldenYellow}>
          <h3>En attente</h3>
          <p>{pendingCount}</p>
        </StatCard>
        <StatCard color={colors.secondary}>
          <h3>En cours</h3>
          <p>{processingCount}</p>
        </StatCard>
        <StatCard color={colors.greenDark}>
          <h3>Traitée</h3>
          <p>{completedCount}</p>
        </StatCard>
        <StatCard color={colors.error}>
          <h3>Rejetée</h3>
          <p>{rejectedCount}</p>
        </StatCard>
      </StatsContainer>
    </Container>
  );
}

export default SituationDemande;
