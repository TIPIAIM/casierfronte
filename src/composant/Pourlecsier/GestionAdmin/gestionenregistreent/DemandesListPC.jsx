import React, { useState, useEffect } from "react";
import { Search, Download, Loader2, User, FileText, Shield, Gavel, Scale, BookOpen } from "lucide-react";
import styled from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DemandePDF from "../DemandePDF";

// Palette de couleurs premium pour cabinet prestigieux
const colors = {
  primary: "#0C2340", // Bleu marine profond
  secondary: "#8B7231", // Or vieilli
  accent: "#C9B075", // Or clair
  white: "#FDFDFD",

  darkBlue: "#081A33",
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  bleuProfond: "#003566", 
  beigeSableux: "#F2E9DC",

  lightBg: "#F8F6F2", // Fond ivoire
  error: "#A52A2A",
  success: "#2E6140",
  text: "#333333",
  lightGray: "#E8E6E0",
  border: "#D3C9B8", // Bordure dorée
};

// Typographie élégante
const fontFamily = "'Cormorant Garamond', 'Times New Roman', serif";
const fontFamilySecondary = "'Montserrat', sans-serif";

// Styles premium
const Container = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  padding: 3rem;
  background: ${colors.white};
  border-radius: 1px;
  //box-shadow: 5px 0px ${colors.greenDark};
  font-family: ${fontFamily};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${colors.greenDark};
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1.5rem;
  }

 @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 1rem;
    max-width: 95%;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.secondary}, transparent);
  }

  h1 {
    color: ${colors.primary};
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    font-family: ${fontFamilySecondary};
  }

  p {
    color: ${colors.text};
    font-style: italic;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  
  margin-bottom: 3rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
 min-width: 200px;
  max-width: 250px;
  box-shadow:  2px 4px ${colors.greenDark};

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 1.5rem;
    font-size: 1.05rem;
    transition: all 0.9s;
    
    font-family: ${fontFamily};
 //   background: ${colors.lightBg};

    &:focus {
      outline: none;
   
    }

    &::placeholder {
      color: ${colors.text}80;
      font-style: italic;
    }
  }
      @media (min-width: 768px) {
    input {
      padding: 0.85rem 1rem 0.85rem 3rem;
    }

`;

const SearchButton = styled.button`
  padding: 1rem 1rem;
  background: ${colors.greenDark};
  color: ${colors.goldenYellow};
  border: none;
  border-radius: 1px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  font-family: ${fontFamilySecondary};
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${colors.goldenYellow};
      color: ${colors.darkBlue};

    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.goldenYellow}50;
    color: ${colors.greenDark}80;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const FormContainer = styled.div`
  background: ${colors.lightBg}99;
  padding: 3rem;
  border-radius: 1px;
  margin-top: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0px;
  //  background: linear-gradient(90deg, ${colors.greenDark}, ${colors.goldenYellow});
  }

   @media (max-width: 1024px) {
    padding: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.beigeSableux};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (max-width: 1024px) {
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
`;

const FormLabel = styled.div`
  font-weight: 600;
  color: ${colors.greenDark};
  min-width: 300px;
  margin-right: 2rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${fontFamilySecondary};

  svg {
    color: ${colors.goldenYellow};
  }

   @media (max-width: 1024px) {
    min-width: 250px;
    margin-right: 1.5rem;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    margin-right: 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed ${colors.border};
  }
`;

const FormValue = styled.div`
  flex: 1;
  padding: 0.5rem 0;
  color: ${colors.text};
  font-size: 1.1rem;
  line-height: 1.6;

  &.empty {
    color: ${colors.text}80;
    font-style: italic;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: ${colors.lightBg};
 
  border: 1px dashed ${colors.border};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
 // color: ${colors.greenDark};
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: ${colors.lightBg};

  border: 1px dashed ${colors.border};

  svg {
    stroke-width: 2;
      color: ${colors.greenDark};

  }

  p {
    max-width: 500px;
    line-height: 1.8;
    font-size: 1.1rem;
  }
      @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    padding: 1.5rem;
  }
`;

const DocumentHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 2rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.secondary}, transparent);
  }

  h1 {
    color: ${colors.primary};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
    padding: 0 1.5rem;
//    background: ${colors.lightBg};
    font-family: ${fontFamilySecondary};
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  h2 {
    color: ${colors.text};
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 0.5rem;
    font-style: italic;
  }

  p {
    color: ${colors.text}90;
    font-size: 0.95rem;
    margin-top: 0.5rem;
  }
     @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;

    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.1rem;
    }
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
`;

const DownloadButton = styled(SearchButton)`
  background: ${colors.greenDark};
  padding: 0.9rem 1rem;
  color: ${colors.goldenYellow};
  &:hover {
    background: ${colors.goldenYellow};
    color: ${colors.greenDark};
    }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${colors.greenDark};
  color: ${colors.goldenYellow};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: ${fontFamilySecondary};
 //  border: 1px solid ${colors.primary}20;

  svg {
    color: ${colors.goldenYellow};
  }
