import React, { useState, useEffect } from "react";

import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { Link, useNavigate } from "react-router-dom";
 
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
const ActionContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.3rem;
  }
`;

const ActionIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => props.$bg || colors.primary};
  color: white;
  position: relative;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (min-width: 768px) {
    width: auto;
    padding: 0.5rem 0.8rem;
    gap: 0.5rem;

    span {
      display: inline;
      font-size: 0.85rem;
    }
  }
`;
 
// Styles pour les tooltips
const TooltipStyles = styled.div`
  .tooltip-style {
    font-size: 0.8rem !important;
    padding: 0.4rem 0.8rem !important;
    border-radius: 4px !important;
    z-index: 1000 !important;
    background: ${colors.primary} !important;
  }
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


const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  min-width: 250px;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${colors.borderDark};
    border-radius: 6px;
    font-size: 0.95rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px ${colors.primary}1A;
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.textLight};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${colors.background};
  border: 1px solid ${colors.borderDark};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.95rem;

  &:hover {
    background: ${colors.border};
  }
`;

const StatusFilter = styled.div`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  animation: fadeIn 0.2s ease-out;

  button {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;

    &.all {
      background: ${colors.primary}10;
      color: ${colors.primary};

      &:hover,
      &.active {
        background: ${colors.primary};
        color: white;
      }
    }

    &.pending {
      background: ${colors.warning}10;
      color: ${colors.warning};

      &:hover,
      &.active {
        background: ${colors.warning};
        color: white;
      }
    }

    &.completed {
      background: ${colors.success}10;
      color: ${colors.success};

      &:hover,
      &.active {
        background: ${colors.success};
        color: white;
      }
    }

    &.rejected {
      background: ${colors.error}10;
      color: ${colors.error};

      &:hover,
      &.active {
        background: ${colors.error};
        color: white;
      }
    }
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid ${colors.border};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  thead {
    background: ${colors.greenDark};
    color: white;

    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${colors.border};
      transition: background 0.2s;

      &:hover {
        background: ${colors.background};
      }

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 1rem;
      font-size: 0.9rem;
      color: ${colors.text};

      &:first-child {
        font-weight: 500;
        color: ${colors.primary};
      }
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;

  &.pending {
    background: ${colors.warning}15;
    color: ${colors.warning};
  }

  &.completed {
    background: ${colors.success}15;
    color: ${colors.success};
  }

  &.rejected {
    background: ${colors.error}15;
    color: ${colors.error};
  }

  &.in-progress {
    background: ${colors.secondary}15;
    color: ${colors.secondary};
  }
`;

 

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;
 

// ... (les styles restent les mêmes, gardez toutes vos déclarations styled-components)

