import { createContext, useRef } from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => { },
    soundPlayed: null,
    setSoundPlayed: () => { },
    isPause: null,
    setIsPause: () => { },
    liked: null,
    setLiked: () => { },

});

export default songContext;