import { useState } from "react";
import useLLM, { OpenAIMessage } from "usellm";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
export type Status = "IDLE" | "STREAMING";

export function Ideas() {
    const [status, setStatus] = useState<Status>("IDLE");
    const [searchText, setSearchText] = useState('')
    const [history, setHistory] = useState<OpenAIMessage[]>([])
    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });

    // TODO: Cuando se ejecuta esta funcion tiene que aparecer un modal con una lista de amigos agregados y que aparezca la opcion de agregar uno, ya sea con mail o sin mail y que se le quede asignado

    function saveChat() {
        console.log(history)
    }

    async function handleSend() {
        if (!searchText) {
            return;
        }

        try {
            setStatus("STREAMING")
            const newHistory = [...history, { role: "user", content: searchText }]
            setHistory(newHistory)
            setSearchText('')
            const { message } = await llm.chat({
                messages: newHistory,
                stream: true,
                onStream: ({ message }) => {
                    setHistory([...newHistory, message])
                },
            })
            setHistory([...newHistory, message])
            setStatus("IDLE")
        } catch (error) {
            console.error("Something went wrong!", error);
        }
    }

    return (
        <div className="flex flex-col h-full max-h-[600px] overflow-y-hidden gap-2">
            <h2 className="font-bold text-3xl text-center">¿No se te ocurre qué regalar?</h2>
            <h3 className="font-semibold text-lg mb-8 text-center">Describi a la persona a la que le queres hacer un regalo y recibí algunas ideas</h3>

            <ChatMessages messages={history} />
            <div className="flex flex-col gap-2">
                <ChatInput
                    status={status}
                    text={searchText}
                    setText={setSearchText}
                    sendMessage={handleSend}
                    disabled={status !== "IDLE"}
                />
                <button
                    className="p-3 rounded-lg shadow-lg hover:shadow-none transition-all duration-300 font-bold"
                    style={{ backgroundColor: 'var(--yellow)' }}
                    onClick={handleSend}
                    disabled={status !== "IDLE"}
                >
                    Consultar
                </button>
                <button
                    className="p-3 rounded-lg shadow-lg hover:shadow-none transition-all duration-300 font-bold text-white"
                    style={{ backgroundColor: 'var(--purple)' }}
                    onClick={saveChat}
                >
                    Guardar chat
                </button>
            </div>
        </div>
    )
}

