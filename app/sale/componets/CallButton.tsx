import { BiPhone } from "react-icons/bi";

const CallButton = () => {
  return (
    <>
      <div className="sm:hidden absolute top-2 left-10 flex">
        <BiPhone className="text-3xl text-white" />
      </div>
    </>
  );
};

export default CallButton;
