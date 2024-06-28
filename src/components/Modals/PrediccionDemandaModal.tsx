import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PrediccionDemandaService } from '../services/PrediccionDemandaService';
import { toast } from 'react-toastify';
import { ParametrosPrediccionDTO } from '../types/ParametrosPrediccionDTO';

type PrediccionDemandaModalProps = {
    show: boolean;
    onHide: () => void;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const PrediccionDemandaModal: React.FC<PrediccionDemandaModalProps> = ({ show, onHide, refreshData }) => {
    const [fechaDesde, setFechaDesde] = useState<string>('');
    const [fechaHasta, setFechaHasta] = useState<string>('');
    const [coeficientes, setCoeficientes] = useState<string>('');
    const [mesPrediccion, setMesPrediccion] = useState<number | ''>('');
    const [anioPrediccion, setAnioPrediccion] = useState<number | ''>('');
    const [metodoPrediccion, setMetodoPrediccion] = useState<string>('');
    const [alfa, setAlfa] = useState<number | ''>('');
    const [cantidadPeriodosAPredecir, setCantidadPeriodosAPredecir] = useState<number | ''>('');
    const [cantidadPeriodosAUsar, setCantidadPeriodosAUsar] = useState<number | ''>('');
    const [cantidadDemandaAnual, setCantidadDemandaAnual] = useState<number | ''>('');

    const handleGuardar = async () => {
        if (!fechaDesde || !fechaHasta || coeficientes.split(',').length === 0 || !mesPrediccion || !anioPrediccion || !metodoPrediccion || !alfa || !cantidadPeriodosAPredecir || !cantidadPeriodosAUsar || !cantidadDemandaAnual) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const parametros: ParametrosPrediccionDTO = {
            articuloId: 0, // Cambia esto según sea necesario
            fechaDesde: new Date(fechaDesde),
            fechaHasta: new Date(fechaHasta),
            coeficientes: coeficientes.split(',').map(coef => parseFloat(coef.trim())),
            mesPrediccion: Number(mesPrediccion),
            anioPrediccion: Number(anioPrediccion),
            metodoPrediccion,
            alfa: Number(alfa),
            cantidadPeriodosAPredecir: Number(cantidadPeriodosAPredecir),
            cantidadPeriodosAUsar: Number(cantidadPeriodosAUsar),
            cantidadDemandaAnual: Number(cantidadDemandaAnual)
        };

        try {
            await PrediccionDemandaService.crearPrediccion(parametros);
            setFechaDesde('');
            setFechaHasta('');
            setCoeficientes('');
            setMesPrediccion('');
            setAnioPrediccion('');
            setMetodoPrediccion('');
            setAlfa('');
            setCantidadPeriodosAPredecir('');
            setCantidadPeriodosAUsar('');
            setCantidadDemandaAnual('');
            onHide();
            refreshData(prevState => !prevState);
            toast.success('Predicción creada con éxito', { position: 'top-center' });
        } catch (error) {
            console.error('Error al crear la predicción:', error);
            toast.error('Error al crear la predicción', { position: 'top-center' });
        }
    };

    const handleCancelar = () => {
        setFechaDesde('');
        setFechaHasta('');
        setCoeficientes('');
        setMesPrediccion('');
        setAnioPrediccion('');
        setMetodoPrediccion('');
        setAlfa('');
        setCantidadPeriodosAPredecir('');
        setCantidadPeriodosAUsar('');
        setCantidadDemandaAnual('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleCancelar} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Predicción de Demanda</Modal.Title>
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
                        <Form.Label>Coeficientes (separados por comas)</Form.Label>
                        <Form.Control
                            type="text"
                            value={coeficientes}
                            onChange={(e) => setCoeficientes(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mes de Predicción</Form.Label>
                        <Form.Control
                            type="number"
                            value={mesPrediccion}
                            onChange={(e) => setMesPrediccion(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Año de Predicción</Form.Label>
                        <Form.Control
                            type="number"
                            value={anioPrediccion}
                            onChange={(e) => setAnioPrediccion(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Método de Predicción</Form.Label>
                        <Form.Control
                            type="text"
                            value={metodoPrediccion}
                            onChange={(e) => setMetodoPrediccion(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Alfa</Form.Label>
                        <Form.Control
                            type="number"
                            value={alfa}
                            onChange={(e) => setAlfa(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad de Periodos a Predecir</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadPeriodosAPredecir}
                            onChange={(e) => setCantidadPeriodosAPredecir(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad de Periodos a Usar</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadPeriodosAUsar}
                            onChange={(e) => setCantidadPeriodosAUsar(Number(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cantidad de Demanda Anual</Form.Label>
                        <Form.Control
                            type="number"
                            value={cantidadDemandaAnual}
                            onChange={(e) => setCantidadDemandaAnual(Number(e.target.value))}
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

export default PrediccionDemandaModal;
