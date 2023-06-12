import { signOut } from "next-auth/react";
import ClientOnly from "../ClientOnly";
import { getCurrentUser } from "../actions/getServerSession";
import Container from "../components/Container";
import Dashboard from "./components/Dashboard";


const AccountPage = async () => {

    const logOut = () => {
        console.log("log out");
        signOut();
    };

    const currentUser = await getCurrentUser();

    return (
        <ClientOnly>
            <Container>
                <Dashboard currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )


}

export default AccountPage;