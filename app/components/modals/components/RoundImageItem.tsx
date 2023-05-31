'use client';

interface RoundImageItemProps {
    src: string;
    alt: string;
    text: string;
    onClick?: () => void;
}

const RoundImageItem: React.FC<RoundImageItemProps> = ({
    src,
    alt,
    text,
    onClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-neutral-600 rounded-image">  
        
        <div className="rounded-full overflow-hidden w-48 h-48">
        
            <img
                src={src} 
                alt={alt}
                className="w-full h-full object-cover"
                onClick={onClick}
            />
        </div>

        <p className="text-lg">{text}</p>


    </div>
  );
}

export default RoundImageItem;