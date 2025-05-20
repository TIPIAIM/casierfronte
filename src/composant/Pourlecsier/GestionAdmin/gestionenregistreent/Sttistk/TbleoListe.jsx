import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter, RefreshCcwDot } from "lucide-react";
import styled from "styled-components";

// Palette de couleurs
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
  pending: "#F2C94C", // Jaune pour les statuts en attente
};

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 1rem auto;
  background: ${colors.white};

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin: 0.5rem auto;
    border-radius: 4px;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 1rem 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 3px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  font-size: 0.8rem; // Taille de police réduite pour tout le tableau
`;

const TableHeader = styled.thead`
  background-color: ${colors.greenDark};
  color: ${colors.white};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.border};
  background-color: ${(props) => (props.even ? colors.white : colors.lightBg)};

  ${(props) =>
    props.status === "pending" &&
    `
    background-color: ${colors.pending}20;
  `}

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const TableCell = styled.td`
  padding: 0.3rem;
  text-align: left;
  white-space: nowrap;
  font-size: 0.75rem; // Taille réduite pour les cellules

  @media (max-width: 768px) {
    padding: 0.3rem 0.2rem;
    font-size: 0.7rem;
  }
`;

const TableHeaderCell = styled.th`
  padding: 0.5rem 0.3rem; // Padding réduit
  text-align: center;
  white-space: nowrap;
  font-size: 0.85rem; // Taille réduite pour les en-têtes

  @media (max-width: 768px) {
    padding: 0.4rem 0.2rem;
    font-size: 0.8rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.2rem 0.2rem; // Padding réduit
  border-radius: 3px;
  font-size: 0.65rem; // Taille réduite
  display: inline-block;
  min-width: 70px; // Largeur réduite
  text-align: center;
  background-color: ${(props) =>
    props.status === "completed"
      ? colors.success + "80"
      : props.status === "processing"
      ? colors.secondary + "20"
      : props.status === "pending"
      ? colors.pending + "70"
      : colors.error + "70"};
  color: ${(props) =>
    props.status === "completed"
      ? colors.success
      : props.status === "processing"
      ? colors.secondary
      : props.status === "pending"
      ? colors.pending
      : colors.error};

  @media (max-width: 768px) {
    font-size: 0.6rem;
    min-width: 60px;
    padding: 0.15rem 0.3rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${colors.white};
  color: ${colors.primary};
  border: 1px solid ${colors.border};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;

  &:hover {
    background: ${colors.greenDark};
    color: ${colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${colors.white};
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
`;

const PageInfo = styled.span`
  font-size: 0.7rem;
  color: ${colors.text};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  padding: 2rem;
  color: ${colors.primary};
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

// ... (les styled-components restent les mêmes jusqu'à StatusBadge)

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterIcon = styled(Filter)`
  cursor: pointer;
  color: ${colors.secondary};
  transition: all 0.2s;

  &:hover {
    color: ${colors.greenDark};
    transform: scale(1.1);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: ${colors.white};
 // min-width: 160px;
  box-shadow: 1px 1px 1px 2px ${colors.greenDark};
  z-index: 1;
  border-radius: 4px;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: ${colors.text};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${colors.lightBg};
  }
`;

const DropdownHeader = styled(DropdownItem)`
  font-weight: bold;
  background-color: ${colors.greenDark}18;
  border-bottom: 1px solid ${colors.border};
`;

// ... (le reste des styled-components reste inchangé)

function TbleoListe() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 17;

  useEffect(() => {
    const fetchAllDemandes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_b}/api/demande/`);
        if (!response.ok) throw new Error("Erreur de chargement des demandes");
        const data = await response.json();

        const sortedData = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setDemandes(sortedData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDemandes();
  }, []);

  const filteredDemandes = selectedStatus
    ? demandes.filter((demande) => demande.status === selectedStatus)
    : demandes;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDemandes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setOpenDropdownId(null);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Complété";
      case "processing":
        return "En traitement";
      case "pending":
        return "En attente";
      case "rejected":
        return "Rejeté";
      default:
        return "Inconnu";
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Chargement en cours...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Référence</TableHeaderCell>{" "}
              <TableHeaderCell>
                <StatusContainer>
                  <span>Statut</span>
                  <RefreshCcwDot
                    size={16}
                    onClick={() => handleStatusFilter(null)}
                  />
                </StatusContainer>
              </TableHeaderCell>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell>Prénom</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {currentItems.map((demande, index) => (
              <TableRow
                key={demande._id}
                even={index % 2 === 0}
                status={demande.status}
              >
                {" "}
             
                <TableCell>{demande.reference || "-"}</TableCell>
                <TableCell>
                  <StatusContainer>
                    <StatusBadge status={demande.status}>
                      {getStatusText(demande.status)}
                    </StatusBadge>
                    <DropdownContainer>
                      <FilterIcon
                        size={16}
                        onClick={() => toggleDropdown(demande._id)}
                      />
                      {openDropdownId === demande._id && (
                        <DropdownContent>
                          <DropdownHeader>
                            <Filter size={14} />
                            Filtrer 
                          </DropdownHeader>
                          <DropdownItem
                            onClick={() => handleStatusFilter(null)}
                          >
                            Tous
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleStatusFilter("pending")}
                          >
                            <StatusBadge status="pending">
                              En attente
                            </StatusBadge>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleStatusFilter("processing")}
                          >
                            <StatusBadge status="processing">
                              En traitement
                            </StatusBadge>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleStatusFilter("completed")}
                          >
                            <StatusBadge status="completed">
                              Complété
                            </StatusBadge>
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleStatusFilter("rejected")}
                          >
                            <StatusBadge status="rejected">Rejeté</StatusBadge>
                          </DropdownItem>
                        </DropdownContent>
                      )}
                    </DropdownContainer>
                  </StatusContainer>
                </TableCell>
                <TableCell>{demande.personalInfo?.lastName || "-"}</TableCell>
                <TableCell>{demande.personalInfo?.firstName || "-"}</TableCell>
                <TableCell>{formatDate(demande.createdAt)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <PaginationContainer>
        <PageButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </PageButton>

        <PageInfo>
          Page {currentPage} sur {totalPages}
        </PageInfo>

        <PageButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight size={16} />
        </PageButton>
      </PaginationContainer>
    </Container>
  );
}

export default TbleoListe;
