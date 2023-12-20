import { Status } from "../Ideas";

interface ChatInputProps {
    text: string;
    setText: (text: string) => void;
    sendMessage: () => void;
    disabled: boolean;
    status: Status
}

class Placeholder {

    private static message: string = "Tengo un familiar al que le gusta mucho la comida necesitaria 5 sugerencias para hacerle un regalo.";

    static getPlaceHolder() {
        return this.message;
    }

    static setToDirty() {
        this.message = "Otra consulta ..."
    }
}

export function ChatInput({
    text,
    setText,
    sendMessage,
    disabled,
    status
}: ChatInputProps) {

    const placeholder = {
        IDLE: Placeholder.getPlaceHolder(),
        STREAMING: "Espera mi respuesta ..."
    }

    return (
        <textarea
            rows={3}
            className="p-2 border shadow-inner rounded w-full block"
            placeholder={placeholder[status]}
            value={text}
            disabled={disabled}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    Placeholder.setToDirty()
                    sendMessage();
                }
            }}
        />
    );
}