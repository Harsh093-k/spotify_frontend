import { useContext } from "react";
import songContext from "../../context/songContext";

const SingleHome = ({info,playsound}) => {
    const {currentSong,setCurrentSong}=useContext(songContext);
    return (
        <div className=" hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={()=>{setCurrentSong(info);}}>
            <div className="ml-10 w-14 h-14 bg-cover text-center mt-3"
                style={{
                    backgroundImage:`url(${info.thumbnail})`,
                }}

            > </div>
            <div className=" w-full">
            <div className="text-white flex justify-center flex-col p-4 w-5/6">
                <div className="cursor-pointer hover:underline">
                {info.name}
                </div>
                <div className="text-xs text-grey-400 cursor-pointer hover:underline">
                {info.singer}
                </div>
            </div>
            <div className=" w-1/6 flex items-center justify-center text-gray-400 text-sm ">
                <div></div>
                
            </div>
            </div>
        </div>
    )
};

export default SingleHome;