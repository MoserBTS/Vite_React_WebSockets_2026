import {Link} from 'react-router-dom';
import erreur_404 from '../assets/erreur_404.jpg';
import {Box, Typography} from "@mui/material";

export const PageNotFound = () => {
    return (
    <p>
        <div className="center">

            <Box
                component="img"
                src={erreur_404}
                alt="Page non trouvée"
                sx={{width: "60%", maxWidth: "100%", height: "auto"}}
            />

            <Typography variant="h5" sx={{textAlign: "center"}}>
                Hey, cette page n'existe pas !
            </Typography>
            <Link to="/" className="waves-effect waves-teal btn-flat">
                <Typography variant="subtitle1" sx={{textAlign: "center"}}>
                    Retourner à l'accueil
                </Typography>
            </Link>
        </div>
    </p>)
};
