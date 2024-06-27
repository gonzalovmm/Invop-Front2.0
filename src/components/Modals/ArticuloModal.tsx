import { Articulo } from "../../types/Articulo";
import { ModalType } from "../../types/ModalType";
import { useEffect, useState } from "react";
import { Proveedor } from "../../types/Proveedor";
import { ModeloInventario } from "../../types/ModeloInventario";
import { ArticuloService } from "../../services/ArticuloService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Modal from "react-bootstrap/esm/Modal";
import * as Yup from "yup";
import { Button, Form, FormLabel, ModalFooter, ModalTitle } from "react-bootstrap";

type ArticuloModalProps = {
  show: boolean;
  onHide: () => void;
  nombre: string;
  modalType: ModalType;
  art: Articulo;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArticuloModal = ({
  show,
  onHide,
  nombre,
  modalType,
  art: articulo,
  refreshData,
}: ArticuloModalProps) => {
  const initialValues = {
    id: articulo?.id || 0,
    cantidadAPedir: articulo?.cantidadAPedir || 0,
    cantidadMaxima: articulo?.cantidadMaxima || 0,
    cgi: articulo?.cgi || 0,
    costoAlmacenamiento: articulo?.costoAlmacenamiento || 0,
    costoPedido: articulo?.costoPedido || 0,
    demandaAnual: articulo?.demandaAnual || 0,
    loteOptimo: articulo?.loteOptimo || 0,
    modeloInventario: articulo?.modeloInventario || "",
    nombre: articulo?.nombre || '',
    precio: articulo?.precio || 0,
    puntoPedido: articulo?.puntoPedido || 0,
    stockActual: articulo?.stockActual || 0,
    stockSeguridad: articulo?.stockSeguridad || 0,
    tiempoRevision: articulo?.tiempoRevision || 0,
    proveedorPred: articulo?.proveedorPred || 0,
  };

  //CREATE-UPDATE
  const handleSaveUpdate = async (art: Articulo) => {
    try {
      const isNew = art.id === 0;
      if (isNew) {
        await ArticuloService.createArticulo(art);
      } else {
        await ArticuloService.updateArticulo(art.id, art);
      }
    
  
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error");
    }
    onHide();
    refreshData(prevState => !prevState);
  };

  //DELETE
  const handleDelete = async () => {
    console.log ("Voy a borrar")
    try {
      await ArticuloService.deleteArticulo(articulo.id);
      toast.success("Artículo eliminado", {
        position: "top-center",
      })
      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error");
    };
  }

  //Esquema YUP DE VALIDACION
  const validationSchema = Yup.object().shape({
    id: Yup.number().integer().min(0),
    nombre: Yup.string().required('Se requiere el nombre del artículo'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (art: Articulo) => handleSaveUpdate(art),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <ModalTitle className="text-lg font-bold">{articulo.nombre}</ModalTitle>
            <Modal.Body>
              <p className="mt-4">¿Está seguro de querer eliminar el articulo <br /> <strong>{articulo.nombre}</strong>?</p>
            </Modal.Body>
            <ModalFooter className="mt-4 flex justify-end">
              <Button variant="secondary" onClick={onHide} className="mr-2">No, volver</Button>
              <Button variant="danger" onClick={handleDelete}>Sí, confirmar</Button>
            </ModalFooter>
          </div>
        </Modal>
      ) : (
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <Modal.Header closeButton>
              <ModalTitle className="text-lg font-bold">{nombre}</ModalTitle>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <FormLabel className="block text-gray-700">Nombre</FormLabel>
                  <Form.Control
                    name="nombre"
                    type="text"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.nombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <FormLabel className="block text-gray-700">Precio</FormLabel>
                  <Form.Control
                    name="precio"
                    type="number"
                    value={formik.values.precio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.precio && formik.touched.precio)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.precio}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <FormLabel className="block text-gray-700">Costo Almacenamiento</FormLabel>
                  <Form.Control
                    name="costoAlmacenamiento"
                    type="number"
                    value={formik.values.costoAlmacenamiento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.costoAlmacenamiento && formik.touched.costoAlmacenamiento)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.costoAlmacenamiento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <FormLabel className="block text-gray-700">Modelo Inventario</FormLabel>
                  <Form.Control
                    as="select"
                    name="modeloInventario"
                    value={formik.values.modeloInventario}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.modeloInventario && !!formik.errors.modeloInventario}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Selecciona un Modelo de Inventario</option>
                    {Object.values(ModeloInventario).map((modelo) => (
                      <option key={modelo} value={modelo}>
                        {modelo.replace('_', ' ').toLowerCase()}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.modeloInventario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <FormLabel className="block text-gray-700">Costo de pedido</FormLabel>
                  <Form.Control
                    name="costoPedido"
                    type="number"
                    value={formik.values.costoPedido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.costoPedido && formik.touched.costoPedido)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.costoPedido}
                  </Form.Control.Feedback>
                </Form.Group>

                <ModalFooter className="mt-4 flex justify-end">
                  <Button variant="secondary" onClick={onHide} className="mr-2">Cancelar</Button>
                  <Button variant="primary" type="submit">Guardar</Button>
                </ModalFooter>
              </Form>
            </Modal.Body>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ArticuloModal;
