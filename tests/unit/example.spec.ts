import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

const axios = require('axios');

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
    return axios.get('/xxx').then((response: any) => {
      expect(response).toEqual(data);
    });
  });
});

