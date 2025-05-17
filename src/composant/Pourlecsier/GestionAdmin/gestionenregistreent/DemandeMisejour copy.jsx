import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
} from "lucide-react";
import path from "path-browserify";
import { ImPencil2 } from "react-icons/im";
import Interfcehedmisejour from "../../../interface/Interfcehedmisejour";

// Palette de couleurs
const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",
  white: "#FFFFFF",
  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",
};

// Styles
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${colors.blueMarine};
  padding-bottom: 1rem;
`;

const BackButton = styled.button`
  background: ${colors.blueMarine};
  color: ${colors.white};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
  &:hover {
    background: ${colors.bleuProfond};
  }
`;

const Title = styled.h1`
  color: ${colors.blueMarine};
  font-size: 1.8rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${colors.blueMarine};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${colors.beigeSableux};
  padding-bottom: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconWrapper = styled.div`
  color: ${colors.blueMarine};
  display: flex;
  align-items: flex-start;
  padding-top: 0.2rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const Label = styled.div`
  font-weight: 600;
  color: ${colors.bleuProfond};
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Value = styled.div`
  color: #333;
  padding-left: 1.5rem;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  &.pending {
    background: ${colors.goldenYellow}15;
    color: ${colors.goldenYellow};
  }
  &.processing {
    background: ${colors.blueMarine}15;
    color: ${colors.blueMarine};
  }
  &.completed {
    background: ${colors.greenDark}15;
    color: ${colors.greenDark};
  }
  &.rejected {
    background: #c5303015;
    color: #c53030;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: ${colors.blueMarine};
  color: ${colors.white};
  border-radius: 4px;
  text-decoration: none;
  margin-top: 0.5rem;
  &:hover {
    background: ${colors.bleuProfond};
  }
`;

const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: ${colors.goldenYellow};
  color: ${colors.blueMarine};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    background: #e6b800;
  }
`;

const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  background: ${colors.greenDark};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
  &:hover {
    background: #0e3a1e;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.beigeSableux};
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.3rem;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.beigeSableux};
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.3rem;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.beigeSableux};
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 0.3rem;
  min-height: 80px;
`;

