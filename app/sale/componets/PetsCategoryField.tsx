'use client';



interface PetsCategoryProps {
  category: string;
  onSearchChange: (value: string) => void;
  value?: string;
}

const PetsCategoryField: React.FC<PetsCategoryProps> = ({
  category,
  onSearchChange,
  value,
}) => {


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value); // Invoke the callback function with the updated value
  };

  return (
    <div className="w-full h-10 pt-5 px-5">
        <div className="flex flex-row text-neutral-600 text-lg items-center justify-center">
          <input 
            type="text"
            placeholder={category}
            className="w-full rounded-lg border-[2px] border-neutral-300 p-2"
            value={value}
            onChange={handleSearchChange}
          >
          </input>
        </div>
        
    </div>
  )
}

export default PetsCategoryField
