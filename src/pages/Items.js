/** @format */

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { Button, Form, Modal, Table, Input, Select } from "antd";

function Items() {
 const [itemsData, setItemsData] = useState([]);
 const [addEditModelVisibility, setAddEditModelVisibility] = useState(false);
 const dispatch = useDispatch();
 // getAllItems is used to get data of items using http://localhost:5000/api/items/get-all-items
 const getAllItems = () => {
  dispatch({ type: "showloading" });
  axios
   .get("/api/items/get-all-items")
   .then((response) => {
    dispatch({ type: "hideloading" });
    setItemsData(response.data); // Set the fetched data to state
   })
   .catch((error) => {
    dispatch({ type: "hideloading" });
    console.log(error);
   });
 };

 useEffect(() => {
  getAllItems();
 }, []);
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
   title: "Category",
   dataIndex: "category",
  },
  {
   title: "Action",
   dataIndex: "_id",
   key: "action",
   render: (id, record) => (
    <div className="d-flex">
     <DeleteOutlined className="mx-2" />
     <EditOutlined className="mx-2" />
    </div>
   ),
  },
 ];
 const onFinish = (values) => {
  dispatch({ type: "showloading" });
  axios
   .post("/api/items/add-item")
   .then((response) => {
    dispatch({ type: "hideloading" });
    setItemsData(response.data); // Set the fetched data to state
   })
   .catch((error) => {
    dispatch({ type: "hideloading" });
    console.log(error);
   });
 };
 return (
  <DefaultLayout>
   <div className="d-flex justify-content-between">
    <h3>Items</h3>
    <Button type="primary" onClick={() => setAddEditModelVisibility(true)}>
     Add Item
    </Button>
   </div>
   <Table columns={columns} dataSource={itemsData} bordered />
   <Modal
    visible={addEditModelVisibility}
    title="Add New Item"
    footer={false}
    onCancel={() => setAddEditModelVisibility(false)}>
    <Form layout="vertical" onFinish={onFinish}>
     <Form.Item name="name" label="Name">
      <Input />
     </Form.Item>
     <Form.Item name="price" label="Price">
      <Input />
     </Form.Item>
     <Form.Item name="image" label="Image URL">
      <Input />
     </Form.Item>
     <Form.Item name="category" label="Category">
      <Select>
       <Select.Option value="fruits">Fruits</Select.Option>
       <Select.Option value="vegetables">Vegetables</Select.Option>
       <Select.Option value="meat">Meat</Select.Option>
      </Select>
     </Form.Item>
     <div className="d-flex justify-content-end">
      <Button htmlType="submit" type="Primary">
       Save
      </Button>
     </div>
    </Form>
   </Modal>
  </DefaultLayout>
 );
}

export default Items;
