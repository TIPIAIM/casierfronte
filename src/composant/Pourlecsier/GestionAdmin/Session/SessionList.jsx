import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FiDownload, FiSearch, FiUser, FiCalendar, FiAlertCircle, FiBarChart2, FiClock, FiShield } from "react-icons/fi";

// ================ COULEURS ================
const colors = {
  primary: "#0C2340",
  secondary: "#8B7231",
  greenDark: "#1A4D2E",
  white: "#FDFDFD",
  lightBg: "#F8F6F2",
  success: "#2E6140",
  error: "#A52A2A",
  text: "#333333",
  border: "#D3C9B8",
  pending: "#F2C94C",
};

// ================ STYLES ================
const Container = styled.div`
  padding: 2rem;
   min-height: 100vh;
  max-width: 1800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 600;
  color: ${colors.primary};
`;

const FeatureCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const FeatureCard = styled(motion.div)`
  background: ${colors.white};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 4px solid ${props => props.color || colors.secondary};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: ${colors.primary};
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const FeatureText = styled.p`
  color: ${colors.text};
  font-size: 0.85rem;
  line-height: 1.3;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
  border-radius: 12px;
  background: ${colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border};
`;

const StyledTable = styled(motion.table)`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 10px 17px;
  text-align: left;
  font-weight: 700;
  font-size: 0.9rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Td = styled.td`
  padding: 5px 18px;
  border-bottom: 1px solid ${colors.border};
  font-size: 0.9rem;
  color: ${colors.text};
`;

const Tr = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background-color: ${colors.lightBg};
    cursor: pointer;
  }

  &:nth-child(even) {
    background-color: ${colors.lightBg};
  }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
  background: ${colors.white};
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border};
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.white};
  border-radius: 8px;
  padding: 0 0.8rem;
  flex-grow: 1;
  max-width: 400px;
  border: 1px solid ${colors.border};
`;

const SearchIcon = styled(FiSearch)`
  color: ${colors.secondary};
  margin-right: 0.5rem;
`;

const Input = styled.input`
  padding: 0.7rem 0;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  width: 100%;
  color: ${colors.text};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${colors.secondary};
    opacity: 0.7;
  }
`;

const Button = styled(motion.button)`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  border: 1px solid ${colors.primary};

  &:hover {
    background-color: ${colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${colors.white};
  color: ${colors.primary};
  border: 1px solid ${colors.border};

  &:hover {
    background-color: ${colors.lightBg};
    color: ${colors.primary};
  }
`;

const ChartWrapper = styled.div`
  margin-top: 2rem;
  background: ${colors.white};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.border};
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PageInfo = styled.span`
  color: ${colors.text};
  font-size: 0.9rem;
`;

const Notification = styled(motion.div)`
  background: ${props => props.type === 'error' ? colors.error : colors.success};
  color: ${colors.white};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  background: ${colors.white};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  font-size: 1.3rem;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModalRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const ModalLabel = styled.span`
  font-weight: 600;
  color: ${colors.primary};
  min-width: 120px;
`;

const ModalValue = styled.span`
  color: ${colors.text};
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => {
    if (props.variant === "active") return "#dcfce7";
    if (props.variant === "pending") return colors.pending + "33";
    return "#fee2e2";
  }};
  color: ${props => {
    if (props.variant === "active") return colors.success;
    if (props.variant === "pending") return colors.text;
    return colors.error;
  }};
  border: 1px solid ${props => {
    if (props.variant === "active") return colors.success + "33";
    if (props.variant === "pending") return colors.pending;
    return colors.error + "33";
  }};
