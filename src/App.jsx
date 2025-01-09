import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import CrearPlaylist from "./paginas/CrearPlaylist";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPlaylists from "./paginas/AdministrarPlaylists";
import { PlaylistsProvider } from "./context/PlaylistsProvider";
import EditarPlaylist from "./paginas/EditarPlaylist";
import AdministrarSongs from "./paginas/AdministrarSongs";
import { SongsProvider } from "./context/SongsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlaylistsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
            </Route>
            <Route path="/playlists" element={<RutaProtegida />}>
              <Route index element={<AdministrarPlaylists />} />
              <Route path="crear" element={<CrearPlaylist />} />
              <Route path="editar/:id" element={<EditarPlaylist />} />
              <Route
                path=":id"
                element={
                  // Envuelve AdministrarSongs en SongsProvider
                  <SongsProvider>
                    <AdministrarSongs />
                  </SongsProvider>
                }
              />
            </Route>
          </Routes>
        </PlaylistsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
