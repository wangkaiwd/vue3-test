import { mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

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
});
