import React, { useState, useEffect } from "react";
import { FaInstagram, FaDribbble, FaTiktok, FaGithub } from "react-icons/fa";

function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({ name: "", email: "", bio: "" });

  // Estados para controlar os links das redes sociais e se os campos estão editáveis
  const [inputValues, setInputValues] = useState({
    instagram: "",
    dribbble: "",
    tiktok: "",
    github: "",
  });
  const [isEditable, setIsEditable] = useState({
    instagram: false,
    dribbble: false,
    tiktok: false,
    github: false,
  });

  // Limpar os estados do modal sempre que o modal for aberto com um novo usuário
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || ""); 
      setBio(user.bio || ""); 
      setInputValues({
        instagram: user.instagram || "",
        dribbble: user.dribbble || "",
        tiktok: user.tiktok || "",
        github: user.github || "",
      });
    } else {
      // Limpa os campos quando não há usuário
      setName("");
      setEmail("");
      setBio("");
      setInputValues({
        instagram: "",
        dribbble: "",
        tiktok: "",
        github: "",
      });
    }
  }, [user]); 

  /* Carrega o tempo de mensagem de erro */
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Função para permitir edição ao clicar no input
  const handleInputClick = (platform) => {
    setIsEditable({ ...isEditable, [platform]: true });
  };

  // Função para capturar o valor digitado nas redes sociais
  const handleInputChange = (e, platform) => {
    setInputValues({ ...inputValues, [platform]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = { name: "", email: "", bio: "", instagram: "", dribbble: "", tiktok: "", github: "" };
    let isValid = true;
    let errorMsg = ""; // Variável para armazenar a mensagem de erro
  
    if (!name.trim()) {
      formErrors.name = "Nome é obrigatório";
      errorMsg = "Nome é obrigatório";
      isValid = false;
    }
  
    // Validação de e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      formErrors.email = "E-mail inválido";
      errorMsg = "E-mail inválido";
      isValid = false;
    }
  
    // Validação de bio
    if (bio.length < 2) {
      formErrors.bio = "A bio deve ter no mínimo 10 caracteres";
      errorMsg = "A bio deve ter no mínimo 10 caracteres";
      isValid = false;
    }
  
    // Validação dos links das redes sociais (opcional, mas precisa ser uma URL válida)
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (inputValues.instagram && !urlPattern.test(inputValues.instagram)) {
      formErrors.instagram = "Link do Instagram inválido";
      errorMsg = "Link do Instagram inválido";
      isValid = false;
    }
  
    if (inputValues.dribbble && !urlPattern.test(inputValues.dribbble)) {
      formErrors.dribbble = "Link do Dribbble inválido";
      errorMsg = "Link do Dribbble inválido";
      isValid = false;
    }
  
    if (inputValues.tiktok && !urlPattern.test(inputValues.tiktok)) {
      formErrors.tiktok = "Link do TikTok inválido";
      errorMsg = "Link do TikTok inválido";
      isValid = false;
    }
  
    if (inputValues.github && !urlPattern.test(inputValues.github)) {
      formErrors.github = "Link do GitHub inválido";
      errorMsg = "Link do GitHub inválido";
      isValid = false;
    }
  
    setErrors(formErrors);
  
    // Se houver uma mensagem de erro, definimos no estado para que o useEffect a exiba
    if (!isValid) {
      setErrorMessage(errorMsg);
    }
    console.log(formErrors);
    
    return isValid;
  };
  

  // Função para validar o formulário e salvar os valores
  const handleSubmit = () => {
    console.log("handleSubmit foi chamada"); // Adicione este log para verificar
    if (validateForm()) {
      onSave({
        name,
        email,
        bio,
        instagram: inputValues.instagram,
        dribbble: inputValues.dribbble,
        tiktok: inputValues.tiktok,
        github: inputValues.github,
      });
      onClose(); // Fecha o modal após o salvamento
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-lg relative "> 
        <button
          className="absolute top-4 right-8 text-black text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Formulário de Edição */}
        <label className="block text-sm font-medium mb-2 text-black">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="relative bg-white w-full h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2 mb-4"
          style={{
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        />

        <label className="block text-sm font-medium mb-2 text-black">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="relative bg-white w-full h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2 mb-4"
          style={{
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        />

        <label className="block text-sm font-medium mb-2 text-black">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Digite sua bio"
          className="relative bg-white w-full h-[100px] rounded-lg flex items-center justify-center overflow-hidden p-2 mb-4"
          style={{
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        />

        {/* Inputs das Redes Sociais */}
        <div className="grid grid-cols-2 gap-4 justify-items-center mb-6">
          {/* Instagram Input */}
          <div
            className="relative bg-white w-[210px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {!isEditable.instagram || (
              <FaInstagram
                alt="Instagram"
                className="w-6 h-6 absolute"
                onClick={() => handleInputClick("instagram")}
              />
            )}
            <input
              type="text"
              value={inputValues.instagram}
              onChange={(e) => handleInputChange(e, "instagram")}
              onClick={() => handleInputClick("instagram")}
              className={`w-full h-full bg-transparent text-center ${
                !isEditable.instagram ? "cursor-pointer" : ""
              }`}
              style={{ outline: "none" }}
            />
          </div>

          {/* Dribbble Input */}
          <div
            className="relative bg-white w-[210px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {!isEditable.dribbble || (
              <FaDribbble
                alt="Dribbble"
                className="w-6 h-6 absolute"
                onClick={() => handleInputClick("dribbble")}
              />
            )}
            <input
              type="text"
              value={inputValues.dribbble}
              onChange={(e) => handleInputChange(e, "dribbble")}
              onClick={() => handleInputClick("dribbble")}
              className={`w-full h-full bg-transparent text-center ${
                !isEditable.dribbble ? "cursor-pointer" : ""
              }`}
              style={{ outline: "none" }}
            />
          </div>

          {/* TikTok Input */}
          <div
            className="relative bg-white w-[210px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {!isEditable.tiktok || (
              <FaTiktok
                alt="TikTok"
                className="w-6 h-6 absolute"
                onClick={() => handleInputClick("tiktok")}
              />
            )}
            <input
              type="text"
              value={inputValues.tiktok}
              onChange={(e) => handleInputChange(e, "tiktok")}
              onClick={() => handleInputClick("tiktok")}
              className={`w-full h-full bg-transparent text-center ${
                !isEditable.tiktok ? "cursor-pointer" : ""
              }`}
              style={{ outline: "none" }}
            />
          </div>

          {/* GitHub Input */}
          <div
            className="relative bg-white w-[210px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            {!isEditable.github || (
              <FaGithub
                alt="GitHub"
                className="w-6 h-6 absolute"
                onClick={() => handleInputClick("github")}
              />
            )}
            <input
              type="text"
              value={inputValues.github}
              onChange={(e) => handleInputChange(e, "github")}
              onClick={() => handleInputClick("github")}
              className={`w-full h-full bg-transparent text-center ${
                !isEditable.github ? "cursor-pointer" : ""
              }`}
              style={{ outline: "none" }}
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-around gap-4 mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
