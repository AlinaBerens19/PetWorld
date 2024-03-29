import ClientOnly from "../ClientOnly";
import { getCurrentUser } from "../actions/getServerSession";
import Container from "../components/Container";
import Dashboard from "./components/Dashboard";


const AccountPage = async () => {

    const currentUser = await getCurrentUser();
    
    return (
        <ClientOnly>
            <Container>
                <Dashboard currentUser={currentUser} image={currentUser?.image}/>
            </Container>
        </ClientOnly>
    )


}

export default AccountPage;