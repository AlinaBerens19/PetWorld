'use client'

import { SafeStoreItem } from "@/app/types"


interface Props {
    data?: SafeStoreItem | null
}

const StoreItem:React.FC<Props> = ({
    data
}) => {
  return (
    <div className="flex flex-col gap-2 justify-start items-start">
      <img src={data?.imageSrc ? data?.imageSrc : ''} alt="store-item" className="w-full h-60 sm:w-40 sm:h-40 rounded-lg"/>
      <div className="text-xl text-neutral-700">{data?.name ? data?.name : ''}</div>
      <div className="text-green-600">{data?.storeName ? data?.storeName : ''}</div>
      <div className="text-lg text-neutral-600">{data?.price ? data?.price : ''}$</div>
    </div>
  )
}

export default StoreItem
