import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth'

const CrearPlaylist = () => {
  const [name, setName] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const {auth} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '') {
      setAlerta({ msg: "El nombre de la playlist es obligatorio", error: true });
      return;
    }

    setAlerta({});

    try {
    const token = localStorage.getItem('token')
    if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Email": auth.email
  
        },
      }
      console.log('Nombre enviado al backend:', name);
      await clienteAxios.post("/playlists", { name }, config);
      setAlerta({ msg: "Playlist creada correctamente", error: false });
      setTimeout(() => {
        navigate("/playlists");
      }, 2000);
    } catch (error) {
      setAlerta({ msg: error.response.data, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <div className="bg-gray-50 py-12 flex justify-center">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-3xl font-semibold text-indigo-700 text-center mb-6">Crear Playlist</h2>
        
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-xl font-semibold text-gray-700 mb-2">Nombre de la Playlist</label>
            <input
              type="text"
              placeholder="Ingresa el nombre de la playlist"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Playlist"
            className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white text-lg font-semibold uppercase transition duration-300 hover:bg-indigo-700 focus:outline-none"
          />
        </form>

        <nav className="mt-5">
          <Link
            to="/playlists"
            className="block text-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Volver a Playlists
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default CrearPlaylist;
