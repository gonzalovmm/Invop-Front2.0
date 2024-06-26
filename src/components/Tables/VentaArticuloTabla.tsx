import { useEffect, useState } from 'react';
//import Table from 'react-bootstrap/Table';
import { VentaArticulo } from '../../types/VentaArticulo';
import { VentaArticuloService } from '../../services/VentaArticuloService';
//import { Button } from 'react-bootstrap';

function VentaArticuloTabla({ ventaID }: { ventaID: number }) {
    const [ventaArticulos, setVentaArticulos] = useState<VentaArticulo[]>([]);

    useEffect(() => {
        const fetchVentaArticulos = async () => {
            const ventaArticulos = await VentaArticuloService.getVentaArticulo(ventaID);
            setVentaArticulos(ventaArticulos);
        };
        fetchVentaArticulos();
    }, [ventaID]);

    console.log(JSON.stringify(ventaArticulos, null, 2));






    return (
        <>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-300'>
                    <thead>
                        <tr >
                            <th className="py-2 px-4 border-b">Id</th>
                            <th className="py-2 px-4 border-b">Subtotal</th>
                            <th className="py-2 px-4 border-b">Cantidad vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                         {ventaArticulos.map(ventaArticulo => (
                            <tr key={ventaArticulo.id}>
                                <td className="py-2 px-4 border-b">{ventaArticulo.id}</td>
                                <td className="py-2 px-4 border-b">{ventaArticulo.subtotal}</td>
                                <td className="py-2 px-4 border-b">{ventaArticulo.cantidadVenta}</td>
                            </tr>
                        ))}
                            
                    </tbody>

                </table>


            </div>
        </>
    );
}

export default VentaArticuloTabla;