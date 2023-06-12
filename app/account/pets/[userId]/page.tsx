import ClientOnly from "@/app/ClientOnly";
import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import Listings from "../../components/Listings";


interface IParams {
    userId: string
}

const YourPets = async (params: IParams) => {

    const { userId } = params;
    const currentUser = await getCurrentUser();

    return (
        <ClientOnly>
            <Container>
                <Listings currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )


}

export default YourPets;