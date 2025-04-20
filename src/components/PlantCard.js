import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleSoldOutClick = () => {
    setIsSoldOut(!isSoldOut);
  };

  const handlePriceUpdate = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant); 
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDeletePlant(id); 
    });
  };


  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>

      <p>Price: ${price.toFixed(2)}</p>

      <input
        type="number"
        step="0.01"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        style={{ marginBottom: "5px" }}
      />
      <button onClick={handlePriceUpdate}>💲 Update Price</button>

      <button
        className={isSoldOut ? "primary" : ""}
        onClick={handleSoldOutClick}
      >
        {isSoldOut ? "Sold Out" : "In Stock"}
      </button>

      <button onClick={handleDelete} style={{ backgroundColor: "crimson", color: "white", marginTop: "5px" }}>
        🗑 Delete
      </button>
    </li>
  );
}

export default PlantCard;

