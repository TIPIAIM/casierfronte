import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const colors = {
  blueMarine: "#002B5B",
  greenDark: "#1A4D2E",
  goldenYellow: "#F2C94C",

  white: "#FFFFFF",

  bleuProfond: "#003566",
  beigeSableux: "#F2E9DC",

  primary: "#002B5B",
  secondary: "#F2C94C",

  success: "#1A4D2E",
  warning: "#F2C94C",

  error: "#C53030",
  background: "#F2E9DC",

  text: "#002B5B",
  textLight: "#4A5568",

  border: "#E2E8F0",
  borderDark: "#CBD5E0",

  cardBg: "#FFFFFF",
};

export default function Interfcedebut() {
  const mountRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: colors.secondary,
      metalness: 0.7,
      roughness: 0.25,
    });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(colors.goldenYellow, 0.4);
    scene.add(ambientLight);

    const animate = () => {
      requestAnimationFrame(animate);
      knot.rotation.x += 0.01;
      knot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-950 from-black text-white flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden">
      {/* 3D Background */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* Content */}
      <div
        className={`z-10 w-full max-w-7xl mx-auto text-center space-y-10 transform transition duration-1000 ease-in-out ${
          showContent
            ? "opacity-95 scale-100 rotate-0"
            : "opacity-0 scale-90 rotate-3"
        } from-gray-950/100 backdrop-blur-md shadow-2xl rounded-xl `}
      >
        {/* Navbar pro & responsive */}
        <header
          className="
            w-full flex flex-col sm:flex-row items-center
            justify-between gap-2 sm:gap-0
            px-2 sm:px-6 md:px-12 py-3 sm:py-4 mb-6
            bg-white/0 shadow-xl rounded-t-xl  border-gray-200 backdrop-blur-md
            "
        >
          {/* Branding : logo + nom + slogan */}
          <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start gap-3">
            <img
              src="/logo512.png"
              alt="Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-xl shadow-sm border border-gray-200 bg-white"
              style={{ background: "#fff" }}
            />
            <div className="flex flex-col items-start">
              <span className="font-extrabold text-lg sm:text-xl md:text-2xl text-gray-800 tracking-tight flex items-center gap-2">
                <span className="text-yellow-500 whitespace-nowrap">Casier </span>
                 <span className="text-green-600 whitespace-nowrap">Judiciaire</span>
{     /*           <span className="ml-1 text-xl sm:text-xl text-yellow-400">⚖️</span>
*/}              </span>
              <span className="text-xs sm:text-sm text-green-500 font-medium mt-0.5 sm:mt-1">
                Plateforme Officielle
              </span>
            </div>
          </div>
          {/* Navigation */}
          <nav className="w-full sm:w-auto flex justify-center sm:justify-end mt-3 sm:mt-0">
            <Link
              to="/videoexplic"
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200 no-underline text-sm sm:text-base"
            >
              Tutoriel
            </Link>
          </nav>
        </header>

        {/* Reste du contenu */}
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight break-words">
          Extrait de Casier Judiciaire en Ligne <br />
          <span className="text-xl md:text-3xl text-yellow-300 font-semibold">simple-rapide-sécurisé</span>
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Accédez à votre extrait de casier judiciaire (bulletin n°3) en toute
          sécurité depuis notre plateforme officielle.
        </p>
        <p className="text-yellow-300 font-medium text-sm sm:text-base">
          Une démarche 100% en ligne, sans déplacement, avec un résultat
          immédiat.<br />
          Service agréé par le Ministère de la Justice – Confidentialité garantie.
        </p>
        {/* Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <button className="w-full sm:w-auto bg-yellow-500 hover:bg-green-800 text-black font-semibold px-6 py-3 rounded-lg hover:text-yellow-500 transition-all duration-300 shadow-lg">
            <Link to="/debut" className="no-underline font-bold text-black w-full block">
              Commencer
            </Link>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          République de Guinée . Travail-Justice-Solidarité.
        </p>
      </div>
    </div>
  );
}
