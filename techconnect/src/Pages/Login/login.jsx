import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Image/logomarca.png";
import videoBackground from "../../Assets/Image/4413-179384184.mp4";
import { InputLogin } from "../../Components/Input";
import { Button } from "../../Components/Button/button";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const clientId = "Ov23liKbuoITznzP1uoq";
  const redirectUri = "http://localhost:3001/auth/callback";

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Usuário e senha são obrigatórios.");
      return;
    }

    const usernameValidate = /^[a-zA-Z0-9]+$/;
    if (!usernameValidate.test(username.trim())) {
      setErrorMessage("Nome de usuário inválido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const users = await response.json();

      const user = users.find(
        (user) =>
          user.username === username.trim() && user.password === password.trim()
      );

      if (user) {
        if (rememberMe) {
          localStorage.setItem("username", username.trim());
          localStorage.setItem("password", password.trim());
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }

        localStorage.setItem("userData", JSON.stringify(user));
        navigate("/home");
        console.log(user);
        
      } else {
        setErrorMessage("Usuário ou senha incorretos!");
      }
    } catch (error) {
      setErrorMessage("Erro ao realizar o login. Tente novamente.");
      console.error(error);
    }
  };

  const GithubLogin = () => {
    const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user,user:email`;
    window.location.href = githubAuthURL;
  };

  useEffect(() => {
    if (errorMessage) {
      document.body.style.overflow = "hidden";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setErrorMessage("");

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true); // Mantém o checkbox marcado
    }
  }, []);

  return (
    <div className="font-comfortaa md:h-screen relative">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <video
          src={videoBackground}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          style={{
            zIndex: "-1",
            pointerEvents: "none",
            objectFit: "cover",
            objectPosition: "center right",
          }}
        />

        <div className="flex items-center md:p-8 p-6 bg-white md:rounded-tr-[55px] md:rounded-br-[55px] h-full">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress={undefined}
            limit={3}
            style={{ position: "fixed", zIndex: 9999, overflow: "hidden" }}
          />

          <form
            className="max-w-lg w-full mx-auto"
            onSubmit={LoginUser}
            noValidate
          >
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logomarca" className="w-[225px] h-[75px]" />
            </div>
            <InputLogin
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entre com seu usuário"
              required
            >
              Usuário
            </InputLogin>

            <InputLogin
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entre com sua senha"
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            >
              Senha
            </InputLogin>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="Lembre-me"
                  name="Lembre-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="Lembre-me"
                  className="text-gray-800 ml-3 block text-sm font-comfortaa"
                >
                  Lembre-me
                </label>
              </div>
            </div>

            <div className="mt-12">
              <Button
                styles="w-[100%] h-[52px] bg-[#6B4DE6] text-white rounded-lg border-2 border-[#6B4DE6] font-baloo text-[16px] mb-6 mt-4"
                type="submit"
              >
                Entrar
              </Button>
            </div>

            <div className="flex items-center justify-between w-full mb-6">
              <span className="text-black text-sm font-comfortaa text-[16px]">
                Seu Primeiro Acesso?
              </span>
              <a
                href="/register"
                className="bg-gradient-to-r from-[#6B4DE6] to-[#4DADE6] bg-clip-text text-transparent font-comfortaa text-[16px] hover:underline"
              >
                Registre-se Aqui
              </a>
            </div>

            <div className="flex items-center w-full mb-6">
              <div className="border-t border-black flex-grow mr-3"></div>{" "}
              <span className="text-black text-sm font-comfortaa text-[16px]">
                ou{" "}
              </span>
              <div className="border-t border-black flex-grow ml-3"></div>{" "}
            </div>

            <button
              type="button"
              onClick={GithubLogin}
              className="flex items-center justify-center w-[100%] h-[52px] bg-[#F5F0FA] rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                borderRadius: "10px",
              }}
            >
              <span
                className="text-black font-comfortaa text-[16px] flex items-center justify-center"
                style={{
                  width: "200px",
                  height: "52px",
                }}
              >
                <GitHubIcon className="mr-2 text-black " />
                GitHub
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
