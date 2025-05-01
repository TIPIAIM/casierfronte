import React, { useState, useEffect } from "react";
import {
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ChevronDown,
  ChevronUp,
  Filter,
  Loader2,
} from "lucide-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ImPencil2 } from "react-icons/im";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
  // Ajouts pour cohérence avec le composant existant
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
  margin-bottom: 2rem;
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
  margin: 2rem auto;
  padding: 2rem;
  background: ${colors.cardBg};
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colors.primary};
  padding-bottom: 1rem;

  h1 {
    color: ${colors.primary};
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.textLight};
    font-size: 1rem;
    line-height: 1.6;
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
    background: ${colors.primary};
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

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${colors.primary};
  color: white;
  border: none;

  &:hover {
    background: ${colors.primaryLight};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
  color: ${colors.textLight};
`;

const PageControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid ${colors.borderDark};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${colors.background};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: ${colors.primary};
    color: white;
    border-color: ${colors.primary};
  }
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
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "rejected":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:2027/api/demande/${id}/download`
      );
      if (!response.ok) throw new Error("Erreur de téléchargement");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `demande-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message);
    }
  };
// Dans le composant DemandesList, ajoutez cette fonction
const handleDelete = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
    try {
      const response = await fetch(`http://localhost:2027/api/demande/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      // Mettre à jour la liste des demandes après suppression
      setDemandes(demandes.filter(demande => demande._id !== id));
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message);
    }
  }
};
  return (
    <Container>
      <Header>
        <h1>Gestion des demandes de casier judiciaire</h1>
        <p>
          Consultez et gérez l'ensemble des demandes d'extrait de casier
          judiciaire.
          <br />
          Vous pouvez filtrer par statut, rechercher une demande spécifique et
          télécharger les documents.
        </p>
      </Header>
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
          <h3>Total des demandes</h3>
          <p>{stats.total}</p>
        </StatCard>

        <StatCard color={colors.goldenYellow}>
          <h3>En attente</h3>
          <p>{stats.pending}</p>
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
                          ? "En traitement"
                          : demande.status === "completed"
                          ? "Terminé"
                          : "Rejeté"}
                      </StatusBadge>
                    </td>
                    <td>
                      <Link
                        to={`/demandeid/${demande._id}`}
                        className="text-yellow-400 edit hover:text-yellow-800"
                      >
                        <ImPencil2 />
                      </Link>
                      <Link to={`/demandemisejour/${demande._id}`}>Mjour</Link>
                      <ActionButton
  onClick={() => handleDelete(demande._id)}
  style={{ marginLeft: "0.5rem", background: colors.error }}
>
  Supprimer
</ActionButton>
                      {demande.status === "completed" && (
                        <ActionButton
                          onClick={() => handleDownload(demande._id)}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          <Download size={14} />
                          PDF
                        </ActionButton>
                      )}

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
