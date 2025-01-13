import useSongs from "../hooks/useSongs";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useState } from "react"; // Importar useState

const ListadoSongs = () => {
  const { playlistWithSongs, eliminarSong } = useSongs();
  const navigate = useNavigate(); // Instancia de useNavigate
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Filtrar las canciones en base al término de búsqueda
  const filteredSongs = playlistWithSongs?.songs
    ? [...playlistWithSongs.songs].filter((song) =>
        // Comprobar si el término de búsqueda está presente en cualquier campo
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.genre?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (playlistId, songId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar esta canción de la playlist?"
    );
    if (confirmed) {
      eliminarSong(playlistId, songId);
    }
  };

  const handleAddSong = () => {
    const playlistId = playlistWithSongs.playlist?.id; // Obtener el ID de la playlist
    if (playlistId) {
      navigate(`/playlists/${playlistId}/songs`); // Redirigir a la URL dinámica
    }
  };

  return (
    <div className="p-5 h-screen bg-gray-100">
      {/* Filtro de búsqueda */}
      <div className="mb-5">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          placeholder="Buscar canción, autor o género..."
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center">
                {playlistWithSongs?.name || "Sin nombre"}
              </th>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center">
                Autor
              </th>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center">
                Género
              </th>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <tr key={song.id} className="bg-white">
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.name || "Sin título"}
                  </td>
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.author || "Desconocido"}
                  </td>
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.genre || "Sin género"}
                  </td>
                  <td className="p-3 flex gap-2 justify-end">
                    {playlistWithSongs.userHasAccessToSong && (
                      <button
                        onClick={() =>
                          handleDelete(playlistWithSongs.playlist?.id, song.id)
                        }
                        className="text-red-600 hover:text-red-800"
                        title="Eliminar"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-sm text-gray-500">
                  No hay canciones en esta playlist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {playlistWithSongs.userHasAccessToSong && (
        <div className="mt-5 mb-8 flex justify-center">
          <button
            onClick={handleAddSong}
            className="flex items-center px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
          >
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Agregar Canción
          </button>
        </div>
      )}
    </div>
  );
};

export default ListadoSongs;
