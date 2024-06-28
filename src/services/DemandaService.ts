import { Demanda } from "../types/Demanda";

const BASE_URL = 'http://localhost:8082';

export const DemandaService = {
    getDemandas: async (): Promise<Demanda[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/demanda`);
        if (!response.ok) {
            throw new Error('Error fetching demandas');
        }
        return await response.json();
    },

    createDemanda: async (fechaDesde: Date, fechaHasta: Date, idArticulo: number): Promise<Demanda> => {
        const demanda = {
            fechaDesde,
            fechaHasta,
            totalDemanda: 0,  // Puedes ajustar esto según sea necesario
            idArticulo: { id: idArticulo }  // Asumiendo que el objeto Articulo solo requiere el ID aquí
        };

        const response = await fetch(`${BASE_URL}/api/v1/demanda/calcularDemanda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(demanda),
        });

        if (!response.ok) {
            throw new Error('Error creating demanda');
        }

        return await response.json();
    },
};