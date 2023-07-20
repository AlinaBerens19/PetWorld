import React from "react";
import Container from "@/app/components/Container";
import AccessoriesPage from "./AccessoriesPage";
import getStoreItemsByCategory from "@/app/actions/store/getStoreItemsByCategory";


const StoreAccessoriesPage = async () => {

  const data = await getStoreItemsByCategory("accessories")
  console.log('Items by category ==> ', data)

  return (
    <Container>
      <AccessoriesPage data={data} />
    </Container>
  );
};

export default StoreAccessoriesPage;