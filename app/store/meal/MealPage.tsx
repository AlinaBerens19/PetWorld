'use client'

import { SafeStoreItem } from "@/app/types"
import Categories from "../components/Categories"
import ItemsForSale from "../components/ItemsForSale"

interface MealPageProps {
  data?: SafeStoreItem[] | null 
}

const MealPage:React.FC<MealPageProps> = ({
  data
}) => {
  return (
    <div className="flex flex-row w-full min-h-screen items-start justify-center sm:justify-start">
        <ItemsForSale data={data}/>
        <Categories highlightedCategory="Meal"/>
    </div>
  )
}

export default MealPage
