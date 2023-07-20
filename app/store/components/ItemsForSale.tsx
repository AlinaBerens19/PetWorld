'use client'

import { SafeStoreItem } from "@/app/types"
import StoreItem from "./StoreItem"

interface Props {
  data?: SafeStoreItem[] | null
}

const ItemsForSale: React.FC<Props> = ({ data }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:w-full sm:col-span-full justify-between flex-wrap px-10 sm:px-20 gap-5">
      {/* Add a check for data before mapping */}
      {data?.map((item, index) => (
        <StoreItem key={index} data={item} />
      ))}
    </div>
  )
}

export default ItemsForSale

