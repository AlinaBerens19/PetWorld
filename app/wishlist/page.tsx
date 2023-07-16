
import ClientOnly from "../ClientOnly";
import getFavoritedPetsList from "../actions/getFavoritedPets";
import { getCurrentUser } from "../actions/getServerSession";
import Container from "../components/Container";
import Wishlist from "./components/Wishlist";


const WishlistPage = async () => {

    const currentUser = await getCurrentUser();
    const listings = await getFavoritedPetsList({ currentUser })

    return (
        <ClientOnly>
            <Container>
                <Wishlist currentUser={currentUser} listings={listings}/>
            </Container>
        </ClientOnly>
    )
}

export default WishlistPage;