`;

function DemandesListPC({ forPDF = false, onDataLoaded }) {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundDemande, setFoundDemande] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    const fetchAllDemandes = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:2027/api/demande/");
        if (!response.ok) throw new Error("Erreur de chargement des demandes");
        const data = await response.json();
        setDemandes(data.data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDemandes();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFoundDemande(null);
      setSearchTriggered(false);
      return;
    }

    setSearchTriggered(true);
    const demande = demandes.find(
      (d) => d.personalInfo.passport?.toLowerCase() === searchTerm.toLowerCase()
    );
    setFoundDemande(demande || null);
    if (onDataLoaded) onDataLoaded(demande || null);
  };

  return (
    <Container style={forPDF ? { boxShadow: "none", margin: 0, padding: 0, border: "none" } : {}}>
      {!forPDF && (
        <Header>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "1rem", 
            marginBottom: "1.5rem",
            color: colors.secondary
          }}>
            <Scale size={48} />
          </div>
          <h1>REPUBLIQUE DE GUINEE</h1>
          <p>Service d'extraits de casier judiciaire</p>
        </Header>
      )}

      <SearchContainer>
        <SearchInput>
          <input
            type="text"
            placeholder="Entrez le numérop 'demande'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </SearchInput>
        <SearchButton onClick={handleSearch} disabled={!searchTerm}>
          <Search size={20} />
        </SearchButton>
      </SearchContainer>

      {loading ? (
        <LoadingContainer>
          <Loader2 size={48} className="animate-spin" color={colors.secondary} />
          <p style={{ color: colors.primary, fontFamily: fontFamilySecondary }}>
            Chargement en cours...
          </p>
        </LoadingContainer>
      ) : searchTriggered && !foundDemande ? (
        <EmptyState>
          <User size={52} />
          <p>Aucun dossier ne correspond à ce numéro de passeport</p>
          <SearchButton onClick={() => setSearchTriggered(false)}>
            <Search size={18} />
            Effectuer une nouvelle recherche
          </SearchButton>
        </EmptyState>
      ) : foundDemande ? (
        <>
          <ActionBar>
            <Badge>
              <Shield size={18} />
              Client : {foundDemande.personalInfo?.passport || "XXXXXX"}
            </Badge>
            <PDFDownloadLink
              document={<DemandePDF data={foundDemande} />}
              fileName={`casier_judiciaire_${
                foundDemande.personalInfo?.passport || "inconnu"
              }.pdf`}
            >
              {({ loading }) => (
                <DownloadButton>
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Download size={18} />
                    </>
                  )}
                </DownloadButton>
              )}
            </PDFDownloadLink>
          </ActionBar>

          <FormContainer>
            <DocumentHeader>
              <h1>BULLETIN N°3</h1>
              <h2>EXTRAIT DU CASIER JUDICIAIRE</h2>
              <p>Article 1216 du code de procédure pénale</p>
            </DocumentHeader>

            <FormRow>
              <FormLabel>
                <User size={18} />
                Identité complète:
              </FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.lastName &&
                  !foundDemande.personalInfo?.firstName
                    ? "empty"
                    : ""
                }
              >
                <strong>{foundDemande.personalInfo?.lastName || ""}</strong>{" "}
                {foundDemande.personalInfo?.firstName || "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Date de naissance:</FormLabel>
              <FormValue>
                {formatDate(foundDemande.personalInfo?.birthDate) || "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Lieu de naissance:</FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.birthPlace ? "empty" : ""
                }
              >
                {foundDemande.personalInfo?.birthPlace || "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Filiation:</FormLabel>
              <FormValue>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div>
                    <strong>Père:</strong> {foundDemande.personalInfo?.firstName1 || "Non renseigné"}
                  </div>
                  <div>
                    <strong>Mère:</strong> {foundDemande.personalInfo?.firstName2 || "Non renseigné"}
                  </div>
                </div>
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Adresse actuelle:</FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.villecommune &&
                  !foundDemande.personalInfo?.pays
                    ? "empty"
                    : ""
                }
              >
                {foundDemande.personalInfo?.villecommune || ""}{" "}
                {foundDemande.personalInfo?.pays ? `(${foundDemande.personalInfo?.pays})` : ""}
                {(foundDemande.personalInfo?.villecommune || foundDemande.personalInfo?.pays) 
                  ? "" 
                  : "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Situation familiale:</FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.situationFamiliale ? "empty" : ""
                }
              >
                {foundDemande.personalInfo?.situationFamiliale || "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Profession:</FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.profession ? "empty" : ""
                }
              >
                {foundDemande.personalInfo?.profession || "Non renseigné"}
              </FormValue>
            </FormRow>

            <FormRow>
              <FormLabel>Nationalité:</FormLabel>
              <FormValue
                className={
                  !foundDemande.personalInfo?.nationalite ? "empty" : ""
                }
              >
                {foundDemande.personalInfo?.nationalite || "Non renseigné"}
              </FormValue>
            </FormRow>
          </FormContainer>
        </>
      ) : (
        <EmptyState>
          <BookOpen size={52} />
          <p>
            Veuillez saisir un numéro de passeport valide pour accéder au casier judiciaire correspondant.
            <br />
            Ce service est réservé aux clients du cabinet.
          </p>
          <div style={{ 
            display: "flex", 
            gap: "0.75rem", 
            alignItems: "center",
            backgroundColor: colors.primary + "10",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            border: `1px solid ${colors.primary}20`
          }}>
            <Gavel size={20} color={colors.secondary} />
            <span style={{ 
              fontSize: "0.95rem", 
              color: colors.primary,
              fontFamily: fontFamilySecondary
            }}>
              Sécurisé et confidentiel
            </span>
          </div>
        </EmptyState>
      )}
    </Container>
  );
}

export default DemandesListPC;