import { BiHeart } from "react-icons/bi";

const HeartButton = () => {
  return (
    <>
      <div className="absolute top-2 left-2 flex">
        <BiHeart className="text-3xl text-white" />
      </div>
    </>
  );
};

export default HeartButton;
