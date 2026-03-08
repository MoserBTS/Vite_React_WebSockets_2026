import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home.tsx"
import {PageNotFound} from "./pages/Page-not-found.tsx";
import {StrictMode} from "react";

import "katex/dist/katex.min.css";
/*
pour afficher les fractions:
    npm install react-katex katex
    import "katex/dist/katex.min.css";
*/


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            // {path: "/etudiant/:id", element: <EtudiantDetailsId/>}, // Chemin avec paramètre
            {path: "/*", element: <PageNotFound/>},
        ]
    }
])

// Rendu principal compatible avec la nouvelle API Concurrent Mode.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
