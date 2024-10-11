import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDribbble, FaGithub, FaInstagram, FaPencilAlt, FaTiktok } from "react-icons/fa";
import EditProfileModal from "../../Components/EditProfileModal/EditProfileModal";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  // Carrega os dados do usuário a partir do localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
      console.log(userData);
    }
  }, []);

  // Busca os posts do usuário pelo ID no db.json
  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:3000/posts?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) =>
          console.error("Erro ao buscar posts do usuário:", error)
        );
    }
  }, [user]);

  // Função para abrir o modal de edição de perfil
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal de edição de perfil
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para salvar as alterações do perfil no localStorage e no db.json
  const handleSave = async (updatedUser) => {
    try {
      // Atualiza o estado do usuário com os novos dados
      setUser(updatedUser);

      // Salva os dados atualizados no localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      // Atualiza o perfil no db.json
      const response = await fetch(
        `http://localhost:3000/usuarios/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar o perfil no servidor.");
      }

      // Fecha o modal após salvar
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar as alterações do perfil:", error);
    }
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch("http://localhost:3000/usuarios");
          const data = await response.json();
          const currentUser = data[0];
          setUser(currentUser);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  // Função para tratar a seleção do arquivo de imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Função para salvar o avatar após o upload
  const handleAvatarSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile); // Adiciona o arquivo ao formData

      try {
        // Envia o arquivo para o servidor JSON (usando a rota de upload)
        const response = await fetch("http://localhost:4000/uploads", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao fazer upload da imagem.");
        }

        const data = await response.json();
        const avatarUrl = `/uploads/${data.fileName}`; // Caminho da imagem salva

        // Atualiza o usuário com o novo avatar
        const updatedUser = { ...user, avatar_url: avatarUrl };
        setUser(updatedUser);

        // Salva no localStorage
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        // Atualiza o campo avatar_url no db.json
        await fetch(`http://localhost:3000/usuarios/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
      } catch (error) {
        console.error("Erro ao salvar a imagem:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 h-screen">
      <div className="w-full max-w-7xl">
        {/* Capa */}
        <div
          className="w-full h-48 bg-purple-400 relative rounded-b-lg"
          style={{
            backgroundImage: user?.coverImage ? `url(${user.coverImage})` : "",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Ícone de seta para voltar à Home */}
          <FaArrowLeft
            onClick={handleBackToHome}
            className="absolute top-4 left-4 cursor-pointer text-white text-3xl"
            title="Voltar para Home"
          />
          <div></div>
          {/* Avatar */}
          <img
            src={user?.avatar_url || "default-avatar.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full absolute bottom-[-4rem] left-10 border-4 border-black"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          />
          {/* Ícone de lápis para editar avatar */}
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 left-40 cursor-pointer p-1 rounded-full"
            title="Alterar Avatar"
          >
            <FaPencilAlt className="text-gray-600" />
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Dados do usuário */}
        <div className="flex justify-between items-center mt-16 p-6 bg-white shadow-md rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">{user?.name || user?.login}</h1>
            <p className="text-gray-500">
              @{user?.username || user?.nameGitHub}
            </p>
            <p className="text-gray-500">
              Usuário desde:{" "}
              {new Date(user?.created_at).toLocaleDateString() || "19/09/2024"}
            </p>
            <p className="mt-4 text-sm text-gray-700">Bio: {user?.bio}</p>
          </div>
          <div className="flex flex-col space-y-2 items-center">
            <button
              onClick={openModal}
              className="btn btn-primary w-[210px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              Editar Perfil
            </button>
            {/* Redes sociais */}

            {user?.instagram && (
              <button
                className="btn btn-primary w-[170px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
                style={{
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <a
                  href={user.instagram}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram/>
                </a>
              </button>
            )}

            {user?.tiktok && (
              <button
                className="btn btn-primary w-[170px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
                style={{
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <a
                  href={user.tiktok}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok/>
                </a>
              </button>
            )}
            {user?.dribbble && (
              <button
                className="btn btn-primary w-[170px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
                style={{
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                
                <a
                  href={user.dribbble}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDribbble/>
                </a>
              </button>
            )}
            {user?.github && (
              <button
              className="btn btn-primary w-[170px] h-[43px] rounded-lg flex items-center justify-center overflow-hidden p-2"
                style={{
                  border: "2px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <a
                  href={user.github}
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub/>
                </a>
              </button>
            )}
          </div>
        </div>

        {/* Lista de posts do usuário */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={
                    post.postImage
                      ? `http://localhost:4000${post.postImage}`
                      : "default-post.png"
                  } // Concatenando com a URL do servidor de uploads
                  alt="Post"
                  className="w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-gray-700">
                  {post.content || "Post sem conteúdo"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum post encontrado.</p>
          )}
        </div>

        {/* Modal de Edição de Perfil */}
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={user}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default Profile;
