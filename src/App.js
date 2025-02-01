import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from "./routes/Login";
import SignComponent from "./routes/Signup";
import SearchComponent from "./routes/SearchComponent";
import HomeComponent from "./routes/Home";
import SinglePlaylistComponent from "./routes/SinglePlaylist";
import UploadSongComponent from "./routes/UploadSong";
import MySongComponent from "./routes/MySong";
import { useCookies } from "react-cookie";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import { useState } from "react";
import songContext from "./context/songContext";
import Library from './routes/Library';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPause, setIsPause] = useState(true);
  const [liked, setLiked] = useState(false);


  const [cookie, setCookie] = useCookies(["token"]);


  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          //logged in routes
          <songContext.Provider value={{ currentSong, setCurrentSong, isPause, setIsPause, soundPlayed, setSoundPlayed, liked, setLiked }}>
            <Routes>
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/UploadSong" element={<UploadSongComponent />} />
              <Route path="/mysong" element={<MySongComponent />} />
              <Route path="/search" element={<SearchComponent />} />
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:playlistId" element={<SinglePlaylistComponent />} />

              <Route path="*" element={<Navigate to="/home" />} />

            </Routes>
          </songContext.Provider>

        ) : (
          //logged out routes
          <Routes>


            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignComponent />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
