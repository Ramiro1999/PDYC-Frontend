import {createContext,useState,useEffect} from 'react'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const PlaylistsContext = createContext()

// eslint-disable-next-line react/prop-types
const PlaylistsProvider = ({children}) => {

  const [playlists,setPlaylists] = useState([])
  const {auth} = useAuth();

  useEffect(() => {
    const obtenerPlaylists = async () => {

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          return;
        }
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        
        const {data} = await clienteAxios.get('/playlists',config)
        setPlaylists(data)

      } catch (error) {
        console.log(error)
      }

    }
    obtenerPlaylists();
  },[auth,playlists])

 


    return (
        <PlaylistsContext.Provider
          value={{
           playlists,
          }}
        >
          {children}
        </PlaylistsContext.Provider>
      );
};



export {
    PlaylistsProvider
}

export default PlaylistsContext