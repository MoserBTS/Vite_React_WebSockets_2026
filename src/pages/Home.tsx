import {Box} from "@mui/material";
import {CardCompteur} from "../components/CardCompteur.tsx";
import {CardWebSocketTrade} from "../components/webSocket/CardWebSocketTrade.tsx";
import {CardWebSocketBitCoin} from "../components/webSocket/CardWebSocketBitCoin.tsx";
import {CardWebSocketSeisme} from "../components/webSocket/CardWebSocketSeisme.tsx";
import {CardWebSocketSeismeCarte} from "../components/webSocket/CardWebSocketSeismeCarte.tsx";


export const Home = () => {
    return (
        <p>
            <Box
                sx={{
                    width: "100%",                 // prend toute la largeur disponible
                    display: "grid",
                    gap: { xs: 2, sm: 3, md: 4 },
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    alignItems: "center",
                }}
            >
                <CardCompteur />
                <CardCompteur />
                <CardCompteur />
                <CardWebSocketTrade />
                <CardWebSocketBitCoin />
                <CardWebSocketSeisme/>
                <CardWebSocketSeismeCarte/>
            </Box>
        </p>
       );
};



