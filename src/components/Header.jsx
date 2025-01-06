import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesion } = useAuth(); // Desestructuramos cerrarSesion desde useAuth

  const handleCerrarSesion = () => {
    cerrarSesion(); // Llamamos a la función para cerrar sesión
  };

  return (
    <header className='py-10 bg-indigo-600'>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200">Administrador de 
          <span className="text-white font-black"> Playlists</span>
        </h1>
        <nav className="flex flex-col lg:flex-row gap-4 mt-5 lg:mt-5 items-center">
          <Link to="/playlists" className="bg-white text-indigo-600 text-sm uppercase font-bold py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-300">
            Playlists
          </Link>
          <Link to="/playlists/crear" className="bg-white text-indigo-600 text-sm uppercase font-bold py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-300">
            Crear Playlist
          </Link>
          <button 
            type="button"
            className="bg-white text-indigo-600 text-sm uppercase font-bold py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-300"
            onClick={handleCerrarSesion}> {/* Usamos handleCerrarSesion */}
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;