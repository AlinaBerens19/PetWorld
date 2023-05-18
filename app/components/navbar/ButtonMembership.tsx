'use client';

interface ButtonMembershipProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    outline?: boolean;
    title?: string;
}

const ButtonMembership: React.FC<ButtonMembershipProps> = ({
  onClick,
  outline = false,
  title = "MEMBERSHIP",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
            ${outline ? "bg-white text-black" : "membership-button text-black"}
            rounded-full font-semibold text-md py-2 px-8 md:py-3 md:px-6 cursor-pointer
        `}
    >
      <h5>{title}</h5>
    </button>
  );
};


export default ButtonMembership
