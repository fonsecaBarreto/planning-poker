import { Form, useNavigation } from "@remix-run/react";
import { useContext } from "react";
import { wsContext } from "~/contexts/WebSocket";
import { MessageContainer } from "../chat/messageContainer"

export type SideBarProps = {

}

export const SideBar: React.FunctionComponent<SideBarProps> = ({  }) => {

    const { socket, socketId, clients, messages } = useContext(wsContext);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    
    const handleSendMessage = (e: any) => {
        e.preventDefault();
        const message = e.target["message"].value;
        socket?.emit("event", { action: "MESSAGE", payload: message });
      };

    return (
        <div className="app-side-bar">
            <section className="users-list">
                <h4 className="text-1xl">Usuarios ativos:</h4>

                <ul role="list">
                {/* &#128308;  */}
                {clients.map((client: any) => (
                    <li> &#128994; {client?.user?.nickName ?? "Anonimo"}</li>
                ))}
                </ul>
            </section>
            
            <section className="chat-container">
              <h4 className="text-1xl"> Chat: </h4>
              <ul>
                <MessageContainer
                  socketId={socketId}
                  message={{
                    payload: "Bem-vindo! Diga algo de interessante...",
                  }}
                />
                {messages.map((msg: any) => (
                  <MessageContainer socketId={socketId} message={msg} />
                ))}
              </ul>

              <Form disabled={isSubmitting} onSubmit={handleSendMessage}>
                <label>
                  <input name="message" placeholder=" Sua Mensagem aqui" />
                  <button type="submit">Enviar</button>
                </label>
              </Form>
            </section>

            <section>
              nada aqui
            </section>
        </div>
    )
}