import {BrowserRouter,Routes,Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./paginas/Login"
import { AuthProvider } from "./context/AuthProvider"
import RutaProtegida from "./layout/RutaProtegida"
import AdministrarPlaylists from "./paginas/AdministrarPlaylists"
import { PlaylistsProvider } from "./context/PlaylistsProvider"

function App() {
  

  return (
    <BrowserRouter>
    <AuthProvider>
      <PlaylistsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
            </Route>
            <Route path="/playlists" element={<RutaProtegida/>}>
                  <Route index element={<AdministrarPlaylists/>} />
            </Route>
              
          </Routes>
        </PlaylistsProvider>
      </AuthProvider>
    </BrowserRouter>
   
  )
}

export default App
