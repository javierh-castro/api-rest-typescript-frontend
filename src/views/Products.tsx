import { Link, useLoaderData, ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../services/ProductServices";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}

function Products() {
  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl xl:text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Producto
        </Link>
      </div>

      <div>
        <table className="w-full border-collapse">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Precio</th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Disponibilidad</th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <ProductDetails
              key = {product.id}
              product = {product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
