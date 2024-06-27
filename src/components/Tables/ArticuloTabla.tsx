import { Articulo } from "../../types/Articulo";
import { ModalType } from "../../types/ModalType";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import { useNavigate } from "react-router-dom";
import ArticuloModal from "../Modals/ArticuloModal";
import { useState, useEffect } from "react";
import { ArticuloService } from "../../services/ArticuloService";
import { Proveedor } from "../../types/Proveedor";
import { ModeloInventario } from "../../types/ModeloInventario";



function ArticuloTable () {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchArticulos = async () => {
        try{
            
            const articulos = await ArticuloService.getArticulos();
            setArticulos(Array.isArray(articulos)? articulos : []);
        } catch (error){
            console.error("Error fetching articulos:", error)
        };
        }
        
        fetchArticulos();
    }, [refreshData]);
    console.log(JSON.stringify(articulos, null, 2));
    
    const proveedor: Proveedor = {
        id: 0,
        nombre: ''
    };
    
    const initializableNewArticulo = (): Articulo => {
        return {
            id:0,
            cantidadAPedir: 0,
            cantidadMaxima: 0,
            cgi: 0,
            costoAlmacenamiento: 0,
            costoPedido: 0,
            demandaAnual: 0,
            loteOptimo: 0,
            modeloInventario: ModeloInventario.LOTE_FIJO,
            nombre: '',
            precio: 0,
            puntoPedido: 0,
            stockActual: 0,	
            stockSeguridad: 0,
            tiempoRevision: 0,	
            proveedorPred: proveedor,
            
            
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
                                    <td className="py-2 px-4 border-b">{articulo.nombre}</td>
                                    <td className="py-2 px-4 border-b">{Number(articulo.precio).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className="py-2 px-4 border-b">{articulo.stockActual}</td>
                                    <td className="py-2 px-4 border-b">{articulo.proveedorPred.id}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            onClick={() => navigate('/demanda', { state: { articuloId: articulo.id } })}
                                        >
                                            Ir a Demanda
                                        </button>
                                    </td>
                                    <td></td>
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
                    nombre={'nombre'}
                    modalType={modalType}
                    art={articulo}
                    refreshData={setRefreshData}
                />
            )}
        </>
    );
}

export default ArticuloTable;
