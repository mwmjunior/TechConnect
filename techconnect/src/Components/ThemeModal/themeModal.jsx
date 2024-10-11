import React, { useState } from 'react';

function ThemeModal({ isOpen, onClose, onSave }) {
  const [backgroundColor, setBackgroundColor] = useState('#F4EFE9'); // Cor de fundo padrão
  const [textColor, setTextColor] = useState('#6B4DE6'); // Cor do texto padrão
  const [fontSize, setFontSize] = useState(16); // Tamanho de fonte padrão
  const [backgroundTheme, setBackgroundTheme] = useState('Claro'); // Tema de fundo padrão

  const handleSave = () => {
    onSave(backgroundColor, textColor, fontSize, backgroundTheme);
    onClose();
  };

  // Cores disponíveis
  const colors = {
    background: ['#352F4C', '#2c2c2c', "#F4EFE9"],
    buttonBorder: ['#FCC41D', '#4DADE6', '#4DE69E', '#6B4DE6', '#000'],
  };

  // Mapear os temas com as cores correspondentes
  const backgroundThemes = [
    { name: 'Claro', color: '#F4EFE9' },
    { name: 'Escuro', color: '#352F4C' },
    { name: 'Apagar luzes', color: '#2c2c2c' },
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px]">
          <h3 className="text-lg font-bold text-black mb-4">Personalize sua visualização</h3>
          <p className="text-sm text-gray-500 mb-6">Gerencie o tamanho da fonte, a cor e o fundo.</p>

          {/* Seção de Tamanho de Fonte */}
          <div className="mb-6">
            <label className="block text-black mb-1">Tamanho da Fonte:</label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Aa</span>
              <span>Aa</span>
            </div>
          </div>

          {/* Seção de Cor */}
          <div className="mb-6">
            <label className="block text-black mb-1">Cor:</label>
            <div className="flex space-x-2">
              {colors.buttonBorder.map((color) => (
                <div
                  key={color}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 ${textColor === color ? 'border-black' : 'border-transparent'} hover:border-gray-400 transition duration-200`}
                  style={{ backgroundColor: color }}
                  onClick={() => setTextColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Seção de Temas de Fundo */}
          <div className="mb-4">
            <label className="block text-black mb-1">Fundo:</label>
            <div className="flex space-x-2">
              {backgroundThemes.map((theme) => (
                <div
                  key={theme.name}
                  className={`cursor-pointer border-2 rounded-lg p-4 w-24 h-12 text-center ${backgroundTheme === theme.name ? 'border-black' : 'border-transparent'} hover:border-gray-400 transition duration-200`}
                  style={{ backgroundColor: theme.color }}
                  onClick={() => {
                    setBackgroundTheme(theme.name);
                    setBackgroundColor(theme.color); 
                  }}
                >
                  <span className="text-white">{theme.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Botões */}
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="bg-[#1E1E1E] text-white p-2 rounded hover:bg-[#4DADE6] transition duration-200">Cancelar</button>
            <button onClick={handleSave} className="bg-[#4DADE6] text-white p-2 rounded hover:bg-[#FCC41D] transition duration-200">Salvar</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ThemeModal;
