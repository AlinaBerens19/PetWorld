import { BiHeart } from "react-icons/bi";

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => Promise<void>;
  isClicked: boolean;
  className?: string;
  onCard?: boolean;
}

const HeartButton: React.FC<Props> = ({
  onClick,
  isClicked,
  onCard = false,
  className,
}) => {
  console.log("IS CLICKED IN HEART BUTTON ==> ", isClicked);

  return (
    <div
      className={`${className} 
        ${isClicked && onCard == true ? 'text-rose-700' : 'text-white'}
        ${isClicked && onCard == false ? 'text-rose-700' : 'text-neutral-700'}
        `}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => onClick(e)}
    >
      <BiHeart />
    </div>
  );
};

export default HeartButton;
