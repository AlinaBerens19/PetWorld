import ClientOnly from "../ClientOnly"
import getLastFivePets from "../actions/getLastFivePets"
import getPetsForSale from "../actions/getPetsForSale"
import { getCurrentUser } from "../actions/getServerSession"
import Container from "../components/Container"
import PetsPage from "./PetsPage"


interface IParams {
  user_input?: string
}

const SalePage = async ({params}: {params: IParams}) => {

  const currentUser = await getCurrentUser();
  const getPets = await getPetsForSale();
  const dogs = await getLastFivePets('dog');
  const cats = await getLastFivePets('cat');  
  const other = await getLastFivePets('other');    


  return (
    <ClientOnly>
        <Container>
            <PetsPage currentUser={currentUser} getPets={getPets} dogs={dogs} cats={cats} other={other}/>
       </Container>
     </ClientOnly>
  )
}

export default SalePage
