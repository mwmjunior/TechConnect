// src/App.js
import React, { useState } from "react";
import Home from "./Pages/Home/home";
import ThemeModal from "./Components/ThemeModal/themeModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#F4EFE9 ");
  const [textColor, setTextColor] = useState("#6B4DE6");
  const [fontSize, setFontSize] = useState(16);

  // Função chamada ao salvar as cores no modal
  const handleSave = (newBackgroundColor, newTextColor, newFontSize) => {
    setBackgroundColor(newBackgroundColor);
    setTextColor(newTextColor);
    setFontSize(newFontSize);
  };

  return (
    <>
      {/* Passando as cores para o componente Home */}
      <Home
        backgroundColor={backgroundColor}
        textColor={textColor}
        fontSize={fontSize} 
        openModal={() => setIsModalOpen(true)} 
      />
      <ThemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

export default App;
