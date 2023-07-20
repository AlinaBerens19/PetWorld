'use client'

import { useRouter } from "next/navigation"


interface CategoriesProps {
    highlightedCategory?: string
}


const Categories:React.FC<CategoriesProps> = ({
    highlightedCategory
}) => {

  const router = useRouter()

  return (
    <div className="h-full hidden sm:flex sm:w-1/3 border-l border-gray-300">
          {/* Adding 'border-l' to add a left border */}
          <div className="flex flex-col justify-start px-4 gap-4 text-lg text-neutral-800">
            <h3
            onClick={() => router.push('/store/meal')}
            className={`text-bold cursor-pointer ${highlightedCategory === 'Meal' ? 'text-yellow-400' : ''}`}
            >
                Meal
            </h3>
            <h3
            onClick={() => router.push('/store/toys')}
            className={`text-bold cursor-pointer ${highlightedCategory === 'Toys' ? 'text-yellow-400' : ''}`}
            >
                Toys
            </h3>
            <h3
            onClick={() => router.push('/store/treats')}
            className={`text-bold cursor-pointer ${highlightedCategory === 'Treats' ? 'text-yellow-400' : ''}`}
            >
                Treats
            </h3>
            <h3
            onClick={() => router.push('/store/accessories')}
            className={`text-bold cursor-pointer ${highlightedCategory === 'Accessories' ? 'text-yellow-400' : ''}`}
            >
                Accessories
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Supplements' ? 'text-yellow-400' : ''}`}
            >
                Supplements
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Grooming' ? 'text-yellow-400' : ''}`}
            >
                Grooming
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Health' ? 'text-yellow-400' : ''}`}
            >
                Health
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Training' ? 'text-yellow-400' : ''}`}
            >
                Training
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Travel' ? 'text-yellow-400' : ''}`}
            >
                Travel
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Clothing' ? 'text-yellow-400' : ''}`}
            >
                Clothing
            </h3>
            <h3
            className={`text-bold cursor-pointer ${highlightedCategory === 'Gifts' ? 'text-yellow-400' : ''}`}
            >
                Gifts
            </h3>
          </div>
        </div>
  )
}

export default Categories
