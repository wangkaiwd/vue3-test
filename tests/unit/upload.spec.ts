import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import Upload from '@/components/upload/upload.vue';
import { mocked } from 'jest-mock';
import axios from 'axios';

jest.mock('axios');
const mockAxios = mocked(axios, true);
const testFile = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
});
const mockComponent = {
  template: '<div></div>'
};
describe('upload.vue', () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = mount(Upload, {
      props: { action: 'test.url' },
      global: {
        stubs: {
          CloseOutlined: mockComponent,
          LoadingOutlined: mockComponent
        }
      }
    });
  });
  afterEach(() => {
    mockAxios.mockReset();
  });
  it('should render basic layout before uploading', () => {
    expect(wrapper.find('input[type="file"]').exists()).toBeTruthy();
    expect(wrapper.find('.upload-button').exists()).toBeTruthy();
    expect(wrapper.find('.upload-button').text()).toBe('上 传');
  });
  it('should upload successfully', async () => {
    // 1. mock input event target files
    // 2. trigger change event
    mockAxios.post.mockResolvedValue({
      data: { message: 'ok' },
      status: 200,
    });
    const input = wrapper.get('.upload-input');
    const inputElement = input.element as HTMLInputElement;
    Object.defineProperty(inputElement, 'files', {
      value: [testFile],
      writable: false
    });
    await input.trigger('change');
    expect(mockAxios.post).toHaveBeenCalled();
    // fixme: why not this is false ?
    // button disabled
    // expect(wrapper.get('.upload-button').attributes('disabled')).toBeTruthy();
    const lis = wrapper.findAll('li');
    // expect(lis.length).toBe(1);
    // expect(lis[0].classes()).toContain('upload-item-loading');

    await flushPromises();
    expect(lis[0].classes()).toContain('upload-item-success');
    expect(lis[0].get('.upload-item-filename').text()).toBe(testFile.name);
  });
  it('should display error text when post is rejected', async () => {
    mockAxios.post.mockRejectedValue({
      data: { message: 'error' },
    });
    const input = wrapper.get('.upload-input');
    const inputElement = input.element as HTMLInputElement;
    Object.defineProperty(inputElement, 'files', {
      value: [testFile],
      writable: false
    });
    await input.trigger('change');
    expect(mockAxios.post).toHaveBeenCalled();
    // fixme: why not this is false ?
    // expect(wrapper.find('.upload-item-loading').exists()).toBeTruthy();
    await flushPromises();
    const lastItem = wrapper.get('li:first-child');
    expect(lastItem.classes()).toContain('upload-item-error');
  });
  it('should delete uploaded item from list', async () => {
    mockAxios.post.mockResolvedValue({
      data: { message: 'ok' },
      status: 200,
      statusText: 'OK',
    });
    const input = wrapper.get('.upload-input');
    const inputElement = input.element as HTMLInputElement;
    Object.defineProperty(inputElement, 'files', {
      value: [testFile],
      writable: false
    });
    await input.trigger('change');
    await flushPromises();

    await wrapper.get('.upload-item-delete').trigger('click');
    expect(wrapper.findAll('li').length).toBe(0);
  });
});
