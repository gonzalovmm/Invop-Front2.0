import { OrdenDeCompra } from "../types/OrdenDeCompra";

const BASE_URL = 'http://localhost:8082'; 

export const OrdenDeCompraService = {
    getOrdenesDeCompra: async (): Promise<OrdenDeCompra[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/ordenCompra`);
        const data = await response.json();
        return data;
    },

    getOrdenDeCompra: async (id: number): Promise<OrdenDeCompra> => {
        const response = await fetch(`${BASE_URL}/api/v1/ordenCompra/${id}`);
        const data = await response.json();
        return data;
    },

    createOrdenDeCompra: async (ordenDeCompra: OrdenDeCompra): Promise<OrdenDeCompra> => {
        const response = await fetch(`${BASE_URL}/api/v1/ordenCompra/crear`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordenDeCompra)
        });
        const data = await response.json();
        return data;
    },

    updateOrdenDeCompra: async (id: number, ordenDeCompra: OrdenDeCompra): Promise<OrdenDeCompra> => {
        const response = await fetch(`${BASE_URL}/api/v1/ordenCompra/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordenDeCompra)
        });
        const data = await response.json();
        return data;
    },

    deleteOrdenDeCompra: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/ordenCompra/${id}`, {
            method: 'DELETE'
        });
    },
    filterOrdenesByEstado: async (estado: string): Promise<OrdenDeCompra[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/ordenCompra/findOrdenesByEstado?filtroEstado=${estado}`);
        const data = await response.json();
        return data;
    }
}

