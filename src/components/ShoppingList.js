import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items))
  }, [])

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
    //console.log("In shoppingCart:", deletedItem)
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else{
        return item
      }
    })
    setItems(updatedItems)
    //console.log("In shoppingCart:", updatedItem)
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem])
    //console.log("In shoppingList:", newItem)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">

      {/*adding the onAddItem prop */}
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem} 
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

/** Displaying Items.
 * Goal - to display a list if items from the server when the application first loads.
 * 
 * ShoppingList component is parent to ItemForm component 
 * useEffect is used when their is a side effect. It triggers a side-effect in the ShoppingList
 * component after the component first renders.
 * 
 * The item state is updated by passing the array of items to setItems.
 * 
 */