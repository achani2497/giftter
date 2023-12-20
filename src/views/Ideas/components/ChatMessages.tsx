import { useEffect, useRef } from "react";
import { OpenAIMessage } from "usellm";

interface ChatMessagesProps {
    messages: OpenAIMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
    let messagesWindow = useRef<Element | null>(null);

    function parseRole(word: string) {
        return word === "user" ? 'Tu' : 'Asistente';
    }

    useEffect(() => {
        if (messagesWindow?.current) {
            messagesWindow.current.scrollTop = messagesWindow.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className="w-full h-full max-h-96 overflow-y-auto px-4 py-2 border border-solid border-slate-200 bg-slate-100"
            ref={(el) => (messagesWindow.current = el)}
        >
            {messages.map((message, idx) => (
                <div className="my-4" key={idx}>
                    <div className="font-semibold text-gray-800">
                        {parseRole(message.role)}
                    </div>
                    <div className="text-gray-600 whitespace-pre-wrap mt-1">
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
    );
}