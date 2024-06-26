
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="">
            <nav className="bg-gray-800 p-4 shadow text-white">
                <ul className="flex justify-around list-none">
                    <li><Link className="text-white font-bold hover:underline active:underline" to="/">Inicio</Link></li>
                    <li><Link className="text-white font-bold hover:underline" to="/articulo">Artículos</Link></li>
                    <li><Link className="text-white font-bold hover:underline" to="/demanda">Demanda</Link></li>
                    <li><Link className="text-white font-bold hover:underline" to="/articulo">Ventas</Link></li>
                    <li><Link className="text-white font-bold hover:underline" to="/articulo">Orden de Compra</Link></li>
                    <li><Link className="text-white font-bold hover:underline" to="/articulo">Ventas</Link></li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer