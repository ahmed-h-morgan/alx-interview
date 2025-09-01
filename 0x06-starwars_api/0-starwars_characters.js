#!/usr/bin/node

const request = require('request');

// Check if movie ID is provided
if (process.argv.length < 3) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`HTTP Error: ${response.statusCode}`);
    return;
  }

  try {
    const filmData = JSON.parse(body);
    const characters = filmData.characters;
    const characterNames = new Array(characters.length);
    let completedRequests = 0;

    characters.forEach((characterUrl, index) => {
      request(characterUrl, (charError, charResponse, charBody) => {
        if (charError) {
          console.error('Error fetching character:', charError);
          return;
        }
        
        if (charResponse.statusCode !== 200) {
          console.error(`HTTP Error for character: ${charResponse.statusCode}`);
          return;
        }
        
        try {
          const characterData = JSON.parse(charBody);
          characterNames[index] = characterData.name;
          completedRequests++;
          
          // If all requests are completed, print in order
          if (completedRequests === characters.length) {
            characterNames.forEach(name => {
              console.log(name);
            });
          }
        } catch (parseError) {
          console.error('Error parsing character data:', parseError);
        }
      });
    });
    
  } catch (parseError) {
    console.error('Error parsing film data:', parseError);
  }
});