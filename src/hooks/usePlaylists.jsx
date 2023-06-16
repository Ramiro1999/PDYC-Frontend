import { useContext } from 'react'
import PlaylistsContext from '../context/PlaylistsProvider'


const usePlaylists = () => {
    return useContext(PlaylistsContext);
}

export default usePlaylists