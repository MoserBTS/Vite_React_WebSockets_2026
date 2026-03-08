import type {BitCoin} from "../../models/BitCoin.ts";
import {useWebSocketMessageJson} from "./useWebSocket.ts";
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import bourse from "../../assets/bourse.jpg";


export const CardWebSocketBitCoin = () => {
    const {etatWs, message} = useWebSocketMessageJson({
        url: "wss://ws-feed.exchange.coinbase.com",
        params: JSON.stringify({
            type: "subscribe",
            channels: [{name: "ticker", product_ids: ["BTC-EUR"]}],
        }),
    });
    const messageParsed = message as BitCoin;
    return (<>
        <Card elevation={8} sx={{width: "100%", maxWidth: 280,height: "auto",borderRadius: 4}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={bourse}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Valeur du BitCoin en €
                        <Typography component="span" sx={{fontSize: "0.5em", ml: 1}}>
                            ({etatWs})
                        </Typography>
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        <div style={{marginTop: 8}}>
                            {!messageParsed ? (<div>En attente d’un trade…</div>) : (
                                <Box component="code" sx={{fontFamily: "monospace"}}>
                                    Valeur : {messageParsed.price}€
                                    <br />
                                    Heure : {new Date(messageParsed.time).toLocaleString()}
                                </Box>
                            )}
                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>)
};