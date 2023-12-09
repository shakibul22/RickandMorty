import React, { useEffect, useState } from 'react';
import './Character.css'; // Import your CSS file
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

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
      const response = await fetch(character.episode[0]);
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
            <div>
              <h2>{character.name}</h2>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <div className='btn'>
                <button onClick={() => handleFavoriteToggle(character)}>
                  {favorites.some(fav => fav.id === character.id) ? <CiHeart /> : <FaHeart />}
                </button>
                {/* Use Link to navigate to a new page with the character's id in the URL */}
                <Link to={`/character/${character.id}`}>
                  <button>VIEW</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Move this section outside of the characters map */}
      <div className="shared-episodes">
        {sharedEpisodes.map(episode => (
          <div key={episode.id} className="shared-card">
            <img src={episode.image} alt={episode.name} />
            <h2>{episode.name}</h2>
            <p>Status: {episode.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