function DemandeMisejour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [originalDemande, setOriginalDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_b}/api/demande/by-id/${id}`
        );
        //
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
        `${import.meta.env.VITE_b}/api/demande/${id}`,
        {
          method: "PUT",
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "processing":
        return <Loader2 size={16} className="animate-spin" />;
      case "rejected":
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  if (loading) return <Container>Chargement en cours...</Container>;
  if (error) return <Container>Erreur: {error}</Container>;
  if (!demande) return <Container>Demande non trouvée</Container>;

  return (
    <div>
      <Interfcehedmisejour />
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </BackButton>
          <Title>Ref : {demande.reference}</Title>
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing(true)}>
              <ImPencil2 />
            </EditButton>
          ) : (
            <>
              <SaveButton onClick={handleSave}>
                <Save size={16} />
                Enregistrer
              </SaveButton>
              <EditButton
                onClick={handleCancel}
                style={{ background: colors.error, color: "white" }}
              >
                Annuler
              </EditButton>
            </>
          )}
        </Header>

        {/* Section Statut */}
        <Section>
          <SectionTitle>
            <CheckCircle size={20} />
            Statut de la demande
          </SectionTitle>
          {isEditing ? (
            <SelectField
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="pending">En attente</option>
              <option value="processing">En cours</option>
              <option value="completed">Terminé</option>
              <option value="rejected">Rejeté</option>
            </SelectField>
          ) : (
            <StatusBadge className={demande.status || "pending"}>
              {getStatusIcon(demande.status || "pending")}
              {demande.status === "pending"
                ? "En attente"
                : demande.status === "processing"
                ? "En cours"
                : demande.status === "completed"
                ? "Terminé"
                : "Rejeté"}
            </StatusBadge>
          )}
        </Section>

        {/* Section Informations personnelles */}
        <Section>
          <SectionTitle>
            <User size={20} />
            Informations personnelles
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <IconWrapper>
                <User size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Nom complet</Label>
                {isEditing ? (
                  <>
                    <InputField
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={handleInputChange}
                      placeholder="Nom"
                    />
                    <InputField
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={handleInputChange}
                      placeholder="Prénom"
                    />
                  </>
                ) : (
                  <Value>
                    {demande.personalInfo.lastName}{" "}
                    {demande.personalInfo.firstName}
                  </Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <User size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Père</Label>
                {isEditing ? (
                  <InputField
                    name="firstName1"
                    value={formData.firstName1 || ""}
                    onChange={handleInputChange}
                    placeholder="Nom du père"
                  />
                ) : (
                  <Value>{demande.personalInfo.firstName1}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <User size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Mère</Label>
                {isEditing ? (
                  <InputField
                    name="firstName2"
                    value={formData.firstName2 || ""}
                    onChange={handleInputChange}
                    placeholder="Nom et prenom de là mere"
                  />
                ) : (
                  <Value>{demande.personalInfo.firstName2}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Calendar size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Date de naissance</Label>
                {isEditing ? (
                  <InputField
                    type="date"
                    name="birthDate"
                    value={formData.birthDate || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Value>{formatDate(demande.personalInfo.birthDate)}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <MapPin size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Lieu de naissance</Label>
                {isEditing ? (
                  <InputField
                    name="birthPlace"
                    value={formData.birthPlace || ""}
                    onChange={handleInputChange}
                    placeholder="Lieu de naissance"
                  />
                ) : (
                  <Value>{demande.personalInfo.birthPlace}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Briefcase size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Situation familiale</Label>
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
                  <Value>
                    {demande.personalInfo.situationFamiliale
                      .charAt(0)
                      .toUpperCase() +
                      demande.personalInfo.situationFamiliale.slice(1)}
                  </Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Briefcase size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Profession</Label>
                {isEditing ? (
                  <InputField
                    name="profession"
                    value={formData.profession || ""}
                    onChange={handleInputChange}
                    placeholder="Profession"
                  />
                ) : (
                  <Value>{demande.personalInfo.profession}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Globe size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Pays de naissance</Label>
                {isEditing ? (
                  <InputField
                    name="pays"
                    value={formData.pays || ""}
                    onChange={handleInputChange}
                    placeholder="Pays de naissance"
                  />
                ) : (
                  <Value>{demande.personalInfo.pays}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Globe size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Nationalité</Label>
                {isEditing ? (
                  <InputField
                    name="nationalite"
                    value={formData.nationalite || ""}
                    onChange={handleInputChange}
                    placeholder="Nationalité"
                  />
                ) : (
                  <Value>{demande.personalInfo.nationalite}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Globe size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Pays de résidence</Label>
                {isEditing ? (
                  <InputField
                    name="payss"
                    value={formData.payss || ""}
                    onChange={handleInputChange}
                    placeholder="Pays de résidence"
                  />
                ) : (
                  <Value>{demande.personalInfo.payss}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <MapPin size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Domicile</Label>
                {isEditing ? (
                  <InputField
                    name="villecommune"
                    value={formData.villecommune || ""}
                    onChange={handleInputChange}
                    placeholder="Sisissez ce qui est sur le certificat de residence"
                  />
                ) : (
                  <Value>{demande.personalInfo.villecommune}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Home size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Adresse</Label>
                {isEditing ? (
                  <TextAreaField
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    placeholder="Adresse complète"
                  />
                ) : (
                  <Value>{demande.personalInfo.address}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Mail size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Email</Label>
                {isEditing ? (
                  <InputField
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                ) : (
                  <Value>{demande.personalInfo.email}</Value>
                )}
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <IconWrapper>
                <Phone size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Téléphone</Label>
                {isEditing ? (
                  <InputField
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    placeholder="Téléphone"
                  />
                ) : (
                  <Value>{demande.personalInfo.phone}</Value>
                )}
              </InfoContent>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Section Mode de livraison */}
        <Section>
          <SectionTitle>
            <Briefcase size={20} />
            Mode de livraison
          </SectionTitle>
          {isEditing ? (
            <SelectField
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleInputChange}
            >
              <option value="court">Retrait au tribunal</option>
              <option value="mail">Courrier postal</option>
              <option value="email">Email sécurisé</option>
            </SelectField>
          ) : (
            <InfoItem>
              <IconWrapper>
                <Briefcase size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Méthode choisie</Label>
                <Value>
                  {demande.deliveryMethod === "court"
                    ? "Retrait au tribunal"
                    : demande.deliveryMethod === "mail"
                    ? "Courrier postal"
                    : "Email sécurisé"}
                </Value>
              </InfoContent>
            </InfoItem>
          )}
        </Section>

        {/* Section Pièces jointes */}
        <Section>
          <SectionTitle>
            <Download size={20} />
            Non modifiable
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <IconWrapper>
                <Download size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Pièce justificative 1</Label>
                {demande.contactInfo?.piece1 ? (
                  <DownloadButton
                    href={`${import.meta.env.VITE_b}/${path.basename(
                      demande.contactInfo.piece1
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                    Télécharger
                  </DownloadButton>
                ) : (
                  <Value>Non fournie</Value>
                )}
              </InfoContent>
            </InfoItem>
            <InfoItem>
              <IconWrapper>
                <Download size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Pièce justificative 2</Label>
                {demande.contactInfo?.piece2 ? (
                  <DownloadButton
                    href={`${import.meta.env.VITE_b}/${path.basename(
                      demande.contactInfo.piece2
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                    Télécharger
                  </DownloadButton>
                ) : (
                  <Value>Non fournie</Value>
                )}
              </InfoContent>
            </InfoItem>
          </InfoGrid>
        </Section>

        {/* Section Dates */}
        <Section>
          <SectionTitle>
            <Calendar size={20} />
            Dates importantes
          </SectionTitle>
          <InfoGrid>
            <InfoItem>
              <IconWrapper>
                <Calendar size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Date de création</Label>
                <Value>
                  {new Date(demande.createdAt).toLocaleString("fr-FR")}
                </Value>
              </InfoContent>
            </InfoItem>
            {demande.updatedAt && (
              <InfoItem>
                <IconWrapper>
                  <Calendar size={16} />
                </IconWrapper>
                <InfoContent>
                  <Label>Dernière mise à jour</Label>
                  <Value>
                    {new Date(demande.updatedAt).toLocaleString("fr-FR")}
                  </Value>
                </InfoContent>
              </InfoItem>
            )}
          </InfoGrid>
        </Section>

        {/* Section Commentaires */}
        <Section>
          <SectionTitle>
            <Briefcase size={20} />
            Commentaires
          </SectionTitle>
          {isEditing ? (
            <TextAreaField
              name="commentaires"
              value={formData.commentaires || ""}
              onChange={handleInputChange}
              placeholder="Ajoutez des commentaires ici..."
            />
          ) : (
            <InfoItem>
              <IconWrapper>
                <Briefcase size={16} />
              </IconWrapper>
              <InfoContent>
                <Label>Notes internes</Label>
                <Value>{demande.commentaires || "Aucun commentaire"}</Value>
              </InfoContent>
            </InfoItem>
          )}
        </Section>
      </Container>
    </div>
  );
}

export default DemandeMisejour;
