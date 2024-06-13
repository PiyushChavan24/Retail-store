/** @format */

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "../resources/items.css";
import { useDispatch } from "react-redux";
import { Button, Form, Modal, Table, Input, Select, message } from "antd";

function Items() {
 const [itemsData, setItemsData] = useState([]);
 const [addEditModelVisibility, setAddEditModelVisibility] = useState(false);
 const [editingItem, setEditingItem] = useState(null);
 const dispatch = useDispatch();

 // Get all items from the API
 const getAllItems = () => {
  dispatch({ type: "showloading" });
  axios
   .get("/api/items/get-all-items")
   .then((response) => {
    dispatch({ type: "hideloading" });
    setItemsData(response.data);
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
   key: "category",
  },
  {
   title: "Action",
   dataIndex: "_id",
   key: "action",
   render: (id, record) => (
    <div className="d-flex">
     <EditOutlined
      className="mx-2"
      onClick={() => {
       setEditingItem(record);
       setAddEditModelVisibility(true);
      }}
     />
     <DeleteOutlined className="mx-2" onClick={() => deleteItem(record)} />
    </div>
   ),
  },
 ];

 const onFinish = (values) => {
  dispatch({ type: "showloading" });
  if (editingItem) {
   axios
    .post(`/api/items/edit-item/${editingItem._id}`, values)
    .then((response) => {
     dispatch({ type: "hideloading" });
     message.success("Item updated successfully");
     setAddEditModelVisibility(false);
     setEditingItem(null);
     getAllItems();
    })
    .catch((error) => {
     dispatch({ type: "hideloading" });
     message.error("Something went wrong");
     console.log("Edit Error: ", error);
    });
  } else {
   axios
    .post("/api/items/add-item", values)
    .then((response) => {
     dispatch({ type: "hideloading" });
     message.success("Item added successfully");
     setAddEditModelVisibility(false);
     setEditingItem(null);
     getAllItems();
    })
    .catch((error) => {
     dispatch({ type: "hideloading" });
     message.error("Something went wrong");
     console.log("Add Error: ", error);
    });
  }
 };

 const deleteItem = (item) => {
  dispatch({ type: "showloading" });
  axios
   .delete(`/api/items/delete-item/${item._id}`)
   .then((response) => {
    dispatch({ type: "hideloading" });
    message.success("Item deleted successfully");
    getAllItems();
   })
   .catch((error) => {
    dispatch({ type: "hideloading" });
    message.error("Something went wrong");
    console.log("Delete Error: ", error);
   });
 };

 const editItem = (item) => {
  setEditingItem(item);
  setAddEditModelVisibility(true);
 };

 const handleCancel = () => {
  setAddEditModelVisibility(false);
  setEditingItem(null);
 };

 return (
  <DefaultLayout>
   <div className="d-flex justify-content-between">
    <h3>Items</h3>
    <Button type="primary" onClick={() => setAddEditModelVisibility(true)}>
     Add Item
    </Button>
   </div>
   <Table columns={columns} dataSource={itemsData} bordered rowKey="_id" />
   {addEditModelVisibility && (
    <Modal
     visible={addEditModelVisibility}
     title={`${editingItem !== null ? "Edit Item" : "Add Item"}`}
     footer={false}
     onCancel={handleCancel}>
     <Form layout="vertical" onFinish={onFinish} initialValues={editingItem}>
      <Form.Item
       name="name"
       label="Name"
       rules={[{ required: true, message: "Please input the item name!" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="price"
       label="Price"
       rules={[{ required: true, message: "Please input the item price!" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="image"
       label="Image URL"
       rules={[{ required: true, message: "Please input the image URL!" }]}>
       <Input />
      </Form.Item>
      <Form.Item
       name="category"
       label="Category"
       rules={[{ required: true, message: "Please select a category!" }]}>
       <Select>
        <Select.Option value="fruits">Fruits</Select.Option>
        <Select.Option value="vegetables">Vegetables</Select.Option>
        <Select.Option value="meat">Meat</Select.Option>
       </Select>
      </Form.Item>
      <div className="d-flex justify-content-end">
       <Button htmlType="submit" type="primary">
        Save
       </Button>
      </div>
     </Form>
    </Modal>
   )}
  </DefaultLayout>
 );
}

export default Items;
