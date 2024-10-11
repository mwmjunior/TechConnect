import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";

// URL da imagem padrão semelhante à do GitHub
const defaultProfileImage =
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";

function Suggestions({ backgroundColor, textColor, loggedInUserId }) {
    const [suggestions, setSuggestions] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Função para buscar os usuários do db.json
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const response = await fetch("http://localhost:3000/usuarios"); // URL do JSON Server
                const data = await response.json();

                console.log("Todos os usuários:", data);
                console.log("ID do usuário logado:", loggedInUserId);

                // Filtrando o usuário logado
                const filteredSuggestions = data.filter(
                    (user) => user.id !== loggedInUserId
                );

                console.log("Sugestões filtradas:", filteredSuggestions);
                setSuggestions(filteredSuggestions); // Atualizando o estado com os usuários filtrados
            } catch (error) {
                console.error("Erro ao buscar sugestões:", error);
            }
        };

        fetchSuggestions();
    }, [loggedInUserId]); // Dependência para re-fetch caso o ID do usuário logado mude

    return (
        <div
            className="w-72 ml-4 rounded-lg p-4 h-[300px] flex flex-col rounded-b-lg"
            style={{
                backgroundColor,
                color: textColor,
            }}
        >
            <h3 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                Sugestões
            </h3>
            <ul className="space-y-4 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={suggestion.id}
                        className="flex items-center justify-between p-2 rounded-lg transition-all duration-300 ease-in-out shadow-lg"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            backgroundColor:
                                hoveredIndex === index ? "#E0E0E0" : "white",
                            transition:
                                "background-color 0.3s ease, transform 0.3s ease",
                        }}
                    >
                        <div className="flex items-center">
                            <img
                                src={
                                    suggestion.imgSrc
                                        ? suggestion.imgSrc
                                        : defaultProfileImage
                                } // Usando imagem padrão se não houver imgSrc
                                alt={suggestion.username}
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <span
                                className="text-sm font-semibold"
                                style={{ color: textColor }}
                            >
                                {suggestion.username}
                            </span>
                        </div>
                        <FaUserPlus className="text-primary cursor-pointer" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Suggestions;
