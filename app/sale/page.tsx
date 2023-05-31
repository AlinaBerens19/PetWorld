import ClientOnly from "../ClientOnly"
import getFilteredPetsList from "../actions/getFilteredPetsList"
import getPetsForSale from "../actions/getPetsForSale"
import { getCurrentUser } from "../actions/getServerSession"
import Container from "../components/Container"
import PetCard from "../components/modals/components/PetCard"
import PetsForSaleFilter from "./componets/PetsFilter"


interface IParams {
    user_input?: string
  }

const SalePage = async ({params}: {params: IParams}) => {

  const currentUser = await getCurrentUser();
  const getPets = await getPetsForSale();


  return (
    <ClientOnly>
        <Container>
        <div className="flex flex-col">

            
            <div className="flex flex-row h-screen">   
                <div className="sm:w-full sm:pt-32 pt-20 sm:col-span-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 divide-x px-4">
                    <div className="grid grid-cols-1 justify-center sm:pe-4 sm:grid-cols-2 gap-4 pb-4">
                        {getPets.slice(0, 4).map((pet) => (
                            <div key={pet.id}>
                            {pet ? (
                                <div className="flex justify-center items-center">
                                <PetCard key={pet.id} data={pet} />
                                </div>
                            ) : null}
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block sm:block">
                        <div className="flex flex-col w-full h-full">
                            <PetsForSaleFilter />
                        </div>
                    </div>
                    </div>
                </div>   

                
                <div className="flex flex-col h-screen">
                    <div className="flex flex-row pt-10 justify-center items-center">
                        <div className="text-3xl font-light text-neutral-700">
                            {currentUser ? (
                                <div>
                                    Welcome {currentUser.name}!
                                </div>
                            ) : (
                                <div>
                                    Welcome!
                                </div>
                            )}
                        </div>
                    </div>  
                </div>                  

            </div>          
        </Container>
    </ClientOnly>
  )
}

export default SalePage
