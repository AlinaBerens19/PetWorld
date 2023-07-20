import React from "react";
import Container from "@/app/components/Container";
import getStoreItemsByCategory from "@/app/actions/store/getStoreItemsByCategory";
import { getCurrentUser } from "@/app/actions/getServerSession";
import RegisterStore from "./RegisterStore";


const RegisterStorePage = async () => {

  const currentUser = await getCurrentUser()  
  const data = await getStoreItemsByCategory("meal")
  console.log('Items by category ==> ', data)

  if(!currentUser) {
    return (
      <Container>
        <div className="pt-20 text-neutral-700 text-xl">You must be logged in to register a store.</div>
      </Container>
    )
  }

  return (
    <Container>
        <RegisterStore currentUser={currentUser}/>
    </Container>
  );
};

export default RegisterStorePage;
