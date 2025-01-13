import { useState } from "react";
import useSongs from "../hooks/useSongs";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const ListadoSongs2 = () => {
  const { availableSongs, addSongToPlaylist } = useSongs();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para manejar la búsqueda

  const sortedSongs = availableSongs
    ? [...availableSongs].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  // Filtrar las canciones según la búsqueda en todos los campos
  const filteredSongs = sortedSongs.filter((song) => {
    const query = searchQuery.toLowerCase();

    // Filtrar por nombre, autor o género
    return (
      song.name.toLowerCase().includes(query) ||
      song.author?.toLowerCase().includes(query) ||
      song.genre?.toLowerCase().includes(query)
    );
  });

  const handleAddSong = (name) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas agregar esta canción a la playlist?"
    );
    if (confirmed) {
      addSongToPlaylist(name);
      alert("¡Canción agregada a la playlist correctamente!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 p-5">
        <div className="overflow-auto rounded-lg shadow">
          {/* Campo de búsqueda */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar canción, autor o género..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado con el texto de búsqueda
              className="p-2 w-full border rounded-md"
            />
          </div>

          {/* Vista escritorio */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-center">
                    Canciones
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
                      <td className="p-3 flex justify-center">
                        <button
                          onClick={() => handleAddSong(song.name)}
                          className="text-green-600 hover:text-green-800"
                          title="Agregar A Playlist"
                        >
                          <PlusCircleIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center text-sm text-gray-500">
                      No hay canciones disponibles!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Vista móvil */}
          <div className="block md:hidden">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <div key={song.id} className="bg-white p-4 mb-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-700">{song.name || "Sin título"}</span>
                    <button
                      onClick={() => handleAddSong(song.name)}
                      className="text-green-600 hover:text-green-800"
                      title="Agregar Canción"
                    >
                      <PlusCircleIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div><strong>Autor:</strong> {song.author || "Desconocido"}</div>
                    <div><strong>Género:</strong> {song.genre || "Sin género"}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-sm text-gray-500">
                No hay canciones disponibles!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoSongs2;
