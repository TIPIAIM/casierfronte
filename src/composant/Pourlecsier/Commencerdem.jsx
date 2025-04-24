// Commencerdem.jsx - Composant unique avec toutes les étapes, barre animée, confirmation et redirection
import React, { useState, useEffect } from "react";
import { Home, Mail, ClipboardList, Check, User, MapPin, FileText } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const colors = ["#e53e3e", "#ed8936", "#38a169", "#3182ce"];

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color:#F2C94C; /* Fond jaune */
  border-radius: 0%; /* Cercle autour de l'icône */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Ombre pour un effet 3D */
  color:#002B5B; /* Couleur de l'icône */
  font-size: 1.5rem; /* Taille de l'icône */
  transition: all 0.3s ease;

  &:hover {
    background-color: #1A4D2E; /* Fond vert foncé au survol */
    color: #FFFFFF; /* Couleur blanche au survol */
    transform: scale(1.1); /* Légère mise en avant au survol */
  }
`;
const ProgressWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  height: 90px;
  border-radius: 1px;
  overflow: hidden;
`;

const ProgressSegment = styled.div`
  flex: 1;
  background: ${({ active, color }) => (active ? color : "#e2e8f0")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

 

const StepContainer = styled.div`
  margin-bottom: 2rem;
`;

const StepTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a365d;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const DeliveryOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }

  input {
    margin-right: 1rem;
  }

  svg {
    margin-right: 0.75rem;
    color: #3182ce;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background: #3182ce;
    color: white;
    border: none;

    &:hover {
      background: #2c5282;
    }
  }

  &.secondary {
    background: #e2e8f0;
    color: #4a5568;
    border: none;

    &:hover {
      background: #cbd5e0;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

function Commencerdem() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    deliveryMethod: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      birthDate: "",
      birthPlace: "",
    },
    contactInfo: {
      address: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:2027/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur serveur");
      setStep(4);
      setTimeout(() => navigate("/Adminfils"), 3000);
    } catch (error) {
      alert("Erreur lors de la soumission");
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const StepIcons = [<Home size={26}   />, <User size={16} />, <MapPin size={16} />, <FileText size={16} />];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer>
            <StepTitle>Mode de livraison</StepTitle>
            <StepDescription>Choisissez comment recevoir votre casier judiciaire :</StepDescription>
            {["court", "mail", "email"].map((method, index) => (
              <DeliveryOption key={method}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={method}
                  checked={formData.deliveryMethod === method}
                  onChange={() => setFormData({ ...formData, deliveryMethod: method })}
                />
                {[<Home />, <ClipboardList />, <Mail />][index]} {method.toUpperCase()}
              </DeliveryOption>
            ))}
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer>
            <StepTitle>Informations personnelles</StepTitle>
            <GridContainer>
              <FormGroup><FormLabel>Prénom</FormLabel><FormInput name="firstName" value={formData.personalInfo.firstName} onChange={(e) => handleInputChange(e, "personalInfo")} /></FormGroup>
              <FormGroup><FormLabel>Nom</FormLabel><FormInput name="lastName" value={formData.personalInfo.lastName} onChange={(e) => handleInputChange(e, "personalInfo")} /></FormGroup>
              <FormGroup><FormLabel>Date de naissance</FormLabel><FormInput type="date" name="birthDate" value={formData.personalInfo.birthDate} onChange={(e) => handleInputChange(e, "personalInfo")} /></FormGroup>
              <FormGroup><FormLabel>Lieu de naissance</FormLabel><FormInput name="birthPlace" value={formData.personalInfo.birthPlace} onChange={(e) => handleInputChange(e, "personalInfo")} /></FormGroup>
            </GridContainer>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer>
            <StepTitle>Coordonnées</StepTitle>
            <FormGroup><FormLabel>Adresse</FormLabel><FormInput name="address" value={formData.contactInfo.address} onChange={(e) => handleInputChange(e, "contactInfo")} /></FormGroup>
            <GridContainer>
              <FormGroup><FormLabel>Code postal</FormLabel><FormInput name="postalCode" value={formData.contactInfo.postalCode} onChange={(e) => handleInputChange(e, "contactInfo")} /></FormGroup>
              <FormGroup><FormLabel>Ville</FormLabel><FormInput name="city" value={formData.contactInfo.city} onChange={(e) => handleInputChange(e, "contactInfo")} /></FormGroup>
            </GridContainer>
            <GridContainer>
              <FormGroup><FormLabel>Email</FormLabel><FormInput name="email" value={formData.contactInfo.email} onChange={(e) => handleInputChange(e, "contactInfo")} /></FormGroup>
              <FormGroup><FormLabel>Téléphone</FormLabel><FormInput name="phone" value={formData.contactInfo.phone} onChange={(e) => handleInputChange(e, "contactInfo")} /></FormGroup>
            </GridContainer>
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ width: "3rem", height: "3rem", margin: "0 auto 1rem", borderRadius: "50%", background: "#f0fff4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={24} color="#38a169" />
              </div>
              <StepTitle>Demande soumise</StepTitle>
              <StepDescription>Votre demande a bien été reçue. Redirection en cours...</StepDescription>
            </div>
          </StepContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <ProgressWrapper>
        {[1, 2, 3, 4].map((s, index) => (
          <ProgressSegment key={s} active={step >= s} color={colors[index]}>
            <IconWrapper active={step >= s} color={colors[index]}>
              {StepIcons[index]}
            </IconWrapper>
          </ProgressSegment>
        ))}
      </ProgressWrapper>
      {renderStep()}
      {step < 4 && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {step > 1 && <Button className="secondary" onClick={() => setStep(step - 1)}>Retour</Button>}
          {step < 3 ? (
            <Button className="primary" onClick={() => setStep(step + 1)} style={{ marginLeft: "auto" }}>Suivant</Button>
          ) : (
            <Button className="primary" onClick={handleSubmit} style={{ marginLeft: "auto" }}>Soumettre</Button>
          )}
        </div>
      )}
    </Container>
  );
}

export default Commencerdem;
