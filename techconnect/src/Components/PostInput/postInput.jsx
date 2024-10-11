import React, { useState, useEffect } from "react";
import { FaPhotoFilm } from "react-icons/fa6";

function PostInput({ textColor, onPostSubmit, backgroundColor }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(""); // Estado para armazenar o userId do usuário logado

    // Captura o userId do localStorage quando o componente é montado
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData && storedUserData.id) {
            setUserId(storedUserData.id);
        }
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePostSubmit = async () => {
        if (!content && !selectedFile) {
            alert("Por favor, insira um conteúdo ou selecione um arquivo.");
            return;
        }

        // Primeiro, faz o upload do arquivo para o servidor de upload
        const formData = new FormData();
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        try {
            let filePath = "";
            if (selectedFile) {
                const uploadResponse = await fetch(
                    "http://localhost:4000/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!uploadResponse.ok) {
                    throw new Error("Falha ao fazer upload da imagem.");
                }

                const fileData = await uploadResponse.json();
                filePath = fileData.filePath;
            }

            // Agora, cria o novo post no JSON Server
            const postResponse = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    postImage: filePath, // Caminho do arquivo (imagem ou vídeo)
                    hashtags: "", // Adicione as hashtags se necessário
                    userId: userId // Inclui o userId do usuário logado no post
                }),
            });

            if (!postResponse.ok) {
                throw new Error("Falha ao criar o post.");
            }

            const newPost = await postResponse.json();
            // Passa os dados para o callback (onPostSubmit) no pai para atualizar a lista de posts
            onPostSubmit({
                ...newPost,
                // profileImage: profileImage1, // Garantir que o profileImage esteja presente
                user: "Usuário Atual", // Ou o nome do usuário logado
            });

            // Limpa o campo de texto e o arquivo após o post
            setContent("");
            setSelectedFile(null);
        } catch (error) {
            console.error("Erro ao fazer upload ou salvar post:", error);
        }
    };

    return (
        <div
            className="w-full p-3 border-2 rounded-lg mt-10 mb-10"
            style={{
                backgroundColor: backgroundColor,
                border: "2px dashed #4DADE6",
            }}
        >
            <div className="flex items-center justify-between space-x-4">
                {/* Input de texto */}
                <input
                    type="text"
                    placeholder="Digite aqui..."
                    className="p-3 w-full rounded-lg"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        backgroundColor: "#EFE7F7",
                        border: "2px solid transparent",
                        backgroundImage:
                            "linear-gradient(#EFE7F7, #EFE7F7), linear-gradient(to right, #6B4DE6, #4DADE6)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
                    }}
                />

                {/* Ícone de imagem (Upload de Arquivo) */}
                <label
                    htmlFor="file-upload"
                    className="p-2 rounded-lg flex justify-center items-center"
                    style={{
                        backgroundColor: "#EFE7F7",
                        border: "2px solid #4DADE6",
                        cursor: "pointer",
                    }}
                >
                    <FaPhotoFilm />
                </label>

                {/* Input de arquivo escondido */}
                <input
                    id="file-upload"
                    type="file"
                    accept="image/,video/" 
                    style={{ display: "none" }} 
                    onChange={handleFileChange}
                />

                {/* Botão Postar */}
                <button
                    className="px-6 py-2 rounded-lg text-white font-semibold"
                    style={{
                        backgroundColor: textColor,
                        border: "2px solid transparent",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={handlePostSubmit}
                >
                    Postar
                </button>
            </div>

            {/* Exibição do nome do arquivo selecionado */}
            {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
        </div>
    );
}

export default PostInput;
