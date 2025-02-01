import { useEffect, useState } from "react";
import LoggedInContainer from "../Container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/playlist/get/me");
        setMyPlaylist(response.data);
      } catch (err) {
        setError("Failed to fetch playlists.");
        console.error(err);
      }
    }
    getdata();
  }, [])
  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="text-white text-xl pt-8">My Playlists</div>
      {error && <div className="text-red-500 pt-4">"no playlist available"</div>}
      <div className="py-4 grid gap-5 grid-cols-5">

        {myPlaylist.map(item => {
          return (
            <Card key={JSON.stringify(item)} title={item.name} description="" imageUrl={item.thumbnail} playlistId={item._id} />
          );
        })}



      </div>
    </LoggedInContainer>
  )
}

const Card = ({ title, description, imageUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-black bg-opacity-40 w-full p-2 rounded-lg cursor-pointer" onClick={() => { navigate("/playlist/" + playlistId) }} >
      < div className="py-4 pt-2  h-28 w-28 flex">
        <img className="w-full rounded-md" src={imageUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  )
}

export default Library;