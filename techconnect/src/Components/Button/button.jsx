export const Button = (props) =>{
    return(
        <button className={`${props.styles} px-4 py-2 rounded-lg`}>
            {props.children}
        </button>
    )
}



export const GradientBorderButton = (props) => {
    return (
       <button
    className={`${props.styles}`}
    style={{
        border: "2px solid", // Você pode definir a cor da borda aqui
        backgroundColor: "transparent", // Torna o fundo transparente
        padding: "10px 20px", 
        borderRadius: "8px", 
        color: "#6B4DE6", // Mude a cor do texto se necessário
        cursor: "pointer", 
        outline: "none", 
        backgroundImage: "linear-gradient(transparent), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
    }}
>
    {props.children}
</button>

    );
};




