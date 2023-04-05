const axios = require('axios');
const { fetchJoke } = require('../services/fetchJokeService');

jest.mock('axios');

describe('fetchJoke', () => {
  test('calls the Chuck Norris joke API', async () => {
    await fetchJoke();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
  });
});
