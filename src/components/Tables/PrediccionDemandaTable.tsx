// PrediccionDemandaTable.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PrediccionDemanda } from '../../types/PrediccionDemanda';
import { PrediccionDemandaService } from '../../services/PrediccionDemandaService';

const PrediccionDemandaTable: React.FC = () => {
    const { idArticulo } = useParams<{ idArticulo: string }>();
    const [predicciones, setPredicciones] = useState<PrediccionDemanda[]>([]);

    useEffect(() => {
        const fetchPredicciones = async () => {
            try {
                const prediccionesData = await PrediccionDemandaService.getPrediccionesPorArticulo(parseInt(idArticulo, 10));
                setPredicciones(prediccionesData);
            } catch (error) {
                console.error('Error fetching predicciones:', error);
            }
        };

        fetchPredicciones();
    }, [idArticulo]);

    return (
        <div>
            <h2>Predicciones de Demanda para el Artículo ID: {idArticulo}</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Porcentaje de Error</th>
                        <th>Error</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Cantidad Periodo</th>
                        <th>Método Predicción</th>
                        <th>Valor Predicción</th>
                    </tr>
                </thead>
                <tbody>
                    {predicciones.map(prediccion => (
                        <tr key={prediccion.id}>
                            <td>{prediccion.id}</td>
                            <td>{prediccion.porcentajeDeError}</td>
                            <td>{prediccion.error}</td>
                            <td>{new Date(prediccion.fechaInicio).toLocaleDateString()}</td>
                            <td>{new Date(prediccion.fechaFin).toLocaleDateString()}</td>
                            <td>{prediccion.cantidadPeriodo}</td>
                            <td>{prediccion.metodoPrediccion}</td>
                            <td>{prediccion.valorPrediccion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrediccionDemandaTable;
