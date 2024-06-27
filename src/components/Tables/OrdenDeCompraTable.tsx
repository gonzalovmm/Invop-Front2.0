import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { OrdenDeCompra } from "../../types/OrdenDeCompra";
import { OrdenDeCompraService } from "../../services/OrdenDeCompraService";
import OrdenDeCompraModal from "../Modals/OrdenDeCompraModal";
import { ModalType } from "../../types/ModalType";
import { EstadoOrdenCompra } from "../../types/EstadoOrdenCompra"; // Importar el enum

const OrdenDeCompraTable = () => {
  const [ordenes, setOrdenes] = useState<OrdenDeCompra[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [selectedOrden, setSelectedOrden] = useState<OrdenDeCompra | null>(null);
  const [refreshData, setRefreshData] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<EstadoOrdenCompra | null>(null); // Estado seleccionado

  useEffect(() => {
    fetchOrdenes();
  }, [refreshData]);

  const fetchOrdenes = async () => {
    const data = await OrdenDeCompraService.getOrdenesDeCompra();
    setOrdenes(data);
  };

  const handleModal = (modalType: ModalType, orden?: OrdenDeCompra) => {
    setSelectedOrden(orden ?? null);
    setModalType(modalType);
    setShowModal(true);
  };

  const navigate = useNavigate();

  const handleVerDetalle = (ordenId: number) => {
    navigate(`/ordenes/${ordenId}`);
  };

  const handleDelete = async (ordenId: number) => {
    try {
      await OrdenDeCompraService.deleteOrdenDeCompra(ordenId);
      setRefreshData((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterByEstado = async (estado: EstadoOrdenCompra) => {
    try {
      const data = await OrdenDeCompraService.filterOrdenesByEstado(estado);
      setOrdenes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterButtonClick = () => {
    if (filtroEstado) {
      handleFilterByEstado(filtroEstado);
    } else {
      console.warn("Seleccione un estado válido para filtrar.");
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => handleModal(ModalType.CREATE)}
      >
        Nueva Orden de Compra
      </Button>

      {/* Selector de Estado */}
      <div className="mb-4 flex items-center">
        <Form.Select
          value={filtroEstado ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFiltroEstado(e.target.value as EstadoOrdenCompra)
          }
          className="mr-2"
        >
          <option value="">Seleccionar Estado...</option>
          {Object.values(EstadoOrdenCompra).map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </Form.Select>
        <Button
          variant="primary"
          className="py-2 px-4"
          onClick={handleFilterButtonClick}
        >
          Filtrar
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Proveedor</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} className="border-b">
                <td className="py-2 px-4 center">{orden.id}</td>
                <td className="py-2 px-4">{orden.estadoOrdenCompra}</td>
                <td className="py-2 px-4">{orden.fechaOrdenCompra}</td>
                <td className="py-2 px-4">{orden.totalOrdenCompra}</td>
                <td className="py-2 px-4">{orden.proveedor.id}</td>
                <td className="py-2 px-4">
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleVerDetalle(orden.id)}
                  >
                    Ver Detalle
                  </Button>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleModal(ModalType.UPDATE, orden)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(orden.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal 
      <OrdenDeCompraModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalType === ModalType.CREATE ? "Nueva Orden de Compra" : "Editar Orden de Compra"}
        modalType={modalType}
        orden={selectedOrden ?? { id: 0, estadoOrdenCompra: "", fechaOrdenCompra: "", totalOrdenCompra: 0}}
        refreshData={() => setRefreshData((prev) => !prev)}
      />*/}
    </>
  );
};

export default OrdenDeCompraTable;
