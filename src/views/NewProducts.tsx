import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProducts } from "../services/ProductServices";
import ProductForm from "../components/ProductForm";

export async  function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())
  console.log(data)

  let error = ''
  if(Object.values(data).includes('')){
    error = 'Todos los campos son obligatorios'
  }
  if(error.length){
    return error
  }

  await addProducts(data)

  return redirect('/')
}

function NewProducts() { 
  const error = useActionData() as string
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Productos
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>} {/* El as es para que no me de error aca */}

      <Form 
      className="mt-10"
      method="POST"
      >
        <ProductForm />
        <input
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

export default NewProducts;
