import {Route, Routes} from "react-router-dom";
import Articulos from "../pages/Articulos";
import Demanda from "../pages/Demanda";


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Articulos/>}/>
            <Route path="/articulo" element={<Articulos/>}/>
            <Route path="/demanda" element={<Demanda/>}/>
        </Routes>
    );
};
export default AppRoutes