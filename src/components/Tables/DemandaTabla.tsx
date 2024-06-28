import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { DemandaService } from '../../services/DemandaService';
import DemandaModal from '../Modals/DemandaModal';
import { Demanda } from '../../types/Demanda';

const DemandaTabla: React.FC = () => {
    const [demandas, setDemandas] = useState<Demanda[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchDemandas = async () => {
            try {
                const demandas = await DemandaService.getDemandas();
                setDemandas(demandas);
            } catch (error) {
                console.error('Error fetching demandas:', error);
            }
        };
        fetchDemandas();
    }, [refresh]);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <div>
            <Button variant="primary" onClick={handleShowModal}>
                Crear Demanda
            </Button>
            <table className="min-w-full bg-white border border-gray-300 mt-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Artículo ID</th>
                        <th className="py-2 px-4 border-b">Fecha Desde</th>
                        <th className="py-2 px-4 border-b">Fecha Hasta</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {demandas.map((demanda) => (
                        <tr key={demanda.id}>
                            <td className="py-2 px-4 border-b">{demanda.idArticulo.id}</td>
                            <td className="py-2 px-4 border-b">{new Date (demanda.fechaDesde).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{new Date (demanda.fechaHasta).toLocaleString()}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <DemandaModal show={showModal} onHide={handleHideModal} refreshData={setRefresh} />
        </div>
    );
};

export default DemandaTabla;
