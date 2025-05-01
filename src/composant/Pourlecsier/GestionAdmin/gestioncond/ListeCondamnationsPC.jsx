import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AlertCircle, Loader2, Download } from "lucide-react";
import axios from "axios";
import { FaHandPaper } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CondamnationPDF from "../CondamnationPDF";
// (Conserver toutes vos définitions de couleurs et styles existants)
const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  lightBg: "#F5F7FA",
  error: "#C53030",
  success: "#2E7D32",
  text: "#333333",
  lightGray: "#E5E7EB",

  darkBlue: "#081A33",
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  bleuProfond: "#003566", 
  beigeSableux: "#F2E9DC",
};
// Ajouter ce style manquant
const DownloadButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${colors.greenDark};
  color: ${colors.goldenYellow};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;

  &:hover {
    background: ${colors.goldenYellow};
    color: ${colors.greenDark};

    }
`;

// Styles
const PageContainer = styled.div`
  padding: 2rem 1rem;
  background: ${colors.lightBg};
  min-height: 100vh;
`;

const ListContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 43, 91, 0.08);
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  box-shadow: 1px 1px 1px 1px ${colors.greenDark};
 min-width: 200px;
  max-width: 250px;
  input {
    width: 100%;
    padding: 0.8rem 0.8rem 0.8rem 0.5rem;

    font-size: 0.8rem;
    transition: all 0.3s;
    color: ${colors.text};
    font-weight: 500;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px ${colors.primary}20;
    }

    &::placeholder {
      color: ${colors.darkBlue}80;
      font-weight: normal;
    }
  }

  svg {
    position: absolute;
    left: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.darkBlue};
  }

  @media (min-width: 768px) {
    input {
      padding: 0.85rem 1rem 0.85rem 3rem;
    }

    svg {
      left: 1rem;
    }
  }
`;

const SearchButton = styled.button`
  padding: 0.9rem;
  background: ${colors.greenDark};
  color: ${colors.goldenYellow};
  border: none;

  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;

  &:hover {
    background: ${colors.goldenYellow};
  color: ${colors.greenDark};

    }

  &:disabled {
    background: ${colors.goldenYellow}50;
    color: ${colors.text}80;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    width: auto;
    padding: 0 1.5rem;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  padding: 0 2rem 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

const RecordsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 1.5rem 0;
  min-width: 1000px;

  th,
  td {
    padding: 1.25rem 1rem;
    text-align: left;
   border: 1px solid ${colors.greenDark};
  }

  th {
    background: ${colors.greenDark};
    color: ${colors.white};
    font-weight: 600;
    position: sticky;
    top: 0;
    white-space: nowrap;
  }

  tr:hover {
    background: ${colors.lightBg};
  }

  td {
    color: ${colors.text};
    vertical-align: top;
  }

  @media (max-width: 768px) {
    th,
    td {

      padding: 0.75rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
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
  border-left: 4px solid ${colors.error};
`;

function ListeCondamnationPC({ onDataLoaded }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [foundRecord, setFoundRecord] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Récupérer les enregistrements
  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:2027/criminal");
      if (response.data.success) {
        setRecords(response.data.data);
      } else {
        setError("Erreur lors du chargement des données");
      }
    } catch (err) {
      console.error("Erreur:", err);
      setError(
        err.response?.data?.message ||
          "Impossible de charger les enregistrements"
      );
    } finally {
      setLoading(false);
    }
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

  // Lancer la recherche
  const handleSearch = () => {
    if (!searchTerm) {
      setFoundRecord(null);
      setSearchTriggered(false);
      return;
    }

    setSearchTriggered(true);
    const record = records.find(r => r.carteidentite?.toLowerCase() === searchTerm.toLowerCase());
    setFoundRecord(record || null);
    if (onDataLoaded) onDataLoaded(record || null); // Envoyer les données au parent
   {/* const record = records.find(
      (record) =>
        record.carteidentite?.toLowerCase() === searchTerm.toLowerCase()
    );
    setFoundRecord(record || null);*/}
  };

  return (
    <PageContainer>
      <ListContainer>
        <ListHeader>
          <TitleContainer>
            {foundRecord && (
              <PDFDownloadLink
                document={<CondamnationPDF data={foundRecord} />}
                fileName={`condamnation_${
                  foundRecord.carteidentite || "inconnu"
                }.pdf`}
              >
                {({ loading }) => (
                  <DownloadButton>
                    {loading ? (
                      "Préparation..."
                    ) : (
                      <>
                        <Download size={18} />
                      </>
                    )}
                  </DownloadButton>
                )}
              </PDFDownloadLink>
            )}
          </TitleContainer>
          <SearchContainer>
         
            <SearchInput>
              <input
                type="text"
                placeholder="saisissez le numéro 'demande' ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </SearchInput>
               <SearchButton onClick={handleSearch} disabled={!searchTerm}>
              <FaHandPaper size={18} />
            </SearchButton>
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
            <Loader2
              size={32}
              className="animate-spin"
              color={colors.primary}
            />
          </LoadingContainer>
        ) : (
          <TableContainer>
            <RecordsTable>
              <thead>
                <tr>
                  <th>Cours/Tribunaux</th>
                  <th>Date de Condamnation</th>
                  <th>Nature de l'Infraction</th>
                  <th>Date de crime ou délit</th>
                  <th>Durée de peine</th>
                  <th>Date mise en prison</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{foundRecord?.courtsTribunaux || "Neant"}</td>
                  <td>
                    {foundRecord?.dateCondamnations
                      ? formatDate(foundRecord.dateCondamnations)
                      : "Neant"}
                  </td>
                  <td>{foundRecord?.natureDesCrimes || "Neant"}</td>
                  <td>
                    {foundRecord?.dateCrimesOuDelits
                      ? formatDate(foundRecord.dateCrimesOuDelits)
                      : "Neant"}
                  </td>
                  <td>{foundRecord?.dureeDePeine || "Neant"}</td>
                  <td>
                    {foundRecord?.dateMiseEnPrison
                      ? formatDate(foundRecord.dateMiseEnPrison)
                      : "Neant"}
                  </td>
                  <td>{foundRecord?.observations || "Neant"}</td>
                </tr>
              </tbody>
            </RecordsTable>
          </TableContainer>
        )}
      </ListContainer>
    </PageContainer>
  );
}

export default ListeCondamnationPC;
