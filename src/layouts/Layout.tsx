import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"

function Layout() {
  return (
    <>
    <header className=" bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
            <h1 className="text-4xl font-extrabold text-white">Administrador de Productos</h1>
        </div>
    </header>
    <main className=" mt-10 container max-w-6xl mx-auto px-4 py-8 bg-white shadow rounded">
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default Layout