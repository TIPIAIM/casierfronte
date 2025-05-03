import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ListeCondamnationPC from "./gestioncond/ListeCondamnationsPC";
import DemandesListPC from "./gestionenregistreent/DemandesListPC";
import CasierPDF from "./CasierPDF";
import Interfcehecsier from "../../interface/Interfcehecsier";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

// Palette de couleurs
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

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
const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 4px 8px;
  padding: 8px 4px;
  //background-color: ${colors.goldenYellow};
  color: ${colors.blueMarine};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 5%;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: ${colors.greenDark};
    color: ${colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    margin-right: 8px; /* Ajoute un espace entre l'icône et le texte */
  }
`;
const Casier = () => {
  const [demandeData, setDemandeData] = useState(null);
  const [condamnationData, setCondamnationData] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
      <Interfcehecsier />
      <div>
      <BackButton 
            onClick={() => navigate(-1)} 
            aria-label="Retour"
            style={{ animationDelay: '0.1s' }}
          >
            <ArrowLeft size={26} />
          </BackButton>
      </div>
      {/* Bouton de téléchargement (visible seulement quand les deux ensembles de données sont disponibles) */}
      {demandeData && condamnationData && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <PDFDownloadLink
            document={
              <CasierPDF
                demandeData={demandeData}
                condamnationData={condamnationData}
              />
            }
            fileName={`casier_judiciaire_${
              demandeData?.personalInfo?.passport || "inconnu"
            }.pdf`}
          >
            {({ loading }) => (
              <button
                style={{
                  padding: "10px 20px",
                  background: "#1A4D2E",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {loading
                  ? "Génération du PDF..."
                  : "Télécharger le casier complet"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}

      {/* Passez les fonctions de mise à jour aux composants enfants */}
      <DemandesListPC onDataLoaded={setDemandeData} forPDF={false} />

      <ListeCondamnationPC onDataLoaded={setCondamnationData} />
    </div>
  );
};

export default Casier;
