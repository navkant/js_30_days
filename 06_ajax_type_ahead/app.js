const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
const resp = await fetch(endpoint);
const data = await resp.json();
cities.push(...data);
console.log(cities);

function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
        // need to figure out to match the cities
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
}