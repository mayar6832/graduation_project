import { useState, useEffect } from 'react';
import axios from 'axios';
import './customers.css';
import { Typography,Space,Card, Statistic,Table } from "antd"
import log from "../image/user.png"

function Customers({length}) {

  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:3001/user/api/items')
        setListItems(res.data);
        console.log('render')
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  }, []);


  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/user/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <><div className="container">
      <h1>MEMQ accounts</h1>
      <div className="account-listItems">
        {listItems.map(item => (
          <div className="account-item">
            <p className="item-content">{item.email}</p>
            <button className="delete-item" onClick={() => { deleteItem(item._id); } }>Delete</button>
          </div>
        ))}
      </div>
      <h1>{listItems.length}</h1>
    </div>
    
</>
  );
}

export default Customers;