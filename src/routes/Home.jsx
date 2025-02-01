import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";

const foucusCardsData = [{ title: "Peaceful", description: "Relax and indulge with beautiful piano pieces ", imageUrl: "" },
{ title: "Instrumental Study", description: "Focus with slot study music in the background", imageUrl: "" },
{ title: "Instrumental Study", description: "Focus with slot study music in the background", imageUrl: "" },
{ title: "Focus Flow", description: "Up tempo instrumental hip hop beats", imageUrl: "" },
{ title: "Beats to think to", description: "Focus with seep techno and tech house", imageUrl: "" }
];

const HomeComponent = () => {
    return (
        <div className="h-full w-full flex">

            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    <div className="logoDiv p-6 ">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR753t7b4IBzrmcE0bCtWcM0wZXVg2z4S9Aag&s" alt="Spotifylogo" width={125} />
                    </div>

                    <div className="py-5">
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} />
                        <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} />
                        <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
                    </div>

                    <div className="pt-10">
                        <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
                        <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
                    </div>
                </div>
                <div className="px-5">
                    <div className="border border-gray-100 text-gray-400 w-3/5 flex px-2 py-1 items-center justify-center rounded-full hover:text-white">
                        < Icon icon="carbon:earth-europe-africa" />
                        < div className="ml-2 text-sm font-semibold">English</div>
                    </div>
                </div>
            </div>
            <div className="h-full w-4/5 bg-gray-900 overflow-auto">

                <div className="navbar w-full h-14    bg-opacity-30 flex items-center justify-end ">
                    <div className="w-1/2 flex  h-full">
                        <div className="w-3/5  bg-gray-900 flex justify-around items-center ">
                            <TextWithHover displayText={"Premium"} />
                            <TextWithHover displayText={"Support"} />
                            <TextWithHover displayText={"Download"} />
                            <div className="h-1/2 border border-white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around  items-center">
                            < TextWithHover displayText={"Sign up"} />
                            <div className="bg-white h-2/3 px-6 flex items-center justify-center rounded-full h-32">Log in</div>
                        </div>
                    </div>
                </div>
                <div className="w-full border border-white mt-2"></div>
                <div className="content p-8 pt-0 overflow-auto ">
                    <Playlist titletext={"Focus"} CardsData={foucusCardsData} />
                    <Playlist titletext={"Spotify Playlist"} CardsData={foucusCardsData} />
                    <Playlist titletext={"sound of India"} CardsData={foucusCardsData} />
                </div>
            </div>
        </div>

    )
};

const Playlist = ({ titletext, CardsData }) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titletext}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    CardsData.map((item) => {
                        return (<Card title={item.title} description={item.description} imageUrl={""} />);
                    })
                }

            </div>

        </div>
    )
};

const Card = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/6 p-4 rounded-lg">
            < div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imageUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    )
}

export default HomeComponent;