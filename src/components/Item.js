import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleAddToCartClick() {
    
    //adding fetch request
    fetch (`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then((r) => r.json())
    .then((updatedItem) => onUpdateItem(updatedItem))
    //console.log("clicked item:", item)
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item))
    //console.log(item)
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;

/** Updating Items
 *  Goal - Users keeping track of which items from their shopping list they've added to thier cart
 */