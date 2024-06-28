// DemandaModal.tsx
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DemandaService } from '../../services/DemandaService';
import { toast } from 'react-toastify';
import { Articulo } from '../../types/Articulo';
import { ModeloInventario } from '../../types/ModeloInventario';
import { Proveedor } from '../../types/Proveedor';

type DemandaModalProps = {
    show: boolean;
    onHide: () => void;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const DemandaModal: React.FC<DemandaModalProps> = ({ show, onHide, refreshData }) => {
    const [fechaDesde, setFechaDesde] = useState<string>('');
    const [fechaHasta, setFechaHasta] = useState<string>('');
    const [idArticulo, setIdArticulo] = useState<number | ''>('');

    const handleGuardar = async () => {
        if (!fechaDesde || !fechaHasta || !idArticulo) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        const proveedor: Proveedor ={
            id: 0,
            nombre: '',
        }
        const articulo: Articulo = {
            id: 0,
            cantidadAPedir: 0,
            cantidadMaxima:  0,
            cgi:  0,
            costoAlmacenamiento: 0,
            costoPedido: 0,
            demandaAnual:  0,
            loteOptimo: 0,
            modeloInventario: ModeloInventario.LOTE_FIJO,
            nombre: '',
            precio: 0,
            puntoPedido:  0,
            stockActual:  0,
            stockSeguridad:  0,
            tiempoRevision: 0,
            proveedorPred:  proveedor,
          };
        const demanda = {
            id: 0,  // Suponiendo que el backend genera este ID
            fechaDesde: new Date(fechaDesde),
            fechaHasta: new Date(fechaHasta),
            totalDemanda: 0,  // Suponiendo que el backend calcula esto
            idArticulo: articulo // Llenamos con un objeto mínimo de Articulo
        };

        try {
            await DemandaService.createDemanda(demanda.fechaDesde,demanda.fechaHasta,demanda.idArticulo.id);
            setFechaDesde('');
            setFechaHasta('');
            setIdArticulo('');
            onHide();
            refreshData(prevState => !prevState);
            toast.success('Demanda creada con éxito', { position: 'top-center' });
        } catch (error) {
            console.error('Error al crear la demanda:', error);
            toast.error('Error al crear la demanda', { position: 'top-center' });
        }
    };

    const handleCancelar = () => {
        setFechaDesde('');
        setFechaHasta('');
        setIdArticulo('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleCancelar} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Demanda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Fecha Desde</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha Hasta</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ID Artículo</Form.Label>
                        <Form.Control
                            type="number"
                            value={idArticulo}
                            onChange={(e) => setIdArticulo(Number(e.target.value))}
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
    );
};

export default DemandaModal;
