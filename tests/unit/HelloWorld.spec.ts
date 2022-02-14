import { flushPromises, mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import { mocked } from 'jest-mock';
import axios from 'axios';

jest.mock('axios');

const mockAxios = mocked(axios, true);

describe('HelloWorld.vue', () => {
  it('should render props.msg when passed', () => {
    const msg = 'hello world';
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });
    // console.log(wrapper.html());
    expect(wrapper.get('h1').text()).toBe(msg);
    // console.log(wrapper.getComponent(Child).text());
  });
  it('should plus count when click button', async () => {
    const wrapper = mount(HelloWorld, {
      msg: 'counter',
    });
    const button = wrapper.get('button');
    // dom update is async
    await button.trigger('click');
    expect(button.text()).toBe('1');
  });
  it('should add todos', async () => {
    const todoContent = 'buy milk';
    const wrapper = mount(HelloWorld, {
      msg: 'todos',
    });
    const input = wrapper.get('input');
    const button = wrapper.get('button.add-todo');
    await input.setValue(todoContent);
    expect(input.element.value).toBe(todoContent);
    await button.trigger('click');
    expect(wrapper.findAll('li')).toHaveLength(1);
    expect(wrapper.get('li').text()).toBe(todoContent);
  });
  it('should emit send event', async () => {
    const todoContent = 'buy milk';
    const wrapper = mount(HelloWorld, {
      msg: 'todos',
    });
    const button = wrapper.get('button.add-todo');
    const input = wrapper.get('input');
    await input.setValue(todoContent);
    await button.trigger('click');
    expect(wrapper.emitted('send')?.[0]).toEqual([todoContent]);
  });

  it('should fetch user information when click load button', async () => {
    const wrapper = mount(HelloWorld, { msg: 'Test HTTP Request' });
    const response = {
      data: {
        'name': 'Leanne Graham',
        'username': 'Bret',
      }
    };
    mockAxios.get.mockResolvedValue(response);
    const button = wrapper.get('.user');
    await button.trigger('click');
    // todo: why this is false ?
    // expect(wrapper.find('.loading').exists()).toBe(true);

    // Wait Until the DOM updates
    await flushPromises();
    expect(mockAxios.get).toHaveBeenCalled();
    expect(wrapper.get('.username').text()).toBe(response.data.username);
    // https://jestjs.io/docs/expect#tothrowerror
    expect(wrapper.find('.loading').exists()).toBeFalsy();
  });
});
