import {useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
//npm install react-use-websocket

interface PropsWs{
    url: string;
    params:string|null;
}

export const useWebSocketMessageJson = (props:PropsWs) => {
    const [etatWs, setEtatWs] = useState<"open" | "close">("close");
    const [message, setMessage] = useState<unknown>(undefined);
    const paramsEnvoyesUneFoisRef = useRef(false);
    //useRef: sert à mémoriser une information entre les rendus, sans provoquer de nouveau rendu.
/*      useRef
            garde une valeur en mémoire
            ne déclenche pas de re-render quand elle change
        useState
            garde une valeur en mémoire
            déclenche un re-render quand elle change
*/
    const {sendMessage} = useWebSocket(props.url,{
        onOpen: () => setEtatWs("open"),
        onClose: () => setEtatWs("close"),
        onMessage:(event)=>{
            try {
                const raw = JSON.parse(event.data) as unknown;
                setMessage(raw);
            } catch {
                // JSON invalide -> on ignore
            }
        }
    });


/*    Ce useEffect sert à envoyer un message WebSocket automatiquement,
        mais seulement au bon moment et une seule fois.
        useEffect: permet d’exécuter du code après le rendu du composant
*/
    useEffect(() => {
        if (etatWs !== "open") return;
        if (!props.params) return;
        if (paramsEnvoyesUneFoisRef.current) return;
        sendMessage(props.params);
        paramsEnvoyesUneFoisRef.current = true;
    }, [etatWs, props.params, sendMessage]);


    return { etatWs, message };
}