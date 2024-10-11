export const ContainerLogo = (props) => {
    return (
        <div className={`${props.styles}`}
        styles={{
            border: "2px solid #6B4DE6", 
            backgroundColor: "transparent", 
            padding: "10px 20px",
            borderRadius: "8px",
            outline: "none",
            backgroundImage: "linear-gradient(transparent), linear-gradient(90deg, #6B4DE6 0%, #4DADE6 100%)",
        }}>
            {props.children}
        </div>
    )
}