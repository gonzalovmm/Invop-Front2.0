import { PrediccionDemanda } from "../types/PrediccionDemanda";
import { ParametrosPrediccionDTO } from "../types/ParametrosPrediccionDTO";

const BASE_URL = 'http://localhost:8082';

export const PrediccionDemandaService = {
    getPredicciones: async (): Promise<PrediccionDemanda[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/prediccionDemanda`);
        if (!response.ok) {
            throw new Error('Error fetching predicciones');
        }
        return await response.json();
    },
    getPrediccion: async (idArticulo: number): Promise<PrediccionDemanda> => {
        const response = await fetch(`${BASE_URL}/api/v1/prediccionDemanda/find/${idArticulo}`);
        const data = await response.json();
        return data;
    },
    crearPrediccion: async (parametrosPrediccionDTO: ParametrosPrediccionDTO): Promise<PrediccionDemanda[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/prediccionDemanda/crear-prediccion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametrosPrediccionDTO),
        });
        if (!response.ok) {
            throw new Error('Error creating prediction');
        }
        return await response.json();
    },
    crearPrediccionPredeterminada: async (parametrosPrediccionDTO: ParametrosPrediccionDTO): Promise<PrediccionDemanda[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/prediccionDemanda/crear-prediccion-pred`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametrosPrediccionDTO),
        });
        if (!response.ok) {
            throw new Error('Error creating default prediction');
        }
        return await response.json();
    },
    medirError: async (parametrosPrediccionDTO: ParametrosPrediccionDTO): Promise<void> => {
        const response = await fetch(`${BASE_URL}/api/v1/prediccionDemanda/error`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parametrosPrediccionDTO),
        });
        if (!response.ok) {
            throw new Error('Error measuring prediction error');
        }
    }
}
