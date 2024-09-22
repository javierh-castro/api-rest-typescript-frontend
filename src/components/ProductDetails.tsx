import { useState } from "react";
import { useNavigate, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import { Product } from "../types";
import { formatlurrency } from "../utils";
import { deleteProduct } from "../services/ProductServices";

type ProductDetailsProps = {
  product: Product;
};

export async  function action({params} : ActionFunctionArgs) {
  if(params.id !== undefined){
    await deleteProduct(+params.id)
    return redirect('/')
  }
}

function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const isAvailable = product.availability;

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    fetcher.submit({ id: id.toString() }, { method: 'POST', action: `/productos/${id}/eliminar` });
    setShowDeleteConfirm(null);
  };

  return (
    
    <tr className="flex flex-col md:table-row">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="md:hidden text-sm font-medium text-gray-900">Nombre</div>
        <div className="text-sm">{product.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="md:hidden text-sm font-medium text-gray-900">Precio</div>
        <div className="text-sm text-gray-500">{formatlurrency(product.price)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="md:hidden text-sm font-medium text-gray-900">Disponibilidad</div>
        <fetcher.Form method='POST'>
        <button
          type='submit'
          name='id'
          value={product.id}
          className={`${isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}
          px-3 py-1 rounded-full text-xs font-semibold w-full md:w-auto`}
        >
          {isAvailable ? 'Disponible' : 'No Disponible'}
        </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
          className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
          onClick={() => navigate(`/productos/${product.id}/editar`)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            onClick={() => setShowDeleteConfirm(product.id)}
          >
            Eliminar
          </button>
          {showDeleteConfirm === product.id && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold mb-2">¿Estás seguro de que quieres eliminar este producto?</h3>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <Form 
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={ (e) => { // *Esto se ejecuta antes del action
              if(!confirm('¿Eliminar?')) {
                e.preventDefault()
              }
            }}
            >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
            />
          </Form> */}
        </div>
      </td>
    </tr>
  );
}

export default ProductDetails;
