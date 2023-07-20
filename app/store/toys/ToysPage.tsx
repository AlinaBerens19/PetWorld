'use client'

import Categories from "../components/Categories"
import ItemsForSale from "../components/ItemsForSale"



const ToysPage = () => {
  return (
    <div className="flex flex-row w-full min-h-screen items-start justify-center sm:justify-start">
        <ItemsForSale />
        <Categories highlightedCategory="Toys"/>
    </div>
  )
}

export default ToysPage
