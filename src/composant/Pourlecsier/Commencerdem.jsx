import React, { useState } from "react";
import { ClipboardList, Check, User, MapPin, FileText, ChevronRight } from "lucide-react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Palette de couleurs gouvernementale
const colors = {
  primary: "#002B5B", // Bleu marine gouvernemental
  secondary: "#F2C94C", // Jaune/or pour accents
  success: "#38A169", // Vert pour succès
  warning: "#DD6B20", // Orange pour avertissements
  error: "#E53E3E", // Rouge pour erreurs
  background: "#F7FAFC", // Fond très clair
  text: "#2D3748", // Texte principal
  textLight: "#4A5568", // Texte secondaire
};

// Animation pour les transitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles avec la palette de couleurs
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px ${colors.primary}20;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colors.primary};
  padding-bottom: 1rem;

  h1 {
    color: ${colors.primary};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.textLight};
    font-size: 1.1rem;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.background};
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
  top: 30px;
  left: 0;
  height: 4px;
  background: ${colors.primary};
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
  height: 60px;
  border-radius: 50%;
  background: ${({ active }) => active ? colors.primary : colors.background};
  color: ${({ active }) => active ? "white" : colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: ${({ active }) => active ? `0 4px 6px ${colors.primary}33` : "none"};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ active }) => active ? colors.primary : colors.textLight};
  font-weight: ${({ active }) => active ? "600" : "400"};
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
`;

const StepTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StepDescription = styled.p`
  color: ${colors.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const DeliveryOption = styled.label`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 2px solid ${({ selected }) => selected ? colors.primary : colors.background};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ selected }) => selected ? `${colors.primary}0D` : "white"};

  &:hover {
    border-color: ${colors.primary};
    box-shadow: 0 2px 4px ${colors.primary}1A;
  }

  input {
    margin-right: 1rem;
    width: 20px;
    height: 20px;
    accent-color: ${colors.primary};
  }

  svg {
    margin-right: 1rem;
    color: ${colors.primary};
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
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
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
  border: 2px solid ${colors.background};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

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
  border: 2px solid ${colors.background};
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &.primary {
    background: ${colors.primary};
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: ${colors.primary}DD;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px ${colors.primary}33;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &.secondary {
    background: white;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};

    &:hover:not(:disabled) {
      background: ${colors.primary}0D;
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
  color: ${colors.primary};
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.background};
  grid-column: 1 / -1;
`;

const InfoBox = styled.div`
  background: ${colors.background};
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  grid-column: 1 / -1;

  p {
    color: ${colors.textLight};
    margin: 0;
    font-size: 0.9rem;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  animation: ${fadeIn} 0.5s ease;

  svg {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    padding: 1rem;
    border-radius: 50%;
    background: ${colors.success}1A;
    color: ${colors.success};
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
  border-top: 1px solid ${colors.background};

  @media (max-width: 480px) {
    flex-direction: column;
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
    },
    contactInfo: {
      address: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
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
      if (!formData.personalInfo.firstName) newErrors.firstName = "Ce champ est requis";
      if (!formData.personalInfo.lastName) newErrors.lastName = "Ce champ est requis";
      if (!formData.personalInfo.birthDate) newErrors.birthDate = "Ce champ est requis";
      if (!formData.personalInfo.birthPlace) newErrors.birthPlace = "Ce champ est requis";
      if (!formData.personalInfo.nationalite) newErrors.nationalite = "Ce champ est requis";
      if (!formData.personalInfo.firstName1) newErrors.firstName1 = "Ce champ est requis";
      if (!formData.personalInfo.situationFamiliale) newErrors.situationFamiliale = "Ce champ est requis";
      if (!formData.personalInfo.profession) newErrors.profession = "Ce champ est requis";
      if (!formData.personalInfo.pays) newErrors.pays = "Ce champ est requis";
      if (!formData.personalInfo.payss) newErrors.payss = "Ce champ est requis";
      if (!formData.personalInfo.passport) newErrors.passport = "Ce champ est requis";
    }

    if (currentStep === 3) {
      if (!formData.contactInfo.address) newErrors.address = "Ce champ est requis";
      if (!formData.contactInfo.postalCode) newErrors.postalCode = "Ce champ est requis";
      if (!formData.contactInfo.city) newErrors.city = "Ce champ est requis";
      if (!formData.contactInfo.email) {
        newErrors.email = "Ce champ est requis";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
        newErrors.email = "Veuillez entrer un email valide";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:2027/api/demande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur serveur");
      setStep(4);
      setTimeout(() => navigate("/Adminfils"), 50000);
    } catch (error) {
      alert("Une erreur est survenue lors de la soumission de votre demande. Veuillez réessayer.");
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
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNestedInputChange = (e, section, subSection) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [name]: value
        }
      }
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const stepLabels = ["Mode de livraison", "Informations personnelles", "Coordonnées", "Confirmation"];
  const stepIcons = [<ClipboardList size={20} />, <User size={20} />, <MapPin size={20} />, <FileText size={20} />];
  const progressWidth = `${((step - 1) / (stepLabels.length - 1)) * 100}%`;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer>
            <StepTitle><ClipboardList size={24} /> Mode de livraison</StepTitle>
            <StepDescription>
              Veuillez choisir comment vous souhaitez recevoir votre extrait de casier judiciaire. 
              Les options disponibles sont conformes aux dispositions légales en vigueur.
            </StepDescription>
            
            {errors.deliveryMethod && <ErrorMessage>{errors.deliveryMethod}</ErrorMessage>}
            
            <DeliveryOption 
              selected={formData.deliveryMethod === "court"}
              onClick={() => setFormData({ ...formData, deliveryMethod: "court" })}
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
                <p>Retirez votre document directement au greffe du tribunal compétent avec une pièce d'identité</p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>
            
            <DeliveryOption 
              selected={formData.deliveryMethod === "mail"}
              onClick={() => setFormData({ ...formData, deliveryMethod: "mail" })}
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
                <p>Reception par courrier à l'adresse indiquée (délai de traitement supplémentaire)</p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>
            
            <DeliveryOption 
              selected={formData.deliveryMethod === "email"}
              onClick={() => setFormData({ ...formData, deliveryMethod: "email" })}
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
                <p>Reception par email avec un lien sécurisé pour télécharger votre document</p>
              </div>
              <ChevronRight color={colors.primary} />
            </DeliveryOption>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer>
            <StepTitle><User size={24} /> Informations personnelles</StepTitle>
            <StepDescription>
              Veuillez renseigner vos informations personnelles exactement comme elles apparaissent 
              sur vos pièces d'identité officielles.
            </StepDescription>

            <InfoBox>
              <p>Il faut remplir le formulaire avec les mêmes informations que votre pièce d'identité</p>
            </InfoBox>

            <GridContainer>
              <SectionTitle>Identité</SectionTitle>
              
              <FormGroup>
                <FormLabel>Prénom <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="firstName" 
                  value={formData.personalInfo.firstName} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Jean"
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Nom <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="lastName" 
                  value={formData.personalInfo.lastName} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Dupont"
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Prénom du père <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="firstName1" 
                  value={formData.personalInfo.firstName1} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Pierre"
                  aria-invalid={!!errors.firstName1}
                />
                {errors.firstName1 && <ErrorMessage>{errors.firstName1}</ErrorMessage>}
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
                <FormLabel>Situation familiale <RequiredField>*</RequiredField></FormLabel>
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
                {errors.situationFamiliale && <ErrorMessage>{errors.situationFamiliale}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Profession <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="profession" 
                  value={formData.personalInfo.profession} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Ingénieur"
                  aria-invalid={!!errors.profession}
                />
                {errors.profession && <ErrorMessage>{errors.profession}</ErrorMessage>}
              </FormGroup>
              
              <SectionTitle>Lieu de naissance</SectionTitle>
              
              <FormGroup>
                <FormLabel>Pays <RequiredField>*</RequiredField></FormLabel>
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
                {errors.pays && <ErrorMessage>{errors.pays}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Ville <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="birthPlace" 
                  value={formData.personalInfo.birthPlace} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Paris"
                  aria-invalid={!!errors.birthPlace}
                />
                {errors.birthPlace && <ErrorMessage>{errors.birthPlace}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Date de naissance <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  type="date" 
                  name="birthDate" 
                  value={formData.personalInfo.birthDate} 
                  onChange={(e) => handleInputChange(e, "personalInfo")}
                  aria-invalid={!!errors.birthDate}
                />
                {errors.birthDate && <ErrorMessage>{errors.birthDate}</ErrorMessage>}
              </FormGroup>
              
              <SectionTitle>Nationalité et pièce d'identité</SectionTitle>
              
              <FormGroup>
                <FormLabel>Nationalité <RequiredField>*</RequiredField></FormLabel>
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
                {errors.nationalite && <ErrorMessage>{errors.nationalite}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>N° de passeport ou carte d'identité <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="passport" 
                  value={formData.personalInfo.passport} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="1234567890"
                  aria-invalid={!!errors.passport}
                />
                {errors.passport && <ErrorMessage>{errors.passport}</ErrorMessage>}
              </FormGroup>
              
              <SectionTitle>Adresse de résidence</SectionTitle>
              
              <FormGroup>
                <FormLabel>Pays de résidence <RequiredField>*</RequiredField></FormLabel>
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
                {errors.payss && <ErrorMessage>{errors.payss}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Ville ou commune <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="villecommune" 
                  value={formData.personalInfo.villecommune} 
                  onChange={(e) => handleInputChange(e, "personalInfo")} 
                  placeholder="Paris"
                  aria-invalid={!!errors.villecommune}
                />
                {errors.villecommune && <ErrorMessage>{errors.villecommune}</ErrorMessage>}
              </FormGroup>
            </GridContainer>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer>
            <StepTitle><MapPin size={24} /> Coordonnées</StepTitle>
            <StepDescription>
              Veuillez fournir vos coordonnées complètes pour la réception de votre document. 
              Ces informations seront traitées conformément à la réglementation sur la protection des données.
            </StepDescription>
            
            <FormGroup>
              <FormLabel>Adresse complète <RequiredField>*</RequiredField></FormLabel>
              <FormInput 
                name="address" 
                value={formData.contactInfo.address} 
                onChange={(e) => handleInputChange(e, "contactInfo")} 
                placeholder="123 Rue de la République"
                aria-invalid={!!errors.address}
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>
            
            <GridContainer>
              <FormGroup>
                <FormLabel>Code postal <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="postalCode" 
                  value={formData.contactInfo.postalCode} 
                  onChange={(e) => handleInputChange(e, "contactInfo")} 
                  placeholder="75001"
                  aria-invalid={!!errors.postalCode}
                />
                {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Ville <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  name="city" 
                  value={formData.contactInfo.city} 
                  onChange={(e) => handleInputChange(e, "contactInfo")} 
                  placeholder="Paris"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
              </FormGroup>
            </GridContainer>
            
            <GridContainer>
              <FormGroup>
                <FormLabel>Email <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formData.contactInfo.email} 
                  onChange={(e) => handleInputChange(e, "contactInfo")} 
                  placeholder="jean.dupont@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Téléphone <RequiredField>*</RequiredField></FormLabel>
                <FormInput 
                  type="tel" 
                  name="phone" 
                  value={formData.contactInfo.phone} 
                  onChange={(e) => handleInputChange(e, "contactInfo")} 
                  placeholder="0612345678"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
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
              Votre demande d'extrait de casier judiciaire a bien été prise en compte. 
              Vous recevrez un numéro de dossier par email dans les prochaines minutes. 
              Conservez ce numéro pour suivre l'avancement de votre demande.
            </p>
            <p>
              Temps de traitement estimé : {formData.deliveryMethod === "court" ? 
              "24 à 48 heures" : formData.deliveryMethod === "mail" ? 
              "3 à 5 jours ouvrés" : "24 à 48 heures"}
            </p>
            <Button className="secondary" onClick={() => navigate("/")}>
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
              <StepLabel active={step > index || step === index + 1}>{label}</StepLabel>
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
              disabled={isSubmitting || (step === 1 && !formData.deliveryMethod)}
            >
              Suivant <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
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