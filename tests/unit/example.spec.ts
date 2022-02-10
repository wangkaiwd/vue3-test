const axios = require('axios');

describe('HelloWorld.vue', () => {
  it('should mock axios module', () => {
    const data = { data: { username: 'xxx' } };
    return axios.get('/xxx').then((response: any) => {
      expect(response).toEqual(data);
    });
  });
});

