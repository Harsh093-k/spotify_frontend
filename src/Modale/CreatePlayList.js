import { useState } from "react";
import Testinput from "../components/shared/Testinput";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHeplers";

const CreatePlayList = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", { name: playlistName, thumbnail: playlistThumbnail, songs: [] })
    console.log(response);
    if (response._id) {
      closeModal();
    }
  }

  return (
    <div className="absolute  bg-black bg-opacity-50 text-white w-screen h-screen flex justify-center items-center" onClick={closeModal}>
      <div className="bg-gray-900 w-1/3  rounded-md p-4" onClick={(e) => { e.stopPropagation() }}>
        <div className="text-white mb-5 font-semibold text-lg">Create Playlist</div>
        <div className="space-y-4 flex-col justify-center items-center">
          <Testinput label="Name"
            Placeholder="Playlist Name"
            className={"text-white"}
            value={playlistName}
            setvalue={setPlaylistName}
          />
          <Testinput label="Thumbnail"
            Placeholder="Thumbnail"
            className={"text-white"}
            value={playlistThumbnail}
            setvalue={setPlaylistThumbnail}
          />
          <div className="bg-white text-black w-1/3 rounnded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
            onClick={createPlaylist}>Create </div>
        </div>
      </div>
    </div>
  );
}
export default CreatePlayList;