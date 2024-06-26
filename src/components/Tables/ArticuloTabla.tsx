import { Articulo } from "../../types/Articulo";
import { ModalType } from "../../types/ModalType";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import { useNavigate } from "react-router-dom";
import ArticuloModal from "../Modals/ArticuloModal";
import { useState, useEffect } from "react";
import { ArticuloService } from "../../services/ArticuloService";
import Loader from "../Loader/Loader";

const ArticuloTable = () => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchArticulos = async () => {
            const articulos = await ArticuloService.getArticulos();
            setArticulos(articulos);
            setIsLoading(false);
        };
        fetchArticulos();
    }, [refreshData]);
    console.log(JSON.stringify(articulos, null, 2));

    const initializableNewArticulo = (): Articulo => {
        return {
            id: 0,
            cantidad_a_pedir: 0,
            cantidad_maxima: 0,
            cgi: 0,
            costo_almacenamiento: 0,
            costo_pedido: 0,
            demanda_anual: 0,
            lote_optimo: 0,
            modelo_inventario: "",
            nombre_articulo: "",
            precio_articulo: 0,
            punto_pedido: 0,
            stock_actual: 0,
            stock_seguridad: 0,
            tiempo_revision: 0,
            proveedor_predeterminado: "",
            seleccionado: false
        };
    };

    const [articulo, setArticulo] = useState<Articulo>(initializableNewArticulo);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    const handleClick = (NewTitle: string, art: Articulo, modal: ModalType) => {
        setArticulo(art);
        setTitle(NewTitle);
        setShowModal(true);
        setModalType(modal);
    };

    const navigate = useNavigate();

     return (
        <>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleClick("Nuevo articulo", initializableNewArticulo(), ModalType.CREATE)}
            >
                Nuevo articulo
            </button>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Articulo</th>
                                <th className="py-2 px-4 border-b">Precio</th>
                                <th className="py-2 px-4 border-b">Cantidad en stock</th>
                                <th className="py-2 px-4 border-b">Proveedor</th>
                                <th className="py-2 px-4 border-b">Demanda historica</th>
                                <th className="py-2 px-4 border-b">Ver detalle</th>
                                <th className="py-2 px-4 border-b">Editar</th>
                                <th className="py-2 px-4 border-b">Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulos.map(articulo => (
                                <tr key={articulo.id}>
                                    <td className="py-2 px-4 border-b">{articulo.id}</td>
                                    <td className="py-2 px-4 border-b">{articulo.precio_articulo}</td>
                                    <td className="py-2 px-4 border-b">{articulo.stock_actual}</td>
                                    <td className="py-2 px-4 border-b">{articulo.proveedor_predeterminado}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => navigate('/demanda', { state: { articuloId: articulo.id } })}
                                        >
                                            Ir a Demanda
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <EditButton onClick={() => handleClick("Editar articulo", articulo, ModalType.UPDATE)} />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <DeleteButton onClick={() => handleClick("Borrar articulo", articulo, ModalType.DELETE)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            {showModal && (
                <ArticuloModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    prod={articulo}
                    refreshData={setRefreshData}
                />
            )}
        </>
    );
}

export default ArticuloTable;
