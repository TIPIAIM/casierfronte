import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Briefcase,
  Globe,
  Home,
  Mail,
  Phone,
  Save,
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  FileText,
  ClipboardCheck
} from "lucide-react";
import path from "path-browserify";
import { ImPencil2 } from "react-icons/im";
import Interfcehedmisejour from "../../../interface/Interfcehedmisejour";

// Palette de couleurs professionnelle
const colors = {
  primary: "#1A4D2E", // Vert foncé institutionnel
  secondary: "#002B5B", // Bleu marine
  accent: "#F2C94C", // Or pour les accents
  light: "#FAF3E3", // Beige clair
  dark: "#1E1E1E", // Noir pour textes
  white: "#FFFFFF",
  gray100: "#F8F9FA",
  gray200: "#E9ECEF",
  gray500: "#6C757D"
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles globaux
const GlobalStyles = styled.div`
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: ${colors.dark};
  background-color: ${colors.gray100};
  min-height: 100vh;
`;

// En-tête professionnel
const ProfessionalHeader = styled.div`
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  color: ${colors.white};
  padding: 2rem;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${colors.accent};
  }
`;

// Conteneur principal
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Sections
const Section = styled.section`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${colors.accent};
  }
`;

const SectionContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${fadeIn} 0.3s ease-out;
`;

// Grille d'informations
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: ${colors.gray100};
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
`;

const InfoIcon = styled.div`
  background: ${colors.primary};
  color: ${colors.white};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: ${colors.gray500};
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

const InfoValue = styled.div`
  font-weight: 500;
  color: ${colors.dark};
  word-break: break-word;
`;

// Boutons
const PrimaryButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.secondary};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: ${colors.white};
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  
  &:hover {
    background: ${colors.gray100};
    color: ${colors.secondary};
  }
`;

// Champs de formulaire
const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

// Composant principal
function DemandeMisejourdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [originalDemande, setOriginalDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [openSections, setOpenSections] = useState({
    status: true,
    personalInfo: true,
    delivery: true,
    documents: true,
    dates: true,
    comments: true
  });

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_b}/api/demandedmin/by-id/${id}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Échec du chargement");
        }

        const data = await response.json();

        if (data.success) {
          setDemande(data.data);
          setOriginalDemande(data.data);
          setFormData({
            ...data.data.personalInfo,
            deliveryMethod: data.data.deliveryMethod,
            status: data.data.status,
          });
        } else {
          throw new Error(data.message || "Demande non trouvée");
        }
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_b}/api/demandedmin/${id}`,
        {
          method: "PUT",
          
            credentials: "include",
          
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalInfo: formData,
            deliveryMethod: formData.deliveryMethod,
            status: formData.status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la mise à jour");
      }

      const updatedData = await response.json();
      setDemande(updatedData.data);
      setOriginalDemande(updatedData.data);
      setIsEditing(false);
      alert("Mise à jour réussie!");

      // Envoyer une notification si le statut est passé à "completed"
      if (formData.status === "completed") {
        console.log("Statut terminé détecté, envoi de la notification...");
        await sendStatusNotification(updatedData.data);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Nouvelle fonction pour envoyer la notification
  const sendStatusNotification = async (demandeData) => {
    try {
      console.log(
        "Tentative d'envoi à:",
        `${import.meta.env.VITE_b}/apii/send-status-email`
      );

      const response = await fetch(
        `${import.meta.env.VITE_b}/apii/send-status-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: demandeData.personalInfo.email,
            reference: demandeData.reference,
            status: demandeData.status,
            fullName: `${demandeData.personalInfo.firstName} ${demandeData.personalInfo.lastName}`,
          }),
        }
      );

      const responseData = await response.text();
      console.log("Réponse brute:", responseData);

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${responseData}`);
      }

      return JSON.parse(responseData);
    } catch (error) {
      console.error("Échec complet de la notification:", error);
      throw error;
    }
  };

  

  const handleCancel = () => {
    setDemande(originalDemande);
    setFormData({
      ...originalDemande.personalInfo,
      deliveryMethod: originalDemande.deliveryMethod,
      status: originalDemande.status,
    });
    setIsEditing(false);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle size={18} />;
      case "pending": return <Clock size={18} />;
      case "processing": return <Loader2 size={18} className="animate-spin" />;
      case "rejected": return <AlertCircle size={18} />;
      default: return <Clock size={18} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleString("fr-FR");
  };

  if (loading) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          border: `5px solid ${colors.gray200}`,
          borderTopColor: colors.primary,
          borderRadius: '50%',
          margin: '0 auto 1.5rem',
          animation: 'spin 1s linear infinite'
        }} />
        <h3 style={{ color: colors.primary }}>Chargement en cours</h3>
        <p style={{ color: colors.gray500 }}>Nous récupérons les détails de votre demande...</p>
      </Container>
    </GlobalStyles>
  );

  if (error) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <AlertCircle size={48} color="#c53030" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: "#c53030" }}>Erreur de chargement</h3>
        <p style={{ color: colors.gray500 }}>{error}</p>
        <PrimaryButton onClick={() => window.location.reload()}>
          Réessayer
        </PrimaryButton>
      </Container>
    </GlobalStyles>
  );

  if (!demande) return (
    <GlobalStyles>
      <Container style={{ textAlign: 'center', padding: '4rem' }}>
        <FileText size={48} color={colors.gray500} style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: colors.primary }}>Demande introuvable</h3>
        <p style={{ color: colors.gray500 }}>La demande que vous recherchez n'existe pas ou a été supprimée.</p>
        <PrimaryButton onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Retour
        </PrimaryButton>
      </Container>
    </GlobalStyles>
  );

  return (
    <GlobalStyles>
      <ProfessionalHeader>
        <HeaderContent>
          <HeaderTop>
            <PrimaryButton onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              
            </PrimaryButton>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Référence</div>
              <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{demande.reference}</div>
            </div>
          </HeaderTop>
          
          <HeaderTitle>
            <Shield size={28} />
            Mise à jour de demande de casier judiciaire
          </HeaderTitle>
        </HeaderContent>
      </ProfessionalHeader>

      <Container>
        {/* Section Statut */}
        <Section>
          <SectionHeader onClick={() => toggleSection('status')}>
            <SectionTitle>
              <ClipboardCheck size={20} />
              Statut de la demande
            </SectionTitle>
            {openSections.status ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.status}>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <SelectField
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={{ flex: 1 }}
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En cours de traitement</option>
                  <option value="completed">Terminée</option>
                  <option value="rejected">Rejetée</option>
                </SelectField>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <PrimaryButton onClick={handleSave}>
                    <Save size={18} />
                    Enregistrer
                  </PrimaryButton>
                  <SecondaryButton onClick={handleCancel}>
                    <X size={18} />
                    Annuler
                  </SecondaryButton>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  background: formData.status === "completed" ? colors.primary : 
                             formData.status === "pending" ? colors.accent : 
                             formData.status === "processing" ? colors.secondary : "#c53030",
                  color: formData.status === "pending" ? colors.dark : colors.white
                }}>
                  {getStatusIcon(formData.status)}
                  {formData.status === "pending" ? "En attente" : 
                   formData.status === "processing" ? "En cours de traitement" : 
                   formData.status === "completed" ? "Terminée" : "Rejetée"}
                </div>
                
                <SecondaryButton onClick={() => setIsEditing(true)}>
                  <ImPencil2 size={16} />
                  Modifier
                </SecondaryButton>
              </div>
            )}
          </SectionContent>
        </Section>

        {/* Section Informations personnelles */}
        <Section>
          <SectionHeader onClick={() => toggleSection('personalInfo')}>
            <SectionTitle>
              <User size={20} />
              Informations personnelles
            </SectionTitle>
            {openSections.personalInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.personalInfo}>
            <InfoGrid>
              {/* Nom complet */}
              <InfoCard>
                <InfoIcon>
                  <User size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom complet</InfoLabel>
                  {isEditing ? (
                    <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
                      <div>
                        <InfoLabel style={{ marginBottom: '0.25rem' }}>Nom</InfoLabel>
                        <InputField
                          name="lastName"
                          value={formData.lastName || ""}
                          onChange={handleInputChange}
                          placeholder="Nom de famille"
                        />
                      </div>
                      <div>
                        <InfoLabel style={{ marginBottom: '0.25rem' }}>Prénom</InfoLabel>
                        <InputField
                          name="firstName"
                          value={formData.firstName || ""}
                          onChange={handleInputChange}
                          placeholder="Prénom"
                        />
                      </div>
                    </div>
                  ) : (
                    <InfoValue>
                      {demande.personalInfo.lastName} {demande.personalInfo.firstName}
                    </InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Père */}
              <InfoCard>
                <InfoIcon>
                  <User size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom du père</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="firstName1"
                      value={formData.firstName1 || ""}
                      onChange={handleInputChange}
                      placeholder="Nom du père"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.firstName1}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Mère */}
              <InfoCard>
                <InfoIcon>
                  <User size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nom de la mère</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="firstName2"
                      value={formData.firstName2 || ""}
                      onChange={handleInputChange}
                      placeholder="Nom de la mère"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.firstName2 || "Non spécifié"}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Date de naissance */}
              <InfoCard>
                <InfoIcon>
                  <Calendar size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Date de naissance</InfoLabel>
                  {isEditing ? (
                    <InputField
                      type="date"
                      name="birthDate"
                      value={formData.birthDate ? formData.birthDate.split('T')[0] : ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <InfoValue>{formatDate(demande.personalInfo.birthDate)}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Lieu de naissance */}
              <InfoCard>
                <InfoIcon>
                  <MapPin size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Lieu de naissance</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="birthPlace"
                      value={formData.birthPlace || ""}
                      onChange={handleInputChange}
                      placeholder="Lieu de naissance"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.birthPlace}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Situation familiale */}
              <InfoCard>
                <InfoIcon>
                  <User size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Situation familiale</InfoLabel>
                  {isEditing ? (
                    <SelectField
                      name="situationFamiliale"
                      value={formData.situationFamiliale || ""}
                      onChange={handleInputChange}
                    >
                      <option value="célibataire">Célibataire</option>
                      <option value="marié(e)">Marié(e)</option>
                      <option value="divorcé(e)">Divorcé(e)</option>
                      <option value="veuf(ve)">Veuf(ve)</option>
                    </SelectField>
                  ) : (
                    <InfoValue>
                      {demande.personalInfo.situationFamiliale.charAt(0).toUpperCase() + 
                       demande.personalInfo.situationFamiliale.slice(1)}
                    </InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Profession */}
              <InfoCard>
                <InfoIcon>
                  <Briefcase size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Profession</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="profession"
                      value={formData.profession || ""}
                      onChange={handleInputChange}
                      placeholder="Profession"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.profession}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Pays de naissance */}
              <InfoCard>
                <InfoIcon>
                  <Globe size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Pays de naissance</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="pays"
                      value={formData.pays || ""}
                      onChange={handleInputChange}
                      placeholder="Pays de naissance"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.pays}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Nationalité */}
              <InfoCard>
                <InfoIcon>
                  <Globe size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Nationalité</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="nationalite"
                      value={formData.nationalite || ""}
                      onChange={handleInputChange}
                      placeholder="Nationalité"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.nationalite}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Pays de résidence */}
              <InfoCard>
                <InfoIcon>
                  <Globe size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Pays de résidence</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="payss"
                      value={formData.payss || ""}
                      onChange={handleInputChange}
                      placeholder="Pays de résidence"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.payss}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Ville/Commune */}
              <InfoCard>
                <InfoIcon>
                  <MapPin size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Ville/Commune</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="villecommune"
                      value={formData.villecommune || ""}
                      onChange={handleInputChange}
                      placeholder="Ville/Commune"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.villecommune}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Adresse */}
              <InfoCard>
                <InfoIcon>
                  <Home size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Adresse</InfoLabel>
                  {isEditing ? (
                    <TextAreaField
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      placeholder="Adresse complète"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.address}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Email */}
              <InfoCard>
                <InfoIcon>
                  <Mail size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Email</InfoLabel>
                  {isEditing ? (
                    <InputField
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.email}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Téléphone */}
              <InfoCard>
                <InfoIcon>
                  <Phone size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Téléphone</InfoLabel>
                  {isEditing ? (
                    <InputField
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      placeholder="Téléphone"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.phone}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>

              {/* Numéro de passeport */}
              <InfoCard>
                <InfoIcon>
                  <FileText size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Numéro de passeport</InfoLabel>
                  {isEditing ? (
                    <InputField
                      name="passport"
                      value={formData.passport || ""}
                      onChange={handleInputChange}
                      placeholder="Numéro de passeport"
                    />
                  ) : (
                    <InfoValue>{demande.personalInfo.passport}</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Mode de livraison */}
        <Section>
          <SectionHeader onClick={() => toggleSection('delivery')}>
            <SectionTitle>
              <Briefcase size={20} />
              Mode de livraison
            </SectionTitle>
            {openSections.delivery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.delivery}>
            {isEditing ? (
              <SelectField
                name="deliveryMethod"
                value={formData.deliveryMethod}
                onChange={handleInputChange}
              >
                <option value="court">Retrait au tribunal</option>
                <option value="mail">Courrier postal</option>
                <option value="email">Email sécurisé</option>
                <option value="postal">Service postal</option>
              </SelectField>
            ) : (
              <InfoCard>
                <InfoIcon>
                  <Briefcase size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Méthode choisie</InfoLabel>
                  <InfoValue>
                    {demande.deliveryMethod === "court" ? "Retrait au tribunal" : 
                     demande.deliveryMethod === "mail" ? "Courrier postal" : 
                     demande.deliveryMethod === "email" ? "Email sécurisé" : "Service postal"}
                  </InfoValue>
                </InfoContent>
              </InfoCard>
            )}
          </SectionContent>
        </Section>

        {/* Section Pièces jointes */}
        <Section>
          <SectionHeader onClick={() => toggleSection('documents')}>
            <SectionTitle>
              <FileText size={20} />
              Pièces jointes
            </SectionTitle>
            {openSections.documents ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.documents}>
            <InfoGrid>
              <InfoCard>
                <InfoIcon>
                  <FileText size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Extrait de naissance</InfoLabel>
                  {demande.contactInfo?.piece1 ? (
                    <PrimaryButton 
                      as="a"
                      href={`${import.meta.env.VITE_b}/${path.basename(demande.contactInfo.piece1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: '0.5rem' }}
                    >
                      <Download size={16} />
                      Télécharger
                    </PrimaryButton>
                  ) : (
                    <InfoValue>Non fournie</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>
              
              <InfoCard>
                <InfoIcon>
                  <FileText size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Passeport/Carte d'identité</InfoLabel>
                  {demande.contactInfo?.piece2 ? (
                    <PrimaryButton 
                      as="a"
                      href={`${import.meta.env.VITE_b}/${path.basename(demande.contactInfo.piece2)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: '0.5rem' }}
                    >
                      <Download size={16} />
                      Télécharger
                    </PrimaryButton>
                  ) : (
                    <InfoValue>Non fournie</InfoValue>
                  )}
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Dates */}
        <Section>
          <SectionHeader onClick={() => toggleSection('dates')}>
            <SectionTitle>
              <Calendar size={20} />
              Historique
            </SectionTitle>
            {openSections.dates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.dates}>
            <InfoGrid>
              <InfoCard>
                <InfoIcon>
                  <Calendar size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Date de création</InfoLabel>
                  <InfoValue>{formatDateTime(demande.createdAt)}</InfoValue>
                </InfoContent>
              </InfoCard>
              
              {demande.updatedAt && (
                <InfoCard>
                  <InfoIcon>
                    <Calendar size={16} />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Dernière mise à jour</InfoLabel>
                    <InfoValue>{formatDateTime(demande.updatedAt)}</InfoValue>
                  </InfoContent>
                </InfoCard>
              )}
            </InfoGrid>
          </SectionContent>
        </Section>

        {/* Section Commentaires */}
        <Section>
          <SectionHeader onClick={() => toggleSection('comments')}>
            <SectionTitle>
              <Briefcase size={20} />
              Commentaires
            </SectionTitle>
            {openSections.comments ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </SectionHeader>
          
          <SectionContent isOpen={openSections.comments}>
            {isEditing ? (
              <TextAreaField
                name="commentaires"
                value={formData.commentaires || ""}
                onChange={handleInputChange}
                placeholder="Ajoutez des commentaires ici..."
              />
            ) : (
              <InfoCard>
                <InfoIcon>
                  <Briefcase size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Notes internes</InfoLabel>
                  <InfoValue>{demande.commentaires || "Aucun commentaire"}</InfoValue>
                </InfoContent>
              </InfoCard>
            )}
          </SectionContent>
        </Section>
      </Container>
    </GlobalStyles>
  );
}

export default DemandeMisejourdmin;