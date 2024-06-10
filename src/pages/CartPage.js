/** @format */

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
 DeleteOutlined,
 PlusCircleOutlined,
 MinusCircleOutlined,
} from "@ant-design/icons";

function CartPage() {
 const { cartItems } = useSelector((state) => state.rootReducer);
 const dispatch = useDispatch();
 const increaseQuantity = (record) => {
  dispatch({
   type: "updateCart",
   payload: { ...record, quantity: record.quantity + 1 },
  });
 };
 const decreaseQuantity = (record) => {
  if (record.quantity !== 1) {
   dispatch({
    type: "updateCart",
    payload: { ...record, quantity: record.quantity - 1 },
   });
  }
 };
 const filteredCartItems = cartItems.filter((item) => item); // Filter out null values
 console.log(filteredCartItems);

 const columns = [
  {
   title: "Name",
   dataIndex: "name",
   key: "name",
  },
  {
   title: "Image",
   dataIndex: "image",
   key: "image",
   render: (image) => <img src={image} alt="" height="60" width="60" />,
  },
  {
   title: "Price",
   dataIndex: "price",
   key: "price",
  },
  {
   title: "Quantity",
   dataIndex: "_id",
   render: (id, record) => (
    <div>
     <PlusCircleOutlined
      className="mx-3"
      onClick={() => increaseQuantity(record)}
     />
     <b>{record.quantity}</b>
     <MinusCircleOutlined
      className="mx-3"
      onClick={() => decreaseQuantity(record)}
     />
    </div>
   ),
  },
  {
   title: "Action",
   dataIndex: "_id",
   key: "action",
   render: (id, record) => (
    <DeleteOutlined
     onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
    />
   ),
  },
 ];

 // Handle delete action
 const handleDelete = (item) => {
  console.log("Deleting item: ", item);
  // Dispatch action to remove item from cart
  // dispatch({ type: 'REMOVE_FROM_CART', payload: item });
 };

 return (
  <DefaultLayout>
   <h3>Cart</h3>
   <Table
    columns={columns}
    dataSource={filteredCartItems}
    bordered
    rowKey="_id"
   />
  </DefaultLayout>
 );
}

export default CartPage;
