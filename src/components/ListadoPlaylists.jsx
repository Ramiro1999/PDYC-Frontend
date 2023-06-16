import usePlaylists from "../hooks/usePlaylists"

const ListadoPlaylists = () => {

  const {playlists} = usePlaylists();

  return (
    <div className="p-5 h-screen bg-gray-100">
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 tracking-wide text-xl mb-10 font-bold text-indigo-600">Tus Playlists</th>   
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            {playlists.length>0 ? playlists.map(playlist => {
              return(
                  <tr key={playlist.name} className="bg-white">
                    <td className="p-3 text-sm font-semibold text-gray-700 whitespace-nowrap text-center">
                      {playlist.name}
                    </td>
                  </tr>
              )
            }): null}
           
            </tbody>
          </table>
        </div>
    
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div>
            <h1 className="text-xl font-bold text-indigo-600">Tus playlists</h1>
          </div>
          {playlists.length>0 ? playlists.map(playlist => {
            return(
            <div key={playlist.name} className="bg-white space-y-3 p-4 rounded-lg shadow">
              <div className="text-sm font-semibold text-gray-700">
                {playlist.name}
              </div>
            </div>
            )
           }): null}
        </div>
      </div>

  )
}

export default ListadoPlaylists