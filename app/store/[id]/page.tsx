import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import YourStorePage from "./YourStorePage";
import { getTheStore } from "@/app/actions/getTheStoreByUserId";



const StorePage = async () => {

    const currentUser = await getCurrentUser();
    const currentStore = await getTheStore(currentUser?.id as string);
    
    return (
        <Container>
            <YourStorePage currentUser={currentUser} currentStore={currentStore}/>
        </Container>
    )


}

export default StorePage;