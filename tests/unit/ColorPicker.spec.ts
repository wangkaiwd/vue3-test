import { mount, VueWrapper } from '@vue/test-utils';
import ColorPicker from '@/components/ColorPicker.vue';

const defaultColors = ['#BFFFF0', '#F0FFC2', '#FFE4C0', '#FFBBBB', '#6A5495', '#6A5495', '#8BDB81'];
describe('ColorPicker.vue', () => {
  let wrapper: VueWrapper<any>;
  const value = '#F76E11';
  beforeEach(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value
      }
    });
  });
  it('should render correct interface', () => {
    // input, color list
    const input = wrapper.get('input');
    expect(input.element.value).toBe(value.toLowerCase());
    expect(input.attributes().type).toBe('color');
    // color list last item's class is different with others
    const colorList = wrapper.find('.color-list');
    expect(colorList.exists()).toBeTruthy();
    const lastColorListElement = colorList.element.lastElementChild;
    expect(lastColorListElement?.classList.contains('transparent')).toBeTruthy();
  });
  it('should send correct event when change input', async () => {
    const blackHex = '#000000';
    const input = wrapper.get('input');
    await input.setValue(blackHex);
    // event
    expect(wrapper.emitted()).toHaveProperty('change');
    // event parameter
    expect(wrapper.emitted().change?.[0]).toEqual([blackHex]);
  });
  it('should change color value when click the color list item', async () => {
    const firstItem = wrapper.get('.color-list-item:first-child');
    await firstItem.trigger('click');
    const events = wrapper.emitted('change');
    expect(events?.[0]).toEqual([defaultColors[0]]);
  });
});

// 1. render correctly
// 2. trigger event
// 3. test view update
