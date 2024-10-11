import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

function Message({ backgroundColor, textColor, fontSize }) {
  // Estado para controlar se as mensagens estão visíveis ou não
  const [isExpanded, setIsExpanded] = useState(false);

  // Mensagens de exemplo
  const messages = [
    { imgSrc: "/path-to-image.jpg", userName: "nome usuário 1", message: "2 novas mensagens" },
    { imgSrc: "/path-to-image2.jpg", userName: "nome usuário 2", message: "Ameiii" },
    { imgSrc: "/path-to-image3.jpg", userName: "nome usuário 3", message: "Belo trabalho!!" },
    { imgSrc: "/path-to-image4.jpg", userName: "nome usuário 4", message: "Gostei muito!" },
    { imgSrc: "/path-to-image5.jpg", userName: "nome usuário 5", message: "Ótima apresentação!" },
    { imgSrc: "/path-to-image6.jpg", userName: "nome usuário 6", message: "Quando vamos nos encontrar?" },
    { imgSrc: "/path-to-image7.jpg", userName: "nome usuário 7", message: "Preciso da sua ajuda." },
    { imgSrc: "/path-to-image8.jpg", userName: "nome usuário 8", message: "Isso é incrível!" }
  ];

  return (
    <div
      className="relative w-72 ml-4 h-auto p-4 rounded-lg ]"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center" style={{ color: textColor }} onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="text-lg font-semibold cursor-pointer">Mensagens</h2>
        <FaChevronDown className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} style={{ color: textColor }} />
      </div>

      {/* Search Input */}
      <div className="relative my-4">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full py-2 pl-10 pr-4 rounded-lg bg-white shadow-xl"
          style={{
            border: "2px solid transparent", 
            backgroundImage: 
              "linear-gradient(#EFE7F7, #EFE7F7), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        />
        <FaSearch className="absolute left-3 top-2/4 transform -translate-y-1/2 " style={{ color: textColor }} />
      </div>

      {/* Message List */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-64" : "max-h-40"}`}>
        <div className={`overflow-y-auto ${isExpanded ? "h-64" : "h-40"}`}>
          {/* Mostra as duas primeiras mensagens mesmo quando fechado */}
          {messages.slice(0, isExpanded ? messages.length : 2).map((msg, index) => (
            <div key={index} className="flex items-center space-x-2 my-4">
              <img src={msg.imgSrc} alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <span className="font-semibold" style={{ color: textColor }}>{msg.userName}</span>
                <p className="text-sm" style={{ color: textColor }}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
