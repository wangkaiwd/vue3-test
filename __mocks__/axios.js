// const axios = require('axios');
//
// jest.mock('axios');
//
// axios.get.mockResolvedValue({ data: { username: 'xxx' } });
//
// module.exports = axios;

const axios = {
  get: jest.fn(() => Promise.resolve({ data: { username: 'xxx' } }))
};

module.exports = axios;
