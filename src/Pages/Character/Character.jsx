import React, { useEffect, useState } from 'react';
import './Character.css'; // Import your CSS file
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [sharedEpisodes, setSharedEpisodes] = useState([]);
  
    useEffect(() => {
      fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
          setCharacters(data.results);
        })
        .catch(error => {
          console.error('Error fetching character data:', error);
        });
    }, []);
  
    const handleFavoriteToggle = (character) => {
      const isFavorite = favorites.some(fav => fav.id === character.id);
      if (isFavorite) {
        const updatedFavorites = favorites.filter(fav => fav.id !== character.id);
        setFavorites(updatedFavorites);
      } else {
        const updatedFavorites = [...favorites, character];
        setFavorites(updatedFavorites);
      }
    };
  
    const handleFavoriteClick = async (character) => {
      try {
        const response = await fetch(character.episode[0]); // Assuming the first episode URL contains shared characters
        const episodeData = await response.json();
        const charactersInEpisode = episodeData.characters.filter(charUrl => charUrl !== character.url);
        const sharedCharacters = characters.filter(char => charactersInEpisode.includes(char.url));
        setSharedEpisodes(sharedCharacters);
      } catch (error) {
        console.error('Error fetching shared characters:', error);
      }
    };
  
    return (
      <div className="App">
        <div className="characters">
        
          {characters.map(character => (
            <div key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <h2>{character.name}</h2>
              <p>Status: {character.status}</p>
              <button onClick={() => handleFavoriteToggle(character)}>
                {favorites.some(fav => fav.id === character.id) ? <CiHeart /> : <FaHeart />}
              </button>
              <button onClick={() => handleFavoriteClick(character)}>
                view Details
              </button>
            </div>
          ))}
        </div>
        {/* <div className="favorites">
          <h1>Favorite Characters</h1>
          {favorites.map(favorite => (
            <div key={favorite.id} className="favorite-card">
              <img src={favorite.image} alt={favorite.name} />
              <h2>{favorite.name}</h2>
              <p>Status: {favorite.status}</p>
            </div>
          ))}
        </div>
        <div className="shared-episodes">
          <h1>Characters in Shared Episodes</h1>
          {sharedEpisodes.map(shared => (
            <div key={shared.id} className="shared-card">
              <img src={shared.image} alt={shared.name} />
              <h2>{shared.name}</h2>
              <p>Status: {shared.status}</p>
            </div>
          ))}
        </div> */}
      </div>
    );
};

export default Character;