import { Button, Form, Modal } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import { Venta } from '../../types/Venta';
import { useState, useEffect } from 'react';
import { ArticuloService } from '../../services/ArticuloService';
import { Articulo } from '../../types/Articulo';
import { VentaService } from '../../services/VentaService';
import { toast } from 'react-toastify';
import VentaArticuloTabla from '../Tables/VentaArticuloTabla';

type VentaModalProps = {
    show: boolean;
    onHide: () => void;
    nombre: string;
    modalType: ModalType;
    venta: Venta;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const VentaModal = ({
    show,
    onHide,
    nombre,
    modalType,
    venta,
    refreshData,
}: VentaModalProps) => {
    const [articulos, setArticulos] = useState<Articulo[]>([]);
    const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);
    const [cantidad, setCantidad] = useState(0);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const articulos = await ArticuloService.getArticulos(); // Asegúrate de que el servicio correcto sea llamado
                setArticulos(Array.isArray(articulos) ? articulos : []);
            } catch (error) {
                console.error("Error fetching articulos: ", error);
                setArticulos([]);
            }
        };

        fetchArticulos();
    }, []);

    const handleGuardar = async () => {
        if (!articuloSeleccionado || cantidad <= 0) {
            alert('Por favor, seleccione un artículo y una cantidad válida.');
            return;
        }

        const ventaDetalle = {
            articulo: articuloSeleccionado,
            cantidad: cantidad,
            invalid: false,
        };

        try {
            await VentaService.createVenta([ventaDetalle]);
            setArticuloSeleccionado(null);
            setCantidad(0);
            onHide();
            refreshData(prevState => !prevState);
            toast.success('Venta creada con éxito', { position: 'top-center' });
        } catch (error) {
            console.error('Error al crear la venta:', error);
            toast.error('Error al crear la venta', { position: 'top-center' });
        }
    };

    const handleCancelar = () => {
        setArticuloSeleccionado(null);
        setCantidad(0);
        onHide();
    };

    return (
        <>
        {modalType === ModalType.DETAIL ?  (
            <>  
            <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <table className='min-w-full bg-white border border-gray-300'>
                 <thead>
                        <tr >
                            <th className="py-2 px-4 border-b">Id Articulo</th>
                            <th className="py-2 px-4 border-b">Subtotal</th>
                            <th className="py-2 px-4 border-b">Cantidad vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className="py-2 px-4 border-b">{articuloSeleccionado?.id}</td>
                        <td className="py-2 px-4 border-b">{cantidad}</td>
                        <td className="py-2 px-4 border-b"> {articuloSeleccionado ? articuloSeleccionado.precio * cantidad : 0}</td>
                    </tbody>

                 </table>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>

            </Modal>
            </>
        ) :(
        <div >
         <Modal show={show} onHide={handleCancelar} centered>
            <Modal.Header closeButton>
                <Modal.Title>{nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Seleccione Artículo</Form.Label>
                        <Form.Control
                            as="select"
                            value={articuloSeleccionado?.id || ''}
                            onChange={(e) => {
                                const selectedId = Number(e.target.value);
                                const selectedArticulo = articulos.find(a => a.id === selectedId) || null;
                                setArticuloSeleccionado(selectedArticulo);
                            }}
                        >
                            <option value="">Seleccione un artículo</option>
                            {articulos.map(articulo => (
                                <option key={articulo.id} value={articulo.id}>
                                    {articulo.nombre} (Stock: {articulo.stockActual})
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad a Vender</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={handleGuardar}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
        )
    }
        </>
    );
};

      

export default VentaModal;
 
 