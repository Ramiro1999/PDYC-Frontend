import usePlaylists from "../hooks/usePlaylists";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useState } from "react"; // Importar useState para manejar el estado del filtro

const ListadoPlaylists = () => {
  const { playlists, eliminarPlaylist } = usePlaylists(); // removePlaylist se define en el hook para manejar la eliminación
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Filtrar las playlists basadas en el término de búsqueda
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por nombre de la playlist
  );

  // Ordenar las playlists alfabéticamente por nombre
  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => a.name.localeCompare(b.name));

  // Maneja la eliminación de una playlist
  const handleDelete = (playlistId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta playlist?");
    if (confirmed) {
      eliminarPlaylist(playlistId); // Llamada a la función que elimina la playlist
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
          placeholder="Buscar playlist..."
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600 text-left">
                Playlists
              </th>
              <th className="p-3 tracking-wide text-xl font-bold text-indigo-600">
                {/* Aquí podrías añadir un encabezado para las acciones, si lo deseas */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedPlaylists.length > 0 ? (
              sortedPlaylists.map((playlist) => (
                <tr key={playlist.id} className="bg-white">
                  <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-left">
                    <Link
                      to={`/playlists/${playlist.id}`} // Redirige a la página de detalles de la playlist
                      className="text-indigo-600 hover:underline"
                    >
                      {playlist.name}
                    </Link>
                  </td>
                  <td className="p-3 flex gap-2 justify-end">
                    {playlist.hasAccess && (
                      <>
                        {/* Botón de Editar */}
                        <Link
                          to={`/playlists/editar/${playlist.id}`} // Redirige a la página de edición de la playlist
                          className="text-indigo-600 hover:text-indigo-800"
                          title="Editar"
                        >
                          <PencilIcon className="h-6 w-6" />
                        </Link>
                        {/* Botón de Eliminar */}
                        <button
                          onClick={() => handleDelete(playlist.id)} // Llama a la función handleDelete
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-3 text-center text-sm text-gray-500">
                  No hay playlists disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        <div className="w-full flex justify-center">
          <h1 className="text-xl font-bold text-indigo-600">Playlists</h1>
        </div>
        {sortedPlaylists.length > 0
          ? sortedPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white space-y-3 p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div className="text-sm font-semibold text-gray-700 text-left">
                  <Link
                    to={`/playlists/${playlist.id}`} // Redirige a la página de detalles de la playlist
                    className="text-indigo-600 hover:underline"
                  >
                    {playlist.name}
                  </Link>
                </div>
                {playlist.hasAccess && (
                  <div className="flex gap-2">
                    {/* Botón de Editar */}
                    <Link
                      to={`/playlists/editar/${playlist.id}`} // Redirige a la página de edición de la playlist
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Editar"
                    >
                      <PencilIcon className="h-6 w-6" />
                    </Link>
                    {/* Botón de Eliminar */}
                    <button
                      onClick={() => handleDelete(playlist.id)} // Llama a la función handleDelete
                      className="text-red-600 hover:text-red-800"
                      title="Eliminar"
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>
            ))
          : (
              <div className="text-center text-sm text-gray-500">
                No hay playlists disponibles.
              </div>
          )}
      </div>
    </div>
  );
};

export default ListadoPlaylists;
