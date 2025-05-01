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

const CondamnationPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>EXTRAIT DU CASIER JUDICIAIRE</Text>
        <Text style={styles.subtitle}>Bulletin n°3 - Condamnations</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Cours/Tribunaux:</Text>
          <Text style={styles.value}>{data.courtsTribunaux || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date de Condamnation:</Text>
          <Text style={styles.value}>{data.dateCondamnations || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Nature de l'Infraction:</Text>
          <Text style={styles.value}>{data.natureDesCrimes || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date de crime ou délit:</Text>
          <Text style={styles.value}>{data.dateCrimesOuDelits || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Durée de peine:</Text>
          <Text style={styles.value}>{data.dureeDePeine || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date mise en prison:</Text>
          <Text style={styles.value}>{data.dateMiseEnPrison || "Neant"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Observations:</Text>
          <Text style={styles.value}>{data.observations || "Neant"}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CondamnationPDF;
