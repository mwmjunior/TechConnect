import container from "../../Assets/Image/container.svg";
import {
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"; // Importar ícones
import banner from "../../Assets/Image/banner.png";
import { DegradeText, Text } from "../../Components/Text/text";
import { GradientBorderButton } from "../../Components/Button/button";
import { Footer } from "../../Components/Footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [isLightMode, setIsLightMode] = useState(false); // Estado para controlar o modo
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMode = () => {
    setIsLightMode(!isLightMode); // Alternar o estado
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alternar o estado do menu
  };

  // Definindo cores com base no estado
  const backgroundColor = isLightMode ? "#FFFFFF" : "#352F4C"; // Cor de fundo da página
  const headerBackgroundColor = isLightMode ? "#352F4C" : "transparent"; // Cor de fundo do cabeçalho
  const textColor = isLightMode ? "#FFF" : "#FFF"; // Cor do texto
  const borderColor = isLightMode ? "#7E63E6" : "#7E63E6"; // Cor da borda
  const borderColorReverse = isLightMode ? "#FFF" : "#FFF"; // Cor da borda reversa

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 0) {
        header.classList.add("bg-opacity-80");
      } else {
        header.classList.remove("bg-opacity-80");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor }} className="min-h-screen">
      <header id="header">
        <div
          className="w-full h-[80px] flex items-center justify-between px-4 "
          style={{ backgroundColor: headerBackgroundColor }}
        >
          <button className="w-[120px]">
            <img src="/Frame.svg" alt="Tech Connect" className="w-16" />
          </button>

          {/* Botão do menu para telas pequenas */}
          <button
            className="text-white text-2xl focus:outline-none md:hidden"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>

          {/* Links de navegação visíveis para telas maiores */}
          <div
            className="hidden md:flex gap-4 items-center"
            style={{ color: textColor }}
          >
            <a
              href="#topo"
              className="hover:border-b-2"
              style={{ borderBottomColor: borderColor }}
            >
              <Text style={{ color: textColor }}>Topo</Text>
            </a>
            <a
              href="#sobre"
              className="hover:border-b-2"
              style={{ borderBottomColor: borderColor }}
            >
              <Text style={{ color: textColor }}>Sobre</Text>
            </a>
            <a
              href="#parceiros"
              className="hover:border-b-2"
              style={{ borderBottomColor: borderColor }}
            >
              <Text style={{ color: textColor }}>Parceiros</Text>
            </a>
          </div>

          {/* Botões de login e cadastro */}
          <div className="hidden md:flex items-center">
            <button
              className="mr-6 hover:border-b-2"
              style={{ borderBottomColor: borderColorReverse }}
              onClick={() => navigate("/login")}
            >
              <DegradeText>login</DegradeText>
            </button>
            <button onClick={() => navigate("/register")}>
              <GradientBorderButton styles="bg-transparent hover:text-[#FFF]">
                <Text styles="hover:text-white">cadastrar</Text>
              </GradientBorderButton>
            </button>

            <FontAwesomeIcon
              icon={isLightMode ? faSun : faMoon}
              style={{
                fontSize: "20px",
                color: isLightMode ? "#FCC41D" : "#FFF",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={toggleMode}
            />
          </div>
        </div>

        {/* Menu que aparece quando o ícone de hambúrguer é clicado (somente em telas pequenas) */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center bg-[#352F4C] w-full py-4">
            <a href="#sobre" className="mb-4 text-white" onClick={toggleMenu}>
              Sobre
            </a>
            <a
              href="#parceiros"
              className="mb-4 text-white"
              onClick={toggleMenu}
            >
              Parceiros
            </a>
            <button
              className="mb-4 text-white"
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
            >
              login
            </button>
            <button
              className="mb-4 text-white"
              onClick={() => {
                navigate("/register");
                toggleMenu();
              }}
            >
              cadastrar
            </button>
            <FontAwesomeIcon
              icon={isLightMode ? faSun : faMoon}
              style={{
                fontSize: "25px",
                color: isLightMode ? "#FCC41D" : "#FFF",
                cursor: "pointer",
              }}
              onClick={toggleMode}
            />
          </div>
        )}
      </header>

      <section
        id="topo"
        className="flex flex-col md:flex-row items-center justify-center mt-10 p-4"
      >
        <div className="text-center md:text-left">
          <Text styles="text-3xl sm:text-[60px]">
            <DegradeText styles="text-3xl sm:text-[60px] leading-none">
              <span className={`text-${isLightMode ? "black" : "white"}`}>
                uma{" "}
              </span>
              <span className={`text-${textColor}`}>nova</span>
            </DegradeText>
            <span className={`text-${isLightMode ? "black" : "white"}`}>
              {" "}
              rede social
            </span>
          </Text>
          <Text
            style={{ color: textColor }}
            styles="mt-4 text-2xl leading-normal"
          >
            <span className={`text-${isLightMode ? "black" : "white"}`}>
              Perfeita para designers e
            </span>{" "}
            <br />
            <span className={`text-${isLightMode ? "black" : "white"}`}>
              desenvolvedores
            </span>
          </Text>
          <GradientBorderButton styles="w-[300px] md:w-[422px] mt-8">
            <button
              onClick={() => {
                navigate("/login");
                toggleMenu();
              }}
            >
              <Text styles="hover:text-black">Se inscrever</Text>
            </button>
          </GradientBorderButton>
        </div>

        <img
          src={banner}
          alt="banner"
          className="w-full md:w-auto mt-6 md:mt-0"
        />
      </section>

      <section id="sobre" className="p-4 max-w-[800px] mx-auto">
        <Text
          styles={`font-bold text-center mt-8 mb-[50px] text-[30px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Conecte-se com Criativos e Desenvolvedores Inovadores
        </Text>

        <Text
          styles={`text-center mt-[5px] text-[16px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Uma nova rede social projetada especialmente para designers e
          desenvolvedores. Aqui, criatividade encontra tecnologia para criar um
          ambiente onde você pode se inspirar, colaborar e crescer.
        </Text>

        <Text
          styles={`font-bold text-center mt-[5px] text-[20px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          O que você encontra na nossa plataforma?
        </Text>

        <Text
          styles={`text-center mt-[5px] text-[16px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Portfólios Inspiradores: Exiba seus projetos e descubra o trabalho de
          outros designers e desenvolvedores do mundo todo.
          <br />
          Conexões Profissionais: Colabore com outros criativos, troque ideias e
          encontre oportunidades de trabalho e parceria.
          <br />
          Comunidades Ativas: Participe de discussões técnicas e criativas,
          compartilhe insights sobre as últimas tendências de design e
          desenvolvimento.
          <br />
          Desenvolvimento Contínuo: Acesse recursos exclusivos, tutoriais e
          workshops focados em habilidades técnicas e criativas, ajudando você a
          se manter atualizado em um setor que muda rapidamente.
        </Text>

        <Text
          styles={`font-bold text-center mt-[5px] text-[20px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Por que nós?
        </Text>

        <Text
          styles={`text-center mt-[5px] text-[16px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Nossa plataforma foi criada para unir o que há de melhor no design e
          no desenvolvimento. Não é apenas mais uma rede social – é uma
          comunidade onde as habilidades técnicas e criativas coexistem,
          permitindo que você mostre seus projetos, aprenda com outros
          profissionais e construa uma rede valiosa de contatos.
        </Text>

        <Text
          styles={`text-center mt-[5px] text-[16px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Seja você um designer que busca colaboração em novos projetos ou um
          desenvolvedor que quer mostrar suas soluções inovadoras, aqui é o
          lugar onde suas ideias ganham vida.
        </Text>

        <Text
          styles={`font-bold text-center mt-8 text-[16px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Junte-se agora e faça parte de uma comunidade que valoriza a inovação!
        </Text>
      </section>

      <section
        id="parceiros"
        className="w-full max-w-4xl mx-auto p-4 mt-10 md:mt-[70px]"
      >
        <Text
          styles={`font-bold text-center mb-[50px] text-[30px] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          Conheça nossos parceiros
        </Text>
        <img src={container} alt="Container" className="w-full" />
      </section>

      <hr className="border-white" />

      <Footer />
    </div>
  );
};
