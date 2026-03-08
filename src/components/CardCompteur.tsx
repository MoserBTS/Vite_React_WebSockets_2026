import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {useState} from "react";

export const CardCompteur = () => {
    const [count, setCount] = useState(0)
    return (
            <Card elevation={8} sx={{width: "100%", maxWidth: 250,height: "auto",borderRadius: 4}}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Button
                        variant="contained"
                        onClick={() => setCount((count) => count + 1)}
                    >
                        Incrémenter
                    </Button>

                    <Typography variant="body2" sx={{textAlign: "center"}}>
                        <Box component="code" sx={{fontFamily: "monospace"}}>
                            la valeur de count est : {count}
                        </Box>
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    )
};