// src/components/CodeR.jsx
import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

// Chemin du logo (dans /public)
const logoPath = "/tiptamcode.avif";

const CodeR = ({ value = "https://casiergn.vercel.app" }) => {
  const qrRef = useRef(null);

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "svg",
    data: value,
    image: logoPath,
    dotsOptions: {
      color: "#1A4D2E",
      type: "rounded",
    },
    cornersSquareOptions: {
      color: "#002B5B",
      type: "extra-rounded",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
    },
  });

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [value]);

  return (
    <div>
      <div ref={qrRef} />
    </div>
  );
};

export default CodeR;
