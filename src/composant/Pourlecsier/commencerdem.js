// Mise à jour de l'état initial
const [formData, setFormData] = useState({
    deliveryMethod: "",
    personalInfo: {
      firstName1: "",
      firstName2: "", 
       situationFamiliale: "",
      profession: "",
     
    
      nationalite: "",
      pieceIdentite: {
        type: "",
        numero: "",
        dateDelivrance: "",
        lieuDelivrance: ""
      }
    },
    contactInfo: {
      address: "",
      postalCode: "",
      city: "",
      email: "",
      phone: "",
    },
  });
  
  // Mise à jour de la validation pour l'étape 2
  if (currentStep === 2) {
    if (!formData.personalInfo.firstName1) newErrors.firstName1 = "Ce champ est requis";
    if (!formData.personalInfo.lastName) newErrors.lastName = "Ce champ est requis";
    if (!formData.personalInfo.birthDate) newErrors.birthDate = "Ce champ est requis";
    if (!formData.personalInfo.birthPlace) newErrors.birthPlace = "Ce champ est requis";
    if (!formData.personalInfo.situationFamiliale) newErrors.situationFamiliale = "Ce champ est requis";
    if (!formData.personalInfo.profession) newErrors.profession = "Ce champ est requis";
    if (!formData.personalInfo.nationalite) newErrors.nationalite = "Ce champ est requis";
    if (!formData.personalInfo.pieceIdentite.type) newErrors.pieceIdentiteType = "Ce champ est requis";
    if (!formData.personalInfo.pieceIdentite.numero) newErrors.pieceIdentiteNumero = "Ce champ est requis";
    if (!formData.personalInfo.pieceIdentite.dateDelivrance) newErrors.pieceIdentiteDateDelivrance = "Ce champ est requis";
    if (!formData.personalInfo.pieceIdentite.lieuDelivrance) newErrors.pieceIdentiteLieuDelivrance = "Ce champ est requis";
  }
  
  // Mise à jour du rendu pour l'étape 2 (Informations personnelles)
  case 2:
    return (
      <StepContainer>
        <StepTitle><User size={24} /> Informations personnelles</StepTitle>
        <StepDescription>
          Veuillez renseigner vos informations personnelles exactement comme elles apparaissent 
          sur vos pièces d'identité officielles.
        </StepDescription>
        
        <GridContainer>
        
         
          
         
          
         
          
          <FormGroup>
            <FormLabel>Nationalité <RequiredField>*</RequiredField></FormLabel>
            <FormInput 
              name="nationalite" 
              value={formData.personalInfo.nationalite} 
              onChange={(e) => handleInputChange(e, "personalInfo")} 
              placeholder="Française"
              aria-invalid={!!errors.nationalite}
            />
            {errors.nationalite && <ErrorMessage>{errors.nationalite}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Type de pièce d'identité <RequiredField>*</RequiredField></FormLabel>
            <FormInput 
              as="select"
              name="pieceIdentite.type" 
              value={formData.personalInfo.pieceIdentite.type} 
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    pieceIdentite: {
                      ...prev.personalInfo.pieceIdentite,
                      type: value
                    }
                  }
                }));
              }}
              aria-invalid={!!errors.pieceIdentiteType}
            >
              <option value="">Sélectionnez...</option>
              <option value="CNI">Carte Nationale d'Identité</option>
              <option value="Passeport">Passeport</option>
              <option value="Permis de conduire">Permis de conduire</option>
            </FormInput>
            {errors.pieceIdentiteType && <ErrorMessage>{errors.pieceIdentiteType}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Numéro de pièce <RequiredField>*</RequiredField></FormLabel>
            <FormInput 
              name="pieceIdentite.numero" 
              value={formData.personalInfo.pieceIdentite.numero} 
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    pieceIdentite: {
                      ...prev.personalInfo.pieceIdentite,
                      numero: value
                    }
                  }
                }));
              }}
              placeholder="123456789012"
              aria-invalid={!!errors.pieceIdentiteNumero}
            />
            {errors.pieceIdentiteNumero && <ErrorMessage>{errors.pieceIdentiteNumero}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Date de délivrance <RequiredField>*</RequiredField></FormLabel>
            <FormInput 
              type="date" 
              name="pieceIdentite.dateDelivrance" 
              value={formData.personalInfo.pieceIdentite.dateDelivrance} 
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    pieceIdentite: {
                      ...prev.personalInfo.pieceIdentite,
                      dateDelivrance: value
                    }
                  }
                }));
              }}
              aria-invalid={!!errors.pieceIdentiteDateDelivrance}
            />
            {errors.pieceIdentiteDateDelivrance && <ErrorMessage>{errors.pieceIdentiteDateDelivrance}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Lieu de délivrance <RequiredField>*</RequiredField></FormLabel>
            <FormInput 
              name="pieceIdentite.lieuDelivrance" 
              value={formData.personalInfo.pieceIdentite.lieuDelivrance} 
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData(prev => ({
                  ...prev,
                  personalInfo: {
                    ...prev.personalInfo,
                    pieceIdentite: {
                      ...prev.personalInfo.pieceIdentite,
                      lieuDelivrance: value
                    }
                  }
                }));
              }}
              placeholder="Préfecture de Paris"
              aria-invalid={!!errors.pieceIdentiteLieuDelivrance}
            />
            {errors.pieceIdentiteLieuDelivrance && <ErrorMessage>{errors.pieceIdentiteLieuDelivrance}</ErrorMessage>}
          </FormGroup>
        </GridContainer>
      </StepContainer>
    );