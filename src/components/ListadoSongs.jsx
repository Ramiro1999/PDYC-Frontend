import useSongs from "../hooks/useSongs";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const ListadoSongs = () => {
  const { playlistWithSongs, eliminarSong } = useSongs();
  console.log(playlistWithSongs);

  const sortedSongs = playlistWithSongs?.songs
    ? [...playlistWithSongs.songs].sort((a, b) => a.name.localeCompare(b.name))
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
    // Implementa aquí la lógica para añadir una nueva canción
    alert("Abre un formulario para añadir una canción.");
  };

  return (
    <div className="p-5 h-screen bg-gray-100">
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
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center">
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedSongs.length > 0 ? (
              sortedSongs.map((song) => (
                <tr key={song.id} className="bg-white">
                  {/* Nombre de la canción */}
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.name || "Sin título"}
                  </td>
                  {/* Autor de la canción */}
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.author || "Desconocido"}
                  </td>
                  {/* Género de la canción */}
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                    {song.genre || "Sin género"}
                  </td>
                  {/* Botón de eliminar */}
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
               {/* Botón para agregar canción */}
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
