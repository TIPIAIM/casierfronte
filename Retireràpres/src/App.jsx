import { Routes, Route, BrowserRouter } from "react-router-dom";
//import "./App.css";
import LoginForm from "./composant/identification/LoginForm";
import Adminmere from "./composant/interface/Adminmere";
import Adminfils from "./composant/interface/Adminfils";
import ProtectedRoute from "./composant/identification/ProtectedRoute ";
import Visiteur from "./composant/interface/Visiteur";
import Senregistrer from "./composant/identification/Senregistrer";
import Guineedemrce from "./composant/Pourlecsier/Guineen/Guineedemrce";
import Etrngerguinee from "./composant/Pourlecsier/Etrnger/Etrngerguinee";
import Videoexpli from "./composant/Pourlecsier/Videoexpli";

//Assure-toi que la route Adminfils est protégée et accessible uniquement aux utilisateurs authentifiés.
function App() {
  {
    /*
       <div>
      <BrowserRouter>
        {" "}
        <Navbarrr />
        <StructuredData />
        <Routes>
          <Route index element={<Hero />} />
          <Route path="*" element={<Erreurr />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contacnous />} />
          <Route path="/apropos" element={<Quisommenous />} />
          <Route path="/realisation" element={<Realisations />} />
        </Routes>
      
      </BrowserRouter>
    </div> 
      */
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Senregistrer />} />
          <Route path="/seconnecter" element={<LoginForm />} />
          <Route path="/enregistrer" element={<Senregistrer />} />
          <Route path="/demande-guinee" element={<Guineedemrce />} />
          <Route path="/demande-etranger" element={<Etrngerguinee />} />
          {/* Protection des route admin lors de connexion config àpres  */}
          <Route
            path="/demande"
            element={
              <ProtectedRoute>
                <Guineedemrce />
              </ProtectedRoute>
            }
          />{" "}
          {/* Protection des route admin lors de connexion config àpres */}
          <Route
            path="/etranger"
            element={
              <ProtectedRoute>
                <Etrngerguinee />
              </ProtectedRoute>
            }
          />
          <Route path="/visiteur" element={<Visiteur />} />
          {/*à informàtion */}
          <Route path="/videoexplic" element={<Videoexpli />} /> {/*à video */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
