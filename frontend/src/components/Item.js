import React from 'react'
import '../styles/Item.css'


const Item = ({ item, editItem, deleteItem }) => {
  return (
    <li className="card">
    <div>
      <p><b>Name:</b> {item.name}</p>
      <p><b>Email: </b>{item.email}</p>
      <p><b>Mob. No.: </b>{item.mobile_number}</p>
      <p><b>D.O.B.:</b> {item.date_of_birth}</p>
    </div>
    <div className="button-container">
      <button onClick={() => editItem(item)}>Edit</button>
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </div>
  </li>
  )
}

export default Item
