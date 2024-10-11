import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <header className="bg-slate-800 fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-6xl py-6 md:py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold sm:font-extrabold text-white text-center">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-[96px] md:mt-[128px] mx-2 md:mx-auto px-4 py-8 bg-white shadow-lg rounded-lg md:max-w-6xl md:px-8 md:py-12 md:shadow-xl">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
