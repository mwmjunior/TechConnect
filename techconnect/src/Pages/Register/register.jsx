import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import videoBackground from "../../Assets/Image/7101912-uhd_2560_1440_25fps.mp4"; 
import backgroudRegister from "../../Assets/Image/ilustracao-do-conceito-do-modo-escuro 1 (1).svg"; 
import { Input, InputLogin } from "../../Components/Input";
import { Button } from "../../Components/Button/button";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const UserExists = async () => {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const users = await response.json();
      return {
        usernameExists: users.some(
          (user) => user.username === username.trim().toLocaleLowerCase()
        ),
        emailExists: users.some(
          (user) => user.email === email.trim().toLocaleLowerCase()
        ),
      };
    } catch (error) {
      throw new Error("Erro ao verificar usuário existente.");
    }
  };

  const registerToServer = async () => {
    try {
      const data = {
        id: uuid(),
        username: username.trim().toLocaleLowerCase(),
        email: email.trim().toLocaleLowerCase(),
        name: name.trim(),
        password: password.trim(),
        created_at: new Date().toISOString(),
        avatar_url: avatar_url.trim()
      };
  
      const registerUser = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!registerUser.ok) {
        throw new Error("Erro ao cadastrar o usuário.");
      }
    } catch (error) {
      throw error;
    }
  };
  

  const RegisterUser = async (e) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !email.trim() ||
      !name.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    const nameValidate = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nameValidate.test(name.trim())) {
      setErrorMessage("O nome deve conter apenas letras.");
      return;
    }

    const usernameValidate = /^[a-zA-Z0-9]+$/;
    if (!usernameValidate.test(username.trim())) {
      setErrorMessage("Nome de usuário inválido.");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage("As senhas não correspondem!");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email.trim())) {
      setErrorMessage("E-mail inválido.");
      return;
    }

    try {
      const { usernameExists, emailExists } = await UserExists();

      if (usernameExists) {
        setErrorMessage("Nome de usuário em uso.");
        return;
      }

      if (emailExists) {
        setErrorMessage("E-mail já cadastrado.");
        return;
      }

      await registerToServer();
      navigate("/login");
    } catch (error) {
      setErrorMessage("Erro ao cadastrar o usuário. Tente novamente.");
      console.error(error);
    }
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

  return (
    <div className="relative h-screen items-center flex justify-center px-5 lg:px-0 font-comfortaa ">
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
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1 relative z-10">
        <div className="flex-1 text-center hidden md:flex" style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <img
            src={backgroudRegister}
            alt="Background Register"
            className="h-full object-cover rounded-l-lg"
            style={{ width: "600px", height: "600px" }}
          />
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6">
          <div className="flex flex-col items-center">
            <div className="w-full flex-1">
              <form className="mx-auto max-w-xl flex flex-col" noValidate onSubmit={RegisterUser}>
                <InputLogin
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  styles="mb-0"
                >
                  Usuário
                </InputLogin>
                <InputLogin
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  styles="mb-0"
                >
                  E-mail
                </InputLogin>
                <InputLogin
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  styles="mb-0"
                >
                  Nome
                </InputLogin>
                <InputLogin
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  styles="mb-0"
                >
                  Senha
                </InputLogin>
                <InputLogin
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  styles="mb-0"
                >
                  Confirmar Senha
                </InputLogin>
                <Button
                  styles="w-[100%] h-[52px] bg-[#6B4DE6] text-white rounded-lg border-2 border-[#6B4DE6] font-baloo text-[16px] mt-5"
                  type="submit"
                >
                  Cadastrar
                </Button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Você já tem uma conta?{" "}
                  <span
                    className="text-blue-900 bg-gradient-to-r from-[#6B4DE6] to-[#4DADE6] bg-clip-text text-transparent font-comfortaa text-[11px] hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
