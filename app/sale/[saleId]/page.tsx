import ClientOnly from "@/app/ClientOnly";
import getPetForSaleById from "@/app/actions/getPetForSaleById";
import { getCurrentUser } from "@/app/actions/getServerSession";
import DetailPage from "./DetailPage";


interface IParams {
  saleId: string
}


const ListingPage = async ({ params }: { params: IParams}) => {

    const sale = await getPetForSaleById(params)
    const currentUser = await getCurrentUser();

    if (!sale) {
        return (
            <ClientOnly>
                <div>No ID</div>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
          <DetailPage id={sale?.id} location={sale?.location} gender={sale?.gender} kind={sale.kind} breed={sale.breed} currentUser={currentUser} price={sale.price} firstImage={sale.firstImage} description={sale.description}/>
        </ClientOnly>
    )

}

export default ListingPage