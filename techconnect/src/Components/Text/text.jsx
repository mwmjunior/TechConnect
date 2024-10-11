export const Text = (props) => {
    return (
        <p className={`${props.styles} text-[16px] font-comfortaa`}>
            {props.children}
        </p>
    )
}

export const DegradeText = (props) => {
    return (
        <p className={`bg-gradient-to-r from-[#6B4DE6] to-[#4DADE6] bg-clip-text text-transparent font-comfortaa text-[16px] ${props.styles}`}>
            {props.children}
        </p>
    );
};

