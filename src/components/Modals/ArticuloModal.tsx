import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Articulo } from "../../types/Articulo";

//Dependencias para validar formularios
import * as Yup from "yup"; //Chequea que este bn escrito en el formato correcto
import { useFormik } from "formik"; //se assegura de todo el guardado de la información

import { ArticuloService } from "../../services/ArticuloService";

//Notifiaciones al usuario
import {toast} from 'react-toastify';


type ArticuloModalProps={
  show: boolean;
  onHide:()=>void;
  title: string;
  modalType: ModalType;
  prod:Articulo;
  refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticuloModal = ({show, onHide, title, modalType, prod, refreshData}: ArticuloModalProps) => {
  
  //CREATE-ACTUALIZAR
  const handleSaveUpdate =async (pro:Articulo) => {
    try {
      const isNew =prod.id === 0;
      if (isNew) {
        await ArticuloService.createArticulo(pro);
      }else{
        await ArticuloService.updateArticulo(pro.id, pro);
      }
      toast.success(isNew ? "Articulo creado" : "Articulo actualizado",{
        position:"top-center",
      });
      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error('Ha ocurrido un error:');
    }
  };
  
  //DELETE
  const handleDelete =async () => {
    try {
      await ArticuloService.deleteArticulo(prod.id);

      toast.success("Articulo borrado",{
        position:"top-center",
      });

      onHide();
      refreshData(prevState => !prevState);
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error:");
    }
    
  }

  //Esquema de validacion usando Yup
  const validationSchema=()=>{
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      nombre_articulo: Yup.string().required('El nombre del articulo es requerido'),
      precio_articulo: Yup.number().min(0).required('El precio del articulo es requerido'),
      cantidad_a_pedir: Yup.number().min(0).required('La cantidad a pedir es requerida'),
      cantidad_maxima: Yup.number().min(0).required('La cantidad maxima es requerida'),
      cgi: Yup.number().min(0).required('El cgi es requerido'),
      costo_almacenamiento: Yup.number().min(0).required('El costo de almacenamiento es requerido'),
      costo_pedido: Yup.number().min(0).required('El costo de pedido es requerido'),
      demanda_anual: Yup.number().min(0).required('La demanda anual es requerida'),
      lote_optimo: Yup.number().min(0).required('El lote optimo es requerido'),
      modelo_inventario: Yup.string().required('El modelo de inventario es requerido'),
      tiempo_revision: Yup.number().min(0).required('El tiempo de revision es requerido'),
      punto_pedido: Yup.number().min(0).required('El punto de pedido es requerido'),
      stock_actual: Yup.number().min(0).required('El stock actual es requerido'),
      stock_seguridad: Yup.number().min(0).required('El stock de seguridad es requerido'), 
      proveedor_predeterminado: Yup.string().required('El proveedor predeterminado es requerido'),


     
      
    });
  };
  //Formik valida este esquema que le estamos pasando, obtenemos un formulario dinamico
  //que lo bloquea en caso de haber errores.
  const formik=useFormik({
    initialValues: prod,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit:(obj: Articulo)=>handleSaveUpdate(obj),
  });
  
  return (
    <>
      {modalType === ModalType.DELETE ? (
        <Modal
          show={show}
          onHide={onHide}
          centered
          backdrop="static"
          className="bg-gray-100 rounded-md shadow-md"
        >
          <Modal.Header closeButton className="bg-gray-200 py-2 px-4">
            <Modal.Title className="text-lg font-bold">{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-4 py-2">
            <p className="text-gray-600">
              ¿Estáseguro que desea eliminar el producto<br />
              <strong>{prod.nombre_articulo}</strong>?
            </p>
          </Modal.Body>

          <Modal.Footer className="bg-gray-200 py-2 px-4">
            <Button variant="secondary" onClick={onHide} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={onHide}
          centered
          backdrop="static"
          className="bg-gray-100 rounded-md shadow-md"
        >
          <Modal.Header closeButton className="bg-gray-200 py-2 px-4">
            <Modal.Title className="text-lg font-bold">{title}</Modal.Title>
            <p style={{ color: 'ed' }} className="text-sm">
              ***Completar todos los campos o no se creará***
            </p>
          </Modal.Header>

          <Modal.Body className="px-4 py-2">
            <Form onSubmit={formik.handleSubmit} className="flex flex-col">
              <Form.Group controlId="formNombre" className="mb-4">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  value={formik.values.nombre_articulo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.nombre_articulo &&!!formik.errors.nombre_articulo}
                  className="bg-white border border-gray-300 rounded-md py-2 px-4"
                />
                <Form.Control.Feedback type="invalid" className="text-red-500">
                  {formik.errors.nombre_articulo}
                </Form.Control.Feedback>
              </Form.Group>
                    <Form.Group controlId="formPrecio" className="mb-4">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            name="precioCompra"
                            type="text"
                            value={formik.values.precio_articulo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.precio_articulo && !!formik.errors.precio_articulo}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.precio_articulo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockActual" className="mb-4"> 
                        <Form.Label>Stock Actual</Form.Label>
                        <Form.Control
                            name="stockActual"
                            type="text"
                            value={formik.values.stock_actual}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stock_actual && !!formik.errors.stock_actual}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.stock_actual}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formStockDeSeguridad" className="mb-4">
                        <Form.Label>Stock De Seguridad</Form.Label>
                        <Form.Control
                            name="stockDeSeguridad"
                            type="text"
                            value={formik.values.stock_seguridad}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.stock_seguridad && !!formik.errors.stock_seguridad}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.stock_seguridad}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formLoteOptimo" className="mb-4">
                        <Form.Label>Lote Óptimo</Form.Label>
                        <Form.Control
                            name="loteOptimo"
                            type="text"
                            value={formik.values.lote_optimo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.lote_optimo && !!formik.errors.lote_optimo}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.lote_optimo}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCGIArticulo" className="mb-4">
                        <Form.Label>CGI Articulo</Form.Label>
                        <Form.Control
                            name="cgiArticulo"
                            type="text"
                            value={formik.values.cgi}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cgi && !!formik.errors.cgi}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.cgi}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formPuntoPedido" className="mb-4">
                        <Form.Label>Punto de Pedido</Form.Label>
                        <Form.Control
                            name="puntoPedido"
                            type="text"
                            value={formik.values.punto_pedido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.punto_pedido && !!formik.errors.punto_pedido}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.punto_pedido}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formTiempoEntrePedidos" className="mb-4">
                        <Form.Label>Tiempo entre Pedidos</Form.Label>
                        <Form.Control
                            name="tiempoEntrePedidos"
                            type="text"
                            value={formik.values.tiempo_revision}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.tiempo_revision && !!formik.errors.tiempo_revision}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.tiempo_revision}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCostoAlmacenamiento" className="mb-4">
                        <Form.Label>Costo de Almacenamiento</Form.Label>
                        <Form.Control
                            name="costoAlmacenamiento"
                            type="text"
                            value={formik.values.costo_almacenamiento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.costo_almacenamiento && !!formik.errors.costo_almacenamiento}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.costo_almacenamiento}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCantMax" className="mb-4">
                        <Form.Label>Cantidad Máxima</Form.Label>
                        <Form.Control
                            name="cantMax"
                            type="text"
                            value={formik.values.cantidad_maxima}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cantidad_maxima && !!formik.errors.cantidad_maxima}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.cantidad_maxima}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCantAPedir" className="mb-4">
                        <Form.Label>Cantidad a Pedir</Form.Label>
                        <Form.Control
                            name="cantAPedir"
                            type="text"
                            value={formik.values.cantidad_a_pedir}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.cantidad_a_pedir && !!formik.errors.cantidad_a_pedir}
                            className="bg-white border border-gray-300 rounded-md py-2 px-4"
                        />
                        <Form.Control.Feedback type="invalid" className="text-red-500">
                            {formik.errors.cantidad_a_pedir}
                        </Form.Control.Feedback>
                    </Form.Group>
    
                    <Modal.Footer className="bg-gray-200 py-2 px-4">
                        <Button variant="secondary" onClick={onHide} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Cancelar
                        </Button>
                        <Button variant="success" type="submit" disabled={!formik.isValid} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        )
    }
    </>
    );
};

export default ArticuloModal;