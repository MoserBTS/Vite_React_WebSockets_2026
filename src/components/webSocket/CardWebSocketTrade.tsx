import type {EurUsdTrade} from "../../models/EurUsdTrade.ts";
import {useWebSocketMessageJson} from "./useWebSocket.ts";
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import bourse from "../../assets/bourse.jpg"
import "katex/dist/katex.min.css";
import {InlineMath} from "react-katex";
/*
pour afficher les fractions:
    import {InlineMath} from "react-katex";
*/

export const CardWebSocketTrade = () => {
    const { etatWs, message } = useWebSocketMessageJson({
        url: "wss://stream.binance.com:9443/ws/eurusdt@trade",
        params: null,
    });
    const messageParsed = message as EurUsdTrade;
    return (
        <>
            <Card elevation={8} sx={{width: "100%", maxWidth: 280,height: "auto",borderRadius: 4}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={bourse}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Trade: € → $
                            <Typography component="span" sx={{ fontSize: "0.5em",ml: 1 }}>
                                ({etatWs})
                            </Typography>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            <div style={{marginTop: 8}}>
                                {!messageParsed ? (<div>En attente d’un trade…</div>) : (
                                    <Box component="code" sx={{fontFamily: "monospace"}}>

                                    Valeur : {Number(messageParsed.p).toFixed(4)}
                                            <InlineMath math={"\\frac{\\text{€}}{\\text{\\$}}"} />
                                        <br />
                                        Heure : {new Date(messageParsed.T).toLocaleString()}
                                    </Box>
                                    )
                                }
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )

}