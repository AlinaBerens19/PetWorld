

import ClientOnly from "@/app/ClientOnly";
import { getCurrentUser } from "@/app/actions/getServerSession";
import Container from "@/app/components/Container";
import UI from "./components/UI";


const PasswordPage = async () => {

    const currentUser = await getCurrentUser();

    return (
        <ClientOnly>
            <Container>
                <UI currentUser={currentUser}/>
            </Container>
        </ClientOnly>
    )


}

export default PasswordPage;