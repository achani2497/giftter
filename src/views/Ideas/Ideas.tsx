import { useEffect, useState } from "react";
import useLLM, { OpenAIMessage } from "usellm";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
export type Status = "IDLE" | "STREAMING" | "LIMIT_REACHED";

export function Ideas() {
    const [status, setStatus] = useState<Status>("IDLE");
    const [searchText, setSearchText] = useState('')
    const [history, setHistory] = useState<OpenAIMessage[]>([])
    const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
    var disabled = status !== "IDLE"

    // TODO2: Limitar a 4 mensajes por conversacion durante 24 hs, lo tengo que manejar con Redux
    const [messagesCount, setMessagesCount] = useState(0)

    // TODO: Cuando se ejecuta esta funcion tiene que aparecer un modal con una lista de amigos agregados y que aparezca la opcion de agregar uno, ya sea con mail o sin mail y que se le quede asignado
    function saveChat() {
        console.log(history)
    }

    useEffect(() => {
        if (messagesCount == 1) {
            setStatus('LIMIT_REACHED')
        }
    }, [messagesCount])

    async function handleSend() {
        if (!searchText || messagesCount == 1) {
            return;
        }

        try {
            setStatus("STREAMING")
            setMessagesCount(messagesCount + 1)
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
            if (status !== 'LIMIT_REACHED') {
                setStatus("IDLE")
            }
        } catch (error) {
            console.error("Something went wrong!", error);
        }
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto gap-2 pb-4">
            <h2 className="font-bold text-3xl text-center">¿No se te ocurre qué regalar?</h2>
            <h3 className="font-semibold text-lg mb-4 text-center">Describi a la persona a la que le queres hacer un regalo y recibí algunas ideas</h3>
            <ChatMessages messages={history} />
            <div className="flex flex-col gap-2">
                <ChatInput
                    status={status}
                    text={searchText}
                    setText={setSearchText}
                    sendMessage={handleSend}
                    disabled={disabled}
                />
                {status == 'LIMIT_REACHED' && <span className="text-red-400 font-semibold">Limite de mensajes diario alcanzado</span>}
                <div className="flex flex-col gap-4">

                    <button
                        className={"p-3 rounded-lg shadow-md hover:shadow-none transition-all duration-300 font-bold bg-yellow-300 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-inner"}
                        onClick={handleSend}
                        disabled={disabled}
                    >
                        Consultar
                    </button>
                    <button
                        className="p-3 rounded-lg shadow-md hover:shadow-none transition-all duration-300 font-bold text-white bg-purple-500"
                        // style={{ backgroundColor: 'var(--purple)' }}
                        onClick={saveChat}
                    >
                        Guardar chat
                    </button>
                </div>
            </div>
        </div>
    )
}

