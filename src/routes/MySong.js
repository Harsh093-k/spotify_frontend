import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";
import { useEffect, useState } from "react";
import LoggedInContainer from '../Container/LoggedInContainer'



const MySongComponent = () => {
  const [error, setError] = useState(null);
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    let isMounted = true; // to track if the component is still mounted

    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");

        if (isMounted) {
          setSongData(response.data); // set data only if component is still mounted
        }
      } catch (err) {
        if (isMounted) {
          setError("Error fetching song data");
        }
      }
    };

    getData();

    return () => {
      isMounted = false; // cleanup by setting to false on unmount
    };
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"Mysong"} >
      <div className="text-xl font-semibold pb-4 text-white pt-2">My Songs</div>
      <div className="space-y-3">
        {songData.map((item) => {
          return <SingleSongCard info={item} playsound={() => { }} />
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MySongComponent;