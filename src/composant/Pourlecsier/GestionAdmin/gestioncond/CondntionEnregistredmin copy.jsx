import React, { useState } from "react";
import styled from "styled-components";
import {
  Calendar,
  Gavel,
  ScrollText,
  Clock,
  AlertCircle,
  Save,
  BookOpenCheck,
  Key,
} from "lucide-react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

// Palette de couleurs améliorée
const colors = {
  primary: "#002B5B",
  secondary: "#1A4D2E",
  accent: "#F2C94C",
  white: "#FFFFFF",
  darkBlue: "#003566",
  lightBg: "#F2E9DC",
  error: "#C53030",
  success: "#2E7D32",
};

// Styles modernisés
const PageContainer = styled.div`
  min-height: 100vh;
 
`;

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0.5rem;
  box-shadow: 6px 1px  ${colors.secondary};
  border-radius: 8px;

  position: relative;
  overflow: hidden;

 

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const FormTitle = styled.h1`
  color: ${colors.secondary};
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FormDescription = styled.p`
  color: ${colors.darkBlue};
  font-weight: 500;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.secondary};

  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid ${colors.secondary}20;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
     box-shadow: 3px 3px ${colors.secondary};
    background-color: ${colors.white};
  }

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid ${colors.lightBg};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  resize: vertical;

  &:focus {
    outline: none;
     box-shadow: 3px 3px ${colors.secondary};
   }
`;

const SubmitButton = styled.button`
  background: ${colors.secondary};
  color: ${colors.white};
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  width: 100%;
 
  &:hover {
    background: ${colors.accent};
    color: ${colors.secondary};
    font-weight: 800;
    
    transform: translateY(-2px);
   }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: ${colors.success};
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const RequiredIndicator = styled.span`
  color: ${colors.error};
  margin-left: 0.2rem;
`;
// Styles ajoutés pour le select
const Select = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
   border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
   
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
     box-shadow: 3px 3px ${colors.secondary};
     
  }
