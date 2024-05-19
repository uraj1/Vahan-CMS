import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import ItemList from "./components/ItemList";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/entity");
    setItems(res.data);
  };

  const addItem = async (item) => {
    const res = await axios.post("http://localhost:5000/api/entity", item);
    setItems([...items, { ...item, id: res.data.insertId }]);
  };

  const updateItem = async (id, updatedItem) => {
    await axios.put(`http://localhost:5000/api/entity/${id}`, updatedItem);
    setItems(
      items.map((item) => (item.id === id ? { ...updatedItem, id } : item))
    );
    setEditing(false);
    setCurrentItem({});
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/entity/${id}`);
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (item) => {
    setEditing(true);
    setCurrentItem(item);
  };
  return (
    <>
      <div className="container">
        <h1>CMS Application</h1>
        <Form
          addItem={addItem}
          updateItem={updateItem}
          editing={editing}
          currentItem={currentItem}
          setEditing={setEditing}
          setCurrentItem={setCurrentItem}
        />
      </div>
      <div className="container">
        <ItemList items={items} editItem={editItem} deleteItem={deleteItem} />
      </div>
    </>
  );
}

export default App;
