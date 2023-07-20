'use client'

import Categories from "../components/Categories"
import ItemsForSale from "../components/ItemsForSale"


const TreatsPage = () => {
  return (
    <div className="flex flex-row w-full min-h-screen items-start justify-center sm:justify-start">
        <ItemsForSale />
        <Categories highlightedCategory="Treats"/>
      </div>
  )
}

export default TreatsPage