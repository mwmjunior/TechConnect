import { useState } from "react"; // Importar useState
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; // Importar ícones
import { GradientBorderButton } from "../Button/button";
import { DegradeText, Text } from "../Text/text";

const HeaderLanding = (props) => {
    const [isLightMode, setIsLightMode] = useState(false); // Estado para controlar o modo

    const toggleMode = () => {
        setIsLightMode(!isLightMode); // Alternar o estado
    };

    // Definindo cores com base no estado
    const backgroundColor = isLightMode ? "#FFFFFF" : "#352F4C";
    const textColor = isLightMode ? "#000000" : "#FFFFFF";
    const borderColor = isLightMode ? "#7E63E6" : "#7E63E6";
    const borderColorReverse = isLightMode ? "#000000" : "#FFFFFF";
    const iconColor = isLightMode ? "#FCC41D" : "#7E63E6";
    return (
        <header>
            <div 
                className={`${props.styles} bg-[${backgroundColor}] w-full h-[100px] flex items-center justify-between`}
                style={{ backgroundColor }}
            >
                <button className="m-5 w-[250px]">
                    <img src="/Frame.png" alt="Tech Connect" className="w-20" />
                </button>

                <div className="flex m-5 gap-5 items-center justify-center" style={{ color: textColor }}>
                    <button>
                        <a href="#sobre">
                            <button className="hover:border-b-2" style={{ borderBottomColor: borderColor }}>
                                <Text style={{ color: textColor }}>Sobre</Text>
                            </button>
                        </a>
                    </button>
                    <button>
                        <a href="#parceiros">
                            <button className="hover:border-b-2" style={{ borderBottomColor: borderColor }}>
                                <Text style={{ color: textColor }}>Parceiros</Text>
                            </button>
                        </a>
                    </button>
                </div>

                <div className="mr-10">
                    <button className="mr-10 hover:border-b-2" style={{ borderBottomColor: borderColorReverse }}>
                        <DegradeText style={{ color: textColor }}>login</DegradeText>
                    </button>

                    <GradientBorderButton styles="bg-transparent hover:text-[#FFF]">
                        <Text style={{ color: textColor }}>Cadastrar</Text>
                    </GradientBorderButton>

                    <FontAwesomeIcon
                        icon={isLightMode ? faSun : faMoon}
                        style={{
                            justifyContent: "center",
                            textAlign: "center",
                            fontSize: "25px",
                            color: iconColor,
                            marginLeft: "10px",
                        }}
                        onClick={toggleMode}
                    />
                </div>
            </div>
        </header>
    );
};

export default HeaderLanding;
