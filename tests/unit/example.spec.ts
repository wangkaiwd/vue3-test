import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import { mocked } from 'jest-mock';
//
jest.mock('axios');
const mockedAxios = mocked(axios, true);
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
  it('should mock axios module', () => {
    const data = { data: { username: 'xxx' } };
    mockedAxios.get.mockResolvedValue(data);
    return axios.get('/xxx').then((response) => {
      expect(response).toEqual(data);
    });
  });
});

