import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import Upload from '@/components/upload/upload.vue';
import { mocked } from 'jest-mock';
import axios from 'axios';

jest.mock('axios');
const mockAxios = mocked(axios, true);
const testFile = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
});
describe('upload.vue', () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = mount(Upload, { props: { action: 'test.url' } });
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
      statusText: 'OK',
      headers: {},
      config: {}
    });
    const input = wrapper.get('.upload-input');
    const inputElement = input.element as HTMLInputElement;
    Object.defineProperty(inputElement, 'files', {
      value: [testFile],
      writable: false
    });
    await wrapper.get('.upload-input').trigger('change');
    expect(mockAxios.post).toHaveBeenCalled();
    // fixme: why not this is false ?
    // expect(wrapper.find('.upload-loading').exists()).toBeTruthy();
    await flushPromises();
    expect(wrapper.find('.upload-success').exists()).toBeTruthy();
  });
});
