import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PlaylistsContext = createContext();
clienteAxios.defaults.withCredentials = true;

// eslint-disable-next-line react/prop-types
const PlaylistsProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerPlaylists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'User-Email': auth.email,
          },
        };

        const { data } = await clienteAxios.get('/playlists', config);
        setPlaylists(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPlaylists();
  }, [auth]);

  const eliminarPlaylist = async (playlistId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Llamada a la API para eliminar la playlist
      await clienteAxios.delete(`/playlists/${playlistId}`, config);

      // Actualizar el estado local eliminando la playlist
      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
    } catch (error) {
      console.error('Error eliminando la playlist:', error.response?.data?.message || error.message);
    }
  };

  return (
    <PlaylistsContext.Provider
      value={{
        playlists,
        eliminarPlaylist, 
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export { PlaylistsProvider };
export default PlaylistsContext;
