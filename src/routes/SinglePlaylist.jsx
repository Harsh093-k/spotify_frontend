import { useParams } from "react-router-dom";
import LoggedInContainer from "../Container/LoggedInContainer";
import { useState, useEffect } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";

const SinglePlaylistComponent = () => {
  const [playlistDetail, setPlaylistDetail] = useState({});
  const [error, setError] = useState("");
  const { playlistId } = useParams();

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/" + playlistId);
        console.log(response);
        setPlaylistDetail(response);
      } catch (err) {
        setError("Failed to fetch playlists.");
        console.error(err);
      }
    }
    getdata();
  }, [])

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      {playlistDetail._id && (
        <div>
          <div className="text-white text-xl pt-8 font-semibold">{playlistDetail.name}</div>
          <div className="pt-5 space-y-3">

            {playlistDetail.songs.length > 0 ? (
              playlistDetail.songs.map((item) => (
                <SingleSongCard info={item} key={JSON.stringify(item)} playsound={() => { }} /> // Using a unique key like _id
              ))
            ) : (
              <p>No songs found</p> // Display message if no results
            )}
          </div>
        </div>
      )}
    </LoggedInContainer>

  );
}
export default SinglePlaylistComponent;