import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {  Loader2 } from "lucide-react";

// Styles
const StatCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 10px;
  margin: 0 auto;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #002b5b;
  margin: 1rem 0;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  color: #c53030;
  text-align: center;
  background-color: #ffe5e5;
  border-radius: 4px;
`;

const TotalCondamnations = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_b}/criminal`);
        if (response.data.success) {
          setTotal(response.data.data.length);
        } else {
          setError("Erreur lors du chargement des données");
        }
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <LoaderContainer>
        <Loader2 className="animate-spin" size={32} color="#002B5B" />
      </LoaderContainer>
    );
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <StatCard>
      <StatValue>{total}</StatValue>
    </StatCard>
  );
};

export default TotalCondamnations;
