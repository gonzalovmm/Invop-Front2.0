import {Route, Routes} from "react-router-dom";
import Articulos from "../pages/Articulos";
import OrdenDeCompra from "../pages/OrdenDeCompra";
import Demanda from "../pages/Demanda";
import Venta from "../pages/Venta";
import Inicio from "../pages/Inicio";
import React from "react";
import { ReactDOM } from "react";
import PrediccionDemanda from "../pages/PrediccionDemanda";



const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/articulo" element={<Articulos/>}/>
            <Route path="/prediccion/:idArticulo" element={<PrediccionDemanda />} />
            <Route path="/venta" element={<Venta/>}/>
            <Route path="/demanda" element ={<Demanda/>}/>
            <Route path="/orden-de-compra" element={<OrdenDeCompra/>}/>
        </Routes>
    );
};
export default AppRoutes