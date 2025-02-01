import { useState, useEffect } from "react";
import LoggedInContainer from "../Container/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";
import SingleSongCard from '../components/shared/SingleSongCard';

const SearchComponent = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 

  const searchSong = async () => {
    if (!searchText) return;  // Avoiding empty searches
    setIsLoading(true);
    ;  // Reset error message before search

    try {
      const response = await makeAuthenticatedGETRequest("/song/get/songname/" + searchText);
      setSongData(response.data);  // Ensure you're accessing response.data
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: You could debounce the search here
    const timeoutId = setTimeout(() => {
      if (searchText) {
        searchSong();
      }
    }, 500); // Adjust time as needed (500ms debounce)

    return () => clearTimeout(timeoutId); // Clean up timeout on component unmount or text change
  }, [searchText]);

  return (
    <LoggedInContainer currentActiveScreen={"Search"}>
      <div className="w-full py-6">
        <div
          className={`w-1/2 p-3 text-sm rounded-full bg-gray-500 px-5 text-white space-x-3 flex items-center ${isInputFocused ? "border border-white" : " "}`}
        >
          <Icon icon="ic:outline-search" className="text-lg" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full focus:outline-none bg-gray-500"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
      </div>

      {isLoading && <p>Loading...</p>}  {/* Loading State */}
      {error && <p className="text-red-500">{error}</p>}  {/* Error Message */}

      <div className="pt-5 space-y-3">
        <div className="text-white">
          Search results for key '<span className="font-bold">{searchText}</span>'
        </div>
        {songData.length > 0 ? (
          songData.map((item) => (
            <SingleSongCard info={item} key={item._id} playsound={() => { }} /> // Using a unique key like _id
          ))
        ) : (
          <p>No songs found</p> // Display message if no results
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchComponent;
