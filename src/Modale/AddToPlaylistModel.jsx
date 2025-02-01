import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";

const AddToPlaylistModel = ({ closeModal, addSongToPlaylist }) => {
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setMyPlaylist(response.data);

      } catch (err) {
        setError("Failed to fetch playlists. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after data fetch attempt
      }
    };
    getdata();
  }, []);

  return (
    <div
      className="absolute bg-black bg-opacity-50 text-white w-screen h-screen flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-gray-900 w-1/3 rounded-md p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Select Playlist
        </div>

        {/* Show loading state */}
        {loading && <div className="text-white">Loading playlists...</div>}

        {/* Display error message */}
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {/* If playlists are empty, show a message */}


        {/* Display playlist components */}
        <div className="space-y-4 flex-col justify-center items-center">
          {!loading && !error && myPlaylist.map(item => (
            <PlayListComponent

              info={item}
              addSongToPlaylist={addSongToPlaylist}

            />
          ))}
        </div>
      </div>
    </div>
  );
};


const PlayListComponent = ({ info, addSongToPlaylist }) => {

  return (
    <div
      className="bg-gray-500 w-full flex hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer items-center space-x-4 p-3"
      onClick={() => {
        addSongToPlaylist(info._id)

      }
        // ensure this is a valid function
      }
    >
      <div>
        <img
          src={info.thumbnail}
          alt={`Playlist thumbnail for ${info.name}`} // Descriptive alt text
          className="w-10 h-10 rounded"
        />
      </div>
      <div className="text-white font-semibold text-sm">{info.name}</div>
    </div>
  );
};

export default AddToPlaylistModel;



