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
    marginBottom: 10,
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
});

const DemandePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>BULLETIN N°3</Text>
        <Text style={styles.title}>EXTRAIT DU CASIER JUDICIAIRE</Text>
        <Text style={styles.subtitle}>
          (article 1216 du code de procédure penale)
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Prénom et Nom:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.lastName || ""}{" "}
            {data.personalInfo?.firstName || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Né le:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.birthDate || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>A:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.birthPlace || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Père:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.firstName1 || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Mère:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.firstName2 || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Domicile:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.villecommune || ""} /{" "}
            {data.personalInfo?.pays || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Etat Civil de la Famille:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.situationFamiliale || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Profession:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.profession || "Non renseigné"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nationalité:</Text>
          <Text style={styles.value}>
            {data.personalInfo?.nationalite || "Non renseigné"}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DemandePDF;