`;


const TRIBUNALS = [
  "TPI de Conakry",
  "TPI de Kaloum",
  "TPI de Dixinn",
  "TPI de Ratoma",
  "TPI de Matam",
  "TPI de Matoto",
  "TPI de Kindia",
  "TPI de Boké",
  "TPI de Labé",
  "TPI de Mamou",
  "TPI de Kankan",
  "TPI de Faranah",
  "TPI de Nzérékoré",
  "TC de Conakry",
  "TC de Kindia",
  "TC de Kankan",
  "TC de Mamou",
  "TC de Labé",
  "TC de Boké",
  "TC de Nzérékoré",
  "TC de Faranah",
  "TPI de Conakry",
  "Cour Suprême de Guinée",
  "Tribunal Militaire de Conakry",
  "Autre (préciser dans les observations)",
];

function EnregistreCondntion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carteidentite: "",
    courtsTribunaux: "",
    dateCondamnations: "",
    natureDesCrimes: "",
    dateCrimesOuDelits: "",
    dureeDePeine: "",
    dateMiseEnPrison: "",
    observations: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);
  // Validation des entrées
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "carteidentite":
        if (!value.trim()) error = "Ce champ est requis";
        else if (value.length > 50) error = "Maximum 50 caractères";
        else if (/[<>]/.test(value)) error = "Caractères non autorisés";
        break;
      case "courtsTribunaux":
        if (!value.trim()) error = "Ce champ est requis";
        else if (value.length > 50) error = "Maximum 50 caractères";
        else if (/[<>]/.test(value)) error = "Caractères non autorisés";
        break;

      case "natureDesCrimes":
        if (!value.trim()) error = "Ce champ est requis";
        else if (value.length > 50) error = "Maximum 50 caractères";
        break;

      case "dureeDePeine":
        if (!value.trim()) error = "Ce champ est requis";
        else if (!/^[\d\sansmoisjour]+$/i.test(value))
          error = "Format invalide";
        break;

      case "observations":
        if (value.length > 200) error = "Maximum 200 caractères";
        break;

      case "dateCondamnations":
      case "dateCrimesOuDelits":
      case "dateMiseEnPrison":
        if (!value) error = "Date requise";
        else {
          const date = new Date(value);
          const now = new Date();
          if (date > now) error = "Date ne peut pas être dans le futur";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sanitization des entrées
    let sanitizedValue = value;
    if (
      name !== "dateCondamnations" &&   
      name !== "dateCrimesOuDelits" &&  
      name !== "dateMiseEnPrison" 
    ) {
      sanitizedValue = DOMPurify.sanitize(value);
    }

    // Validation en temps réel
    const error = validateField(name, sanitizedValue);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "observations") {
        // observations est optionnel
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    if (!validateForm()) {
      setFormError("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_b}/criminal`,
         {
          ...formData,
          dateCondamnations: new Date(formData.dateCondamnations),
          dateCrimesOuDelits: new Date(formData.dateCrimesOuDelits),
          dateMiseEnPrison: new Date(formData.dateMiseEnPrison),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


    
      if (response.data.success) {
        navigate("/listeCondamnations", {
          state: {
            success: "Dossier enregistré avec succès!",
          },
        });
      }
    } catch (err) {
      console.error("Erreur:", err);

      let errorMsg = "Erreur lors de l'enregistrement";
      if (err.response) {
        if (err.response.status === 400) {
          errorMsg = err.response.data.message || "Données invalides";
        } else if (err.response.status === 401) {
          navigate("/login");
          return;
        } else if (err.response.status === 500) {
          errorMsg = "Erreur serveur";
        }
      } else if (err.request) {
        errorMsg = "Le serveur ne répond pas verifier votre connextion";
      }

      setFormError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageContainer>
        <FormContainer>
          <FormHeader>

            <FormTitle>
              <BookOpenCheck size={32} />
              Enregistrement des Condanations
            </FormTitle>

            <FormDescription>
              Renseignez précisément les informations relatives aux
              condamnations judiciaires. Tous les champs marqués d'un{" "}
              <RequiredIndicator>*</RequiredIndicator> sont obligatoires.
            </FormDescription>

          </FormHeader>

          {formError && (
            <ErrorMessage>
              <AlertCircle size={18} />
              {formError}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <Save size={18} />
              Enregistrement réussi! Redirection en cours...
            </SuccessMessage>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormGrid>


              <div>
                <FormGroup>
                  <Label>
                    <Key size={18} />
                    Identifiant <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="text"
                    name="carteidentite"
                    value={formData.carteidentite}
                    onChange={handleChange}
                    maxLength="50"
                    required
                    placeholder="N° du Carte d'identité ou n° du passeport"
                  />
                  {errors.carteidentite && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.carteidentite}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Gavel size={18} />
                    Cours/Tribunaux <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Select
                    name="courtsTribunaux"
                    value={formData.courtsTribunaux}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez un tribunal</option>
                    {TRIBUNALS.map((tribunal, index) => (
                      <option key={index} value={tribunal}>
                        {tribunal}
                      </option>
                    ))}
                  </Select>
                  {errors.courtsTribunaux && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.courtsTribunaux}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={18} />
                    Date de Condamnation{" "}
                    <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="date"
                    name="dateCondamnations"
                    value={formData.dateCondamnations}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateCondamnations && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.dateCondamnations}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <AlertCircle size={18} />
                    Nature de l'Infraction{" "}
                    <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="text"
                    name="natureDesCrimes"
                    value={formData.natureDesCrimes}
                    onChange={handleChange}
                    maxLength="200"
                    required
                    placeholder="Délit, crime, nature précise..."
                  />
                  {errors.natureDesCrimes && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.natureDesCrimes}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </div>

              {/* Colonne 2 */}
              <div>
                <FormGroup>
                  <Label>
                    <Calendar size={18} />
                    Date de crime ou delits{" "}
                    <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="date"
                    name="dateCrimesOuDelits"
                    value={formData.dateCrimesOuDelits}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateCrimesOuDelits && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.dateCrimesOuDelits}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Clock size={18} />
                    Durée de Peine <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="text"
                    name="dureeDePeine"
                    value={formData.dureeDePeine}
                    onChange={handleChange}
                    required
                    placeholder="Ex: 5 ans et 3 mois"
                    maxLength="50"
                  />
                  {errors.dureeDePeine && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.dureeDePeine}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    <Calendar size={18} />
                    Date de mise en prison{" "}
                    <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="date"
                    name="dateMiseEnPrison"
                    value={formData.dateMiseEnPrison}
                    onChange={handleChange}
                    required
                  />
                  {errors.dateMiseEnPrison && (
                    <ErrorMessage>
                      <AlertCircle size={14} />
                      {errors.dateMiseEnPrison}
                    </ErrorMessage>
                  )}
                </FormGroup>
              </div>
            </FormGrid>

            <FormGroup>
              <Label>
                <ScrollText size={18} />
                Observations complémentaires
              </Label>
              <TextArea
                name="observations"
                value={formData.observations}
                onChange={handleChange}
                maxLength="500"
                placeholder="Détails supplémentaires, circonstances atténuantes, etc."
              />
              {errors.observations && (
                <ErrorMessage>
                  <AlertCircle size={14} />
                  {errors.observations}
                </ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Clock size={18} />
                  Enregistrement en cours...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Enregistrer la Condamnation
                </>
              )}
            </SubmitButton>
          </form>
        </FormContainer>
      </PageContainer>
    </div>
  );
}

export default EnregistreCondntion;
