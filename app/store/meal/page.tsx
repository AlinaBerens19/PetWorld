import React from "react";
import Container from "@/app/components/Container";
import MealPage from "./MealPage";
import getStoreItemsByCategory from "@/app/actions/store/getStoreItemsByCategory";



const StoreMealPage = async () => {

  const data = await getStoreItemsByCategory("meal")
  console.log('Items by category ==> ', data)

  return (
    <Container>
      <MealPage data={data}/>
    </Container>
  );
};

export default StoreMealPage;
