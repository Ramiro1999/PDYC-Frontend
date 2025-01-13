import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import { useParams } from "react-router-dom";

const SongsContext = createContext();
clienteAxios.defaults.withCredentials = true;

// eslint-disable-next-line react/prop-types
const SongsProvider = ({ children }) => {
  const [playlistWithSongs, sePlaylistWithSongs] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const obtenerSongs = async () => {
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

        const { data } = await clienteAxios.get(`/playlists/${id}`, config);
        sePlaylistWithSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerSongs();
  }, [auth,playlistWithSongs,id]);

  const eliminarSong = async (playlistId,songId) => {
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
      await clienteAxios.delete(`/playlists/${playlistId}/songs/${songId}`, config);

      // Actualizar el estado local eliminando la playlist
      sePlaylistWithSongs((prev) => ({
        ...prev, // Copia todas las demás propiedades del objeto
        songs: prev.songs.filter((song) => song.id !== songId), // Filtra solo el array songs
      }));
          } catch (error) {
      console.error('Error eliminando la cancion:', error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const obtenerSongs2 = async () => {
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

        const { data } = await clienteAxios.get(`/songs/${id}`, config);
        setAvailableSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerSongs2();
  }, [auth,availableSongs,id]);


  
  const addSongToPlaylist = async (name) => {
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
      await clienteAxios.post(`/playlists/${id}/songs`, { name } ,config);

      // Actualizar el estado local eliminando la playlist
      setAvailableSongs((prev) => prev.filter((song) => song.name !== name));
          } catch (error) {
      console.error('Error agregando la cancion:', error.response?.data?.message || error.message, ' a la playlist');
    }
  };

  return (
    <SongsContext.Provider
      value={{
        availableSongs,
        playlistWithSongs,
        eliminarSong, 
        addSongToPlaylist
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};


export { SongsProvider };
export default SongsContext;