// PrediccionDemandaService.ts

import { PrediccionDemanda } from "../types/PrediccionDemanda";

const BASE_URL = 'http://localhost:8082';

export const PrediccionDemandaService = {
    getAllPredicciones: async (): Promise<PrediccionDemanda[]> => {
        const response = await fetch(`${BASE_URL}/PrediccionDemanda/all`);
        if (!response.ok) {
            throw new Error('Error fetching predicciones');
        }
        return await response.json();
    },

    realizarPrediccion: async (prediccion: PrediccionDemanda): Promise<number> => {
        const response = await fetch(`${BASE_URL}/PrediccionDemanda/predecirDemanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prediccion),
        });

        if (!response.ok) {
            throw new Error('Error realizando predicción');
        }

        return await response.json();
    },

    calcularError: async (prediccion: PrediccionDemanda): Promise<number> => {
        const response = await fetch(`${BASE_URL}/PrediccionDemanda/calcularError`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prediccion),
        });

        if (!response.ok) {
            throw new Error('Error calculando error');
        }

        return await response.json();
    }
    export const PrediccionDemandaService = {
        getPrediccionesPorArticulo: async (idArticulo: number): Promise<PrediccionDemanda[]> => {
            const response = await fetch(`${BASE_URL}/predicciondemanda/all?idArticulo=${idArticulo}`);
            if (!response.ok) {
                throw new Error('Error fetching predicciones');
            }
            return await response.json();
        },
};
