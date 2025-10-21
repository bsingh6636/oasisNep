const NaveAvatar = ({ name }) => {
    if(!name) return null;
    name = name.split("")[0];
    return(
        <div className="bg-card-foreground text-card w-8 h-8 rounded-full flex justify-center items-center" >
            <h1>{name}</h1>
        </div>
    )
}

export default NaveAvatar;