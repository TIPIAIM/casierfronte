import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ListeCondamnationPC from "./gestioncond/ListeCondamnationsPC";
import DemandesListPC from "./gestionenregistreent/DemandesListPC";
import CasierPDF from "./CasierPDF";

const Casier = () => {
  const [demandeData, setDemandeData] = useState(null);
  const [condamnationData, setCondamnationData] = useState(null);

  return (
    <div>
      {/* Bouton de téléchargement (visible seulement quand les deux ensembles de données sont disponibles) */}
      {demandeData && condamnationData && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <PDFDownloadLink
            document={<CasierPDF demandeData={demandeData} condamnationData={condamnationData} />}
            fileName={`casier_judiciaire_${demandeData?.personalInfo?.passport || 'inconnu'}.pdf`}
          >
            {({ loading }) => (
              <button style={{
                padding: "10px 20px",
                background: "#1A4D2E",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}>
                {loading ? "Génération du PDF..." : "Télécharger le casier complet"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}

      {/* Passez les fonctions de mise à jour aux composants enfants */}
      <DemandesListPC 
        onDataLoaded={setDemandeData} 
        forPDF={false} 
      />
      
      <ListeCondamnationPC 
        onDataLoaded={setCondamnationData} 
      />
    </div>
  );
};

export default Casier;