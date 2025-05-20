import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { 
  Gavel, 
  AlertCircle,  
  Loader2, 
  Trash2, 
  Search,
} from "lucide-react";
import axios from "axios";

// Palette de couleurs
const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  darkBlue: "#003566",
  lightBg: "#F2E9DC",
  error: "#C53030",
  success: "#2E7D32",
};

// Styles améliorés
const PageContainer = styled.div`
  min-height: 100vh;
`;

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 8px 0px 0px ${colors.secondary};
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 1rem 0rem;
  border-bottom: 4px solid ${colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ListTitle = styled.h1`
  color: ${colors.secondary};
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
`;

const TotalRecords = styled.div`
  color: ${colors.primary};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;

  input {
    width: 90%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${colors.lightBg}20;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.3s;

    &:focus {
      outline: none;
      box-shadow: 2px 2px ${colors.secondary};
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.primary};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const RecordsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  min-width: 800px;
  font-size: 0.85rem; /* Taille de police réduite */

  th, td {
    padding: 0.75rem 1rem; /* Padding réduit */
    text-align: left;
    border-bottom: 1px solid ${colors.secondary}50;
  }

  th {
    background: ${colors.secondary};
    color: ${colors.white};
    font-weight: 600;
    position: sticky;
    top: 0;
    font-size: 0.9rem; /* Taille de police légèrement plus grande pour les en-têtes */
  }

  tr:hover {
    background: ${colors.lightBg};
  }
`;

const ActionCell = styled.td`
  white-space: nowrap;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem; /* Taille réduite */
  border-radius: 6px;
  font-size: 0.8rem; /* Taille de police réduite */
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  margin-right: 0.5rem;

  &.view {
    background: ${colors.primary};
    color: ${colors.white};
  }

  &.edit {
    background: ${colors.accent};
    color: ${colors.primary};
  }

  &.delete {
    background: ${colors.error}90;
    color: ${colors.white};
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${colors.secondary};
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  padding: 1.5rem 2rem;
  color: ${colors.error};
  background: ${colors.error}10;
  border-radius: 8px;
  margin: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem; /* Taille de police réduite */
`;

function ListeCondamnationsdmin() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Récupérer les enregistrements
  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${import.meta.env.VITE_b}/criminal`);
      if (response.data.success) {
        // Trier les enregistrements du plus récent au plus ancien
        const sortedRecords = response.data.data.sort((a, b) => {
          return new Date(b.dateCondamnations) - new Date(a.dateCondamnations);
        });
        setRecords(sortedRecords);
      } else {
        setError("Erreur lors du chargement des données");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Filtrer les enregistrements
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.carteidentite?.toLowerCase().includes(searchLower) ||
      record.courtsTribunaux?.toLowerCase().includes(searchLower) ||
      record.natureDesCrimes?.toLowerCase().includes(searchLower) ||
      record.dureeDePeine?.toLowerCase().includes(searchLower)
    );
  });

  // Supprimer un enregistrement
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement ?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_b}/criminal/${id}`);
        fetchRecords(); // Recharger les données
      } catch (err) {
        setError("Erreur lors de la suppression");
      }
    }
  };

  return (
    <div>
      <PageContainer>
        <ListContainer>
          <ListHeader>
            <div>
              <ListTitle>
                <Gavel size={28} />
                Les Condamnations
              </ListTitle>
              <TotalRecords>
                Total: {filteredRecords.length} enregistrement{filteredRecords.length !== 1 ? 's' : ''}
              </TotalRecords>
            </div>

            <SearchContainer>
              <SearchInput>
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>
            </SearchContainer>
          </ListHeader>

          {error && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {error}
            </ErrorMessage>
          )}

          {loading ? (
            <LoadingContainer>
              <Loader2 size={32} className="animate-spin" color={colors.primary} />
            </LoadingContainer>
          ) : filteredRecords.length === 0 ? (
            <EmptyState>
              {searchTerm ? "Aucun résultat trouvé" : "Aucun enregistrement disponible"}
            </EmptyState>
          ) : (
            <TableContainer>
              <RecordsTable>
                <thead>
                  <tr>
                    <th>Identité</th>
                    <th>Cours/Tribunaux</th>
                    <th>Date de Condamnation</th>
                    <th>Nature de l'Infraction</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record._id}>
                      <td>{record.carteidentite || "-"}</td>
                      <td>{record.courtsTribunaux || "-"}</td>
                      <td>{formatDate(record.dateCondamnations)}</td>
                      <td>{record.natureDesCrimes || "-"}</td>
                      <ActionCell>                    
                        <ActionButton
                          className="delete"
                          onClick={() => handleDelete(record._id)}
                        >
                          <Trash2 size={16} />
                          Supprimer
                        </ActionButton>
                      </ActionCell>
                    </tr>
                  ))}
                </tbody>
              </RecordsTable>
            </TableContainer>
          )}
        </ListContainer>
      </PageContainer>
    </div>
  );
}

export default ListeCondamnationsdmin;