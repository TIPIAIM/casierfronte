// CasierPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "1 solid #000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 3,
  },
  section: {
    marginBottom: 20,
    borderBottom: "1 solid #eee",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "40%",
    fontSize: 10,
    fontWeight: "bold",
  },
  value: {
    width: "60%",
    fontSize: 10,
  },
  table: {
    width: "100%",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "14.28%", // 100% / 7 colonnes
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#002B5B",
    color: "#FFFFFF",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCol: {
    width: "14.28%", // 100% / 7 colonnes
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 9,
  },
});

// Fonction pour formater la date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
};

const CasierPDF = ({ demandeData, condamnationData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Section Demande */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>BULLETIN N°3</Text>
          <Text style={styles.title}>EXTRAIT DU CASIER JUDICIAIRE</Text>
          <Text style={styles.subtitle}>(article 1216 du code de procédure pénale)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Prénom et Nom:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.lastName || ""}{" "}
            {demandeData?.personalInfo?.firstName || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Né le:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.birthDate ? formatDate(demandeData.personalInfo.birthDate) : "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>A:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.birthPlace || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Père:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.firstName1 || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mère:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.firstName2 || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Domicile:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.villecommune || ""}{" "}
            {demandeData?.personalInfo?.pays ? `/ ${demandeData.personalInfo.pays}` : "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Etat Civil de la Famille:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.situationFamiliale || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Profession:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.profession || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nationalité:</Text>
          <Text style={styles.value}>
            {demandeData?.personalInfo?.nationalite || "Non renseigné"}
          </Text>
        </View>
      </View>

      {/* Section Condamnation */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>INFORMATIONS DE CONDAMNATION</Text>
        </View>

        {/* Tableau des condamnations */}
        <View style={styles.table}>
          {/* En-tête du tableau */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Cours/Tribunaux</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Date de Condamnation</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Nature de l'Infraction</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Date de crime/délit</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Durée de peine</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Date mise en prison</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Observations</Text>
            </View>
          </View>

          {/* Ligne de données */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{condamnationData?.courtsTribunaux || "Neant"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {condamnationData?.dateCondamnations
                  ? formatDate(condamnationData.dateCondamnations)
                  : "Neant"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{condamnationData?.natureDesCrimes || "Neant"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {condamnationData?.dateCrimesOuDelits
                  ? formatDate(condamnationData.dateCrimesOuDelits)
                  : "Neant"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{condamnationData?.dureeDePeine || "Neant"}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>
                {condamnationData?.dateMiseEnPrison
                  ? formatDate(condamnationData.dateMiseEnPrison)
                  : "Neant"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{condamnationData?.observations || "éeant"}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CasierPDF;