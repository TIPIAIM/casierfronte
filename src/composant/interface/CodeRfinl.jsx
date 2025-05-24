import CodeR from "./CodeR";

const CodeRfinl = () => {
  const qrData = "https://casiergn.vercel.app/";

  return (
    <div>
      <h2>Condamnation - Référence XYZ999</h2>
      <CodeR value={qrData} />
    </div>
  );
};

export default CodeRfinl;
