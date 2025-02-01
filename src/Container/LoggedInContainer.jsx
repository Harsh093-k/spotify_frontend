import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useContext, useLayoutEffect, useState, useRef } from "react";
import { Howl, Howler } from "howler";
import songContext from "../context/songContext";
import CreatePlayList from "../Modale/CreatePlayList";
import AddToPlaylistModel from "../Modale/AddToPlaylistModel";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHeplers";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { makeAuthenticatedGETRequest } from "../utils/serverHeplers";


const LoggedInContainer = ({ children, currentActiveScreen }) => {
    const [createPlayListModelOpen, setCreatePlayListModelOpen] = useState(false);
    const [addPlayListModelOpen, setAddPlayListModelOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);




    const navigate = useNavigate();



    const { liked, setLiked, currentSong, setCurrentSong, isPause, setIsPause, soundPlayed, setSoundPlayed } = useContext(songContext);



    const firstUpdate = useRef(true);
    useLayoutEffect(() => {


        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }

        changeSong(currentSong.track);
        const token = getToken();

        // Check login status
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

    }, [currentSong]);






    const handleClickliked = () => {

        setLiked(!liked);
    };



    const getToken = () => {
        const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
        if (match) {
            return match[2]; // Return token if found
        }
        return null; // Return null if no token is found
    };

    const addSongToPlayList = async (playlistId) => {

        const songId = currentSong._id;
        const payload = { playlistId, songId };
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload);
        if (response._id) {
            setAddPlayListModelOpen(false);
        }


    };



    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    }



    const changeSong = (songsrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songsrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPause(false);

    }

    const pauseSound = () => {
        soundPlayed.pause();
    }

    const togglePause = () => {
        if (isPause) {
            playSound();
            setIsPause(false);
        } else {
            pauseSound();
            setIsPause(true);
        }
    }

    const handleClick = () => {
        navigate('/Uploadsong');
        // specify the path to redirect to
    };

    const StopSound = () => {
        soundPlayed.pause();
    }

    const logout = () => {
        // Remove the token cookie
        removeCookie("token", { path: "/" });
        if(currentSong){
            navigate("/login");
            // Navigate back to the login page after logout
            StopSound();
        }
        else{
        // Navigate back to the login page after logout
        navigate("/login");
        }
       
    };
    return (<div className="h-full w-full flex">
         {createPlayListModelOpen && <CreatePlayList closeModal={() => { setCreatePlayListModelOpen(false) }} />}
         {addPlayListModelOpen && <AddToPlaylistModel closeModal={() => { setAddPlayListModelOpen(false) }} addSongToPlaylist={addSongToPlayList} />}
        {/* Sidebar */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
            <div>
                <div className="logoDiv p-6">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR753t7b4IBzrmcE0bCtWcM0wZXVg2z4S9Aag&s" alt="Spotifylogo" width={125} />
                </div>
    
                <div className="py-5">
                    <IconText iconName={"material-symbols:home"} displayText={"Home"} targetLink={"/home"} active={currentActiveScreen === "Home"} />
                    <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} targetLink={"/Search"} active={currentActiveScreen === "Search"} />
                    <IconText iconName={"icomoon-free:books"} displayText={"Library"} targetLink={"/library"} active={currentActiveScreen === "Library"} />
                    <IconText iconName={"material-symbols:library-music-sharp"} displayText={"Mysong"} targetLink={"/mysong"} active={currentActiveScreen === "Mysong"} />
                </div>
    
                <div className="pt-10">
                            <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} onClick={() => setCreatePlayListModelOpen(true)} />
                            <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
                        </div>
            </div>
            <div className="px-5">
                <div className="border border-gray-100 text-gray-400 w-3/5 flex px-2 py-1 items-center justify-center rounded-full hover:text-white">
                    <Icon icon="carbon:earth-europe-africa" />
                    <div className="ml-2 text-sm font-semibold">English</div>
                </div>
            </div>
        </div>
    
        {/* Main Content Area */}
        <div className="h-full w-4/5 bg-gray-900 flex flex-col">
            {/* Navbar */}
            <div className="navbar w-full h-14 bg-opacity-30 flex items-center justify-end">
                <div className="w-1/2 flex h-full">
                    <div className="w-3/5 bg-gray-900 flex justify-around items-center">
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Downloads"} />
                        <div className="h-1/2 border border-white"></div>
                    </div>
                    <div className="w-2/5 flex justify-around items-center">
                        <div className="text-with-hover" onClick={handleClick}>
                            <TextWithHover displayText={"Upload Song"} />
                        </div>
                        {!isLoggedIn ? (
                            <div className="bg-white-500 hover:bg-white-700 text-white rounded cursor-pointer flex items-center justify-center px-6" onClick={logout}>
                                Log
                            </div>
                        ) : (
                            <div
                                className="bg-gray-500 h-2/3 px-6 flex items-center justify-center rounded cursor-pointer"
                                onClick={logout}
                            >
                                Log
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full border border-white mt-2"></div>
    
            {/* Content Area */}
            <div className="content p-8 pt-0 overflow-auto flex-grow">
                {children}
            </div>
    
            {/* Song Player */}
            {currentSong && (
                <div className="w-full h-1/10 bg-black bg-opacity-40 text-white flex items-center px-4">
                    <div className="w-1/4 flex item-center">
                        <img src={currentSong.thumbnail} alt="songimage" className="h-14 w-14 rounded" />
                        <div className="pl-4 items-center">
                            <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">{currentSong.singer}</div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-center h-full flex-col items-center">
                        <div className="w=1/3 flex justify-between items-center">
                            <Icon icon="ph:shuffle-fill" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white" />
                            <Icon icon="mdi:skip-previous-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white" />
                            <Icon icon={isPause ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} fontSize={50} className="cursor-pointer text-gray-500 hover:text-white" onClick={() => { togglePause() }} />
                            <Icon icon="mdi:skip-next-outline" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white" />
                            <Icon icon="ic:twotone-repeat" fontSize={30} className="cursor-pointer text-gray-500 hover:text-white" />
                        </div>
                    </div>
                    <div className="w-1/4 flex justify-end pl-4 space-x-4 items-center">
                        <Icon icon="ic:round-playlist-add" fontSize={30} className="cursor-pointer text-gray-500  hover:text-white" onClick={() => { setAddPlayListModelOpen(true) }} />
                        <Icon
                            icon={liked ? "ph:heart-fill" : "ph:heart-bold"} // Change icon based on liked state
                            fontSize={30}
                            className={`cursor-pointer ${liked ? "text-red-500" : "text-gray-500"} hover:text-white`} // Apply red color when liked
                            onClick={handleClickliked} // Trigger handleClick on icon click
                        />
                    </div>
                </div>
            )}
        </div>
    </div>)}



export default LoggedInContainer;
