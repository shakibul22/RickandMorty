import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CharacterDetails.css'; // Import your CSS file for styling

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      });
  }, [id]);

  return (
    <div className="character-details-container">
      {character && (
        <div className="character-details">
          <img src={character.image} alt={character.name} className="character-image" />
          <div className="character-info">
            <h1>{character.name}</h1>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>

            {/* Display information about the character's origin location */}
            {character.origin && (
              <div className="origin-info">
                <h2>Origin & Location</h2>
                <p>Name: {character.origin.name}</p>
                <p>URL: {character.origin.url}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
