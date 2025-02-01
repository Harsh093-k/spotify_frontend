import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";
import LoggedInContainer from "../Container/LoggedInContainer";
import SingleHome from "../components/shared/singleHome";



const LoggedInHomeComponent = () => {
  const [error, setError] = useState(null);
  const [songData, setSongData] = useState([]);



  useEffect(() => {
    let isMounted = true; // to track if the component is still mounted

    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/songs");

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

  const Romantic = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/romantic");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const Workout = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/workout");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const Lofi = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/lofi");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }

  const Party = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/Party");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const Breakup = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/Breakup");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }


  const Podcasts = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/Podcasts");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const FriendShip = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/FriendShip");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const Relax = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/Relax");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }
  const Focus = async () => {
    try {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs/Focus");
      setSongData(response.data);
    } catch (error) {
      console.error('Error fetching romantic songs:', error);
    }
  }


  return (
    <LoggedInContainer currentActiveScreen={"Home"} >

      <div className="text-xl font-semibold pb-4 text-white pt-2 mt-2">Enjoy Music</div>
      <div className="h-1/10 w-full flex space-x-3 mt-4 items-center justify-center flex-wrap">
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center " onClick={Party}>Party</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Romantic}>Romantic</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Workout}>Workout</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Breakup}>Break up</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={FriendShip}>FriendShip</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Focus}>Focus</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Lofi}>Lo-fi</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Relax}>Relax</div>
        <div className="text-white border border-2 hover:bg-gray-500 cursor-pointer rounded-full w-28 text-m font-semibold p-3 flex items-center justify-center" onClick={Podcasts}>Podcasts</div>
      </div>




      <div className="grid gap-5 grid-cols-5">

        {songData.map((item) => {
          return <SingleHome info={item} playsound={() => { }} />
        })}
      </div>
    </LoggedInContainer>

  )
};



export default LoggedInHomeComponent;