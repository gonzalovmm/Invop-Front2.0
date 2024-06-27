import { Articulo } from "../types/Articulo";

const BASE_URL ='http://localhost:8082'; 

export const ArticuloService = {
    getVentas:async (): Promise<Articulo[]>=>{
        const response = await fetch(`${BASE_URL}/api/v1/ventas`);
        const data = await response.json();
        return data;
    },

    // Me devuelve un array con todos los articulos
    getArticulos:async (): Promise<Articulo[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/articulos`);
        const data= response.json();
        return data;
    },

    getArticulo:async (id:number): Promise<Articulo> => {
        const response = await fetch(`${BASE_URL}/api/v1/articulos/${id}`); //nos dirige a un articulo en particular dependiendo el id que se ingrese
        const data= await response.json();
        return data;
    },
    
    createArticulo: async (articulo: Articulo): Promise<Articulo> => {
        const response = await fetch(`${BASE_URL}/api/v1/articulos`, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        });
        const data= await response.json();
        return data;
    },

    updateArticulo: async (id:number, articulo:Articulo): Promise<Articulo> => {
        const response = await fetch(`${BASE_URL}/api/v1/articulos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulo)
        });
        const data= await response.json();
        return data;
    },

    deleteArticulo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/articulos/baja/${id}`, {
            method: 'DELETE', 
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ` + localStorage.getItem('token'),
            },
        });
    }

}