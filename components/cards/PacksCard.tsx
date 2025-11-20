import Cart from "@mui/icons-material/AddShoppingCart";
import Play from "@mui/icons-material/PlayCircle";
import { Typography } from "@mui/material";

interface Pack {
  _id: string;
  packname: string;
  imagename: string;
  keywords: string[];
  size?: number;
}

interface PacksCardProps {
  pack: Pack;
}

const PacksCard: React.FC<PacksCardProps> = ({ pack }) => {
  const { _id, packname, imagename, keywords, size } = pack;
  const keyword = keywords.toString().split(",");

  return (
    <div className=" w-48  md:max-w-xs m-5 rounded overflow-hidden shadow-md bg-complimentsec shadow-green-400">
      <img
        src={`http://localhost:3000/assets/images/${imagename}`}
        className="w-full h-20  md:h-40  object-cover hover:object-fill"
        alt="show me"
      />
      <div className="flex flex-col items-start p-2 ">
        <div className="header font-bold text-primary flex items-center w-full justify-between  text-md ">
          {packname}
          <Play />
        </div>
        <div className="keys my-2 md:my-5 flex flex-row">
          {keyword.map((keys, index) => (
            <span
              key={index}
              className="inline-block  bg-amber-500 rounded-full px-[2px] py-0 text-[10px] font-bold text-primary mr-[2px]"
            >
              #{keys}
            </span>
          ))}
        </div>
        <div className="mx-auto flex items-center gap-3 text-primary">
          <Cart className="" />
          <Typography className="p-1 ">$10</Typography>
        </div>
      </div>
    </div>
  );
};

export default PacksCard;
