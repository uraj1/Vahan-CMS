import React from 'react'
import Item from './Item';
import '../styles/ItemList.css'


const ItemList = ({ items, editItem, deleteItem }) => {
  return (
    <ul>
        {items.map(item => (
            <Item key={item.id} item={item} editItem={editItem} deleteItem={deleteItem} />
        ))}
    </ul>
  )
}

export default ItemList
