// FavoriteCharacters.js

import React from 'react';
import { useCart } from './CartContext';

const FavoriteCharacters = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Favorite Characters</h1>
      {cartItems.map((favorite) => (
        <div key={favorite.id} className="favorite-card">
          <img src={favorite.image} alt={favorite.name} />
          <h2>{favorite.name}</h2>
          <p>Status: {favorite.status}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCharacters;
