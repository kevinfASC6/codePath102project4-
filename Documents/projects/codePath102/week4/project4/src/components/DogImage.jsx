import React, { useState } from "react";
import DogInfo from "./DogInfo";

function DogImage() {
  const [dogData, setDogData] = useState(null);
  const [dogImageUrl, setDogImageUrl] = useState(null);
  const [bannedBreeds, setBannedBreeds] = useState([]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "x-api-key",
    "live_BFkNiSQE1xQ3aUE4axziMWxzD2WKZ2JredEXZ4Nvvoh2mGhjpqn6MfkCqfxzoN9Cx"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  function fetchDogData() {
    fetch("https://api.thedogapi.com/v1/breeds?limit=200&has_breeds=true", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let availableBreeds = data.filter((breed) => !bannedBreeds.includes(breed.name));  
        availableBreeds = availableBreeds.filter((breed) => !bannedBreeds.includes(breed.life_span));  
        availableBreeds = availableBreeds.filter((breed) => !bannedBreeds.includes(breed.breed_group));  
        availableBreeds = availableBreeds.filter((breed) => breed.name && breed.life_span && breed.breed_group);
        const randomIndex = Math.floor(Math.random() * availableBreeds.length);
        setDogImageUrl(availableBreeds[randomIndex].image.url);
        setDogData(availableBreeds[randomIndex]);
      })
      .catch((error) => console.log("error", error));
  }

  const handleBanned = (breedName) => {
    if (bannedBreeds.includes(breedName)) {
      setBannedBreeds((prevBreeds) => prevBreeds.filter((breed) => breed !== breedName));
    } else {
      setBannedBreeds([...bannedBreeds, breedName]);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="middle"> 
          <h1>Dog Selector</h1> 
          <h3>Discover all the different types of dogs!</h3> 
          <h2>🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕🐕</h2>
          <button onClick={fetchDogData}>Fetch Dog Image</button>
          <div>
            {dogImageUrl && (
              <>
                <img src={dogImageUrl} alt="dog" height="500px" width="500px" />
                {dogData && (
                  <DogInfo
                    name={dogData.name}
                    life_span={dogData.life_span}
                    breed_group={dogData.breed_group}
                    onBanned={handleBanned}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="right">
          <h2>Ban List</h2> 
          <h4>Select an attribute in your listing to ban it</h4>
          {bannedBreeds.map((breed) => (
            <p key={breed} onClick={() => handleBanned(breed)}>
              {breed}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DogImage;


