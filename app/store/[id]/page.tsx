import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import YourStorePage from "./YourStorePage";



const StorePage = async () => {

    const currentUser = await getCurrentUser();
    
    return (
        <Container>
            <YourStorePage currentUser={currentUser} />
        </Container>
    )


}

export default StorePage;