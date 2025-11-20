import Drums from "../images/shirt.png";
import { StaticImageData } from "next/image";

interface MsDataItem {
    image: StaticImageData;
    heading: string;
    description: string;
}

export const Msdata: MsDataItem[] = [
    {
        image: Drums,
        heading: "Drums",
        description: "Fashion is different on the Blockchain",
    },
];
