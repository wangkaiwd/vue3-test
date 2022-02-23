import { flushPromises, mount, MountingOptions, VueWrapper } from '@vue/test-utils';
import Upload from '@/components/upload/upload.vue';
import { mocked } from 'jest-mock';
import axios from 'axios';
import { UploadFile } from '@/components/upload/types';

jest.mock('axios');
const mockAxios = mocked(axios, true);
const testFile = new File(['f'], 'foo.txt', {
  type: 'text/plain',
});

const mockComponent = {
  template: '<div></div>'
};
type MountOptions = Partial<MountingOptions<any> & Record<string, any>>
describe('upload.vue', () => {
  let wrapper: VueWrapper<any>;
  const createWrapper = (options: MountOptions = {}) => {
    wrapper = mount(Upload, {
      props: { action: 'test.url' },
      global: {
        stubs: {
          CloseOutlined: mockComponent,
          LoadingOutlined: mockComponent
        }
      },
      ...options
    });
    return wrapper;
  };
  const defineInputFiles = (inputElement: HTMLInputElement) => {
    Object.defineProperty(inputElement, 'files', {
      value: [testFile],
      writable: false
    });
  };
  const uploadFile = async (wrapper: VueWrapper<any>) => {
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
  };

  beforeEach(() => {
    wrapper = createWrapper();
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
  it('should render custom uploaded list', async () => {
    const wrapper = createWrapper({
      slots: {
        default: '<div class="custom-trigger">custom trigger</div>',
        loading: `
          <template #loading>
            <div class="custom-loading">custom loading</div>
          </template>
        `,
        uploaded: `
          <template #uploaded="{file}">
            <div class="custom-uploaded">
              {{ file.name }}
            </div>
          </template>
        `
      }
    });
    mockAxios.post.mockResolvedValue({
      data: { message: 'ok' },
      status: 200,
      statusText: 'OK',
    });
    const input = wrapper.get('.upload-input');
    const inputElement = input.element as HTMLInputElement;
    expect(wrapper.get('.upload-trigger .custom-trigger').text()).toBe('custom trigger');
    defineInputFiles(inputElement);
    await input.trigger('change');
    // expect(wrapper.get('.custom-loading').text()).toBe('custom-loading');
    await flushPromises();
    expect(wrapper.get('.upload-list .custom-uploaded').text()).toBe(testFile.name);
  });
  it('should before upload check', () => {
    const callback = jest.fn();
    const checkSize = jest.fn((file: UploadFile) => {
      if (file.raw.size < 2) {
        callback();
        return false;
      }
      return true;
    });
    const wrapper = createWrapper({ props: { action: 'test.url', beforeUpload: checkSize } });
    uploadFile(wrapper);
    expect(checkSize).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(wrapper.findAll('li').length).toBe(0);
  });
  // it('should ', () => {
  //
  // });
});
