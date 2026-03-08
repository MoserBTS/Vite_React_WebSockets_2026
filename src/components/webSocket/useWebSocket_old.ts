import {useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
//npm install react-use-websocket

interface PropsWs<TMessage> {
    url: string;
    params:string|null;
    parseMessage?: (raw: unknown) => TMessage;
}

export const useWebSocketMessage =<TMessage> (props:PropsWs<TMessage>) => {
    const [etatWs, setEtatWs] = useState<"open" | "close">("close");
    const [message, setMessage] = useState<TMessage | undefined>(undefined);
    const paramsSentOnceRef = useRef(false);
    const {sendMessage} = useWebSocket(props.url,{
        onOpen: () => setEtatWs("open"),
        onClose: () => setEtatWs("close"),
        onMessage:(event)=>{
            try {
                const raw = JSON.parse(event.data) as unknown;
                const data = props.parseMessage ? props.parseMessage(raw) : (raw as TMessage);
                setMessage(data);
            } catch {
                // JSON invalide -> on ignore
            }
        }
    });
    useEffect(() => {
        if (etatWs !== "open") return;
        if (!props.params) return;
        if (paramsSentOnceRef.current) return;
        sendMessage(props.params);
        paramsSentOnceRef.current = true;
    }, [etatWs, props.params, sendMessage]);
    return { etatWs, message };
}