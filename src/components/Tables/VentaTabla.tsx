import { useEffect, useState } from 'react';
import { Venta } from '../../types/Venta';
import { VentaService } from '../../services/VentaService';
import VentaModal from '../Modals/VentaModal';
import { ModalType } from '../../types/ModalType';

import { Demanda } from '../../types/Demanda';
import { Articulo } from '../../types/Articulo';
import { Proveedor } from '../../types/Proveedor';
import { ModeloInventario } from '../../enums/ModeloInventario';

function VentaTabla () {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(()=> {
        const fetchVentas = async () => {
            const ventas = await VentaService.getVentas();
            setVentas(ventas);
        }
        fetchVentas();
    }, [refreshData]);

    const proveedor: Proveedor ={
        id: 0,
       nombre: ''
   }
   const articulo: Articulo = {
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
   const demanda: Demanda = {
       id:0,
       idArticulo: articulo,
       fechaDesde: new Date(),
       fechaHasta: new Date(),
       totalDemanda: 0,
   };
   const initializableNewVenta = (): Venta => ({
       id: 0,
       fechaVenta: '',
       totalVenta: 0,
       id_demanda: demanda,

    //    "id": 149,
    //     "totalVenta": 0.0,
    //     "fechaVenta": "2022-05-12",
    //     "ventaDetalles": []
       
   });

    const [venta, setVenta] = useState<Venta>(initializableNewVenta);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [nombre, setNombre] = useState('');

    const handleClick = (newNombre: string, venta: Venta, modal: ModalType) => {
        setNombre(newNombre);
        setModalType(modal);
        setVenta(venta);
        setShowModal(true);
    };

    return (
        <>
            <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={() => handleClick('Nueva venta', initializableNewVenta(), ModalType.CREATE)}
            >
                Nueva venta
            </button>
            <div>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Id</th>
                            <th className="py-2 px-4 border-b">Total Venta</th>
                            <th className="py-2 px-4 border-b">Fecha de Venta</th>
                            <th className="py-2 px-4 border-b">Ver Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td className="py-2 px-4 border-b">{venta.id}</td>
                                <td className="py-2 px-4 border-b">{venta.totalVenta}</td>
                                <td className="py-2 px-4 border-b">{new Date(venta.fechaVenta).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleClick('Ver detalle de venta', venta, ModalType.DETAIL)}>
                                        Ver Detalle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <VentaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    nombre={nombre}
                    modalType={modalType}
                    venta={venta}
                    refreshData={setRefreshData}
                />
            )}
        </>
    );
}

export default VentaTabla;
