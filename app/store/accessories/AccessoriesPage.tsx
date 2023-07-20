'use client'

import { SafeStoreItem } from "@/app/types"
import Categories from "../components/Categories"
import ItemsForSale from "../components/ItemsForSale"


interface AccessoriesPageProps {
    data?: SafeStoreItem[] | null 
}

const AccessoriesPage:React.FC<AccessoriesPageProps> = ({
    data
}) => {
    return (
        <div className="flex flex-row w-full min-h-screen items-start justify-center sm:justify-start">
            <ItemsForSale data={data}/>
            <Categories highlightedCategory="Accessories"/>
        </div>
    )
}

export default AccessoriesPage
