import { useContext, useEffect } from "react"
import { createSocketConnection } from "../../utils/socket";
import { MyContext } from "../../App";

const Chat = () => {
    const { user } = useContext(MyContext);
    console.log(user);
    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit('joinChat', 76789);
        return () => {
            socket.disconnect();
        }
    },[])
    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;