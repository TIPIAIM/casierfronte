import React, { useState } from "react";
import styled from "styled-components";
import {
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaHome,
  FaEnvelope,
  FaMobileAlt,
  FaDownload,
  FaQuestionCircle,
} from "react-icons/fa";
import "./Style.css";
// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FAFAFA",
  errorRed: "#E74C3C",
};

// Styles avec styled-components
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: "Arial", sans-serif;
  @media (max-width: 768px) {
    padding: 0 0.5rem;
    margin: 1rem auto;
  }
`;

const HeaderSection = styled.div`
  background-color: ${colors.blueMarine};
  color: ${colors.white};
  padding: 2.5rem;

  margin-bottom: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProcedureSection = styled.div`
  background-color: ${colors.white};
  border-left: 4px solid ${colors.greenDark};
  padding: 1.8rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const StepList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const StepItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.5;
`;

const DownloadSection = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;

const DeliverySection = styled.div`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  color: ${colors.blueMarine};
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${colors.goldenYellow};

  @media (max-width: 992px) {
    margin: 1rem 1rem;
  }

  @media (max-width: 768px) {
    margin: 1rem 1rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 576px) {
    margin: 1rem 1rem;
    text-align: center;
  }
`;

const DeliveryMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 2rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MethodCard = styled.div`
  background-color: ${colors.white};
  border: 0.1px solid #e0e0e0
  
  padding: 1.8rem 1.5rem;
  box-shadow: 3px 1px rgba(0, 0, 0, 0.55);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${colors.blueMarine};
      box-shadow: 3px 1px rgba(0, 0, 0, 0.15);

  }

   @media (max-width: 768px) {
    padding: 1.5rem 1rem;
   
  }
`;

const MethodIcon = styled.div`
  font-size: 2.5rem;
  color: ${colors.blueMarine};
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    text-align: left;
  }
`;

const MethodTitle = styled.h3`
  color: ${colors.greenDark};
  margin-bottom: 0.8rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const FormSection = styled.div`
  background-color: ${colors.white};

  padding: 2.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${({ error }) => (error ? "#FFF4F4" : colors.white)};
  border: 1px solid ${({ error }) => (error ? colors.errorRed : "#E0E0E0")};

  transition: all 0.3s ease;
 @media (max-width: 768px) {
    padding: 1.2rem;
    margin: 1.5rem 0;
  }
 @media (max-width: 576px) {
    flex-direction: column;
    gap: 8px;
  }
  `;

const CheckboxInput = styled.input`
  margin-top: 3px;
  min-width: 20px;
  min-height: 20px;
  accent-color: ${colors.blueMarine};
`;

const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
`;

const MainText = styled.span`
  font-weight: 500;
  color: ${colors.blueMarine};


  @media (max-width: 576px) {
    font-size: 0.95rem;
  }
  `;

const LinkText = styled.a`
  color: ${colors.blueMarine};
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;

  &:hover {
    color: ${colors.greenDark};
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${colors.errorRed};
  font-size: 0.9rem;
  margin-top: 8px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0.8rem 1.5rem;

  background: ${({ selected }) =>
    selected ? colors.blueMarine + "15" : "transparent"};
  border: 1px solid ${({ selected }) => (selected ? colors.blueMarine : "#ddd")};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colors.blueMarine};
  }
`;

const RadioInput = styled.input`
  accent-color: ${colors.blueMarine};
`;

const PrimaryButton = styled.button`
  background-color: ${colors.greenDark};
  color: ${colors.white};
  border: none;
  padding: 1rem 2rem;

  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background-color: #144126;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: ${colors.blueMarine};
  margin-top: 1.5rem;

  &:hover:not(:disabled) {
    background-color: #001a3a;
  }
`;

const GuideSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const GuideLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.blueMarine};
  text-decoration: none;
  font-weight: 600;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${colors.blueMarine};

  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.blueMarine};
    color: ${colors.white};
  }
