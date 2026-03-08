import type { Root as SeismeWsMessage } from "../../models/Seisme.ts";
import { useWebSocketMessageJson } from "./useWebSocket.ts";
import {Card, CardContent, Typography, CardMedia} from "@mui/material";
import seisme from "../../assets/seisme.jpg";
//npm install react-leaflet leaflet
// npm install -D @types/leaflet
// # (optionnel suivant ta conf, mais parfois nécessaire)
// npm install -D @types/react-leaflet
//npm run dev

import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, Popup, AttributionControl, useMap} from "react-leaflet";
import {useEffect} from "react";

export const CardWebSocketSeismeCarte = () => {
    const { etatWs, message } = useWebSocketMessageJson({
        url: "wss://www.seismicportal.eu/standing_order/websocket",
        params: JSON.stringify({
            type: "subscribe",
            data: {}
        }),
    });

    const messageParsed = message as SeismeWsMessage | undefined;
    const props = messageParsed?.data?.properties;
    const coords = messageParsed?.data?.geometry?.coordinates;

    const magnitude = props?.mag;
    const region = props?.flynn_region;
    const time = props?.time ? new Date(props.time).toLocaleString() : undefined;
    const profondeurKm = props?.depth;

    const latitude = props?.lat ?? (Array.isArray(coords) ? coords[1] : undefined);
    const longitude = props?.lon ?? (Array.isArray(coords) ? coords[0] : undefined);
    const depth = profondeurKm ?? (Array.isArray(coords) ? coords[2] : undefined);

    const hasPosition = typeof latitude === "number" && typeof longitude === "number";

    const RecenterOnChange: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
        const map = useMap();
        useEffect(() => {
            map.setView([lat, lng]); // ou map.flyTo([lat, lng], 5);
        }, [lat, lng, map]);
        return null;
    };

    return (
        <Card elevation={8} sx={{ width: "100%", maxWidth: 280, height: "auto", borderRadius: 4 }}>
            {hasPosition ? (
                // on gère la carte juste après
                <CardMedia
                    component="div"
                    sx={{ height: 140, width: "100%" }}
                >
                    <MapContainer
                        center={[latitude, longitude]}
                        zoom={5}
                        scrollWheelZoom={false}
                        style={{ height: "140px", width: "100%" }}
                        attributionControl={false}
                    >
                        <TileLayer
                            attribution="Seisme"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <AttributionControl position="bottomright" prefix={false} />
                        {/* ajout : recentrage à chaque changement de coordonnées */}
                        <RecenterOnChange lat={latitude} lng={longitude} />
                        <Marker position={[latitude, longitude]}>
                            <Popup>
                                Séisme
                                <br />
                                Magnitude : {magnitude ?? "—"}
                                <br />
                                Position : {latitude}, {longitude}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </CardMedia>
            ) : (
                <CardMedia
                    component="img"
                    height="140"
                    image={seisme}
                    alt="Illustration d’un séisme"
                    sx={{ width: "100%", objectFit: "cover", display: "block" }}
                />
            )}

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
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                            Magnitude : {magnitude ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                            Région : {region ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                            Heure : {time ?? "—"}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                            Profondeur : {depth ?? "—"} km
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace" }}>
                            Position : {latitude ?? "—"}, {longitude ?? "—"}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
};