import React, { useEffect, useState } from "react";
import profileImage2 from "../../Assets/Image/perfil1.jpg";

import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";  // Importa o Link do react-router-dom

function Sidebar({ openModal, backgroundColor, textColor }) {
  const [userData, setUserData] = useState(null);
  const menuItems = [
    { icon: <IoHomeSharp />, label: "Home", path: "/" },  // Adiciona o path para a Home
    { icon: <FaUser />, label: "Meu Perfil", path: "/profile" }, // Adiciona o path para o Perfil
    { icon: <FaPalette />, label: "Tema", action: openModal },  // Mantém a ação de abrir o modal
  ];

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:3000/usuarios");
          const data = await response.json();
          const currentUser = data[0]; 
          setUserData(currentUser);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <div className="flex ml-16 h-80 mt-10 ">
      <div
        className="w-2 rounded-l-lg"
        style={{
          backgroundImage: "linear-gradient(to bottom, #6B4DE6, #4DADE6)",
        }}
      />
      <aside
        className="w-64 p-4 ml-2"
        style={{ backgroundColor, color: textColor }}
      >
        <div
          className="mb-8 flex items-center"
          style={{
            border: "3px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            padding: "5px",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={userData?.avatar_url || "default-avatar.png"}
            alt="User Profile"
            className="w-16 h-16 rounded-full mr-2"
          />
          <div className="flex flex-col">
            {userData ? (
              <>
                <span style={{ color: textColor }}>{userData.name || userData.login}</span> {/* Exibir o nome */}
                <span
                  style={{
                    color: textColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "130px",
                    display: "inline-block",
                  }}
                >
                  @{userData.username || userData.nameGitHub}
                </span>
              </>
            ) : (
              <>
                <span style={{ color: textColor }}>Carregando...</span>
                <span style={{ color: textColor }}></span>
              </>
            )}
          </div>
        </div>
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.path || "#"}  // Verifica se há uma rota antes de usar o Link
              className="flex items-center space-x-2 cursor-pointer"
              onClick={item.action ? item.action : null}
              style={{ color: textColor }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-10">
          <button
            className="text-purple-600 flex items-center"
            style={{ color: textColor }}
          >
            <IoMdSettings className="mr-2" />
            Configuração
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
