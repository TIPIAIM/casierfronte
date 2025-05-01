import React, { useState } from "react";
import {
  ClipboardList,
  Check,
  User,
  MapPin,
  FileText,
  ChevronRight,
  AlertCircle,
  SquareCheck,
} from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Palette de couleurs gouvernementale améliorée
const colors = {
  primary: "#1A365D", // Bleu marine plus profond
  primaryLight: "#2A4365", // Variante plus claire du primaire
  secondary: "#D69E2E", // Or plus chaud
  success: "#38A169", // Vert pour succès
  warning: "#DD6B20", // Orange pour avertissements
  error: "#C53030", // Rouge plus foncé pour erreurs
  background: "#F7FAFC", // Fond très clair
  text: "#2D3748", // Texte principal
  textLight: "#4A5568", // Texte secondaire
  border: "#E2E8F0", // Couleur pour bordures
  borderDark: "#CBD5E0", // Bordure plus visible
  highlight: "#FEFCBF", // Couleur de surlignage pour notes importantes
  cardBg: "#FFFFFF", // Fond des cartes

  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
};

// Animation pour les transitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles avec la palette de couleurs améliorée
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${colors.cardBg};
  border-radius: 20px;
  box-shadow: 6px 0px ${colors.greenDark};
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  animation: ${fadeIn} 0.6s ease-out;
  // border: 1px solid ${colors.goldenYellow};

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  // margin-bottom: 0rem;
  border-bottom: 6px solid ${colors.greenDark};
  padding-bottom: 1rem;

  h1 {
    color: ${colors.primary};
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.textLight};
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
  padding: 1rem;
  background: ${colors.primary}10;
  border-radius: px;
  // border: px solid ${colors.borderDark};

  &::before {
    content: "";
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    height: 6px;
    background: ${colors.border};
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    &::before {
      display: none;
    }
  }
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 31px;
  left: 0;
  height: 5px;
  background: ${colors.greenDark};
  z-index: 2;
  transition: width 0.4s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
    width: 100%;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 50px;
  // border-radius: 0%;
  background: ${({ active }) => (active ? colors.primary : colors.background)};
  color: ${({ active }) => (active ? "white" : colors.textLight)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  transition: all 8.3s ease;
  box-shadow: ${({ active }) =>
    active ? `0 4px 6px ${colors.primary}33` : "none"};
  border: 2px solid ${({ active }) => (active ? colors.primary : colors.border)};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ active }) => (active ? colors.primary : colors.textLight)};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  text-align: center;
  max-width: 100px;

  @media (max-width: 768px) {
    text-align: left;
    max-width: none;
    flex: 1;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 1.5rem;
  background: ${colors.cardBg};
  border-radius: 20px;
  //border: 1px solid ${colors.borderDark};
  box-shadow: -4px -0px ${colors.blueMarine};
`;

const StepTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.border};

  svg {
    margin-right: 0.5rem;
    color: ${colors.greenDark};
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StepDescription = styled.p`
  color: ${colors.textLight};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const DeliveryOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid
    ${({ selected }) => (selected ? colors.primary : colors.borderDark)};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ selected }) => (selected ? `${colors.primary}0D` : "white")};

  &:hover {
    border-color: ${colors.primaryLight};
    box-shadow: 0 2px 4px ${colors.primary}1A;
  }

  input {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
    accent-color: ${colors.greenDark};
  }

  svg {
    margin-right: 1rem;
    color: ${colors.greenDark};
  }

  div {
    flex: 1;
  }

  h3 {
    font-weight: 600;
    color: ${colors.primary};
    margin-bottom: 0.25rem;
  }

  p {
    color: ${colors.textLight};
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-top: 0.5rem;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
  color: ${colors.text};
  font-size: 0.95rem;
`;

const RequiredField = styled.span`
  color: ${colors.error};
  margin-left: 0.25rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  //border: 2px solid ${colors.borderDark};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s;
  background: ${colors.cardBg};
  box-shadow: -0px 2px ${colors.greenDark};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}1A;
  }

  &::placeholder {
    color: ${colors.textLight};
    opacity: 0.7;
  }

  &[aria-invalid="true"] {
    border-color: ${colors.error};
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  // border: 2px solid ${colors.borderDark};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  box-shadow: -0px 2px ${colors.greenDark};
  background-color: ${colors.cardBg};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}1A;
  }

  &[aria-invalid="true"] {
    border-color: ${colors.error};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.primary {
    background: ${colors.greenDark};
    color: white;

    &:hover:not(:disabled) {
      background: ${colors.primaryLight};
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colors.primary}33;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &.secondary {
    background: ${colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background: ${colors.greenDark};
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 650;
  color: ${colors.primary};
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.border};
  grid-column: 1 / -1;
`;

const InfoBox = styled.div`
  background: ${colors.highlight};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  grid-column: 1 / -1;
  border: 1px solid ${colors.warning};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  svg {
    color: ${colors.warning};
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  p {
    color: ${colors.text};
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  animation: ${fadeIn} 0.5s ease;
  background: ${colors.cardBg};
  border-radius: 8px;
  border: 1px solid ${colors.borderDark};
  margin: 1rem 0;

  svg {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    padding: 1rem;
    border-radius: 50%;
    background: ${colors.success}1A;
    color: ${colors.success};
    border: 2px solid ${colors.success};
  }

  h2 {
    color: ${colors.primary};
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.textLight};
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${colors.border};

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ImportantNote = styled.div`
  background: ${colors.highlight};
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  border: 1px solid ${colors.warning};
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  svg {
    color: ${colors.warning};
    flex-shrink: 0;
  }

  p {
    color: ${colors.text};
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
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
      firstName1: "",
      firstName2: "",
      situationFamiliale: "",
      profession: "",
      birthDate: "",
      birthPlace: "",
      pays: "",
      nationalite: "",
      payss: "",
      villecommune: "",
      passport: "",
      address: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
    },
    contactInfo: {
      piece1: "",
      piece2: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1 && !formData.deliveryMethod) {
      newErrors.deliveryMethod = "Veuillez sélectionner un mode de livraison";
    }

    if (currentStep === 2) {
      if (!formData.personalInfo.firstName)
        newErrors.firstName = "Ce champ est requis";
      if (!formData.personalInfo.lastName)
        newErrors.lastName = "Ce champ est requis";
      if (!formData.personalInfo.birthDate)
        newErrors.birthDate = "Ce champ est requis";
      if (!formData.personalInfo.birthPlace)
        newErrors.birthPlace = "Ce champ est requis";
      if (!formData.personalInfo.nationalite)
        newErrors.nationalite = "Ce champ est requis";
      if (!formData.personalInfo.firstName1)
        newErrors.firstName1 = "Ce champ est requis";
      if (!formData.personalInfo.situationFamiliale)
        newErrors.situationFamiliale = "Ce champ est requis";
      if (!formData.personalInfo.profession)
        newErrors.profession = "Ce champ est requis";
      if (!formData.personalInfo.pays) newErrors.pays = "Ce champ est requis";
      if (!formData.personalInfo.payss) newErrors.payss = "Ce champ est requis";
      if (!formData.personalInfo.passport)
        newErrors.passport = "Ce champ est requis";

      if (!formData.personalInfo.address)
        newErrors.address = "Ce champ est requis";

      if (!formData.personalInfo.city) newErrors.city = "Ce champ est requis";
      if (!formData.personalInfo.email) {
        newErrors.email = "Ce champ est requis";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)
      ) {
        newErrors.email = "Veuillez entrer un email valide";
      }
    }

    if (currentStep === 3) {
      if (!formData.contactInfo.piece1) {
        newErrors.piece1 = "L'extrait de naissance est requis";
      } else if (
        !["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
          formData.contactInfo.piece1.type
        )
      ) {
        newErrors.piece1 =
          "Format de fichier non supporté (PDF, JPG, JPEG, PNG uniquement)";
      } else if (formData.contactInfo.piece1.size > 5 * 1024 * 1024) {
        newErrors.piece1 = "Le fichier ne doit pas dépasser 5MB";
      }

      if (!formData.contactInfo.piece2) {
        newErrors.piece2 = "Le passeport ou carte d'identité est requis";
      } else if (
        !["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(
          formData.contactInfo.piece2.type
        )
      ) {
        newErrors.piece2 =
          "Format de fichier non supporté (PDF, JPG, JPEG, PNG uniquement)";
      } else if (formData.contactInfo.piece2.size > 5 * 1024 * 1024) {
        newErrors.piece2 = "Le fichier ne doit pas dépasser 5MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    // Créez un objet FormData
    const formDataToSend = new FormData();

    // Ajoutez les champs texte
    formDataToSend.append("deliveryMethod", formData.deliveryMethod);
    formDataToSend.append(
      "personalInfo",
      JSON.stringify(formData.personalInfo)
    );

    // Ajoutez les fichiers
    if (formData.contactInfo.piece1) {
      formDataToSend.append("piece1", formData.contactInfo.piece1);
    }
    if (formData.contactInfo.piece2) {
      formDataToSend.append("piece2", formData.contactInfo.piece2);
    }

    try {
      const response = await fetch("http://localhost:2027/api/demande", {
        method: "POST",
        // NE PAS METTRE 'Content-Type' : il sera défini automatiquement avec le boundary
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Erreur serveur");
      //
      const result = await response.json();
      // Envoi de l'email avec la référence
      const emailResponse = await fetch(
        "http://localhost:2027/apii/send-reference-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.personalInfo.email,
            reference: result.reference,
            clientName: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
          }),
        }
      ); //

      if (!emailResponse.ok)
        throw new Error("Erreur lors de l'envoi de l'email");
      setStep(4);
    } catch (error) {
      alert("Erreur lors de l'envoi : " + error.message);
    } finally {
      setIsSubmitting(false);
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

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  const handleFileChange = (e, section, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: file,
      },
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const stepLabels = [
    "Mode de livraison",
    "Informations personnelles",
    "Coordonnées",
    "Confirmation",
  ];
  const stepIcons = [
    <ClipboardList size={20} />,
    <User size={20} />,
    <MapPin size={20} />,
    <FileText size={20} />,
  ];
  const progressWidth = `${((step - 1) / (stepLabels.length - 1)) * 100}%`;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer>
            <StepTitle>
              <ClipboardList size={24} /> Mode de livraison
            </StepTitle>
            <StepDescription>
              Veuillez choisir comment vous souhaitez recevoir votre extrait de
              casier judiciaire. Les options disponibles sont conformes aux
              dispositions légales en vigueur.
            </StepDescription>

            <ImportantNote>
              <AlertCircle size={18} />
              <p>
                Le choix du mode de livraison impacte le délai de traitement de
                votre demande.
              </p>
            </ImportantNote>

            {errors.deliveryMethod && (
              <ErrorMessage>
                <AlertCircle size={14} /> {errors.deliveryMethod}
              </ErrorMessage>
            )}

            <DeliveryOption
              selected={formData.deliveryMethod === "court"}
              onClick={() =>
                setFormData({ ...formData, deliveryMethod: "court" })
              }
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="court"
                checked={formData.deliveryMethod === "court"}
                onChange={() => {}}
              />
              <div>
                <h3>Retrait au tribunal</h3>
                <p>
                  Retirez votre document directement au greffe du tribunal
                  compétent avec une pièce d'identité
                </p>
                <p>
                  <strong>Délai estimé : 24 à 48 heures</strong>
                </p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>

            <DeliveryOption
              selected={formData.deliveryMethod === "mail"}
              onClick={() =>
                setFormData({ ...formData, deliveryMethod: "mail" })
              }
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="mail"
                checked={formData.deliveryMethod === "mail"}
                onChange={() => {}}
              />
              <div>
                <h3>Envoi postal</h3>
                <p>
                  Reception par courrier à l'adresse indiquée (délai de
                  traitement supplémentaire)
                </p>
                <p>
                  <strong>Délai estimé : 3 à 5 jours ouvrés</strong>
                </p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>

            <DeliveryOption
              selected={formData.deliveryMethod === "email"}
              onClick={() =>
                setFormData({ ...formData, deliveryMethod: "email" })
              }
            >
              <input
                type="radio"
                name="deliveryMethod"
                value="email"
                checked={formData.deliveryMethod === "email"}
                onChange={() => {}}
              />
              <div>
                <h3>Envoi électronique sécurisé</h3>
                <p>
                  Reception par email avec un lien sécurisé pour télécharger
                  votre document
                </p>
                <p>
                  <strong>Délai estimé : 24 à 48 heures</strong>
                </p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer>
            <StepTitle>
              <User size={24} /> Informations personnelles
            </StepTitle>
            <StepDescription>
              Veuillez renseigner vos informations personnelles exactement comme
              elles apparaissent sur vos pièces d'identité officielles.
            </StepDescription>

            <ImportantNote>
              <AlertCircle size={18} />
              <p>
                Il est impératif de remplir le formulaire avec les mêmes
                informations que votre pièce d'identité. Toute divergence peut
                entraîner le rejet de votre demande.
              </p>
            </ImportantNote>

            <GridContainer>
              <SectionTitle>Identité</SectionTitle>

              <FormGroup>
                <FormLabel>
                  Prénom <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Jean"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.firstName}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Nom <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Dupont"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.lastName}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Prénom du père <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="firstName1"
                  value={formData.personalInfo.firstName1}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Pierre"
                  aria-invalid={!!errors.firstName1}
                />
                {errors.firstName1 && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.firstName1}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>Prénom et nom de la mère</FormLabel>
                <FormInput
                  name="firstName2"
                  value={formData.personalInfo.firstName2}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Marie Dupont"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Situation familiale <RequiredField>*</RequiredField>
                </FormLabel>
                <FormSelect
                  name="situationFamiliale"
                  value={formData.personalInfo.situationFamiliale}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.situationFamiliale}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="célibataire">Célibataire</option>
                  <option value="marié(e)">Marié(e)</option>
                  <option value="divorcé(e)">Divorcé(e)</option>
                  <option value="veuf(ve)">Veuf(ve)</option>
                </FormSelect>
                {errors.situationFamiliale && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.situationFamiliale}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Profession <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="profession"
                  value={formData.personalInfo.profession}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Ingénieur"
                  aria-invalid={!!errors.profession}
                />
                {errors.profession && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.profession}
                  </ErrorMessage>
                )}
              </FormGroup>

              <SectionTitle>Lieu de naissance</SectionTitle>

              <FormGroup>
                <FormLabel>
                  Pays <RequiredField>*</RequiredField>
                </FormLabel>
                <FormSelect
                  name="pays"
                  value={formData.personalInfo.pays}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.pays}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="Guinée">Guinée</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Sénégal">Sénégal</option>
                </FormSelect>
                {errors.pays && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.pays}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Ville <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="birthPlace"
                  value={formData.personalInfo.birthPlace}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Paris"
                  aria-invalid={!!errors.birthPlace}
                />
                {errors.birthPlace && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.birthPlace}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Date de naissance <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  type="date"
                  name="birthDate"
                  value={formData.personalInfo.birthDate}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.birthDate}
                />
                {errors.birthDate && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.birthDate}
                  </ErrorMessage>
                )}
              </FormGroup>

              <SectionTitle>Nationalité et pièce d'identité</SectionTitle>

              <FormGroup>
                <FormLabel>
                  Nationalité <RequiredField>*</RequiredField>
                </FormLabel>
                <FormSelect
                  name="nationalite"
                  value={formData.personalInfo.nationalite}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.nationalite}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="Guinéenne">Guinéenne</option>
                  <option value="Marocaine">Marocaine</option>
                  <option value="Française">Française</option>
                  <option value="Espagnole">Espagnole</option>
                  <option value="Belge">Belge</option>
                  <option value="Sénégalaise">Sénégalaise</option>
                </FormSelect>
                {errors.nationalite && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.nationalite}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  N° de passeport ou carte d'identité{" "}
                  <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="passport"
                  value={formData.personalInfo.passport}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="1234567890"
                  aria-invalid={!!errors.passport}
                />
                {errors.passport && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.passport}
                  </ErrorMessage>
                )}
              </FormGroup>

              <SectionTitle>Adresse de résidence</SectionTitle>

              <FormGroup>
                <FormLabel>
                  Pays de résidence <RequiredField>*</RequiredField>
                </FormLabel>
                <FormSelect
                  name="payss"
                  value={formData.personalInfo.payss}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.payss}
                >
                  <option value="">Sélectionnez...</option>
                  <option value="Guinée">Guinée</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Sénégal">Sénégal</option>
                </FormSelect>
                {errors.payss && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.payss}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Domicile <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="villecommune"
                  value={formData.personalInfo.villecommune}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="Sisissez ce qui est sur le certificat de residence"
                  aria-invalid={!!errors.villecommune}
                />
                {errors.villecommune && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.villecommune}
                  </ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Adresse complète <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  name="address"
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  placeholder="123 Rue de la République"
                  aria-invalid={!!errors.address}
                />
                {errors.address && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.address}
                  </ErrorMessage>
                )}
              </FormGroup>

              <GridContainer>
                <FormGroup>
                  <FormLabel>
                    Code postal <RequiredField></RequiredField>
                  </FormLabel>
                  <FormInput
                    name="postalCode"
                    value={formData.personalInfo.postalCode}
                    onChange={(e) => handleInputChange(e, "personalInfo")}
                    placeholder="75001"
                    // aria-invalid={!!errors.postalCode}
                  />
                  {/* {errors.postalCode && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.postalCode}
                  </ErrorMessage>
                )}*/}
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Ville <RequiredField>*</RequiredField>
                  </FormLabel>
                  <FormInput
                    name="city"
                    value={formData.personalInfo.city}
                    onChange={(e) => handleInputChange(e, "personalInfo")}
                    placeholder="Paris"
                    aria-invalid={!!errors.city}
                  />
                  {errors.city && (
                    <ErrorMessage>
                      <AlertCircle size={14} /> {errors.city}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </GridContainer>

              <GridContainer>
                <FormGroup>
                  <FormLabel>
                    Email <RequiredField>*</RequiredField>
                  </FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange(e, "personalInfo")}
                    placeholder="jean.dupont@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <ErrorMessage>
                      <AlertCircle size={14} /> {errors.email}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Téléphone <RequiredField>*</RequiredField>
                  </FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange(e, "personalInfo")}
                    placeholder="0612345678"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <ErrorMessage>
                      <AlertCircle size={14} /> {errors.phone}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </GridContainer>
            </GridContainer>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer>
            <StepTitle>
              <MapPin size={24} /> Pièce justificàtifs
            </StepTitle>
            <ImportantNote>
              <AlertCircle size={18} />
              <p>
                Attention – Déclaration importante En soumettant cette demande
                de casier judiciaire, vous confirmez que vous en avez réellement
                besoin pour des raisons valables et justifiées (emploi,
                démarches administratives, etc.).
              </p>
            </ImportantNote>
            <ImportantNote>
              <SquareCheck size={18} />
              <p>
                Si vous remplissez ce formulaire sans nécessité réelle, ou dans
                le cadre d’une manipulation inutile ou abusive, vous vous
                exposez à des poursuites judiciaires conformément à la loi en
                vigueur, et vous risquez une amende. Donc, arrêtez tout si vous
                n’en avez pas besoin. Cliquez sur "Retourner" ou "Annuler".
                Merci de faire preuve de responsabilité et de sincérité.
              </p>
            </ImportantNote>      
            
            <ImportantNote>
              <AlertCircle size={18} />
              <p>
                Veuillez vérifier attentivement vos coordonnées, car elles
                seront utilisées pour vous contacter et vous envoyer votre email
                de Confirmation de demande de casier judiciaire.
              </p>
            </ImportantNote>

            <GridContainer>
              <FormGroup>
                <FormLabel>
                  Extrait de naissance <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  type="file"
                  name="piece1"
                  onChange={(e) => handleFileChange(e, "contactInfo", "piece1")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  aria-invalid={!!errors.piece1}
                />
                {errors.piece1 && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.piece1}
                  </ErrorMessage>
                )}
                {formData.contactInfo.piece1 && (
                  <p style={{ fontSize: "0.8rem", color: colors.success }}>
                    Fichier sélectionné: {formData.contactInfo.piece1.name}
                  </p>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>
                  Passeport ou carte identité <RequiredField>*</RequiredField>
                </FormLabel>
                <FormInput
                  type="file"
                  name="piece2"
                  onChange={(e) => handleFileChange(e, "contactInfo", "piece2")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  aria-invalid={!!errors.piece2}
                />
                {errors.piece2 && (
                  <ErrorMessage>
                    <AlertCircle size={14} /> {errors.piece2}
                  </ErrorMessage>
                )}
                {formData.contactInfo.piece2 && (
                  <p style={{ fontSize: "0.8rem", color: colors.success }}>
                    Fichier sélectionné: {formData.contactInfo.piece2.name}
                  </p>
                )}
              </FormGroup>
            </GridContainer>
          </StepContainer>
        );
      case 4:
        return (
          <SuccessContainer>
            <Check size={48} />
            <h2>Demande enregistrée avec succès</h2>
            <p>
              Votre demande d'extrait de casier judiciaire a bien été prise en
              compte. Vous recevrez un numéro de dossier par email dans les
              prochaines minutes. Conservez ce numéro pour suivre l'avancement
              de votre demande.
            </p>
            <p>
              <strong>Temps de traitement estimé :</strong>{" "}
              {formData.deliveryMethod === "court"
                ? "24 à 72 heures"
                : formData.deliveryMethod === "mail"
                ? "3 à 5 jours ouvrés"
                : "24 à 78 heures"}
            </p>
            <Button className="secondary" onClick={() => navigate("/voir-mes-demandes")}>
              Retour à l'accueil
            </Button>
          </SuccessContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <h1>Demande d'extrait de casier judiciaire</h1>
        <p>Service en ligne sécurisé du Ministère de la Justice</p>
      </Header>

      {step < 4 && (
        <ProgressWrapper>
          <ProgressLine style={{ width: progressWidth }} />
          {stepLabels.map((label, index) => (
            <ProgressStep key={index}>
              <StepNumber active={step > index || step === index + 1}>
                {index + 1}
              </StepNumber>
              <StepLabel active={step > index || step === index + 1}>
                {label}
              </StepLabel>
            </ProgressStep>
          ))}
        </ProgressWrapper>
      )}

      {renderStep()}

      {step < 4 && (
        <ButtonContainer>
          {step > 1 ? (
            <Button
              className="secondary"
              onClick={handlePrevStep}
              disabled={isSubmitting}
            >
              Retour
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              className="primary"
              onClick={handleNextStep}
              disabled={
                isSubmitting || (step === 1 && !formData.deliveryMethod)
              }
            >
              Suivant{" "}
              <ChevronRight size={18} style={{ marginLeft: "0.5rem" }} />
            </Button>
          ) : (
            <Button
              className="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre la demande"}
            </Button>
          )}
        </ButtonContainer>
      )}
    </Container>
  );
}

export default Commencerdem;
