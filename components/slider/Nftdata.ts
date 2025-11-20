import Keys from "../images/Crazy.jpg";
import Songs from "../images/Senator.jpg";
import Strings from "../images/Call.jpg";

interface NftDataItem {
    image: string;
    heading: string;
    description: string;
}

export const Nftdata: NftDataItem[] = [
    {
        image: Keys.src,
        heading: "Keyboard",
        description: "Shit has always been crazy",
    },
    {
        image: Songs.src,
        heading: "Keyboard",
        description: "Everyday for the thief,one day for the owner",
    },
    {
        image: Strings.src,
        heading: "Keyboard",
        description: "Write me a love letter",
    },
];
