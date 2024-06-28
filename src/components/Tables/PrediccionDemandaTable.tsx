import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PrediccionDemanda } from '../../types/PrediccionDemanda';
import { ParametrosPrediccionDTO } from '../../types/ParametrosPrediccionDTO';
import { PrediccionDemandaService } from '../../services/PrediccionDemandaService';
import { MetodoPrediccion } from '../../types/MetodoPrediccion';
import { Button } from 'react-bootstrap';



const PrediccionDemandaTable: React.FC = () => {
    const { idArticulo } = useParams<{ idArticulo: string }>();
    const [predicciones, setPredicciones] = useState<PrediccionDemanda[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPredicciones = async () => {
            try {
                const prediccion = await PrediccionDemandaService.getPrediccion(Number(idArticulo));
                setPredicciones(Array.isArray(prediccion) ? prediccion : []);
            } catch (error) {
                console.error('Error fetching predicciones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPredicciones();
    }, [idArticulo]);

    const handleNuevaPrediccion = async () => {
        const parametros: ParametrosPrediccionDTO = {
            articuloId: Number(idArticulo),
            fechaDesde: new Date().toISOString().split('T')[0],
            fechaHasta: new Date().toISOString().split('T')[0],
            coeficientes: [0.1, 0.2, 0.3], // Ejemplo de coeficientes
            mesPrediccion: new Date().getMonth() + 1,
            anioPrediccion: new Date().getFullYear(),
            metodoPrediccion: MetodoPrediccion.PROMEDIO_MOVIL, // Ejemplo de método
            alfa: 0.1,
            cantidadPeriodosAPredecir: 12,
            cantidadPeriodosAUsar: 12,
            cantidadDemandaAnual: 100,
            error: 0,
            porcentajeDeError: 0,
            prediccion: 0,
        };
        try {
            await PrediccionDemandaService.crearPrediccion(parametros);
            // Refresca las predicciones después de crear una nueva
            const data = await PrediccionDemandaService.getPrediccion(Number(idArticulo));
            setPredicciones(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error creating prediccion:', error);
        }
    };

    const handleMedirError = async () => {
        const parametros: ParametrosPrediccionDTO = {
            articuloId: Number(idArticulo),
            fechaDesde: new Date().toISOString().split('T')[0],
            fechaHasta: new Date().toISOString().split('T')[0],
            coeficientes: [0.1, 0.2, 0.3], // Ejemplo de coeficientes
            mesPrediccion: new Date().getMonth() + 1,
            anioPrediccion: new Date().getFullYear(),
            metodoPrediccion: MetodoPrediccion.SUAVIZACION_EXPONENCIAL, // Ejemplo de método
            alfa: 0.1,
            cantidadPeriodosAPredecir: 12,
            cantidadPeriodosAUsar: 12,
            cantidadDemandaAnual: 100,
            error: 0,
            porcentajeDeError: 0,
            prediccion: 0,
        };
        try {
            await PrediccionDemandaService.medirError(parametros);
            // Refresca las predicciones después de medir el error
            const data = await PrediccionDemandaService.getPrediccion(Number(idArticulo));
            setPredicciones(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error measuring error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Predicciones de Demanda para Artículo {idArticulo}</h2>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleNuevaPrediccion}>Nueva Predicción</Button>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleMedirError}>Medir Error</Button>
            <div className="overflow-x-auto">

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Fecha de Predicción</th>
                        <th className="py-2 px-4 border-b">Metodo Predicción</th>
                        <th className="py-2 px-4 border-b">Artículo</th>
                        <th className="py-2 px-4 border-b">Demanda</th>
                        <th className="py-2 px-4 border-b">Metodo</th>
                        <th className="py-2 px-4 border-b">Valor Predicción</th>
 
                    </tr>
                </thead>
                <tbody>
                    {predicciones.map((prediccion) => (
                        <tr>
                            <td className="py-2 px-4 border-b">{prediccion.id}</td>
                            <td className="py-2 px-4 border-b">{new Date(prediccion.fechaPrediccion).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b"> className="py-2 px-4 border-b"{prediccion.metodoPrediccion}</td>
                            <td className="py-2 px-4 border-b">{prediccion.idArticulo.id}</td>
                            <td className="py-2 px-4 border-b">{prediccion.idDemanda.id}</td>
                            <td className="py-2 px-4 border-b">{prediccion.valorPrediccion }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PrediccionDemandaTable;
