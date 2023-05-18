'use client';


interface PetsCategoryChipsProps {
  category: string;
}

const PetsCategoryChips: React.FC<PetsCategoryChipsProps> = ({
  category,
}) => {
  return (
    <div className="w-full h-10 pt-5 px-5">
        <div className="flex flex-row text-neutral-300 text-lg items-center justify-center">
          <div className="w-full rounded-lg border-[2px] border-neutral-300 p-2">{category}</div>
        </div>
        
    </div>
  )
}

export default PetsCategoryChips