`;

const TermsCheckbox = ({ accepted, onChange, error }) => {
  return (
    <CheckboxContainer error={error}>
      <CheckboxInput
        type="checkbox"
        id="terms-checkbox"
        checked={accepted}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor="terms-checkbox">
        <MainText>
          Je reconnais avoir lu et j'accepte les{" "}
          <LinkText
            onClick={(e) => {
              e.preventDefault();
              window.open("/conditions", "_blank");
            }}
          >
            conditions générales d'utilisation
          </LinkText>{" "}
          et la{" "}
          <LinkText
            onClick={(e) => {
              e.preventDefault();
              window.open("/confidentialite", "_blank");
            }}
          >
            politique de confidentialité
          </LinkText>
        </MainText>
        {error && (
          <ErrorMessage>
            <FaExclamationTriangle /> Vous devez accepter les conditions pour
            continuer
          </ErrorMessage>
        )}
      </CheckboxLabel>
    </CheckboxContainer>
  );
};

const Visiteur = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [birthPlace, setBirthPlace] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!acceptedTerms || !birthPlace) {
      return;
    }

    // Redirection en fonction du choix
    if (birthPlace === "guinee") {
      window.location.href = "/demande-guinee";
    } else {
      window.location.href = "/demande-etranger";
    }
  };

  const isFormValid = acceptedTerms && birthPlace;

  return (
    <Container>
      <HeaderSection>
        <MainTitle>
          Bienvenue sur le site de demande d'extrait de Casier Judiciaire
        </MainTitle>
        <SubTitle className="animate-fade-in">
          Ce service permet de demander en ligne l'extrait de Casier Judiciaire.
          La démarche ne prend que quelques minutes.
        </SubTitle>
      </HeaderSection>

      <ProcedureSection>
        <h2 style={{ color: colors.blueMarine, marginBottom: "1.5rem" }}>
          Procédure à suivre :
        </h2>
        <StepList className="header-wave">
          <StepItem>
            <FaCheckCircle color={colors.greenDark} /> Remplissez le formulaire
            de demande
          </StepItem>
          <StepItem>
            <FaCheckCircle color={colors.greenDark} /> Vérifiez votre demande
          </StepItem>
          <StepItem>
            <FaCheckCircle color={colors.greenDark} /> Présentez-vous à
            l'administration centrale du ministère de la Justice avec votre
            numéro de demande et vos pièces d'identité
          </StepItem>
        </StepList>
      </ProcedureSection>

      <DownloadSection>
        <PrimaryButton as="a" href="#" style={{ textDecoration: "none" }}>
          <FaDownload /> Télécharger l'application mobile
        </PrimaryButton>
      </DownloadSection>

      <DeliverySection>
        <SectionTitle>Vous pouvez recevoir votre document par :</SectionTitle>
        <DeliveryMethods>
          <MethodCard>
            <MethodIcon>
              <FaHome />
            </MethodIcon>
            <MethodTitle>Retrait au tribunal</MethodTitle>
            <p>Retirez votre document au tribunal de votre choix</p>
          </MethodCard>

          <MethodCard>
            <MethodIcon>
              <FaEnvelope />
            </MethodIcon>
            <MethodTitle>Courrier sécurisé</MethodTitle>
            <p>Frais de livraison à régler électroniquement</p>
          </MethodCard>

          <MethodCard>
            <MethodIcon>
              <FaMobileAlt />
            </MethodIcon>
            <MethodTitle>Reception par email</MethodTitle>
            <p>
              Nécessite un téléphone compatible NFC et une carte d'identité
              valide
            </p>
          </MethodCard>
        </DeliveryMethods>
      </DeliverySection>

      <FormSection>
        <SectionTitle>Faire une demande</SectionTitle>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              style={{
                fontWeight: "600",
                marginBottom: "12px",
                color: colors.blueMarine,
              }}
            >
              Lieu de naissance{" "}
              <span style={{ color: colors.errorRed }}>*</span>
            </p>
            <RadioGroup>
              <RadioLabel
                className="animate-check"
                selected={birthPlace === "guinee"}
              >
                <RadioInput
                  type="radio"
                  name="birthPlace"
                  value="guinee"
                  checked={birthPlace === "guinee"}
                  onChange={() => setBirthPlace("guinee")}
                />
                Guinée
              </RadioLabel>
              <RadioLabel
                className="animate-check"
                selected={birthPlace === "etranger"}
              >
                <RadioInput
                  type="radio"
                  name="birthPlace"
                  value="etranger"
                  checked={birthPlace === "etranger"}
                  onChange={() => setBirthPlace("etranger")}
                />
                Étranger
              </RadioLabel>
            </RadioGroup>
            {submitAttempted && !birthPlace && (
              <ErrorMessage
                style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}
              >
                <FaExclamationTriangle /> Veuillez sélectionner votre lieu de
                naissance
              </ErrorMessage>
            )}
          </div>

          <TermsCheckbox
            accepted={acceptedTerms}
            onChange={(e) => {
              setAcceptedTerms(e.target.checked);
              if (submitAttempted) setSubmitAttempted(false);
            }}
            error={submitAttempted && !acceptedTerms}
          />

          <PrimaryButton
            className="animate-pulse important-button"
            type="submit"
            disabled={!isFormValid}
          >
            <FaFileAlt /> Commencer la démarche <FaArrowRight />
          </PrimaryButton>
        </form>
      </FormSection>

      <FormSection>
        <SectionTitle>Suivre ma demande</SectionTitle>
        <p style={{ marginBottom: "1.5rem" }}>
          Si vous souhaitez suivre l'état d'avancement d'une précédente demande
          :
        </p>
        <SecondaryButton as="a" href="#">
          <FaQuestionCircle /> Accéder au suivi
        </SecondaryButton>
      </FormSection>

      <GuideSection>
        <GuideLink href="#">
          <FaFileAlt /> Guide utilisateur (PDF)
        </GuideLink>
        <GuideLink href="/videoexplic">
          <FaMobileAlt /> Vidéo tutorielle
        </GuideLink>
      </GuideSection>
    </Container>
  );
};

export default Visiteur;