`;

// ================ COMPOSANT ================
const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [notif, setNotif] = useState({ message: "", type: "" });
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_b}/traficconnexion/sessions`, {
          withCredentials: true,
        });
        
        if (response.data && Array.isArray(response.data)) {
          setSessions(response.data);
        } else {
          throw new Error("Format de données inattendu");
        }
      } catch (error) {
        console.error("Erreur fetchSessions:", error);
        setNotif({ 
          message: error.response?.data?.message || "Erreur lors du chargement des données", 
          type: "error" 
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleExport = () => {
    try {
      const dataToExport = sessions.flatMap((user) =>
        user.connexions.map((con) => ({
          ID: user.id,
          Identifiant: user.identifiant,
          "Nombre de connexions": user.nombreConnexion,
          "Date de connexion": new Date(con.connectedAt).toLocaleString(),
          "Date de déconnexion": con.disconnectedAt
            ? new Date(con.disconnectedAt).toLocaleString()
            : "En cours...",
          IP: con.ip || "Non disponible",
          Navigateur: con.browser || "Non disponible",
          Statut: !con.disconnectedAt ? "Actif" : "Inactif"
        }))
      );

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sessions");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const file = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(file, "historique_connexions.xlsx");
      setNotif({ message: "Export réussi ! Le fichier Excel a été téléchargé.", type: "success" });
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
      setNotif({ message: "Erreur lors de l'export des données", type: "error" });
    } finally {
      setTimeout(() => setNotif({ message: "", type: "" }), 4000);
    }
  };

  const filtered = sessions.map((user) => {
    try {
      const emailMatch = user.identifiant?.toLowerCase().includes(search.toLowerCase()) || 
                        user.id?.includes(search);
      return emailMatch ? user : { ...user, connexions: [] };
    } catch (error) {
      console.error("Erreur lors du filtrage:", error);
      return { ...user, connexions: [] };
    }
  });

  const paginatedRows = filtered.flatMap((user) =>
    user.connexions.map((con, idx) => {
      try {
        return {
          id: user.id,
          identifiant: user.identifiant,
          nombreConnexion: user.nombreConnexion,
          connectedAt: con.connectedAt,
          disconnectedAt: con.disconnectedAt,
          ip: con.ip || "Non disponible",
          browser: con.browser || "Non disponible",
          isActive: !con.disconnectedAt
        };
      } catch (error) {
        console.error("Erreur lors de la création de la ligne:", error);
        return null;
      }
    }).filter(Boolean)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = paginatedRows.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(paginatedRows.length / itemsPerPage);

  const chartData = [];
  sessions.forEach((user) => {
    try {
      user.connexions.forEach((con) => {
        const date = new Date(con.connectedAt).toISOString().split("T")[0];
        const existing = chartData.find((item) => item.date === date);
        if (existing) existing.count += 1;
        else chartData.push({ date, count: 1 });
      });
    } catch (error) {
      console.error("Erreur lors de la création des données du graphique:", error);
    }
  });

  // Trier les données du graphique par date
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Détection des connexions simultanées suspectes
  const suspiciousSessions = paginatedRows.filter(session => {
    try {
      return session.nombreConnexion > 50;
    } catch (error) {
      console.error("Erreur lors de la détection des sessions suspectes:", error);
      return false;
    }
  });

  const getSessionStatus = (session) => {
    try {
      if (!session.disconnectedAt) return { text: "Actif", variant: "active" };
      return { text: "Inactif", variant: "inactive" };
    } catch (error) {
      console.error("Erreur lors de la détermination du statut:", error);
      return { text: "Erreur", variant: "inactive" };
    }
  };

  return (
    <Container>
      {notif.message && (
        <Notification
          type={notif.type}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {notif.type === "success" ? (
            <FiDownload size={18} />
          ) : (
            <FiAlertCircle size={18} />
          )}
          {notif.message}
        </Notification>
      )}
 

      <FeatureCards>
        <FeatureCard 
          color={colors.primary}
          whileHover={{ scale: 1.03 }}
        >
          <FeatureTitle><FiShield /> Sécurité</FeatureTitle>
          <FeatureText>Surveillez les connexions/déconnexions en temps réel pour détecter toute activité suspecte.</FeatureText>
        </FeatureCard>

        <FeatureCard 
          color={colors.secondary}
          whileHover={{ scale: 1.03 }}
        >
          <FeatureTitle><FiBarChart2 /> Statistiques</FeatureTitle>
          <FeatureText>Analysez la fréquence des connexions par utilisateur et identifiez les modèles d'utilisation.</FeatureText>
        </FeatureCard>

        <FeatureCard 
          color={colors.greenDark}
          whileHover={{ scale: 1.03 }}
        >
          <FeatureTitle><FiClock /> Historique</FeatureTitle>
          <FeatureText>Conservez un enregistrement complet de toutes les sessions pour un audit ultérieur.</FeatureText>
        </FeatureCard>

        <FeatureCard 
          color={colors.error}
          whileHover={{ scale: 1.03 }}
        >
          <FeatureTitle><FiAlertCircle /> Détection</FeatureTitle>
          <FeatureText>Recevez des alertes pour les connexions simultanées ou les activités anormales.</FeatureText>
        </FeatureCard>
      </FeatureCards>

      <Controls>
        <SearchContainer>
          <SearchIcon size={18} />
          <Input
            type="text"
            placeholder="Rechercher par email, ID ou IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
        
        <Button 
          onClick={handleExport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiDownload size={16} />
          Exporter
        </Button>
      </Controls>

      {suspiciousSessions.length > 0 && (
        <FeatureCard color={colors.error}>
          <FeatureTitle><FiAlertCircle /> Activité suspecte détectée</FeatureTitle>
          <FeatureText>
            {suspiciousSessions.length} session(s) présentent une activité anormale (plus de 50 connexions).
          </FeatureText>
        </FeatureCard>
      )}

      <TableWrapper>
        <StyledTable
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <thead>
            <Tr>
              <Th>ID</Th>
              <Th>Identifiant</Th>
              <Th>Connexions</Th>
              <Th>Statut</Th>
              <Th>Date connexion</Th>
              <Th>Date déconnexion</Th>
            </Tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => {
              try {
                const status = getSessionStatus(item);
                return (
                  <Tr 
                    key={`${item.id}-${idx}`} 
                    onClick={() => setSelectedSession(item)}
                    style={item.nombreConnexion > 50 ? { background: "#fff1f2" } : {}}
                  >
                    <Td>{item.id}</Td>
                    <Td>{item.identifiant}</Td>
                    <Td>{item.nombreConnexion}</Td>
                    <Td>
                      <Badge variant={status.variant}>
                        {status.text}
                      </Badge>
                    </Td>
                    <Td>{new Date(item.connectedAt).toLocaleString()}</Td>
                    <Td>
                      {item.disconnectedAt
                        ? new Date(item.disconnectedAt).toLocaleString()
                        : <em style={{ color: colors.secondary }}>Session active</em>}
                    </Td>
                  </Tr>
                );
              } catch (error) {
                console.error("Erreur lors du rendu de la ligne:", error);
                return null;
              }
            })}
          </tbody>
        </StyledTable>
      </TableWrapper>

      {paginatedRows.length > 0 && (
        <Pagination>
          <SecondaryButton 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </SecondaryButton>
          
          <PageInfo>
            Page {currentPage} sur {totalPages} • {paginatedRows.length} sessions
          </PageInfo>
          
          <SecondaryButton 
            onClick={() => setCurrentPage(p => (indexOfLast < paginatedRows.length ? p + 1 : p))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </SecondaryButton>
        </Pagination>
      )}

      <ChartWrapper>
        <ChartTitle><FiBarChart2 /> Activité des connexions</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: colors.text }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            />
            <YAxis 
              allowDecimals={false} 
              tick={{ fill: colors.text }}
            />
            <Tooltip 
              contentStyle={{
                background: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: colors.text
              }}
              labelFormatter={(value) => `Date: ${new Date(value).toLocaleDateString('fr-FR')}`}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke={colors.secondary} 
              strokeWidth={2} 
              dot={{ fill: colors.secondary, r: 4 }}
              activeDot={{ fill: colors.primary, r: 6, stroke: colors.white, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>

      {selectedSession && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedSession(null)}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle><FiUser /> Détails de la session</ModalTitle>
            
            <ModalRow>
              <ModalLabel>ID:</ModalLabel>
              <ModalValue>{selectedSession.id}</ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Email:</ModalLabel>
              <ModalValue>{selectedSession.identifiant}</ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Adresse IP:</ModalLabel>
              <ModalValue>{selectedSession.ip}</ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Navigateur:</ModalLabel>
              <ModalValue>{selectedSession.browser}</ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Connexion:</ModalLabel>
              <ModalValue>{new Date(selectedSession.connectedAt).toLocaleString()}</ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Déconnexion:</ModalLabel>
              <ModalValue>
                {selectedSession.disconnectedAt 
                  ? new Date(selectedSession.disconnectedAt).toLocaleString()
                  : "Session toujours active"}
              </ModalValue>
            </ModalRow>
            
            <ModalRow>
              <ModalLabel>Statut:</ModalLabel>
              <ModalValue>
                <Badge variant={!selectedSession.disconnectedAt ? "active" : "inactive"}>
                  {!selectedSession.disconnectedAt ? "Actif" : "Terminé"}
                </Badge>
              </ModalValue>
            </ModalRow>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                onClick={() => setSelectedSession(null)}
                style={{ background: colors.error }}
              >
                Fermer
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SessionList;