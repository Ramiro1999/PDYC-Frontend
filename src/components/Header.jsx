import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {
  const {cerrarSesion} = useAuth();


  return (
    
    <header className='py-10 bg-indigo-600'>
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200">Administrador de 
              <span className="text-white font-black"> Playlists</span>
            </h1>
          <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-5 items-center">
            <Link to="/playlists" className="text-white text-sm uppercase font-bold">Playlists</Link>
            <button 
              type="button"
              className="text-white text-sm uppercase font-bold" 
              onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </nav>
        </div>

    </header>
  )
}

export default Header