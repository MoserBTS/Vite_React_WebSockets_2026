import './App.css'
import {Outlet} from 'react-router-dom'
import {Footer} from "./components/layout/Footer.tsx";
import {Header} from "./components/layout/Header.tsx";

export const App=()=> {


  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default App
