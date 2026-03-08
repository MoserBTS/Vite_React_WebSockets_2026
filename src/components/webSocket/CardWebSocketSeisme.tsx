import type { Root as SeismeWsMessage } from "../../models/Seisme.ts";
import { useWebSocketMessageJson } from "./useWebSocket.ts";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import seisme from "../../assets/seisme.jpg";

export const CardWebSocketSeisme = () => {
    const { etatWs, message } = useWebSocketMessageJson({
        url: "wss://www.seismicportal.eu/standing_order/websocket",
        params: JSON.stringify({
            type: "subscribe",
            data: {}
        }),
    });

    const messageParsed = message as SeismeWsMessage;

    const props = messageParsed?.data?.properties;
    const coords = messageParsed?.data?.geometry?.coordinates;

    const magnitude = props?.mag;
    const region = props?.flynn_region;
    const time = props?.time ? new Date(props.time).toLocaleString() : undefined;
    const profondeurKm = props?.depth;
    const latitude = props?.lat;
    const longitude = props?.lon;

    // Selon le flux, coordinates peut être [lon, lat, depth] (GeoJSON). On affiche aussi si présent.
    const coordLon = Array.isArray(coords) ? coords[0] : undefined;
    const coordLat = Array.isArray(coords) ? coords[1] : undefined;
    const coordDepth = Array.isArray(coords) ? coords[2] : undefined;

    return (
        <Card elevation={8} sx={{width: "100%", maxWidth: 280,height: "auto",borderRadius: 4}}>
            <CardMedia
                component="img"
                height="140"
                image={seisme}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Séisme{" "}
                    <Typography component="span" sx={{fontSize: "0.5em", ml: 1}}>
                        ({etatWs})
                    </Typography>
                </Typography>

                {!message ? (
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        En attente d’un évènement…
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace"}}>
                            Magnitude : {magnitude ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace"}}>
                            Région : {region ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace"}}>
                            Heure : {time ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace"}}>
                            Profondeur : {profondeurKm ?? coordDepth ?? "—"} km
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace"}}>
                            Position : {latitude ?? coordLat ?? "—"}, {longitude ?? coordLon ?? "—"}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};