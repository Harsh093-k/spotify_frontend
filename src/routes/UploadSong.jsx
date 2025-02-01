import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import TestInput from "../components/shared/Testinput";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHeplers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../Container/LoggedInContainer";

const foucusCardsData = [{ title: "Peaceful", description: "Relax and indulge with beautiful piano pieces ", imageUrl: "" },
{ title: "Instrumental Study", description: "Focus with slot study music in the background", imageUrl: "" },
{ title: "Instrumental Study", description: "Focus with slot study music in the background", imageUrl: "" },
{ title: "Focus Flow", description: "Up tempo instrumental hip hop beats", imageUrl: "" },
{ title: "Beats to think to", description: "Focus with seep techno and tech house", imageUrl: "" }
];

const UploadSongComponent = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [singer, setSinger] = useState("");
    const [category, setCategory] = useState("");
    const [uploadedSongFilename, setUploadedSongFilename] = useState("");
    const Navigate = useNavigate()

    const SubmitSong = async () => {
        const data = { name, thumbnail, track: playlistUrl, singer, category };
        console.log(data)
        const response = await makeAuthenticatedPOSTRequest("/song/create", data);
        console.log("response", response);
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Success");
        Navigate("/home");
    }


    return (

        <LoggedInContainer >
            <div className="content p-8 pt-0 overflow-auto ">
                <div className="text-2xl font-semibold mb-5 text-white mt-8">Uploaded Song</div>
                <div className="w-2/3 ">
                    <div className="w-2/3 flex space-x-3 ">
                        <div className="w-1/2 mb-5">
                            <TestInput label={"Song Name"} labelclassName={"text-white"} placeholder={"Song Name"} value={name} setvalue={setName} />
                        </div>
                        <div className="w-1/2">
                            <TestInput label={"thumbnail"} labelclassName={"text-white"} placeholder={"thumbnail"} value={thumbnail} setvalue={setThumbnail} />
                        </div>
                    </div>
                    <div className="w-2/3 flex space-x-3">
                        <div className="w-1/2">
                            <TestInput label={"Singer Name"} labelclassName={"text-white"} placeholder={"Singer Name"} value={singer} setvalue={setSinger} />
                        </div>
                        <div className="w-1/2">
                            <TestInput label={"Category"} labelclassName={"text-white"} placeholder={"Category"} value={category} setvalue={setCategory} />
                        </div>
                    </div>
                </div>

                <div className="py-5">
                    {uploadedSongFilename ? (
                        <div className="bg-white rounded-full p-3 w-1/3">{uploadedSongFilename.substring(0, 35)}...</div>)
                        :
                        (< CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFilename} />)
                    }
                </div>

                <div className="bg-white w-1/3 flex items-center justify-center p-4 rounded-full cursor-pointer " onClick={SubmitSong}>
                    Submit Song
                </div>
            </div>
        </LoggedInContainer>

    )
};



export default UploadSongComponent;