function DemandesList() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  // Récupérer toutes les demandes depuis le backend
  useEffect(() => {
    const fetchAllDemandes = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2027/api/demande/");

        if (!response.ok) throw new Error("Erreur de chargement des demandes");

        const data = await response.json();
        // Tri des demandes par date de création (du plus récent au plus ancien)
        const sortedDemandes = data.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setDemandes(sortedDemandes);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDemandes();
  }, []);

  const stats = {
    total: demandes.length,
    pending: demandes.filter((d) => d.status === "pending").length,
    processing: demandes.filter((d) => d.status === "processing").length,
    completed: demandes.filter((d) => d.status === "completed").length,
    rejected: demandes.filter((d) => d.status === "rejected").length,
  };
  // Filtrer les demandes en fonction du terme de recherche et du statut
  const filteredDemandes = demandes.filter((demande) => {
    const matchesSearch =
      searchTerm === "" ||
      demande.personalInfo.lastName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      demande.personalInfo.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      demande.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || demande.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16}  />;
      case "pending":
        return <Clock size={16} className="animate-spin" />;
      case "processing":
        return <Loader2 size={16} className="animate-spin" />;
      case "rejected":
        return <AlertCircle size={16}  />;
      default:
        return <Clock size={16} className="animate-spin" />;
    }
  };

  // Dans le composant DemandesList, ajoutez cette fonction
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      try {
        const response = await fetch(
          //`http://localhost:2027/api/demande/${id}`,
          `${import.meta.env.VITE_b}/api/demande/${id}`,

          {
            method: "DELETE",
          }
        );

        if (!response.ok) throw new Error("Erreur lors de la suppression");

        // Mettre à jour la liste des demandes après suppression
        setDemandes(demandes.filter((demande) => demande._id !== id));
      } catch (error) {
        console.error("Erreur:", error);
        alert(error.message);
      }
    }
  };
  return (
    <Container>
      <Tooltip
        id="action-tooltip"
        place="top"
        effect="solid"
        className="tooltip-style"
      />

      <SearchBar>
        <SearchInput>
          <Search size={18} />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou référence..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchInput>

        <FilterButton onClick={() => setFilterOpen(!filterOpen)}>
          <Filter size={16} />
          Filtres
          {filterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </FilterButton>
      </SearchBar>
      <StatsContainer>
        <StatCard color={colors.blueMarine}>
          <h3>Total </h3>
          <p>{stats.total}</p>
        </StatCard>

        <StatCard color={colors.goldenYellow}>
          <h3>En attente</h3>
          <p>{stats.pending}</p>
        </StatCard>
        <StatCard color={colors.secondary}>
          <h3>En cours</h3>
          <p>{stats.processing}</p>
        </StatCard>
        <StatCard color={colors.greenDark}>
          <h3>Traitées</h3>
          <p>{stats.completed}</p>
        </StatCard>

        <StatCard color={colors.error}>
          <h3>Rejetées</h3>
          <p>{stats.rejected}</p>
        </StatCard>
      </StatsContainer>

      <StatusFilter open={filterOpen}>
        <button
          className={`all ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => handleStatusFilter("all")}
        >
          Toutes
        </button>
        <button
          className={`pending ${statusFilter === "pending" ? "active" : ""}`}
          onClick={() => handleStatusFilter("pending")}
        >
          En attente
        </button>
        <button
          className={`in-progress ${
            statusFilter === "processing" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("processing")}
        >
          En cours
        </button>
        <button
          className={`completed ${
            statusFilter === "completed" ? "active" : ""
          }`}
          onClick={() => handleStatusFilter("completed")}
        >
          Traitées
        </button>
        <button
          className={`rejected ${statusFilter === "rejected" ? "active" : ""}`}
          onClick={() => handleStatusFilter("rejected")}
        >
          Rejetées
        </button>
      </StatusFilter>

      {loading ? (
        <LoadingContainer>
          <Loader2 size={32} className="animate-spin" color={colors.primary} />
        </LoadingContainer>
      ) : (
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Identité</th>
                <th>Nom & Prénom</th>
                <th>Date demande</th>
                <th>Mode livraison</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.length > 0 ? (
                filteredDemandes.map((demande) => (
                  <tr key={demande._id}>
                    <td>{demande.reference}</td>
                    <td>{demande.personalInfo.passport} </td>
                    <td>
                      {demande.personalInfo.lastName}{" "}
                      {demande.personalInfo.firstName}
                    </td>
                    <td>{formatDate(demande.createdAt)}</td>
                    <td>
                      {demande.deliveryMethod === "court"
                        ? "Retrait tribunal"
                        : demande.deliveryMethod === "mail"
                        ? "Courrier postal"
                        : "Email sécurisé"}
                    </td>
                    <td>
                      <StatusBadge className={demande.status || "pending"}>
                        {getStatusIcon(demande.status || "pending")}
                        {demande.status === "pending"
                          ? "Attente"
                          : demande.status === "processing"
                          ? "En cours"
                          : demande.status === "completed"
                          ? "Terminé"
                          : "Rejeté"}
                      </StatusBadge>
                    </td>

                    <td>
                      <ActionContainer>
                        {/* Bouton Voir */}
                        <TooltipStyles>
                          <ActionIcon
                            data-tooltip-id="action-tooltip"
                            data-tooltip-content="Voir les détails"
                            $bg={colors.primary}
                            onClick={() =>
                              navigate(`/demandeid/${demande._id}`)
                            }
                          >
                            <Eye size={16} />
                            <span className="action-text"></span>
                          </ActionIcon>

                          {/* Bouton Éditer */}
                          <ActionIcon
                            data-tooltip-id="action-tooltip"
                            data-tooltip-content="Modifier la demande"
                            $bg={colors.warning}
                            onClick={() =>
                              navigate(`/demandemisejour/${demande._id}`)
                            }
                          >
                            <Edit3 size={16} />
                            <span className="action-text"></span>
                          </ActionIcon>

                          {/* Bouton Supprimer */}
                          <ActionIcon
                            data-tooltip-id="action-tooltip"
                            data-tooltip-content="Supprimer la demande"
                            $bg={colors.error}
                            onClick={() => handleDelete(demande._id)}
                          >
                            <Trash2 size={16} />
                            <span className="action-text"></span>
                          </ActionIcon>

                          {/* Bouton Télécharger (conditionnel) */}
                          {demande.status === "completed" && (
                            <ActionIcon
                              data-tooltip-id="action-tooltip"
                              data-tooltip-content="Aller Télécharger le casier judiciaire"
                              $bg={colors.success}
                              //    onClick={() => handleDownload(demande._id)}
                            >
                              <Link to="/casier">
                                <Download size={16} />
                              </Link>
                            </ActionIcon>
                          )}
                        </TooltipStyles>
                      </ActionContainer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", padding: "2rem" }}
                  >
                    Aucune demande trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default DemandesList;
