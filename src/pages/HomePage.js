/** @format */

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import Item from "../components/item"; // Make sure to use the correct component name
import "../resources/items.css";
function HomePage() {
 const [itemsData, setItemsData] = useState([]);

 // getAllItems is used to get data of items using http://localhost:5000/api/items/get-all-items
 const getAllItems = () => {
  axios
   .get("/api/items/get-all-items")
   .then((response) => {
    setItemsData(response.data); // Set the fetched data to state
   })
   .catch((error) => {
    console.log(error);
   });
 };

 useEffect(() => {
  getAllItems();
 }, []);

 return (
  <DefaultLayout>
   <Row gutter={20}>
    {itemsData.map((item) => (
     <Col xs={24} lg={6} md={12} sm={6}>
      <Item item={item} />
     </Col>
    ))}
   </Row>
  </DefaultLayout>
 );
}

export default HomePage;
