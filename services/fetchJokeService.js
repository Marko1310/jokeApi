// dependencies
const axios = require('axios');

const fetchJoke = () => axios.get('https://api.chucknorris.io/jokes/random');

module.exports = { fetchJoke };
