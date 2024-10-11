import React, { useState, useEffect, useRef } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import videoBackground from "../../Assets/Image/4413-179384184.mp4";
import ReactDOM from "react-dom"; // Import necessário para usar Portal

function Header({ backgroundColor, textColor }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]); // Lista de todos os usuários
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista de usuários filtrados
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleLogout = () => {
    localStorage.removeItem("user"); // Limpa os dados do usuário do localStorage
    localStorage.removeItem("github_token"); 
    localStorage.removeItem("userData");
    navigate("/login");
  };

  // Função para buscar todos os usuários ao carregar o componente
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/usuarios`);
      setAllUsers(response.data); // Carregar todos os usuários
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // Função para filtrar usuários com base no termo de pesquisa
  const filterUsers = (term) => {
    if (term) {
      const filtered = allUsers.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
      setIsDropdownOpen(filtered.length > 0); // Abrir dropdown se houver resultados
    } else {
      setFilteredUsers([]); // Limpar a lista se o termo estiver vazio
      setIsDropdownOpen(false); // Fechar o dropdown
    }
  };

  // Usa o useEffect para buscar todos os usuários ao montar o componente
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Usa o useEffect para aplicar o filtro quando o termo de busca mudar
  useEffect(() => {
    filterUsers(searchTerm);
  }, [searchTerm]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false); // Fechar o dropdown se clicar fora
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reposicionar o dropdown abaixo do input
  useEffect(() => {
    if (inputRef.current) {
      const { bottom, left, width } = inputRef.current.getBoundingClientRect();
      setDropdownPosition({ top: bottom + window.scrollY, left, width });
    }
  }, [isDropdownOpen]);

  // Dropdown renderizado fora do fluxo do Header
  const renderDropdown = () => {
    if (!isDropdownOpen || filteredUsers.length === 0) return null;

    return ReactDOM.createPortal(
      <ul
        ref={dropdownRef}
        className="absolute bg-white shadow-lg rounded-lg z-50"
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
        }}
      >
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => {
              console.log("Usuário selecionado:", user.name);
              setSearchTerm(user.name); // Insere o nome do usuário no campo de busca
              setIsDropdownOpen(false); // Fecha a lista após a seleção
            }}
          >
            {user.name} ({user.username})
          </li>
        ))}
      </ul>,
      document.body // Renderiza o dropdown no body
    );
  };

  return (
    <header className="relative w-full" style={{ backgroundColor }}>
      <div
        className="relative w-11/12 mx-auto p-5 flex justify-around items-center rounded-b-lg overflow-hidden"
        style={{
          color: textColor,
          borderTop: "none",
        }}
      >
        {/* Vídeo como fundo dentro da div */}
        <video
          src={videoBackground}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* Conteúdo do Header */}
        <div className="relative z-10 flex items-center">
          <img src="/Frame.png" alt="Tech Connect" className="w-40" />
        </div>

        <div className="relative z-10 flex items-center w-1/2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar usuário"
            className="rounded-lg p-2 pl-10 pr-10 w-full bg-white border-2 border-[#6B4DE6]"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(#EFE7F7, #EFE7F7), linear-gradient(to right, #6B4DE6, #4DADE6)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogout}
          className="relative z-10 px-7 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: textColor,
            border: "2px solid transparent",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MdOutlineLogout size={20} color="white" />
        </button>
      </div>

      {renderDropdown()} {/* Renderizando o dropdown */}
    </header>
  );
}

export default Header;