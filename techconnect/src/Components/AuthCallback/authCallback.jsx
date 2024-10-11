import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const clientId = "Ov23liKbuoITznzP1uoq";
const clientSecret = "f442fa6b95cee1c4b501e1c8ff87f8795a03d658";
const redirectUri = "http://localhost:3001/auth/callback";

const AuthCallback = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const GithubLogin = async (code) => {
    try {
      const response = await fetch("/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("github_token", data.access_token);
        const userData = await fetchUserData(data.access_token);
        if (userData) {
          await saveUserToDB(userData);
        }

        navigate("/home");
      } else {
        setError("Erro ao obter o token de acesso.");
      }
    } catch (err) {
      console.error("Erro no login com GitHub", err);
      setError("Falha ao autenticar com GitHub.");
    }
  };

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();

      if (!userData.email) {
        const emailsResponse = await fetch(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const emailsData = await emailsResponse.json();

        const primaryEmail = emailsData.find(
          (email) => email.primary && email.verified
        );
        userData.email = primaryEmail ? primaryEmail.email : null;
      }

      return userData;
    } catch (err) {
      console.error("Erro ao buscar dados do usuário do GitHub", err);
      setError("Falha ao obter informações do usuário.");
      return null;
    }
  };

  const saveUserToDB = async (userData) => {
    try {
      const existingUserResponse = await fetch(
        `http://localhost:3000/usuarios?id=${userData.id}`
      );
      const existingUsers = await existingUserResponse.json();

      if (existingUsers.length > 0) {
        console.log(
          "Usuário já existente no banco de dados:",
          existingUsers[0]
        );
        return;
      }

      const user = {
        id: userData.id,
        login: userData.login,
        nameGitHub: userData.name,
        avatar_url: userData.avatar_url,
        email: userData.email,
        created_at: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        setError("Falha ao salvar informações do usuário no banco de dados.");
      } else {
        console.log("Usuário salvo com sucesso no banco de dados.");
      }
    } catch (err) {
      console.error("Erro ao salvar dados do usuário no JSON Server", err);
      setError("Falha ao salvar informações no banco de dados.");
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        GithubLogin(code);
      }
    }
  }, []);

  return null;
};

export default AuthCallback;
