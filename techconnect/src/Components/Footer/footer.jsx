import { Text } from "../Text/text"

export const Footer = (props) => {
    return(
        <footer className={`${props.styles} justify-center items-center flex bg-[#352F4C] w-full h-[100px] mt-5`}>
            <Text styles="text-white text-center">
            todos os direitos reservados TechConnect®
            </Text>
        </footer>
    )
}