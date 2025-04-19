import { Routes, Route, BrowserRouter } from "react-router-dom";
//import "./App.css";
import RegisterForm from "./composant/identification/RegisterForm";
import LoginForm from "./composant/identification/LoginForm";
import Adminmere from "./composant/interface/Adminmere";
import Adminfils from "./composant/interface/Adminfils";
import ProtectedRoute from "./composant/identification/ProtectedRoute ";
import Visiteur from "./composant/interface/Visiteur";
import Senregistrer from "./composant/identification/Senregistrer";

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

          {/* Protection des route admin lors de connexion */}
          <Route
            path="/utilisateur"
            element={
              <ProtectedRoute>
                <Adminfils />
              </ProtectedRoute>
            }
          />{" "}
          {/* Protection des route admin lors de connexion */}
          <Route path="/administrateur"
           element={
            <ProtectedRoute>
             <Adminmere />
          </ProtectedRoute>
          
           } />
          <Route path="/visiteur" element={<Visiteur />} />
         
          <Route path="/enregistrement" element={<RegisterForm />} /> {/*à retirer pres */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
